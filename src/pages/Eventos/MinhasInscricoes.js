import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { colors } from '../../../styles/theme';
import { EventosService } from '../../services/eventos/eventosService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function MinhasInscricoes() {
    const navigation = useNavigation();
    const [inscricoes, setInscricoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadInscricoes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await EventosService.listMinhasInscricoes();
            if (response.success) {
                setInscricoes(response.data);
            }
        } catch (error) {
            console.error('Erro ao carregar minhas inscrições:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadInscricoes();
    }, [loadInscricoes]);

    const onRefresh = () => {
        setRefreshing(true);
        loadInscricoes();
    };

    const handleCertificate = async (insc) => {
        try {
            const now = new Date();
            const eventEndTime = insc.evento?.dataFim || insc.evento?.dataInicio;
            const eventEnded = eventEndTime ? now > new Date(eventEndTime) : false;

            if (!eventEnded) {
                Alert.alert('Certificado', 'O certificado só é liberado após o término do evento.');
                return;
            }

            // Verifica presença (evento principal ou subeventos)
            const hasCheckedInMain = !!insc.checkIn || !!insc.presenca;
            const subEventsChosen = insc.subeventosEscolhidos || [];
            const hasCheckedInSub = subEventsChosen.some(s => !!s.checkIn);
            const hasPresence = hasCheckedInMain || hasCheckedInSub;

            const hasCert = !!insc.certificado;

            if (!hasCert && !hasPresence) {
                Alert.alert('Certificado', 'Você precisa realizar o check-in no evento ou em uma atividade para gerar seu certificado.');
                return;
            }

            const response = await EventosService.emitirCertificado(insc.id);
            if (response.success && (response.data.urlPublica || response.data.codigoValidacao)) {
                const url = response.data.urlPublica || `https://eventos.fazag.edu.br/certificados/${response.data.codigoValidacao}`;
                navigation.navigate('CertificateViewer', { url });
            } else {
                Alert.alert('Certificado', 'O certificado está sendo processado ou ainda não está disponível.');
            }
        } catch (error) {
            console.error('Erro ao emitir certificado:', error);
            Alert.alert('Erro', error.response?.data?.message || 'Não foi possível emitir o certificado no momento.');
        }
    };

    const isCheckInAvailable = (dataInicio) => {
        if (!dataInicio) return false;
        const now = new Date();
        const start = new Date(dataInicio);
        const diffMinutes = (now - start) / (1000 * 60);
        return diffMinutes >= -30 && diffMinutes <= 90;
    };

    const handleCheckIn = async (inscricaoId) => {
        try {
            const response = await EventosService.checkInEvento(inscricaoId);
            if (response.success) {
                Alert.alert('Sucesso', 'Check-in realizado com sucesso!');
                loadInscricoes();
            }
        } catch (error) {
            Alert.alert('Erro', error.response?.data?.message || 'Não foi possível realizar o check-in.');
        }
    };

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary[500]} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.primary[800], colors.primary[600]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerGradient}
            >
                <View style={styles.headerContent}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                            <Ionicons name="arrow-back" size={24} color={colors.white} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Minhas Inscrições</Text>
                        <Text style={styles.headerSubtitle}>Gerencie suas participações</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary[500]]} />
                }
            >
                {inscricoes.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Feather name="bookmark" size={48} color={colors.gray[300]} />
                        <Text style={styles.emptyText}>Você ainda não se inscreveu em nenhum evento.</Text>
                        <TouchableOpacity
                            style={[styles.registerButton, { marginTop: 20, paddingHorizontal: 30 }]}
                            onPress={() => navigation.navigate('Eventos')}
                        >
                            <Text style={styles.registerButtonText}>Ver Eventos Disponíveis</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    inscricoes.map((insc) => (
                        <View key={insc.id} style={styles.inscricaoCard}>
                            <View style={styles.inscricaoHeader}>
                                <Text style={styles.inscricaoTitle}>{insc.evento?.nome || 'Evento'}</Text>
                                <View style={{ flexDirection: 'row', gap: 6 }}>
                                    {(!!insc.checkIn || !!insc.presenca) && (
                                        <View style={[styles.inscricaoStatusBadge, { backgroundColor: '#ccfbf1' }]}>
                                            <Text style={[styles.inscricaoStatusText, { color: '#0f766e' }]}>Presente</Text>
                                        </View>
                                    )}
                                    <View style={[
                                        styles.inscricaoStatusBadge,
                                        { backgroundColor: insc.status === 'CONFIRMADA' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)' }
                                    ]}>
                                        <Text style={[
                                            styles.inscricaoStatusText,
                                            { color: insc.status === 'CONFIRMADA' ? '#166534' : colors.primary[600] }
                                        ]}>
                                            {insc.status}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.inscricaoInfo}>
                                <Feather name="calendar" size={14} color={colors.gray[400]} />
                                <Text style={styles.inscricaoInfoText}>
                                    {(() => {
                                        try {
                                            const dateValue = insc.dataInscricao || insc.createdAt || insc.data;
                                            return dateValue
                                                ? `Inscrito em ${format(new Date(dateValue), "dd/MM/yyyy", { locale: ptBR })}`
                                                : 'Data de inscrição indisponível';
                                        } catch (e) {
                                            return 'Data de inscrição inválida';
                                        }
                                    })()}
                                </Text>
                            </View>

                            <View style={styles.inscricaoFooter}>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    {(!insc.checkIn && !insc.presenca) && isCheckInAvailable(insc.evento?.dataInicio) && (
                                        <TouchableOpacity
                                            style={[styles.certificateButton, { backgroundColor: colors.green[600], borderColor: colors.green[600] }]}
                                            onPress={() => handleCheckIn(insc.id)}
                                        >
                                            <Feather name="map-pin" size={16} color={colors.white} />
                                            <Text style={[styles.certificateButtonText, { color: colors.white }]}>Check-in</Text>
                                        </TouchableOpacity>
                                    )}

                                    <TouchableOpacity
                                        style={[
                                            styles.certificateButton,
                                            (() => {
                                                const eventEndTime = insc.evento?.dataFim || insc.evento?.dataInicio;
                                                const eventEnded = eventEndTime ? new Date() > new Date(eventEndTime) : false;
                                                const hasCheckedInMain = !!insc.checkIn || !!insc.presenca;
                                                const hasCheckedInSub = (insc.subeventosEscolhidos || []).some(s => !!s.checkIn);
                                                const hasPresence = hasCheckedInMain || hasCheckedInSub;

                                                const isAvailable = eventEnded && (!!insc.certificado || hasPresence);
                                                return !isAvailable && { opacity: 0.5 };
                                            })()
                                        ]}
                                        onPress={() => handleCertificate(insc)}
                                    >
                                        <Feather name="award" size={18} color={colors.primary[700]} />
                                        <Text style={styles.certificateButtonText}>Certificado</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={styles.detailsLink}
                                    onPress={() => navigation.navigate('EventoDetail', { id: insc.eventoId || insc.evento?.id })}
                                >
                                    <Text style={styles.detailsLinkText}>Detalhes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

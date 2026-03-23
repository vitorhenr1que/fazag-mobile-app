import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { styles } from './style';
import { colors } from '../../../styles/theme';
import { EventosService } from '../../services/eventos/eventosService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function MinhasInscricoes() {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [inscricoes, setInscricoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState('ativos'); // 'ativos' | 'encerrados'

    const loadInscricoes = useCallback(async () => {
        if (!user?.id) return;
        try {
            setLoading(true);
            const response = await EventosService.listMinhasInscricoes(user.id);
            if (response.success) {
                setInscricoes(response.data);
            }
        } catch (error) {
            console.error('Erro ao carregar minhas inscrições:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [user?.id]);

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


    const published = inscricoes.filter(i => i.evento?.status !== 'FINISHED');
    const finished = inscricoes.filter(i => i.evento?.status === 'FINISHED');

    const renderInscricao = (insc, isFinished = false) => (
        <View
            key={insc.id}
            style={[
                styles.inscricaoCard,
                isFinished && { opacity: 0.8, borderLeftColor: colors.gray[400] }
            ]}
        >
            <View style={styles.inscricaoHeader}>
                <Text style={[styles.inscricaoTitle, isFinished && { color: colors.gray[600] }]}>
                    {insc.evento?.nome || 'Evento'}
                </Text>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                    {(!!insc.checkIn || !!insc.presenca) && (
                        <View style={[styles.inscricaoStatusBadge, { backgroundColor: isFinished ? colors.gray[100] : '#ccfbf1' }]}>
                            <Text style={[styles.inscricaoStatusText, { color: isFinished ? colors.gray[500] : '#0f766e' }]}>Presente</Text>
                        </View>
                    )}
                    <View style={[
                        styles.inscricaoStatusBadge,
                        { backgroundColor: isFinished ? colors.gray[50] : (insc.status === 'CONFIRMADA' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)') }
                    ]}>
                        <Text style={[
                            styles.inscricaoStatusText,
                            { color: isFinished ? colors.gray[400] : (insc.status === 'CONFIRMADA' ? '#166534' : colors.primary[600]) }
                        ]}>
                            {insc.status}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.inscricaoInfo}>
                <Feather name="calendar" size={14} color={isFinished ? colors.gray[300] : colors.gray[400]} />
                <Text style={[styles.inscricaoInfoText, isFinished && { color: colors.gray[400] }]}>
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

                    <TouchableOpacity
                        style={[
                            styles.certificateButton,
                            isFinished && { backgroundColor: colors.gray[50] },
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
                        <Feather name="award" size={18} color={isFinished ? colors.gray[400] : colors.primary[700]} />
                        <Text style={[styles.certificateButtonText, isFinished && { color: colors.gray[500] }]}>Certificado</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.detailsLink}
                    onPress={() => navigation.navigate('EventoDetail', { id: insc.eventoId || insc.evento?.id })}
                >
                    <Text style={[styles.detailsLinkText, isFinished && { color: colors.gray[300] }]}>Detalhes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

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

            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'ativos' && styles.activeTab]}
                    onPress={() => setActiveTab('ativos')}
                >
                    <Text style={[styles.tabText, activeTab === 'ativos' && styles.activeTabText]}>Ativos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'encerrados' && styles.activeTab]}
                    onPress={() => setActiveTab('encerrados')}
                >
                    <Text style={[styles.tabText, activeTab === 'encerrados' && styles.activeTabText]}>Encerrados</Text>
                </TouchableOpacity>
            </View>

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
                    activeTab === 'ativos' ? (
                        published.length > 0 ? (
                            published.map(insc => renderInscricao(insc, false))
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>Nenhum evento ativo encontrado.</Text>
                            </View>
                        )
                    ) : (
                        finished.length > 0 ? (
                            finished.map(insc => renderInscricao(insc, true))
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>Nenhum evento encerrado encontrado.</Text>
                            </View>
                        )
                    )
                )}
            </ScrollView>
        </View>
    );
}

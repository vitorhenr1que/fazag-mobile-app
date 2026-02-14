import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { colors } from '../../../styles/theme';
import { EventosService } from '../../services/eventos/eventosService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Eventos() {
    const navigation = useNavigation();
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadEventos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await EventosService.listEventos();
            if (response.success) {
                setEventos(response.data);
            }
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadEventos();
    }, [loadEventos]);

    const onRefresh = () => {
        setRefreshing(true);
        loadEventos();
    };

    const formatDate = (dateString, type) => {
        const date = new Date(dateString);
        if (type === 'day') return format(date, 'dd');
        if (type === 'month') return format(date, 'MMM', { locale: ptBR });
        return format(date, "dd 'de' MMMM", { locale: ptBR });
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
                        <Text style={styles.headerTitle}>Eventos</Text>
                        <Text style={styles.headerSubtitle}>Descubra atividades acadêmicas</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.myInscricoesButton}
                        onPress={() => navigation.navigate('MinhasInscricoes')}
                    >
                        <Feather name="bookmark" size={16} color={colors.primary[700]} />
                        <Text style={styles.myInscricoesText}>Inscrições</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary[500]]} />
                }
            >
                <Text style={styles.sectionTitle}>Próximos Eventos</Text>

                {eventos.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Feather name="calendar" size={48} color={colors.gray[300]} />
                        <Text style={styles.emptyText}>Nenhum evento disponível no momento.</Text>
                    </View>
                ) : (
                    eventos.map((evento) => (
                        <TouchableOpacity
                            key={evento.id}
                            style={styles.eventCard}
                            onPress={() => navigation.navigate('EventoDetail', { id: evento.id })}
                            activeOpacity={0.9}
                        >
                            <View style={styles.bannerContainer}>
                                <Image
                                    source={{ uri: evento.bannerUrl || 'https://images.unsplash.com/photo-1540575861501-7ce058a877c3?auto=format&fit=crop&w=800&q=80' }}
                                    style={styles.eventBanner}
                                />
                                <View style={styles.dateBadge}>
                                    <Text style={styles.dateDay}>{formatDate(evento.dataInicio, 'day')}</Text>
                                    <Text style={styles.dateMonth}>{formatDate(evento.dataInicio, 'month')}</Text>
                                </View>
                            </View>

                            <View style={styles.eventContent}>
                                <Text style={styles.eventTitle} numberOfLines={2}>{evento.nome}</Text>

                                <View style={styles.eventInfoRow}>
                                    <Feather name="clock" size={14} color={colors.gray[400]} />
                                    <Text style={styles.eventInfoText}>
                                        {formatDate(evento.dataInicio, 'full')} • {format(new Date(evento.dataInicio), 'HH:mm', { locale: ptBR })}h
                                    </Text>
                                </View>

                                <View style={styles.eventInfoRow}>
                                    <Feather name="map-pin" size={14} color={colors.gray[400]} />
                                    <Text style={styles.eventInfoText} numberOfLines={1}>{evento.local}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                                    <View style={[
                                        styles.statusBadge,
                                        { backgroundColor: evento.status === 'PUBLISHED' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)' }
                                    ]}>
                                        <Text style={[
                                            styles.statusText,
                                            { color: evento.status === 'PUBLISHED' ? '#166534' : '#854d0e' }
                                        ]}>
                                            {evento.status === 'PUBLISHED' ? 'Inscrições Abertas' : 'Em breve'}
                                        </Text>
                                    </View>

                                    <View style={[
                                        styles.statusBadge,
                                        { backgroundColor: String(evento.tipo).toUpperCase() === 'PAGO' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)' }
                                    ]}>
                                        <Text style={[
                                            styles.statusText,
                                            { color: String(evento.tipo).toUpperCase() === 'PAGO' ? colors.primary[700] : '#059669' }
                                        ]}>
                                            {String(evento.tipo).toUpperCase() === 'PAGO'
                                                ? `R$ ${parseFloat(evento.preco || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                                                : 'Gratuito'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.detailButton}>
                                    <Text style={styles.detailButtonText}>Ver Mais</Text>
                                    <Feather name="chevron-right" size={16} color={colors.primary[600]} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

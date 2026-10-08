import React, { useCallback, useContext, useRef, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/auth';
import { EventosService } from '../../services/eventos/eventosService';
import { getCertificadoUrl, listarCertificados } from '../../utils/certificados';
import { colors } from '../../../styles/theme';
import { styles } from './style';

export function Certificados() {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const alunoId = user?.aluno_id || user?.id;
    const [inscricoes, setInscricoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [abrindoId, setAbrindoId] = useState(null);
    const requestId = useRef(0);
    const opening = useRef(false);

    const loadCertificados = useCallback(async (refresh = false) => {
        const currentRequest = ++requestId.current;
        setError('');
        if (refresh) setRefreshing(true);
        else setLoading(true);
        try {
            if (!alunoId) throw new Error('Não foi possível identificar sua matrícula.');
            const response = await EventosService.listMinhasInscricoes(alunoId);
            if (!response?.success || !Array.isArray(response.data)) {
                throw new Error('Não foi possível carregar seus certificados.');
            }
            if (currentRequest === requestId.current) setInscricoes(response.data);
        } catch (err) {
            if (currentRequest === requestId.current) {
                setError(err.response?.data?.message || err.message || 'Não foi possível carregar seus certificados.');
            }
        } finally {
            if (currentRequest === requestId.current) {
                setLoading(false);
                setRefreshing(false);
            }
        }
    }, [alunoId]);

    useFocusEffect(useCallback(() => {
        setInscricoes([]);
        loadCertificados();
        return () => { requestId.current += 1; };
    }, [loadCertificados]));

    const abrirCertificado = async (inscricao) => {
        if (opening.current) return;
        const existingUrl = getCertificadoUrl(inscricao.certificado);
        if (existingUrl) {
            navigation.navigate('CertificateViewer', { url: existingUrl });
            return;
        }
        opening.current = true;
        setAbrindoId(inscricao.id);
        const currentRequest = requestId.current;
        try {
            const response = await EventosService.emitirCertificado(inscricao.id);
            if (currentRequest !== requestId.current) return;
            const url = response?.success && getCertificadoUrl(response.data);
            if (!url) {
                Alert.alert('Certificado', response?.message || 'O certificado está sendo processado ou ainda não está disponível.');
                return;
            }
            setInscricoes(current => current.map(item => item.id === inscricao.id
                ? { ...item, certificado: response.data } : item));
            navigation.navigate('CertificateViewer', { url });
        } catch (err) {
            if (currentRequest === requestId.current) {
                Alert.alert('Certificado', err.response?.data?.message || 'Não foi possível abrir o certificado. Tente novamente.');
            }
        } finally {
            opening.current = false;
            setAbrindoId(null);
        }
    };

    const certificados = listarCertificados(inscricoes);
    const emitidos = certificados.filter(item => !!item.certificado);
    const horas = emitidos.reduce((total, item) => {
        const carga = Number(item.certificado.cargaHorariaTotal);
        return total + (Number.isFinite(carga) && carga > 0 ? carga : 0);
    }, 0);

    const renderCertificado = ({ item }) => {
        const emitido = !!item.certificado;
        const carga = Number(item.certificado?.cargaHorariaTotal);
        const data = item.evento?.dataInicio ? new Date(item.evento.dataInicio) : null;
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.icon}><Feather name="award" size={24} color={colors.primary[600]} /></View>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{item.evento?.nome || 'Certificado de participação'}</Text>
                        <Text style={[styles.badge, { color: emitido ? colors.green[600] : colors.primary[600] }]}>
                            {emitido ? 'Emitido' : 'Disponível para emissão'}
                        </Text>
                    </View>
                </View>
                <View style={styles.metadata}>
                    {data && Number.isFinite(data.getTime()) && <Text style={styles.metaText}>Evento em {data.toLocaleDateString('pt-BR')}</Text>}
                    {Number.isFinite(carga) && carga > 0 && <Text style={styles.metaText}>{carga.toLocaleString('pt-BR')}h de carga horária</Text>}
                </View>
                <TouchableOpacity
                    style={[styles.button, abrindoId !== null && styles.disabled]}
                    onPress={() => abrirCertificado(item)}
                    disabled={abrindoId !== null}
                    accessibilityRole="button"
                    accessibilityLabel={`${emitido ? 'Visualizar' : 'Emitir'} certificado de ${item.evento?.nome || 'participação'}`}
                >
                    {abrindoId === item.id ? <ActivityIndicator size="small" color={colors.white} /> : <Feather name="file-text" size={18} color={colors.white} />}
                    <Text style={styles.buttonText}>{abrindoId === item.id ? 'Abrindo…' : emitido ? 'Visualizar certificado' : 'Emitir certificado'}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={[colors.primary[800], colors.primary[600]]} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back} accessibilityRole="button" accessibilityLabel="Voltar">
                    <Feather name="arrow-left" size={24} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.title}>Meus Certificados</Text>
                <Text style={styles.subtitle}>Suas conquistas em eventos e cursos da FAZAG.</Text>
            </LinearGradient>
            {loading ? (
                <View style={styles.center}><ActivityIndicator size="large" color={colors.primary[600]} /><Text style={styles.message}>Carregando certificados…</Text></View>
            ) : (
                <FlatList
                    data={error ? [] : certificados}
                    keyExtractor={item => String(item.id)}
                    renderItem={renderCertificado}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadCertificados(true)} colors={[colors.primary[600]]} />}
                    ListHeaderComponent={!error && certificados.length > 0 ? (
                        <View style={styles.summary}>
                            <Text style={styles.summaryTitle}>{emitidos.length} {emitidos.length === 1 ? 'certificado emitido' : 'certificados emitidos'}</Text>
                            <Text style={styles.metaText}>{horas.toLocaleString('pt-BR')}h certificadas</Text>
                        </View>
                    ) : null}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Feather name={error ? 'alert-circle' : 'award'} size={48} color={colors.gray[400]} />
                            <Text style={styles.emptyTitle}>{error ? 'Não foi possível carregar' : 'Seus certificados aparecerão aqui'}</Text>
                            <Text style={styles.message}>{error || 'Após o término do evento e a confirmação da sua presença, você poderá emitir e visualizar seu certificado.'}</Text>
                            <TouchableOpacity style={styles.button} accessibilityRole="button" onPress={() => error ? loadCertificados() : navigation.navigate('Eventos')}>
                                <Text style={styles.buttonText}>{error ? 'Tentar novamente' : 'Explorar eventos'}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            )}
        </View>
    );
}

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './style';
import { colors } from '../../../styles/theme';
import { EventosService } from '../../services/eventos/eventosService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function EventoDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [inscricaoId, setInscricaoId] = useState(null);
    const [inscricaoStatus, setInscricaoStatus] = useState(null);
    const [selectedSubEventos, setSelectedSubEventos] = useState([]);
    const [loadingSubEvents, setLoadingSubEvents] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [hasCertificado, setHasCertificado] = useState(null);

    const [initialSubEventos, setInitialSubEventos] = useState([]);
    const [checkedInEvento, setCheckedInEvento] = useState(false);
    const [subEventsCheckedIn, setSubEventsCheckedIn] = useState([]);
    const [checkInLoading, setCheckInLoading] = useState(false);

    const subEventos = useMemo(() => {
        if (!evento) return [];
        return evento.subeventos || evento.subEventos || evento.SubEventos || [];
    }, [evento]);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);

            // 1. Busca primeiro minhas inscrições para ver se já tenho vínculo com este evento
            const minhasInscricoes = await EventosService.listMinhasInscricoes();
            let savedInsc = null;

            if (minhasInscricoes.success && minhasInscricoes.data) {
                savedInsc = Array.isArray(minhasInscricoes.data) ? minhasInscricoes.data.find(insc =>
                    String(insc.eventoId) === String(id) || (insc.evento && String(insc.evento.id) === String(id))
                ) : null;
            }

            if (savedInsc) {
                // 2. Se já tem inscrição, usa o endpoint de detalhes que traz o estado mais atualizado
                const detailResponse = await EventosService.getInscricaoDetail(savedInsc.id);

                if (detailResponse.success && detailResponse.data) {
                    const data = detailResponse.data;

                    setIsRegistered(true);
                    setInscricaoId(data.id);
                    setInscricaoStatus(data.status);

                    // O detalhe da inscrição já traz o objeto evento com seus subeventos
                    if (data.evento) {
                        setEvento(data.evento);
                    }

                    // Mapeia presenças baseado no JSON fornecido
                    setCheckedInEvento(!!data.checkIn || !!data.presencaEvento || !!data.presenca);
                    setHasCertificado(data.certificado);

                    // Mapeia os subeventos já escolhidos e seus check-ins
                    const escolhidos = data.subeventosEscolhidos || [];
                    const ids = escolhidos.map(s => String(s.subeventoId || s.id)).filter(Boolean);

                    // Extrai IDs dos subeventos que possuem check-in
                    const checkedInSubs = escolhidos
                        .filter(s => !!s.checkIn)
                        .map(s => String(s.subeventoId || s.id));

                    setSubEventsCheckedIn(checkedInSubs);
                    setSelectedSubEventos(ids);
                    setInitialSubEventos(ids);
                    setHasChanges(false);
                }
            } else {
                // 3. Se não tem inscrição, puxa apenas os dados básicos do evento
                const eventoResponse = await EventosService.getEventoById(id);
                if (eventoResponse.success) {
                    setEvento(eventoResponse.data);
                    setIsRegistered(false);
                    setInscricaoId(null);
                    setInscricaoStatus(null);
                    setSelectedSubEventos([]);
                    setInitialSubEventos([]);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar detalhes:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleRegister = async () => {
        try {
            setRegistering(true);
            const response = await EventosService.registerForEvento(id);
            if (response.success) {
                Alert.alert('Sucesso', 'Solicitação de inscrição realizada!');
                setIsRegistered(true);
                setInscricaoId(response.data.id);
                setInscricaoStatus(response.data.status);
                loadData();
            }
        } catch (error) {
            Alert.alert('Erro', error.response?.data?.error || 'Não foi possível realizar a inscrição.');
        } finally {
            setRegistering(false);
        }
    };

    const handleSubEventToggle = (subId) => {
        const normalizedSubId = String(subId);

        if (!isRegistered || inscricaoStatus !== 'CONFIRMADA') {
            Alert.alert('Acesso Restrito', 'Sua inscrição precisa estar confirmada para selecionar atividades.');
            return;
        }

        if (initialSubEventos.includes(normalizedSubId)) {
            // Não permite desmarcar se já estiver inscrito no backend
            return;
        }

        const limit = evento?.limiteSubeventosPorAluno || 0;
        const subEventBeingToggled = subEventos.find(s => String(s.id) === normalizedSubId);

        setSelectedSubEventos(prev => {
            let next;
            if (prev.includes(normalizedSubId)) {
                next = prev.filter(id => id !== normalizedSubId);
            } else {
                // Verificar se há vagas antes de permitir a seleção
                const inscritos = subEventBeingToggled.inscricoes ?? subEventBeingToggled.inscricoesSubevento ?? subEventBeingToggled._count?.inscricoesSubevento ?? subEventBeingToggled._count?.inscricoes ?? 0;
                const totalVagas = subEventBeingToggled.totalVagas ?? subEventBeingToggled.vagas ?? 0;

                // Se o total de vagas for 0 ou se já estiver cheio, bloqueia
                if (totalVagas === 0 || inscritos >= totalVagas) {
                    Alert.alert('Esgotado', 'Esta atividade não possui vagas disponíveis.');
                    return prev;
                }

                const dayBeingToggled = format(new Date(subEventBeingToggled.dataInicio), 'dd/MM/yyyy');
                const conflict = subEventos.find(s =>
                    prev.includes(String(s.id)) &&
                    format(new Date(s.dataInicio), 'dd/MM/yyyy') === dayBeingToggled
                );

                if (conflict) {
                    Alert.alert('Limite por Dia', `Você não pode selecionar duas atividades no mesmo dia.`);
                    return prev;
                }

                if (limit > 0 && prev.length >= limit) {
                    Alert.alert('Limite', `Máximo de ${limit} atividades.`);
                    return prev;
                }
                next = [...prev, normalizedSubId];
            }
            setHasChanges(true);
            return next;
        });
    };

    const saveSubEvents = async () => {
        if (!inscricaoId) return;
        try {
            setLoadingSubEvents(true);
            const response = await EventosService.registerForSubEventos(inscricaoId, selectedSubEventos);
            if (response.success) {
                Alert.alert('Sucesso', 'Você se inscreveu nas oficinas!');
                setInitialSubEventos(selectedSubEventos.map(id => String(id)));
                setHasChanges(false);
                loadData();
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar seleções.');
        } finally {
            setLoadingSubEvents(false);
        }
    };

    const isCheckInAvailable = (dataInicio) => {
        if (!dataInicio) return false;
        const now = new Date();
        const start = new Date(dataInicio);
        const diffMinutes = (now - start) / (1000 * 60);
        return diffMinutes >= -30 && diffMinutes <= 90;
    };

    const isCertificateAvailable = () => {
        if (!evento) return false;

        const now = new Date();
        // Usa dataFim se disponível, senão dataInicio, mas dataFim é o obrigatório para término
        const endTime = evento.dataFim || evento.dataInicio;
        if (!endTime) return false;

        const end = new Date(endTime);
        const hasFinished = now > end;

        // O certificado SÓ pode ser disponibilizado após o término do evento (dataFim)
        if (!hasFinished) return false;

        // Se já existe o objeto certificado e o evento terminou, está disponível
        if (hasCertificado) return true;

        // O evento deve estar configurado para emitir certificados (ativo: true)
        const canEmit = evento.certificadoAtivo !== false && evento.ativo !== false;

        // Presença:
        // Se o evento não tem subeventos: O aluno deve ter feito check-in no evento principal.
        // Se o evento tem subeventos: O aluno deve ter feito check-in em pelo menos um subevento.
        const hasSubEvents = subEventos && subEventos.length > 0;
        const hasPresence = hasSubEvents
            ? subEventsCheckedIn.length > 0
            : (checkedInEvento || !!evento.checkIn);

        return canEmit && hasPresence;
    };

    const handleCheckInEvento = async () => {
        if (!inscricaoId) return;
        try {
            setCheckInLoading(true);
            const response = await EventosService.checkInEvento(inscricaoId);
            if (response.success) {
                Alert.alert('Sucesso', 'Check-in realizado com sucesso!');
                loadData();
            }
        } catch (error) {
            const message = error.response?.data?.error?.message || error.response?.data?.message || 'Não foi possível realizar o check-in.';
            Alert.alert('Erro', message);
        } finally {
            setCheckInLoading(false);
        }
    };

    const handleCheckInSubEvento = async (subId) => {
        if (!inscricaoId) return;
        try {
            const response = await EventosService.checkInSubEvento(inscricaoId, subId);
            if (response.success) {
                Alert.alert('Sucesso', 'Check-in na atividade realizado!');
                loadData();
            }
        } catch (error) {
            const message = error.response?.data?.error?.message || error.response?.data?.message || 'Não foi possível realizar o check-in.';
            Alert.alert('Erro', message);
        }
    };

    const handleCertificate = async () => {
        if (!inscricaoId) return;

        // Se já temos os metadados do certificado, podemos abrir direto se tivermos o código
        if (hasCertificado && hasCertificado.codigoValidacao) {
            const url = `https://eventos.fazag.edu.br/certificados/${hasCertificado.codigoValidacao}`;
            navigation.navigate('CertificateViewer', { url });
            return;
        }

        try {
            const response = await EventosService.emitirCertificado(inscricaoId);
            if (response.success && (response.data.urlPublica || response.data.codigoValidacao)) {
                const url = response.data.urlPublica || `https://eventos.fazag.edu.br/certificados/${response.data.codigoValidacao}`;
                navigation.navigate('CertificateViewer', { url });
                loadData(); // Recarrega para atualizar o estado do certificado se necessário
            } else {
                Alert.alert('Certificado', 'O certificado ainda não está disponível ou não pôde ser gerado.');
            }
        } catch (error) {
            console.error('Erro ao emitir certificado:', error);
            Alert.alert('Erro', error.response?.data?.message || 'Não foi possível emitir o certificado.');
        }
    };

    const groupedSubEvents = useMemo(() => {
        // Ordena todos os subeventos cronologicamente primeiro
        const sorted = [...subEventos].sort((a, b) =>
            new Date(a.dataInicio) - new Date(b.dataInicio)
        );

        const groups = sorted.reduce((acc, sub) => {
            const dateKey = format(new Date(sub.dataInicio), "dd 'de' MMMM", { locale: ptBR });
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(sub);
            return acc;
        }, {});

        // Retorna um array de objetos para garantir que a ordem de inserção (datas) seja respeitada no .map
        return Object.entries(groups).map(([date, items]) => ({
            date,
            items
        }));
    }, [subEventos]);

    if (loading) return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={colors.primary[500]} /></View>;
    if (!evento) return null;

    const isPaid = String(evento.tipo).toUpperCase() === 'PAGO';

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
                <Image source={{ uri: evento.bannerUrl || 'https://images.unsplash.com/photo-1540575861501-7ce058a877c3?auto=format&fit=crop&w=800&q=80' }} style={styles.fullBanner} />
                <TouchableOpacity style={styles.backButtonFloating} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={20} color={colors.white} /></TouchableOpacity>

                <View style={styles.detailContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Text style={styles.detailTitle}>{evento.nome}</Text>
                        </View>
                        <View style={[
                            styles.statusBadge,
                            {
                                backgroundColor: isPaid ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 10
                            }
                        ]}>
                            <Text style={[
                                styles.statusText,
                                { color: isPaid ? colors.primary[700] : '#059669', fontWeight: 'bold', fontSize: 13 }
                            ]}>
                                {isPaid ? `R$ ${parseFloat(evento.preco || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Gratuito'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoBadge}><Feather name="calendar" size={18} color={colors.primary[600]} /><Text style={styles.infoBadgeText}>{format(new Date(evento.dataInicio), "dd 'de' MMMM", { locale: ptBR })}</Text></View>
                    <View style={styles.infoBadge}><Feather name="clock" size={18} color={colors.primary[600]} /><Text style={styles.infoBadgeText}>{format(new Date(evento.dataInicio), 'HH:mm', { locale: ptBR })}h</Text></View>
                    <View style={styles.infoBadge}><Feather name="map-pin" size={18} color={colors.primary[600]} /><Text style={styles.infoBadgeText}>{evento.local}</Text></View>

                    <Text style={styles.descriptionTitle}>Sobre o Evento</Text>
                    <Text style={styles.descriptionText}>{evento.descricao || "Nenhuma descrição disponível."}</Text>

                    {/* VIEW PARA INSCRIÇÃO PENDENTE (PAGAMENTO) */}
                    {isRegistered && (inscricaoStatus === 'PENDENTE' || (isPaid && inscricaoStatus !== 'CONFIRMADA')) && (
                        <View style={{ marginTop: 25, backgroundColor: colors.primary[50], padding: 20, borderRadius: 15, borderLeftWidth: 4, borderLeftColor: colors.primary[600], marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                                <Ionicons name="time-outline" size={28} color={colors.primary[600]} />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary[700], marginLeft: 10 }}>Inscrição em Análise</Text>
                            </View>
                            <Text style={{ fontSize: 15, color: colors.gray[700], lineHeight: 22, marginBottom: 20 }}>
                                Sua solicitação de inscrição para <Text style={{ fontWeight: 'bold' }}>{evento.nome}</Text> foi recebida com sucesso.
                            </Text>

                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.gray[800], marginBottom: 10 }}>Próximos Passos:</Text>

                            <View style={{ gap: 12 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={{ color: colors.primary[600], fontWeight: 'bold', marginRight: 8 }}>•</Text>
                                    <Text style={{ flex: 1, color: colors.gray[600], fontSize: 14 }}>Realize o pagamento conforme as instruções da instituição.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={{ color: colors.primary[600], fontWeight: 'bold', marginRight: 8 }}>•</Text>
                                    <Text style={{ flex: 1, color: colors.gray[600], fontSize: 14 }}>O administrador irá validar seu pagamento no painel.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={{ color: colors.primary[600], fontWeight: 'bold', marginRight: 8 }}>•</Text>
                                    <Text style={{ flex: 1, color: colors.gray[600], fontSize: 14 }}>Após a aprovação, você poderá retornar aqui para escolher suas atividades.</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* LISTA DE SUBEVENTOS - SEMPRE VISÍVEL SE EXISTIREM */}
                    {Object.keys(groupedSubEvents).length > 0 && (
                        <>
                            <Text style={styles.subEventTitle}>Atividades e Oficinas</Text>
                            {evento.limiteSubeventosPorAluno > 0 && (
                                <Text style={{ fontSize: 13, color: colors.gray[500], marginBottom: 15 }}>
                                    {inscricaoStatus === 'CONFIRMADA'
                                        ? `Selecione até ${evento.limiteSubeventosPorAluno} atividades (${selectedSubEventos.length} selecionadas)`
                                        : `Este evento permite até ${evento.limiteSubeventosPorAluno} atividades por aluno.`
                                    }
                                </Text>
                            )}

                            {groupedSubEvents.map(({ date, items }) => (
                                <View key={date} style={{ marginBottom: 20 }}>
                                    <View style={{ backgroundColor: colors.gray[100], paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, marginBottom: 10 }}>
                                        <Text style={{ fontWeight: 'bold', color: colors.gray[700], fontSize: 14 }}>{date}</Text>
                                    </View>
                                    {items.map((sub) => {
                                        const subIdString = String(sub.id);
                                        const inscritos = sub.inscricoes ?? sub.inscricoesSubevento ?? sub._count?.inscricoesSubevento ?? sub._count?.inscricoes ?? 0;
                                        const isSelected = selectedSubEventos.includes(subIdString);
                                        const isAlreadyRegistered = initialSubEventos.includes(subIdString);
                                        const totalVagas = sub.totalVagas ?? sub.vagas ?? 0;
                                        const isFull = totalVagas === 0 || (totalVagas > 0 && inscritos >= totalVagas);
                                        const canSelect = inscricaoStatus === 'CONFIRMADA';
                                        const isBlocked = !canSelect || isAlreadyRegistered || (isFull && !isSelected);

                                        return (
                                            <TouchableOpacity
                                                key={sub.id}
                                                style={[
                                                    styles.subEventCard,
                                                    isSelected && { borderColor: colors.primary[500], borderWidth: 1, backgroundColor: colors.primary[50] },
                                                    isBlocked && { opacity: 0.85, backgroundColor: colors.gray[50] }
                                                ]}
                                                onPress={() => handleSubEventToggle(sub.id)}
                                                activeOpacity={canSelect && !isAlreadyRegistered && !isFull ? 0.7 : 1}
                                            >
                                                <View style={styles.subEventInfo}>
                                                    <Text style={[
                                                        styles.subEventTitleText,
                                                        (!canSelect || isAlreadyRegistered) && { color: colors.gray[500] }
                                                    ]}>
                                                        {sub.nome || sub.titulo}
                                                    </Text>

                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                                        <Feather name="clock" size={12} color={colors.gray[400]} />
                                                        <Text style={{ fontSize: 12, color: colors.gray[500], marginLeft: 4 }}>
                                                            {format(new Date(sub.dataInicio), "HH:mm", { locale: ptBR })}h - {sub.local}
                                                        </Text>
                                                    </View>

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        marginTop: 12
                                                    }}>
                                                        <View style={[
                                                            styles.vagasBadge,
                                                            isFull && { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
                                                            { marginTop: 0 }
                                                        ]}>
                                                            <Text style={[
                                                                styles.vagasText,
                                                                isFull && { color: '#dc2626' }
                                                            ]}>
                                                                {isFull ? 'Sem vagas' : `${totalVagas - inscritos} vagas`}
                                                            </Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            {subEventsCheckedIn.includes(subIdString) && (
                                                                <View style={{ backgroundColor: '#ccfbf1', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 8 }}>
                                                                    <Text style={{ fontSize: 9, color: '#0f766e', fontWeight: 'bold' }}>PRESENÇA</Text>
                                                                </View>
                                                            )}
                                                            {isAlreadyRegistered && (
                                                                <View style={{ backgroundColor: '#dcfce7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 8 }}>
                                                                    <Text style={{ fontSize: 9, color: '#166534', fontWeight: 'bold' }}>INSCRITO</Text>
                                                                </View>
                                                            )}
                                                            {isFull && !isAlreadyRegistered && (
                                                                <View style={{ backgroundColor: colors.gray[200], paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 8 }}>
                                                                    <Text style={{ fontSize: 9, color: colors.gray[600], fontWeight: 'bold' }}>ESGOTADO</Text>
                                                                </View>
                                                            )}
                                                            {isBlocked && (
                                                                <Feather name="lock" size={12} color={colors.gray[400]} style={{ marginLeft: 5 }} />
                                                            )}
                                                        </View>
                                                    </View>
                                                </View>

                                                <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                                                    {isAlreadyRegistered ? (
                                                        subEventsCheckedIn.includes(subIdString) ? (
                                                            <Ionicons name="checkmark-done-circle" size={26} color="#10b981" />
                                                        ) : isCheckInAvailable(sub.dataInicio) ? (
                                                            <TouchableOpacity
                                                                style={{
                                                                    backgroundColor: colors.green[600],
                                                                    paddingHorizontal: 12,
                                                                    paddingVertical: 8,
                                                                    borderRadius: 8,
                                                                }}
                                                                onPress={() => handleCheckInSubEvento(sub.id)}
                                                            >
                                                                <Text style={{ color: colors.white, fontSize: 11, fontWeight: 'bold' }}>Check-in</Text>
                                                            </TouchableOpacity>
                                                        ) : (
                                                            <View style={{ backgroundColor: colors.gray[100], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                                                                <Text style={{ color: colors.gray[400], fontSize: 9, fontWeight: 'bold' }}>Em Breve</Text>
                                                            </View>
                                                        )
                                                    ) : (isFull && !isSelected) ? (
                                                        <Feather name="lock" size={20} color={colors.gray[300]} />
                                                    ) : canSelect ? (
                                                        <Ionicons name={isSelected ? "checkbox" : "square-outline"} size={26} color={isSelected ? colors.primary[600] : colors.gray[300]} />
                                                    ) : (
                                                        <Feather name="lock" size={20} color={colors.gray[300]} />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>

            <View style={[styles.floatingFooter, { zIndex: 10, paddingBottom: 25 }]}>
                {isRegistered ? (
                    <View style={{ width: '100%', gap: 10 }}>
                        <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
                            <View style={[
                                styles.alreadyRegisteredBadge,
                                { flex: 1, height: 50 },
                                inscricaoStatus === 'PENDENTE' && { backgroundColor: '#fef9c3', borderColor: '#facc15' }
                            ]}>
                                <Feather
                                    name={inscricaoStatus === 'CONFIRMADA' ? "check-circle" : "clock"}
                                    size={18}
                                    color={inscricaoStatus === 'CONFIRMADA' ? "#166534" : "#854d0e"}
                                />
                                <Text style={[styles.alreadyRegisteredText, { fontSize: 13 }, inscricaoStatus === 'PENDENTE' && { color: '#854d0e' }]}>
                                    {inscricaoStatus === 'CONFIRMADA' ? 'Confirmada' : 'Pagamento Pendente'}
                                </Text>
                            </View>

                            {inscricaoStatus === 'CONFIRMADA' && subEventos.length === 0 && (
                                <View style={{ flex: 1.2 }}>
                                    {!checkedInEvento ? (
                                        isCheckInAvailable(evento.dataInicio) ? (
                                            <TouchableOpacity
                                                style={[styles.registerButton, { backgroundColor: colors.green[600], height: 50, marginTop: 0 }]}
                                                onPress={handleCheckInEvento}
                                                disabled={checkInLoading}
                                            >
                                                <Feather name="map-pin" size={18} color={colors.white} style={{ marginRight: 6 }} />
                                                <Text style={[styles.registerButtonText, { fontSize: 14 }]}>
                                                    {checkInLoading ? '...' : 'Check-in'}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <View style={[styles.alreadyRegisteredBadge, { backgroundColor: colors.gray[50], borderColor: colors.gray[200], height: 50 }]}>
                                                <Text style={{ color: colors.gray[400], fontSize: 11, fontWeight: 'bold' }}>Check-in em Breve</Text>
                                            </View>
                                        )
                                    ) : (
                                        <View style={[styles.alreadyRegisteredBadge, { backgroundColor: '#ccfbf1', borderColor: '#14b8a6', height: 50 }]}>
                                            <Ionicons name="checkmark-done" size={18} color="#0f766e" />
                                            <Text style={{ color: '#0f766e', fontSize: 13, fontWeight: 'bold', marginLeft: 5 }}>Presente</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>

                        {isCertificateAvailable() && (
                            <TouchableOpacity
                                style={[styles.registerButton, { backgroundColor: colors.primary[700], marginTop: 0, height: 50 }]}
                                onPress={handleCertificate}
                            >
                                <Feather name="award" size={20} color={colors.white} style={{ marginRight: 8 }} />
                                <Text style={styles.registerButtonText}>Acessar Certificado</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={registering}>
                        {registering ? <ActivityIndicator color={colors.white} /> : (
                            <>
                                <Feather name="user-plus" size={20} color={colors.white} style={{ marginRight: 10 }} />
                                <Text style={styles.registerButtonText}>Garantir Minha Vaga</Text>
                            </>
                        )}
                    </TouchableOpacity>
                )}
            </View>

            {hasChanges && inscricaoStatus === 'CONFIRMADA' && (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 110,
                        right: 20,
                        backgroundColor: colors.primary[600],
                        paddingHorizontal: 20,
                        paddingVertical: 15,
                        borderRadius: 30,
                        flexDirection: 'row',
                        alignItems: 'center',
                        elevation: 8,
                        shadowColor: colors.primary[900],
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        zIndex: 100,
                    }}
                    onPress={saveSubEvents}
                    disabled={loadingSubEvents}
                >
                    <Feather name="save" size={20} color={colors.white} style={{ marginRight: 8 }} />
                    <Text style={{ color: colors.white, fontWeight: 'bold' }}>
                        {loadingSubEvents ? 'Salvando...' : 'Salvar Alterações'}
                    </Text>
                    {selectedSubEventos.length > 0 && (
                        <View style={{ backgroundColor: colors.white, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                            <Text style={{ color: colors.primary[600], fontSize: 12, fontWeight: 'bold' }}>{selectedSubEventos.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
}

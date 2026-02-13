import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Clipboard
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';
import { colors } from '../../../styles/theme';
import { AuthContext } from '../../contexts/auth';
import { useTitulos } from '../../hooks/useTitulos';
import { usePagamentos } from '../../hooks/usePagamentos';
import { FinancialUtils } from '../../services/qualinfo/qualinfoService';

/**
 * Página Financeira refatorada com o padrão Mock-First
 */
export function Financeiro() {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('pendentes'); // 'pendentes' | 'pagos'

    // Utilizando os hooks customizados que abstraem a fonte de dados (MOCK/REAL)
    const alunoId = user?.aluno_id || user?.id;
    const { titulos, loading: loadingTitulos, refresh: refreshTitulos } = useTitulos(alunoId);
    const { pagamentos, loading: loadingPagos, refresh: refreshPagos } = usePagamentos(alunoId);

    const loading = activeTab === 'pendentes' ? loadingTitulos : loadingPagos;

    const copyToClipboard = (text, label) => {
        Clipboard.setString(text);
        Alert.alert('Copiado', `${label} copiado para a área de transferência.`);
    };

    const renderBoleto = ({ item }) => {
        const status = FinancialUtils.getStatusMapping(item.titulo_situacao);

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.taxa_descricao}</Text>
                    <View style={[styles.badge, { backgroundColor: status.color + '20' }]}>
                        <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
                    </View>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.priceRow}>
                        <Text style={styles.label}>Vencimento:</Text>
                        <Text style={styles.value}>{new Date(item.titulo_vencimento).toLocaleDateString('pt-BR')}</Text>
                    </View>

                    {item.beneficios && item.beneficios.length > 0 && (
                        <View style={styles.benefitsContainer}>
                            {item.beneficios.map((b, index) => (
                                <Text key={index} style={styles.benefitText}>
                                    • {b.beneficio_descricao}:
                                    {b.beneficio_tipo_valor === 'P' ? ` -${parseFloat(b.beneficio_valor)}%` : ` -R$ ${parseFloat(b.beneficio_valor).toFixed(2)}`}
                                </Text>
                            ))}
                        </View>
                    )}

                    <View style={styles.priceRow}>
                        <Text style={styles.label}>Valor líquido estimado:</Text>
                        <Text style={styles.totalValue}>R$ {item.valor_final?.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => copyToClipboard(item.titulo_id.toString(), 'Código de barras')}
                    >
                        <Feather name="copy" size={16} color={colors.white} />
                        <Text style={styles.actionButtonText}>Copiar Código</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.pixButton]}
                        onPress={() => copyToClipboard('PIX_MOCK_PAYMENT_DATA', 'Pix')}
                    >
                        <MaterialCommunityIcons name="pix" size={16} color={colors.white} />
                        <Text style={styles.actionButtonText}>Pagar com PIX</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderPagamento = ({ item }) => (
        <View style={styles.paymentItem}>
            <View style={styles.paymentLeft}>
                <Feather name="check-circle" size={24} color={colors.green[200]} />
                <View style={styles.paymentInfo}>
                    <Text style={styles.paymentTitle}>{item.descricao}</Text>
                    <Text style={styles.paymentSub}>{item.metodo} • {new Date(item.data_pagamento).toLocaleDateString('pt-BR')}</Text>
                </View>
            </View>
            <Text style={styles.paymentValue}>R$ {item.valor_pago.toFixed(2)}</Text>
        </View>
    );

    if (loading && (titulos.length === 0 && pagamentos.length === 0)) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.blue[500]} />
                <Text style={styles.loadingText}>Carregando dados financeiros...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Financeiro</Text>
                <Text style={styles.subtitle}>Consulte seus boletos e pagamentos</Text>
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'pendentes' && styles.activeTab]}
                    onPress={() => setActiveTab('pendentes')}
                >
                    <Text style={[styles.tabText, activeTab === 'pendentes' && styles.activeTabText]}>Pendentes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'pagos' && styles.activeTab]}
                    onPress={() => setActiveTab('pagos')}
                >
                    <Text style={[styles.tabText, activeTab === 'pagos' && styles.activeTabText]}>Histórico</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'pendentes' ? (
                <FlatList
                    data={titulos}
                    keyExtractor={item => item.titulo_id.toString()}
                    renderItem={renderBoleto}
                    onRefresh={refreshTitulos}
                    refreshing={loadingTitulos}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Feather name="smile" size={48} color={colors.gray[300]} />
                            <Text style={styles.emptyText}>Tudo em dia! Nenhum boleto pendente.</Text>
                        </View>
                    }
                />
            ) : (
                <FlatList
                    data={pagamentos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderPagamento}
                    onRefresh={refreshPagos}
                    refreshing={loadingPagos}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Feather name="frown" size={48} color={colors.gray[300]} />
                            <Text style={styles.emptyText}>Nenhum pagamento registrado.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

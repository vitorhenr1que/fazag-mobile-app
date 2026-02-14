import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import { colors } from '../../../styles/theme';
import { AuthContext } from '../../contexts/auth';
import { useTitulos } from '../../hooks/useTitulos';
import { FinancialUtils } from '../../services/qualinfo/qualinfoService';

/**
 * Página Financeira refatorada com o padrão Mock-First
 */
export function Financeiro() {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('pendentes'); // 'pendentes' | 'pagos'

    // Utilizando o hook customizado que abstrai a fonte de dados (MOCK/REAL)
    const alunoId = user?.aluno_id || user?.id;
    const { titulos, loading: loadingTitulos, refresh: refreshTitulos } = useTitulos(alunoId);

    const loading = loadingTitulos;

    const titulosPendentes = titulos.filter(t => ['B', 'V', 'A'].includes(t.titulo_situacao));
    const titulosHistorico = titulos.filter(t => ['P', 'C'].includes(t.titulo_situacao));

    const renderBoleto = ({ item }) => {
        const status = FinancialUtils.getStatusMapping(item.titulo_situacao);
        const isHistórico = ['P', 'C'].includes(item.titulo_situacao);

        return (
            <View style={[styles.card, isHistórico && { opacity: 0.9 }]}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.taxa_descricao}</Text>
                    <View style={[styles.badge, { backgroundColor: status.color + '20' }]}>
                        <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
                    </View>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.priceRow}>
                        <Text style={styles.label}>{isHistórico ? "Data de Referência:" : "Vencimento:"}</Text>
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
                        <Text style={styles.label}>{isHistórico ? "Valor Final:" : "Valor líquido estimado:"}</Text>
                        <Text style={styles.totalValue}>R$ {item.valor_final?.toFixed(2)}</Text>
                    </View>
                </View>

                {item.titulo_situacao === 'P' && (
                    <View style={[styles.cardFooter, { backgroundColor: '#f0fdf4', borderTopWidth: 0 }]}>
                        <Feather name="check-circle" size={16} color={colors.green[200]} />
                        <Text style={{ marginLeft: 8, color: '#166534', fontWeight: '600' }}>Pago em {item.data_atualizacao ? new Date(item.data_atualizacao).toLocaleDateString('pt-BR') : '--/--/----'}</Text>
                    </View>
                )}
            </View>
        );
    };

    if (loading && titulos.length === 0) {
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
                    data={titulosPendentes}
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
                    data={titulosHistorico}
                    keyExtractor={item => item.titulo_id.toString()}
                    renderItem={renderBoleto}
                    onRefresh={refreshTitulos}
                    refreshing={loadingTitulos}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Feather name="frown" size={48} color={colors.gray[300]} />
                            <Text style={styles.emptyText}>Nenhum registro no histórico.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

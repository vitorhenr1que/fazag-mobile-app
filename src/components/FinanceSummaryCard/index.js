import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { QualinfoDataLayer } from '../../services/qualinfo/dataLayer';
import { FinancialUtils } from '../../services/qualinfo/qualinfoService';
import { colors } from '../../../styles/theme';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function FinanceSummaryCard() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        async function loadFinanceData() {
            try {
                if (user?.id) {
                    const titulos = await QualinfoDataLayer.getTitulos(user.id);
                    const stats = FinancialUtils.getSummary(titulos);
                    setSummary(stats);
                }
            } catch (error) {
                console.error("Erro ao carregar resumo financeiro:", error);
            } finally {
                setLoading(false);
            }
        }
        loadFinanceData();
    }, [user]);

    if (loading) {
        // Return a placebo skeleton or spinner with fixed height to prevent layout jump
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator color={colors.primary[500]} />
            </View>
        );
    }

    if (!summary) return null;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(val);
    };

    const statusInfo = summary.proximoStatus
        ? FinancialUtils.getStatusMapping(summary.proximoStatus)
        : { label: 'SEM TÍTULOS', color: colors.gray[300] };

    const getIcon = () => {
        if (summary.proximoStatus === 'V') return 'alert-circle';
        if (summary.proximoStatus === 'P') return 'check-circle';
        if (summary.proximoStatus === 'C') return 'x-circle';
        return 'dollar-sign';
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Financeiro')}
            style={styles.container}
        >
            <View style={styles.cardContent}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.sectionTitle}>Mensalidade</Text>
                        <View style={[styles.statusBadge, { backgroundColor: statusInfo.color + '15' }]}>
                            <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
                            <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.label}</Text>
                        </View>
                    </View>
                    <View style={[styles.iconContainer, { backgroundColor: statusInfo.color + '10' }]}>
                        <Feather name={getIcon()} size={24} color={statusInfo.color} />
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.footer}>
                    <View>
                        <Text style={styles.label}>Valor Previsto</Text>
                        <Text style={[
                            styles.value,
                            { color: summary.totalAberto > 0 ? colors.gray[900] : colors.green[500] }
                        ]}>
                            {summary.totalAberto > 0 ? formatCurrency(summary.totalAberto) : 'Tudo pago!'}
                        </Text>
                    </View>

                    {summary.proximoVencimento && (
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.label}>Vencimento</Text>
                            <Text style={styles.dateValue}>
                                {FinancialUtils.formatDate(summary.proximoVencimento)}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 24,
        marginBottom: 25,
        // Strong shadow to lift it from the blue header
        shadowColor: "#080a0f",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    loadingContainer: {
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        color: colors.gray[500],
        fontWeight: '600',
        marginBottom: 8,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: colors.gray[100],
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    label: {
        fontSize: 12,
        color: colors.gray[400],
        marginBottom: 4,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    value: {
        fontSize: 26,
        fontWeight: 'bold',
        letterSpacing: -0.5,
    },
    dateValue: {
        fontSize: 18,
        color: colors.gray[700],
        fontWeight: '600',
    }
});

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { colors } from '../../../styles/theme';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function StudentSummaryCard() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    if (!user) return null;

    // Normalizing data just in case
    const curso = user.curso || "Curso não identificado";
    const matricula = user.id || "N/A";

    // Safely acessing situation from the first course in the array if available
    const situacao = user.cursos && user.cursos.length > 0
        ? user.cursos[0].situacao_descricao
        : "Não identificado";

    const isActive = situacao.toLowerCase().includes('matriculado') || 
                     situacao.toLowerCase().includes('ativo') || 
                     situacao.toLowerCase().includes('cursando');

    const statusColor = isActive ? colors.green[500] : colors.red[500];
    const statusIcon = isActive ? 'check-circle' : 'alert-circle';

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Perfil')}
            style={styles.container}
        >
            <View style={styles.cardContent}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.sectionTitle}>Curso Atual</Text>
                        <Text style={styles.courseName} numberOfLines={2}>
                            {curso}
                        </Text>
                    </View>
                    <View style={[styles.iconContainer, { backgroundColor: colors.primary[50] }]}>
                        <Feather name="book" size={24} color={colors.primary[600]} />
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.footer}>
                    <View>
                        <Text style={styles.label}>Matrícula</Text>
                        <Text style={styles.value}>{matricula}</Text>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.label}>Situação</Text>
                        <View style={styles.statusBadge}>
                            <Feather name={statusIcon} size={14} color={statusColor} style={{ marginRight: 4 }} />
                            <Text style={[styles.statusValue, { color: statusColor }]}>
                                {situacao}
                            </Text>
                        </View>
                    </View>
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
        shadowColor: "#080a0f",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    cardContent: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        color: colors.gray[400],
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    courseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.gray[800],
        lineHeight: 24,
        paddingRight: 10,
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
        marginBottom: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 11,
        color: colors.gray[400],
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.gray[800],
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray[50],
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusValue: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});

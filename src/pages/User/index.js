import { useContext } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/auth';
import { styles } from './style';
import { colors } from '../../../styles/theme';
import { nomeAluno } from '../../components/nomeAluno';

export function User() {
    const { user, signOut, userHistoric, loading } = useContext(AuthContext);

    const semestreAtual = userHistoric && userHistoric.length > 0 ? userHistoric[userHistoric.length - 1] : null;

    // Helper to format course name
    const getFormattedCourse = () => {
        const rawCourse = semestreAtual?.s_descricao || user?.curso || "Curso não identificado";
        return rawCourse.split('<')[0].trim();
    };

    const periodoAtual = semestreAtual?.aperiodo ? semestreAtual.aperiodo.split(' ').join('') : (user?.semestre || "1");
    const courseName = getFormattedCourse();
    const semester = user?.semestre || periodoAtual;
    const hoursCompleted = semestreAtual?.carga_horaria_cursada ? semestreAtual.carga_horaria_cursada.split('.')[0] : "0";
    const hoursTotal = semestreAtual?.carga_horaria_curso || "0";

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Profile Section */}
                <LinearGradient
                    colors={[colors.primary[800], colors.primary[600]]}
                    style={styles.headerGradient}
                >
                    <View style={styles.profileImageContainer}>
                        <Text style={styles.profileInitial}>{nomeAluno(user).charAt(0)}</Text>
                    </View>
                    <Text style={styles.userName}>{user?.name || "Estudante"}</Text>
                    <Text style={styles.userCourse}>{courseName}</Text>
                </LinearGradient>

                <View style={styles.contentContainer}>
                    {/* Academic Stats Card */}
                    <View style={styles.statsCard}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{semester}º</Text>
                            <Text style={styles.statLabel}>Semestre</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{hoursCompleted}h</Text>
                            <Text style={styles.statLabel}>Cursadas</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{hoursTotal}h</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>
                    </View>

                    {/* Personal Info Section */}
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>Dados Pessoais</Text>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Nome Completo</Text>
                            <Text style={styles.infoValue} numberOfLines={1}>{user?.name}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Matrícula (CGA)</Text>
                            <Text style={styles.infoValue}>{user?.id}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>E-mail</Text>
                            <Text style={styles.infoValue} numberOfLines={1}>{user?.email}</Text>
                        </View>
                        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                            <Text style={styles.infoLabel}>Situação</Text>
                            <Text style={[styles.infoValue, { color: colors.green[600] }]}>Ativo</Text>
                        </View>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={signOut}
                        activeOpacity={0.7}
                    >
                        <Feather name="log-out" size={20} color={colors.red[600]} />
                        <Text style={styles.logoutText}>Sair do Aplicativo</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
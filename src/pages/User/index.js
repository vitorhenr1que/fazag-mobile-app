import { useContext, useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/auth';
import { styles } from './style';
import { colors } from '../../../styles/theme';
import { nomeAluno } from '../../components/nomeAluno';
import eventosApi from '../../services/eventos/eventosApi';

export function User() {
    const { user, signOut, userHistoric, loading } = useContext(AuthContext);
    const [totalHours, setTotalHours] = useState(0);
    const [totalCertificates, setTotalCertificates] = useState(0);

    const semestreAtual = userHistoric && userHistoric.length > 0 ? userHistoric[userHistoric.length - 1] : null;

    useEffect(() => {
        async function loadInscricoes() {
            if (!user?.id) return;

            try {
                const response = await eventosApi.get('/minhas-inscricoes/', {
                    headers: {
                        'x-aluno-id': user.id
                    }
                });
                if (response.data.success) {
                    const data = response.data.data;
                    let hours = 0;
                    let certificatesCount = 0;

                    data.forEach(item => {
                        if (item.certificado) {
                            hours += Number(item.certificado.cargaHorariaTotal) || 0;
                            certificatesCount++;
                        }
                    });

                    setTotalHours(Math.round(hours));
                    setTotalCertificates(certificatesCount);
                }
            } catch (error) {
                console.error("Erro ao buscar inscrições:", error);
            }
        }

        loadInscricoes();
    }, [user?.id]);

    // Helper to format course name
    const getFormattedCourse = () => {
        const rawCourse = semestreAtual?.s_descricao || user?.curso || "Curso não identificado";
        return rawCourse.split('<')[0].trim();
    };

    const periodoAtual = semestreAtual?.aperiodo ? semestreAtual.aperiodo.split(' ').join('') : (user?.semestre || "1");
    const courseName = getFormattedCourse();
    const semester = user?.semestre || periodoAtual;
    const hoursCompleted = totalHours;
    const hoursTotal = totalCertificates;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
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
                            <Text style={styles.statLabel}>Horas</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{hoursTotal}</Text>
                            <Text style={styles.statLabel}>Certificados</Text>
                        </View>
                    </View>


                    {/* Personal Data Section */}
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>Dados Pessoais</Text>
                        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                            <Text style={styles.infoLabel}>Nome Completo</Text>
                            <Text style={styles.infoValue} numberOfLines={2}>{user?.name}</Text>
                        </View>
                    </View>

                    {/* Academic Info Section */}
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>Dados Acadêmicos</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Curso</Text>
                            <Text style={styles.infoValue} numberOfLines={2}>{courseName}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Matrícula (CGA)</Text>
                            <Text style={styles.infoValue}>{user?.id}</Text>
                        </View>
                        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                            <Text style={styles.infoLabel}>Situação</Text>
                            <Text style={[styles.infoValue, { color: colors.green[600] }]}>{user?.status || "Matriculado"}</Text>
                        </View>
                    </View>


                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>Dados de Contato</Text>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>E-mail</Text>
                            <Text style={styles.infoValue} numberOfLines={1}>{user?.email || "Não informado"}</Text>
                        </View>
                        
                        {!!user?.cpf && (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>CPF</Text>
                                <Text style={styles.infoValue}>{user?.cpf}</Text>
                            </View>
                        )}

                        {!!user?.telefone && (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Telefone</Text>
                                <Text style={styles.infoValue}>{user?.telefone}</Text>
                            </View>
                        )}
                        
                        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                            <Text style={styles.infoLabel}>Instituição</Text>
                            <Text style={styles.infoValue}>FAZAG</Text>
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
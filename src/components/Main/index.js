import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { nomeAluno } from "../nomeAluno";
import { ListBoxMainHorizontal } from "../BoxMainHorizontal/ListBoxMainHorizontal";
import { ListBoxMainVertical } from "../BoxMainVertical/ListBoxMainVertical";
import { StudentSummaryCard } from "../StudentSummaryCard";
import { styles } from "./style";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { colors } from "../../../styles/theme";

export function Main() {
    const { loading, user } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.gray[50] }}>
                <ActivityIndicator size="large" color={colors.primary[500]} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                bounces={false}
            >
                {/* Modern Header with Gradient */}
                <LinearGradient
                    colors={[colors.primary[800], colors.primary[600]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headerGradient}
                >
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={styles.greetingText}>Olá, estudante</Text>
                            <Text style={styles.studentName}>{nomeAluno(user)}</Text>
                        </View>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>
                                {nomeAluno(user).charAt(0)}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Floating Content Area */}
                <View style={styles.contentContainer}>
                    {/* Student Info Card overlaps the header */}
                    <StudentSummaryCard />

                    {/* Quick Access Section */}
                    <Text style={styles.sectionTitle}>Acesso Rápido</Text>
                    <ListBoxMainHorizontal />

                    {/* Services Section */}
                    <Text style={styles.sectionTitle}>Secretaria Online</Text>
                    <View style={styles.servicesSection}>
                        <ListBoxMainVertical />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
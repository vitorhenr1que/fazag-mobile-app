import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../styles/theme";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[50], // Light background
    },
    headerGradient: {
        width: '100%',
        height: 280,
        paddingTop: 60,
        paddingHorizontal: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Aligns avatar and text vertically
    },
    greetingText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
        marginBottom: 5,
    },
    studentName: {
        fontSize: 26,
        color: colors.white,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    avatarContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    avatarText: {
        fontSize: 22,
        color: colors.white,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        marginTop: -100, // Pulls content up over the header
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.gray[800],
        marginBottom: 15,
        marginTop: 25,
        paddingHorizontal: 5,
    },
    quickAccessGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    servicesSection: {
        marginTop: 10,
        paddingBottom: 40,
    },
    scrollContent: {
        paddingBottom: 100,
    }
});
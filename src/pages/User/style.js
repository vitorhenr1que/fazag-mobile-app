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
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.3)',
        marginBottom: 15,
    },
    profileInitial: {
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.white,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
        marginBottom: 5,
    },
    userCourse: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontWeight: '500',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: -30, // Pull content up
    },
    statsCard: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary[600],
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: colors.gray[500],
        fontWeight: '600',
        textAlign: 'center',
    },
    statDivider: {
        width: 1,
        height: '80%',
        backgroundColor: colors.gray[100],
        alignSelf: 'center',
    },
    infoSection: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.gray[800],
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[100],
    },
    infoLabel: {
        fontSize: 14,
        color: colors.gray[500],
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 14,
        color: colors.gray[800],
        fontWeight: '600',
        flex: 1,
        textAlign: 'right',
        marginLeft: 15,
    },
    logoutButton: {
        backgroundColor: colors.red[50],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 16,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: colors.red[100],
    },
    logoutText: {
        color: colors.red[600],
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    }
});

import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[50],
    },
    headerGradient: {
        paddingTop: 60,
        paddingBottom: 40, // Increased to accommodate calendar overlap better
        paddingHorizontal: 20,
        borderBottomLeftRadius: 0, // Removed radius as per user request for full width feeling
        borderBottomRightRadius: 0,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: colors.gray[200],
    },
    calendarWrapper: {
        marginHorizontal: 20, // Align with other content
        marginTop: -30,
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    listContent: {
        paddingBottom: 40,
        // paddingHorizontal removed to let header be full width
    },
    sectionHeader: {
        backgroundColor: colors.gray[50],
        paddingVertical: 10,
        marginBottom: 10,
        paddingHorizontal: 20, // Added padding back here
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary[800],
    },
    eventCard: {
        marginHorizontal: 20, // Added margin back here
        backgroundColor: colors.white,
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
        alignItems: 'center',
    },
    dateContainer: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRightWidth: 1,
        borderRightColor: colors.gray[100],
    },
    dateDay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.gray[800],
    },
    dateLabel: {
        fontSize: 10,
        color: colors.gray[500],
        textTransform: 'uppercase',
    },
    eventContent: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 6,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.white,
        textTransform: 'uppercase',
    },
    eventTitle: {
        fontSize: 14,
        color: colors.gray[800],
        fontWeight: '500',
        lineHeight: 20,
    },
});
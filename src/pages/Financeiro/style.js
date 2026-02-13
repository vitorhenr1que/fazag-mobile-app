import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        padding: 24,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.gray[800],
    },
    subtitle: {
        fontSize: 14,
        color: colors.gray[500],
        marginTop: 4,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: colors.blue[500],
    },
    tabText: {
        fontSize: 14,
        color: colors.gray[500],
        fontWeight: '600',
    },
    activeTabText: {
        color: colors.blue[500],
    },
    listContent: {
        padding: 16,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.gray[800],
        flex: 1,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeAberto: {
        backgroundColor: '#E3F2FD',
    },
    badgeVencido: {
        backgroundColor: '#FFEBEE',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.blue[500],
    },
    cardBody: {
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 16,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 13,
        color: colors.gray[500],
    },
    value: {
        fontSize: 13,
        color: colors.gray[800],
        fontWeight: '500',
    },
    benefitsContainer: {
        backgroundColor: '#F1F8E9',
        padding: 8,
        borderRadius: 8,
        marginVertical: 8,
    },
    benefitText: {
        fontSize: 12,
        color: '#388E3C',
        fontStyle: 'italic',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.gray[800],
    },
    cardFooter: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 8,
    },
    actionButton: {
        flex: 1,
        backgroundColor: colors.gray[800],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    pixButton: {
        backgroundColor: colors.blue[500],
    },
    actionButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    paymentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    paymentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.gray[800],
    },
    paymentSub: {
        fontSize: 12,
        color: colors.gray[500],
        marginTop: 2,
    },
    paymentValue: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.green[200],
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        color: colors.gray[500],
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyText: {
        marginTop: 16,
        color: colors.gray[500],
        fontSize: 14,
    },
});

import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import { colors } from '../../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[50],
    },
    headerGradient: {
        paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomEndRadius:30,
        borderBottomStartRadius:30,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: colors.white,
        opacity: 0.9,
    },
    listContent: {
        paddingBottom: 100,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 12,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary[800],
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    publicationCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 12,
        marginHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray[800],
        marginBottom: 4,
    },
    description: {
        fontSize: 13,
        color: colors.gray[500],
        lineHeight: 18,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    sizeText: {
        fontSize: 11,
        color: colors.gray[400],
        marginLeft: 4,
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: colors.gray[400],
        textAlign: 'center',
    },
    // Viewer Styles
    viewerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 10 : 10,
        paddingBottom: 10,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[100],
    },
    viewerTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.gray[900],
        textAlign: 'center',
        marginHorizontal: 12,
    },
    viewerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewerActionButton: {
        padding: 8,
        marginLeft: 4,
    },
    viewerContent: {
        flex: 1,
        backgroundColor: colors.gray[100],
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    unsupported: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    unsupportedText: {
        marginTop: 16,
        fontSize: 16,
        color: colors.gray[500],
        textAlign: 'center',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    }
});

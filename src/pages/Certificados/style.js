import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/theme';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.gray[50] },
    header: { padding: 24, paddingBottom: 30, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    back: { alignSelf: 'flex-start', padding: 10, marginLeft: -10, marginBottom: 8 },
    title: { fontSize: 28, fontWeight: '700', color: colors.white },
    subtitle: { fontSize: 14, color: colors.primary[100], marginTop: 8, lineHeight: 21 },
    list: { padding: 20, paddingBottom: 40, flexGrow: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
    summary: { padding: 18, backgroundColor: colors.primary[50], borderRadius: 16, marginBottom: 20, gap: 6 },
    summaryTitle: { fontSize: 17, fontWeight: '700', color: colors.primary[800] },
    card: { backgroundColor: colors.white, borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: colors.gray[200] },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 14 },
    icon: { width: 50, height: 50, borderRadius: 16, backgroundColor: colors.primary[50], alignItems: 'center', justifyContent: 'center' },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 17, fontWeight: '700', color: colors.gray[900], lineHeight: 24 },
    badge: { fontSize: 12, fontWeight: '600', marginTop: 6 },
    metadata: { marginVertical: 16, gap: 6 },
    metaText: { color: colors.gray[600], fontSize: 13 },
    button: { backgroundColor: colors.primary[600], paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
    buttonText: { color: colors.white, fontSize: 14, fontWeight: '600' },
    disabled: { opacity: 0.6 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40, gap: 18 },
    emptyTitle: { fontSize: 20, fontWeight: '700', color: colors.gray[800], textAlign: 'center' },
    message: { fontSize: 14, color: colors.gray[500], textAlign: 'center', lineHeight: 22, marginTop: 8 },
});

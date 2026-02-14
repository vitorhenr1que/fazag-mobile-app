import { StyleSheet } from 'react-native'
import { colors } from '../../../styles/theme'

export const styles = StyleSheet.create({
    backContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    frontContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: colors.white,
    },
    header: {
        marginBottom: 30,
        paddingHorizontal: 5,
        borderLeftWidth: 4,
        borderLeftColor: colors.blue[500],
        paddingLeft: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.gray[900],
    },
    subtitle: {
        fontSize: 14,
        color: colors.gray[500],
        marginTop: 4,
    },
    servicesContainer: {
        flexDirection: 'column',
        gap: 16,
    }
});
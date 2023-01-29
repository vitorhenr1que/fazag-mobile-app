import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/theme";

export const styles = StyleSheet.create({
    boxContainer: {
        marginTop: 10,
        width: '100%',
        backgroundColor: colors.gray[100],
        height: 80,
        borderRadius: 8,
        flexDirection: 'row',
        fontFamily: 'Inter_600SemiBold',
        padding: 10
    },
    status: {
        backgroundColor: colors.green[200],
        width: 12,
        height: '100%',
        borderRadius: 8,
    },
    numberDateBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderEndWidth: 1,
        width: 90,
        borderColor: colors.gray[500]
    },
    number: {
        fontFamily: 'Inter_500Medium',
        fontSize: 40,
        color: colors.black
    },
    textContainer: {
        flex: 1,
        paddingLeft: 4.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'left',
        color: colors.black,
    },
    titleMonth: {
        textAlign: 'center',
        fontSize: 30,
        padding: 15,
        fontFamily: 'Inter_500Medium'
    }
})
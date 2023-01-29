import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    boxContainer: {
        marginTop: 10,
        width: '100%',
        backgroundColor: '#c0c0c0',
        height: 80,
        borderRadius: 8,
        flexDirection: 'row',
        fontFamily: 'Inter_600SemiBold',
        padding: 10
    },
    status: {
        backgroundColor: '#66CDAA',
        width: 12,
        height: '100%',
        borderRadius: 8,
    },
    numberDateBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderEndWidth: 1,
        width: 90,
        borderColor: '#7a7a7a'
    },
    number: {
        fontFamily: 'Inter_500Medium',
        fontSize: 40,
        color: '#000'
    },
    textContainer: {
        flex: 1,
        paddingLeft: 4.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'left',
        color: '#000',
    },
    titleMonth: {
        textAlign: 'center',
        fontSize: 30,
        padding: 15,
        fontFamily: 'Inter_500Medium'
    }
})
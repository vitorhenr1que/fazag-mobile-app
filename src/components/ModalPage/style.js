import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end', 
  

    },
    modal: {
        position: 'absolute',
        width: '100%',
        height: 480,
        backgroundColor: colors.white,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        justifyContent: 'space-around',
        padding: 30,
        backgroundColor: colors.white,
    },
    titleContainer: {
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: 40
    },
    subtitle: {
        fontFamily: 'Inter_400Regular',
        color: colors.gray[300]
    },
    inputContainer: {

    },
    inputUser: {
        backgroundColor: colors.gray[50],
        paddingLeft: 30,
        height: 60,
        width: '100%',
        borderRadius: 100,
    },
    inputPass: {
        backgroundColor: colors.gray[50],
        paddingLeft: 30,
        height: 60,
        width: '100%',
        marginTop: 10,
        borderRadius: 100
    },
    signInButton: {
        backgroundColor: colors.red[300],
        height: 60,
        width: '100%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInButtonText: {
        color: colors.white,
        fontFamily: 'Inter_700Bold',
        fontSize: 16
    },
    forgotPass: {
        fontFamily: 'Inter_500Medium',
        textAlign: 'center',
        fontSize: 17
    }
})
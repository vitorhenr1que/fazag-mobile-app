import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../styles/theme";

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)', // Dim background
    },
    modal: {
        width: '100%',
        backgroundColor: colors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 40,
        minHeight: height * 0.55,
        justifyContent: 'flex-start',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.gray[900],
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: colors.gray[500],
        textAlign: 'center',
    },
    userVerification: {
        color: colors.red[500],
        fontSize: 13,
        marginTop: 10,
        fontWeight: '500',
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 25,
    },
    inputUser: {
        backgroundColor: colors.gray[50], // Very light gray
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        color: colors.gray[800],
        borderWidth: 1,
        borderColor: colors.gray[100],
        marginBottom: 15,
    },
    inputPass: {
        backgroundColor: colors.gray[50],
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        color: colors.gray[800],
        borderWidth: 1,
        borderColor: colors.gray[100],
    },
    signInButton: {
        backgroundColor: colors.primary[600], // Changed from red to primary blue
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary[600],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 20,
    },
    signInButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPass: {
        color: colors.gray[500],
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
})
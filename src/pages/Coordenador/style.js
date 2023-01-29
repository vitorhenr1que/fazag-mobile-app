import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    lowerHeader: {
        backgroundColor: colors.gray[50]
    },
    container: {
        backgroundColor: colors.white,
        padding: 30,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20
    },
    title: {
        fontSize: 30,
        fontFamily: 'Inter_600SemiBold'
    },
    subtitle: { 
        fontFamily: 'Inter_400Regular' 
    },
    inputs: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 15
    },
    containerDoublePicker: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    viewPicker: {
        width: "100%"
    },
    picker: {
        width: "100%",
        height: 50,
        borderWidth: 0,
        borderRadius: 4,
        padding: 15,
        borderColor: colors.black,
        textDecorationLine: 'underline',
        backgroundColor: colors.black,
        color: colors.white,
        fontFamily: 'Inter_400Regular'
    },
    label: {
        marginTop: 20,
        marginBottom: 5,
        textAlign: 'left',
        fontFamily: 'Inter_400Regular'
    },
    submit: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 13,
        height: 60,
        width: '100%',
        backgroundColor: colors.black,
        borderRadius: 8
    },
    submitText: {
        color: colors.white,
        fontFamily: 'Inter_400Regular'
    }
})
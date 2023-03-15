import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonGenerateHistoric: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        padding: 15,
        backgroundColor: colors.gray[500],
        borderRadius: 4,
       
    },
    textButton: {
        textAlign: 'center',
        color: colors.white
    }
})
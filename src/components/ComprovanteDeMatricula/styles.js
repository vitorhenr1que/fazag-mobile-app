import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        width: '100%',
        height: '100%',

    },
    buttonGenerateProof: {

        padding: 15,
        backgroundColor: colors.gray[500],
        borderRadius: 4,
       
    },
    textButton: {
        textAlign: 'center',
        color: colors.white
    }
})
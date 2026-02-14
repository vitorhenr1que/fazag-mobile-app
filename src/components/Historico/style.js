import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    buttonGenerateHistoric: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    textButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.gray[800],
        marginLeft: 10,
    }
});
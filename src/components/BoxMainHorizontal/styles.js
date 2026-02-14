import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    box: {
        width: '31%', // Fits 3 items in a row with spacing
        height: 110,
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#f1f5f9',

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2
    },


    image: {
        width: 48,
        height: 48,
        marginBottom: 8,
    },
    text: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        color: colors.gray[800],
        fontWeight: '600',
        textAlign: 'center',
    },
    divScroll: {
        paddingVertical: 10,
        paddingLeft: 5,
    },
})
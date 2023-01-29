import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    testV: {
        flex: 1,
        flexDirection: 'column',
        
    },
    scrollMain: {

        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
    },
    container: {
        alignItems: "center",
        backgroundColor: colors.white,
   
    },

    dataAtual: {
        padding: 15,
        fontSize: 32,
        fontWeight: "500",
        fontFamily: 'Inter_600SemiBold'
    },
    scrollh: {
        height: 190
    }
})
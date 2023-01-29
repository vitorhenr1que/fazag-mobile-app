import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[800]
        
    },
    lowerHeader: {
        backgroundColor: colors.white,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20
    },
    month: {
        fontSize: 40,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center'
    },
    
})
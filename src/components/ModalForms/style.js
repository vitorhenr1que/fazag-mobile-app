import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    modalSubContainer: {
       backgroundColor: 'white'
    },
    modalTextContainer: {
        alignItems: 'center',
        backgroundColor: colors.blue[500],
        padding: 4,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
    },
})
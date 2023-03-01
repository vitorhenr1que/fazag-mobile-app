import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        height: '100%'
    },
    profileContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonSair: {
        width: "90%",
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.red[300],
        bottom: 0,
        marginBottom: 30,
    }
}) 
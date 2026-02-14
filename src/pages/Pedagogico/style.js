import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        marginBottom: 25,
        paddingHorizontal: 5,
        borderLeftWidth: 4,
        borderLeftColor: colors.blue[500],
        paddingLeft: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.gray[900],
    },
    subtitle: {
        fontSize: 14,
        color: colors.gray[500],
        marginTop: 4,
    },
    containerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});
import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    contentContainer: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontSize: 15,
        color: colors.gray[800],
        fontWeight: '600',
        marginBottom: 2,
    },
    description: {
        color: colors.gray[500],
        fontSize: 12,
        lineHeight: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.gray[50],
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 20,
        width: 20,
        tintColor: colors.primary[500],
    },
    listMap: {
        width: "100%",
    }
})
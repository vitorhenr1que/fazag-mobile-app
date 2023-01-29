import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    containerHeader: {
        marginTop: 0 + getStatusBarHeight(),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.gray[800],
        height: 80,
        width: "100%",
        alignItems: "center",
        padding: 15
    },
    image: {

        width: 80,
        height: 45
        
    },
    avatarText: {
        color: colors.white,
        fontSize: 20,
    }

})
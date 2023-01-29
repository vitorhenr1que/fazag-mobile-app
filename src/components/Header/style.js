import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const styles = StyleSheet.create({
    containerHeader: {
        marginTop: 0 + getStatusBarHeight(),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#121212',
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
        color: '#fff',
        fontSize: 20,
    }

})
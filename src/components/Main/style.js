import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    box: {
        marginTop: 15,
        width: "90%",
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4
    },

})
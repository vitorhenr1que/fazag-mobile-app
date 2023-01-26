import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: 'center',
        padding: 30
    },
    title: {
        fontSize: 30,
    },
    inputs: {
        marginTop: 20,
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 15
    },
    containerDoubleInput: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    doubleInputItem: {

        marginTop: 20,
        width: "49%",
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 15,
    
    }
})
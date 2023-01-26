import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30
    },
    title: {
        fontSize: 30,
    },
    inputs: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 15
    },
    containerDoublePicker: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    viewPicker: {
        width: "49%"
    },
    picker: {
        width: "100%",
        height: 50,
        borderWidth: 0,
        borderRadius: 4,
        padding: 15,
        borderColor: '#000',
        textDecorationLine: 'underline',
        backgroundColor: '#0c0c0c',
        color: '#fff',
    },
    label: {
        marginTop: 20,
        textAlign: 'left'
    }
})
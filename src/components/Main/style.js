import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    testV: {
        flex: 1
    },
    scrollMain: {
        flex: 2,
        width: "100%",
        backgroundColor: '#fff',
        
    },
    container: {
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
    scrollh: {
        flex: 1
    },
    divScroll: {
        flexDirection: 'row',
        width: "100%",
        backgroundColor: 'red',
        alignItems: "center",
        justifyContent: "center"

    },
    boxRecursos: {
        marginLeft: 8,
        width: 150,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 8,

        shadowColor: '#000',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    }
})
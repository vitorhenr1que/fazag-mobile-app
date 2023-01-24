import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    testV: {
        flex: 1,
        flexDirection: 'column',
        
    },
    scrollMain: {

        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
    },
    container: {
        alignItems: "center",
        backgroundColor: '#ffffff',
   
    },


    divScroll: {
        height: 190,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        
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
    },
    dataAtual: {
        padding: 15,
        fontSize: 32,
        fontWeight: "500",
        fontFamily: 'Inter_600SemiBold'
    }
})
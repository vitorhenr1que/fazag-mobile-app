import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    box: {
        padding: 15,
        marginTop: 15,
        width: "90%",
        height: 90,
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'space-between',
        
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4
    },

    boxHeader:{
        flexDirection: 'row',
    },

    title: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Inter_700Bold'
    },

    description: {
        color: '#a9a9a9',
        fontFamily: 'Inter_400Regular'
    },
    icon: {
        marginRight: 10,
        height: 25,
        width: 25
    }
})
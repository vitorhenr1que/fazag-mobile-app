import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    box: {
        marginLeft: 8,
        width: 150,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "space-evenly",

        shadowColor: '#000',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    image: {
        width: 80,
        height: 80
    },
    text: {
        fontFamily: 'Inter_400Regular'
    },
    divScroll: {
        paddingRight: 15,
        height: 190,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        
    },
})
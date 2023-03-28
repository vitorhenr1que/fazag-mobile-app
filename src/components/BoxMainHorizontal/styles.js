import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    box: {
        marginLeft: 8,
        width: 150,
        height: 150,
        backgroundColor: colors.white,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "space-evenly",

        shadowColor: colors.black,
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
        flexDirection: 'row',




        
    },
})
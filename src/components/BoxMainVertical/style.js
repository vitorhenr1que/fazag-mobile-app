import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    box: {
        padding: 15,
        marginTop: 15,
        height: 90,
        backgroundColor: colors.white,
        borderRadius: 15,
        justifyContent: 'space-between',
        
        shadowColor: colors.black,
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
        color: colors.black,
        fontFamily: 'Inter_700Bold'
    },

    description: {
        color: colors.gray[300],
        fontFamily: 'Inter_400Regular'
    },
    icon: {
        marginRight: 10,
        height: 25,
        width: 25
    },
    listMap: {
        width: "90%"
    }
})
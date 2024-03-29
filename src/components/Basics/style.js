import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";





export const styles = StyleSheet.create({
    light: {
        fontFamily: 'Inter_300Light',

    },
    regular: {
        fontFamily: 'Inter_400Regular',

    },
    semibold: {
        fontFamily: 'Inter_600SemiBold',

    },
    bold: {
        fontFamily: 'Inter_700Bold',
    },
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    center: {
        textAlign: 'center'
    },
    right: {
        textAlign: 'right'
    },
    left: {
        textAlign: 'left'
    }
})
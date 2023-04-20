import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    backContainer: {
        flex: 1,
        backgroundColor: colors.gray[800]
    },
    frontContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 30,
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bannerContainer: {
        height: 220,
        width: '100%',


    },
    bannerAVA: {
        width: '100%',
        height: '100%'
    },
    entrarContainer: {
        alignItems: 'center'
    },
    buttonEntrar: {
        marginTop: 8,
        borderRadius: 4,
        backgroundColor: colors.blue[500],
        padding: 30,
        width: '100%',
        alignItems: 'center'
    }
})
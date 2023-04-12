import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    },
    header: {
        flex: 1,
        backgroundColor: colors.gray[800],
    },
    main: {
        flex: 2,
        backgroundColor: colors.gray[50],
        alignItems: 'center'
    },
    boxAbsolute: {
        width: "90%",
        flex: 1,
        borderRadius: 4,
        backgroundColor: colors.red[300],
        top: "-3%"
    },
    boxAbsoluteContainer: {
       justifyContent: 'center',
       flex: 1,
    },
    boxAbsoluteTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    lowerMain: {
        flex: 3.5,
        width: "100%",
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    boxUserInfoContainer: {
        width: '90%',
        flex: 3.5,
        borderRadius: 4,
        backgroundColor: colors.white,
        padding: 30

    },
    boxUserInfo: {
        flex: 1,
        justifyContent: "space-evenly"
    },
    boxUserInfoRow: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    profileContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonSair: {
        width: "90%",
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.red[300],
        bottom: 0,
        marginBottom: 20,
        marginTop: 20
    },
    circleUser: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: colors.gray[50]
    },
    textName: {
        fontWeight: "bold",
        fontSize: 19,
    },

}) 
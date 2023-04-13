import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    backContainer: {
        backgroundColor: colors.gray[800],
        flex: 1
    },
    frontContainer: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 30
    },
    contactFirstContainer: {
        marginTop: 10,
        flex: 1,
       backgroundColor: colors.gray[800],
       borderRadius: 20,
       alignItems: 'center',
       justifyContent: 'center',
       height: 100

    },
    contactSecContainer: {
        flexDirection: 'row',
        padding: 10
    },
    imageContactBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        height: 60,
        width: '100%',
        borderRadius: 50
    },
    imageContact: {
        width: '50%',
        height: 15,

        
    },
    textContactBox: {
        flex: 3,
        justifyContent: 'center',
        marginLeft: 12
        
    },
    iconContactBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
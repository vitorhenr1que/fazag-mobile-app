import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { 
        height: 50, 
        backgroundColor: colors.gray[50],

        
    },
    border: {
        borderWidth: 1,
        borderColor: colors.gray[50],
    },
    textHead: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    body: { 
        flex: 1,
        justifyContent: 'center',
        height: 60,
        backgroundColor: 'white'
    },
    textBody: {
        textAlign: 'center'
    }
})
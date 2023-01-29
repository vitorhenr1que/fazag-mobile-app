import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    gradiantContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        elevation: 0,
        zIndex: 0
        
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',

    },
    signInButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
       width: '100%',
       backgroundColor: colors.white,
       borderRadius: 100,
    },
    signInButton: {
       fontSize: 20,
       fontFamily: 'Inter_600SemiBold',
    },
    titleContainer: {
       
    },
    title: {
        fontSize: 63,
        color: colors.white,
        fontFamily: 'Inter_700Bold',
        
    },
    subtitle: {
        marginTop: 30,
        color: colors.white,
        fontFamily: 'Inter_300Light',
        fontSize: 16
    },

})
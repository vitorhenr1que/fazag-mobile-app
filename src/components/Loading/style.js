import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    loadingContainer: {
        display: 'flex', 
        position: 'absolute', 
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1, 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: colors.black, 
        opacity: 0.7
    },
    loading: {
       
    }
})
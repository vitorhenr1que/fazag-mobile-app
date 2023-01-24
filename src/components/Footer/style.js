import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        width: "100%",
        backgroundColor: '#fff',
        borderTopWidth: .5,
        
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    icon: {
        height: 30,
        width: 30
    }
})
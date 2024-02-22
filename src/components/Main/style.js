import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
    testV: {

        flexDirection: 'column',
        flex: 1,
    },
    generalContainer: {

        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollMain: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
  
        
    },
    container: {
        alignItems: "center",
        backgroundColor: colors.white,
    },

    olaAluno: {
        paddingLeft: 15,
        paddingTop: 15
    },
    scrollh: {
      
    backgroundColor: colors.white,
       paddingBottom: 20,
       paddingTop: 20,
       justifyContent: 'center',
        alignItems: 'center'
    }
})
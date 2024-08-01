import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
  
        flex: 1,
  
    },
    scrollContainer:{
        display: 'flex',
        
  

    },
    containerBox:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
  
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }

})
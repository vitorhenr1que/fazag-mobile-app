import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    box:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,

    },
    boxCircleContainer:{
      backgroundColor: '#ececec',
      height: 50,
      width: 50,
      borderRadius: 100,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      // Elevation for Android
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
    }
})
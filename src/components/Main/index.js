import { Text, View } from "react-native";
import { styles } from "./style";

export function Main(){
    return(
        <View style={styles.container}>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
        </View>
    )
}
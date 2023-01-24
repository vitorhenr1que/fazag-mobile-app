import { ScrollView, Text, View } from "react-native";
import { styles } from "./style";

export function Main(){
    return(
        <View style={styles.testV}>
        <ScrollView style={styles.scrollMain}>
            <View style={styles.container}>
                <View style={styles.box}></View>
                <View style={styles.box}></View>
                <View style={styles.box}></View>
                <View style={styles.box}></View>
            </View>
        </ScrollView>
        
        <ScrollView horizontal={true} style={styles.scrollh} showsHorizontalScrollIndicator={false}>
            <View style={styles.divScroll}>
                <View style={styles.boxRecursos}></View>
                <View style={styles.boxRecursos}></View>
                <View style={styles.boxRecursos}></View>
            </View>
        </ScrollView>
        </View>
    )
}
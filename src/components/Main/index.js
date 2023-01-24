import { useFonts, Inter_300Light, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { ScrollView, Text, View } from "react-native";
import { BoxMainVertical } from "../BoxMainVertical";
import { List } from "../BoxMainVertical/List";
import { styles } from "./style";

export function Main(){
    const [fontLoaded] = useFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold
    })
    if (!fontLoaded){
        return null
    }
    return(
        <View style={styles.testV}>
        <ScrollView style={styles.scrollMain}>
            <Text style={styles.dataAtual}>Hoje, 24 de janeiro.</Text>
            <View style={styles.container}>
                <BoxMainVertical/>
                <BoxMainVertical/>
                <BoxMainVertical/>
                <BoxMainVertical/>
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
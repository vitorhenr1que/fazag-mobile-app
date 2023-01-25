import { useFonts, Inter_300Light, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { ScrollView, Text, View } from "react-native";
import { BoxMainHorizontal } from "../BoxMainHorizontal";
import { ListBoxMainHorizontal } from "../BoxMainHorizontal/ListBoxMainHorizontal";
import { BoxMainVertical } from "../BoxMainVertical";
import { ListBoxMainVertical } from "../BoxMainVertical/ListBoxMainVertical";
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
        <ScrollView style={styles.scrollMain} showsVerticalScrollIndicator={false}>
            <Text style={styles.dataAtual}>Hoje, 24 de janeiro.</Text>
            <View style={styles.container}>
                <ListBoxMainVertical/>
            </View>
        </ScrollView>
        
        <ScrollView horizontal={true} style={styles.scrollh} showsHorizontalScrollIndicator={false}>

                <ListBoxMainHorizontal/>

        </ScrollView>
        </View>
    )
}
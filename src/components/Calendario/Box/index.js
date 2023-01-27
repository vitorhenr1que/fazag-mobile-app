import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { Text, View } from "react-native";
import { styles } from "./style";

export function BoxDate(){
    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold
    })
    if(!fontLoaded){
        return null
    }
    return (
        <View style={styles.boxContainer}>
            <View style={styles.status}></View>
            <View style={styles.numberDateBox}>
                <Text style={styles.number}>27</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Jornada Pedagógica adfsfsdf sdfsdfgsd dfgdsfg dsfgdsgds sdfgdsfg</Text>
            </View>
        </View>
    )
}
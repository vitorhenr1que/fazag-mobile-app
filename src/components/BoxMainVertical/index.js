import { Text, View, Image, FlatList } from "react-native";
import { styles } from "./style";
import { useFonts, Inter_300Light, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";

export function BoxMainVertical(props){
    const ouvidoria = require('../../../assets/ouvidoria.png')
    const [fontLoaded] = useFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold
    })
    if (!fontLoaded){
        return null
    }

    return (
    
        
        <View style={styles.box}>
    
            <View style={styles.boxHeader}>
                <Image source={ouvidoria} style={styles.icon}/>
                <Text style={styles.title}>Ouvidoria FAZAG</Text>
                <Text style={[styles.title, {fontFamily: 'Inter_400Regular', marginLeft: 'auto'}]}> → </Text>
            </View>
         
            <View>
                <Text style={styles.description}>Ajude-nos a melhorar cada vez mais!</Text>
            </View>
        
        </View>
        
     
    )
}
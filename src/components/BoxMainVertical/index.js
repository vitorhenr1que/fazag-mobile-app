import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { useFonts, Inter_300Light, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { useNavigation } from "@react-navigation/native";

export function BoxMainVertical(props){
    const ouvidoria = require('../../../assets/ouvidoria.png')
    const navegar = useNavigation()
    const [fontLoaded] = useFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold
    })
    if (!fontLoaded){
        return null
    }

    function irAtendimento(){
        navegar.navigate('Atendimento')
    }

    return (
    
       
        <View style={styles.box}>
            <TouchableOpacity onPress={irAtendimento}>
                <View style={styles.boxHeader}>
                    <Image source={props.image} style={styles.icon}/>
                    <Text style={styles.title}>{props.name}</Text>
                    <Text style={[styles.title, {fontFamily: 'Inter_400Regular', marginLeft: 'auto'}]}> → </Text>
                </View>
            
                <View>
                    <Text style={styles.description}>{props.description}</Text>
                </View>
            </TouchableOpacity>
        </View>

        
     
    )
}
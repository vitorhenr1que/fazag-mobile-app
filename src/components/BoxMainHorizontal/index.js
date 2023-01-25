import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

export function BoxMainHorizontal(props){
    const [fontLoaded] = useFonts({
        Inter_400Regular
    })
    if(!fontLoaded){
        return null
    }
    return (
        <View style={props.title !== 'Financeiro' ? styles.box : [styles.box, {backgroundColor: '#d3d3d3'}]}>
            <Image style={styles.image} source={props.image}/>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}
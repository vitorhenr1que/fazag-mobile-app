import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function BoxMainHorizontal(props){
    const navegar = useNavigation()

    const [fontLoaded] = useFonts({
        Inter_400Regular
    })
    if(!fontLoaded){
        return null
    }
    return (
        <TouchableOpacity style={props.title !== 'Financeiro' ? styles.box : [styles.box, {backgroundColor: '#d3d3d3'}]} onPress={() => {navegar.navigate(props.route)}}>
            <Image style={styles.image} source={props.image}/>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}
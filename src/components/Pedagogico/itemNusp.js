import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { TextFont } from "../Basics/TextFont";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";


export function ItemNusp({iconName, size, color, text}){
    const navegar = useNavigation()
  

    return (
    <TouchableOpacity style={styles.box} onPress={() => navegar.navigate('Nusp')}>
            <View style={styles.boxCircleContainer}>
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
            </View>
            <TextFont textAlign={'center'} color={'#000'} texto={text}/>
        </TouchableOpacity>
    )
}
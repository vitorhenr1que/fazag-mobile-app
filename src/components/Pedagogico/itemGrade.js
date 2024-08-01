import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { TextFont } from "../Basics/TextFont";
import { styles } from "./style";



export function ItemGrade({iconName, size, color, text, handleClick, link}){

    
    return (
    <TouchableOpacity style={styles.box} onPress={() => handleClick(link)}>
            <View style={styles.boxCircleContainer}>
                <Entypo name={iconName} size={size} color={color} />
            </View>
            <TextFont textAlign={'center'} color={'#000'} texto={text}/>
        </TouchableOpacity>
    )
}
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./style";

export function ItemAntDesign({ iconName, size, color, text, handleClick, link }) {
    return (
        <TouchableOpacity style={styles.box} onPress={() => handleClick(link)}>
            <View style={styles.boxCircleContainer}>
                <AntDesign name={iconName} size={size} color={color} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}
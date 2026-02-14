import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./style";

export function ItemMatriz({ iconName, size, color, text, handleClick, link }) {
    return (
        <TouchableOpacity style={styles.box} onPress={() => handleClick(link)}>
            <View style={styles.boxCircleContainer}>
                <Ionicons name={iconName} size={size} color={color} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}
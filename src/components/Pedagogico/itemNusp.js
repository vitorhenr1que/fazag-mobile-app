import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

export function ItemNusp({ iconName, size, color, text }) {
    const navegar = useNavigation();

    return (
        <TouchableOpacity style={styles.box} onPress={() => navegar.navigate('Nusp')}>
            <View style={styles.boxCircleContainer}>
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}
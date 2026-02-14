import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { colors } from "../../../styles/theme";

export function BoxMainVertical(props) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate(props.route)}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                <Image source={props.image} style={styles.icon} resizeMode="contain" />
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.description} numberOfLines={1}>{props.description}</Text>
            </View>

            <Feather name="chevron-right" size={20} color={colors.gray[300]} />
        </TouchableOpacity>
    )
}
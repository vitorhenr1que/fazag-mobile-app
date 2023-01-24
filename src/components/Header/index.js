import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Icon } from "react-native-vector-icons/AntDesign";

const logoBranca = require('../../../assets/logo-white.png')
const notification = require('../../../assets/notification-white.png')

export function Header(){
    return(
        <View style={styles.containerHeader}>
            <Text style={styles.avatarText}>VH</Text>
            <Image style={styles.image} source={logoBranca} />
            <TouchableOpacity>
                <Image style={styles.notificationIcon} source={notification} />
            </TouchableOpacity>
            
        </View>
    )
}
import { Image, Text, View } from "react-native";
import { styles } from "./style";

const logoBranca = require('../../../assets/logo-white.png')


export function Header(){
    return(
        <View style={styles.containerHeader}>
            <Text>VH</Text>
            <Image style={styles.image} source={logoBranca} />
            
        </View>
    )
}
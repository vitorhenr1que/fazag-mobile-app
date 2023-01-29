import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons'; 
import { StatusBar } from "expo-status-bar";


const logoBranca = require('../../../assets/logo-white.png')
export function Header(){


    return(
        <View style={styles.containerHeader}>
            <StatusBar backgroundColor="#121212" style="light"/>
            <Text style={styles.avatarText}>VH</Text>
            <Image style={styles.image} source={logoBranca} />
            <TouchableOpacity>
            <Ionicons name="notifications-outline" size={30} color='#fff' />
            </TouchableOpacity>
            
        </View>
    )
}
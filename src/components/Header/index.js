import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons'; 
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors } from "../../../styles/theme";
import { useEffect, useState } from "react";

const logoBranca = require('../../../assets/logo-white.png')
export function Header(){
   const [canNavigate, setCanNavigate] = useState(false)
   const navigation = useNavigation()
   useEffect(() => {
    
    setCanNavigate(navigation.canGoBack())
    
},[])

    {console.log(canNavigate)}
    return(
        <View style={styles.containerHeader}>
            <StatusBar backgroundColor="#121212" style="light"/>
            <TouchableOpacity>
               <Text style={styles.avatarText}>VH</Text>
            </TouchableOpacity>
            <Image style={styles.image} source={logoBranca} />
            <TouchableOpacity>
            <Ionicons name="notifications-outline" size={30} color={colors.white} />
            </TouchableOpacity>
            
        </View>
    )
}
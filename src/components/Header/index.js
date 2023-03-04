import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons'; 
import { StatusBar } from "expo-status-bar";
import { colors } from "../../../styles/theme";
import {CanBack} from './CanBack'
import { useNavigation, useNavigationState } from "@react-navigation/native";
const logoBranca = require('../../../assets/logo-white.png')
export function Header(){


const navigation = useNavigation()
const isBack = navigation.canGoBack()
const state =  useNavigationState(state => state) //Re-renderiza toda vez que alterar a rota 



    
    return(
        <View style={styles.containerHeader}>
            <StatusBar backgroundColor="#121212" style="light"/>
                <TouchableOpacity style={{flex: 1}}>
                    {!!isBack && <CanBack/>}
                </TouchableOpacity>
                <Image style={[styles.image]} source={logoBranca} />
                <TouchableOpacity style={styles.sino}>
                    <Ionicons name="notifications-outline" size={30} color={colors.white} />
                </TouchableOpacity>
            
        </View>
    )
}
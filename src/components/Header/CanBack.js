import {  TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

export function CanBack(){
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
    )
}
import { Text } from "react-native"
import {Inter_300Light, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, useFonts} from '@expo-google-fonts/inter'
import { styles } from "./style"


export function TextFont({texto, fontWeight, fontSize}){
    const [fontLoaded] = useFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold
    })
    if (!fontLoaded){
        return null
    }


    return (
        <Text style={[styles[`${fontWeight}`],{fontWeight: fontWeight, fontSize: fontSize}]}>{texto}</Text>
    )
}
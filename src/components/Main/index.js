import { useFonts, Inter_300Light, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { ScrollView, Text, TextInput, View } from "react-native";
import { nomeAluno } from "../nomeAluno";
import { ListBoxMainHorizontal } from "../BoxMainHorizontal/ListBoxMainHorizontal";
import { ListBoxMainVertical } from "../BoxMainVertical/ListBoxMainVertical";
import { styles } from "./style";

const months = {
    0: 'janeiro',
    1: 'fevereiro',
    2: 'março',
    3: 'abril',
    4: 'maio',
    5: 'junho',
    6: 'julho',
    7: 'agosto',
    8: 'setembro',
    9: 'outubro',
    10: 'novembro',
    11: 'dezembro'
}

export function Main(){

    const day = new Date().getDate().toLocaleString('pt-BR')
    const month = new Date().getMonth().toLocaleString('pt-BR')
    const [fontLoaded] = useFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold
    })
    if (!fontLoaded){
        return null
    }
    return(
        <View style={styles.testV}>
           
        <ScrollView style={styles.scrollMain} showsVerticalScrollIndicator={false}>
            
            <Text style={styles.nomeAluno}>Olá {nomeAluno()}!</Text>
            {/*<Text>Hoje, {day} de {months[month]}.</Text>*/}
            <View style={styles.container}>
                <ListBoxMainVertical/>
            </View>
        </ScrollView>
        
        <ScrollView horizontal={true} style={styles.scrollh} showsHorizontalScrollIndicator={false}>

                <ListBoxMainHorizontal/>

        </ScrollView>
        </View>
    )
}
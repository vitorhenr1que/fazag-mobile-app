import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { Text, View } from "react-native";
import { styles } from "./style";


export function BoxDate({month, idMonth}){
    const cores = {
        letivo: '#66CDAA',
        atencao: '#FFFF00',
        colacao: '#00BFFF',
        reuniao: '#FF8C00',
        recesso: '#FF0000',
        normal: '#000'
    }
    const meses = {
        0: 'Janeiro',
        1: 'Fevereiro',
        2: 'Março',
        3: 'Abril',
        4: 'Maio',
        5: 'Junho',
        6: 'Julho',
        7: 'Agosto',
        8: 'Setembro',
        9: 'Outubro',
        10: 'Novembro',
        11: 'Dezembro'
    }

    console.log(month, idMonth)
    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold
    })
    if(!fontLoaded){
        return null
    }


return (
    <View>
        <Text style={styles.titleMonth}>{meses[idMonth]}</Text>
        {month.map((item, index) => {
                return (
                    <View style={styles.boxContainer} key={index++}>
                        <View style={[styles.status, {backgroundColor: cores[item.status]}]}></View>
                        <View style={styles.numberDateBox}>
                            <Text style={styles.number}>{`${item.dia_do_mes}`}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    </View>
                )
            })}
    </View>
)
    
    
}
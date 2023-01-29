import { ScrollView, Text, View, VirtualizedList } from 'react-native'
import { Header } from '../../components/Header'
import { styles } from './style'
import { Inter_600SemiBold, Inter_400Regular, Inter_500Medium, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'
import { BoxDate } from '../../components/Calendario/Box'
import { CalendarioList } from '../../components/Calendario/Box/CalendarioList'
export function Calendario(){
    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold
    })
    if(!fontLoaded){
        return null
    }



    return(

        <View style={styles.container}>
            <View style={styles.lowerHeader}>
            <ScrollView showsVerticalScrollIndicator={false} style={{padding: 15}}>  
            <CalendarioList/>
            </ScrollView>
            </View>
        </View>
    )
}
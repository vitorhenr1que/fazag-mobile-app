import { ScrollView, Text, View } from 'react-native'
import { Header } from '../../components/Header'
import { styles } from './style'
import { Inter_600SemiBold, Inter_400Regular, Inter_500Medium, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'
import { BoxDate } from '../../components/Calendario/Box'
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
            <Header/>
            <ScrollView showsVerticalScrollIndicator={false} style={{padding: 15}}>  

                <Text style={styles.month}>Janeiro</Text>

                <BoxDate/>
                <BoxDate/>
                <BoxDate/>

                <Text style={styles.month}>Fevereiro</Text>

                <BoxDate/>
                <BoxDate/>
                <BoxDate/>

            </ScrollView>
        </View>
    )
}
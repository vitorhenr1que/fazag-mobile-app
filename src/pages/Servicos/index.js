import { View, TouchableOpacity } from 'react-native'
import { TextFont } from '../../components/Basics/TextFont'
import { styles } from './style'
import { Historico } from '../../components/Historico/index'
import { ComprovanteDeMatricula } from '../../components/ComprovanteDeMatricula'



export function Servicos(){
    return (
        <View style={styles.backContainer}>
            <View style={styles.frontContainer}>
                <TextFont texto={"Serviços"} fontSize={16} fontWeight={'bold'}/>
                <View style={styles.servicesContainer}>
                    <Historico/>
                    <ComprovanteDeMatricula/>
                </View>
                
            </View>
        </View>
        
    )
}
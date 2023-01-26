import { Text, TextInput, View } from 'react-native'
import { styles } from './style'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'

export function Ouvidoria(){
    const [vinculo, setVinculo] = useState('Vinculo')
    const [motivo, setMotivo] = useState('Motivo')
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Ouvidoria</Text>
            <Text>Ajude a FAZAG a servi-lo melhor.</Text>
            <TextInput placeholder='Nome Completo*' style={styles.inputs}/>
            <TextInput placeholder='E-mail' style={styles.inputs}/>

            <View style={styles.containerDoubleInput}>
                <Picker selectedValue={vinculo} onValueChange={(itemValue, itemIndex) => setVinculo(itemValue)}>
                <Picker.Item key={0} label="Teste" value={0}/>
                </Picker> 

                <Picker selectedValue={motivo} onValueChange={(itemValue, itemIndex) => setMotivo(itemValue)}>
                <Picker.Item key={1} label="Teste" value={1}/>
                </Picker> 
                
            </View>

        </View>
    )
}
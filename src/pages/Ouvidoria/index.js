import { Text, TextInput, View } from 'react-native'
import { styles } from './style'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'

export function Ouvidoria(){
    const [vinculo, setVinculo] = useState('Vinculo')
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Ouvidoria</Text>
            <Text>Ajude a FAZAG a servi-lo melhor.</Text>
            <TextInput placeholder='Nome Completo*' style={styles.inputs}/>
            <TextInput placeholder='E-mail' style={styles.inputs}/>

            <View style={styles.containerDoubleInput}>
                <Picker selectedValue={vinculo}>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                </Picker>

                <Picker>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                </Picker>
                
            </View>

        </View>
    )
}
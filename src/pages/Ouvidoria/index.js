import { Text, TextInput, View,  TouchableOpacity, Modal, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { styles } from './style'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { Header } from '../../components/Header'
import { Inter_600SemiBold, Inter_400Regular, useFonts } from '@expo-google-fonts/inter'
import { useLinkProps } from '@react-navigation/native'

export function Ouvidoria(){
    const [vinculo, setVinculo] = useState('Vinculo')
    const [motivo, setMotivo] = useState('Motivo')


    const [fontLoaded] = useFonts({
        Inter_600SemiBold, Inter_400Regular
    })
    if(!fontLoaded){
        return null
    }
  
    return(
         
         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={40}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                <ScrollView showsVerticalScrollIndicator={false}>
        <Header/>
        <View style={styles.container}>
            
            <Text style={styles.title}>Ouvidoria</Text>
            <Text style={styles.subtitle}>Ajude a FAZAG a servi-lo melhor.</Text>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput style={styles.inputs}/>
            <Text style={styles.label}>E-mail</Text>
            <TextInput style={styles.inputs}/>

            <View style={styles.containerDoublePicker}>
                <View style={styles.viewPicker}>
                <Text style={styles.label}>Vínculo</Text>
                    <Picker selectedValue={vinculo} onValueChange={(item, index) => setVinculo(item)} style={styles.picker} >
                    <Picker.Item label="Servidor" value="Servidor" />
                    <Picker.Item label="Aluno" value="Aluno" />
                    <Picker.Item label="Professor" value="Professor" />
                    <Picker.Item label="Terceirizado" value="Terceirizado" />
                    <Picker.Item label="Usuário/Outros" value="Usuário/Outros" />
                    </Picker>
                </View>
                
                <View style={styles.viewPicker}>
                <Text style={styles.label}>Motivo</Text>
                    <Picker selectedValue={motivo} onValueChange={(item, index) => setMotivo(item)} style={styles.picker} >
                    <Picker.Item label="Crítica" value="Crítica" />
                    <Picker.Item label="Denúncia" value="Denúncia" />
                    <Picker.Item label="Elogio" value="Elogio" />
                    <Picker.Item label="Informação" value="Informação" />
                    <Picker.Item label="Reclamação" value="Reclamação" />
                    <Picker.Item label="Solicitação" value="Solicitação" />
                    <Picker.Item label="Sugestão" value="Sugestão" />
                    </Picker>
                </View>
            </View>
            <Text style={styles.label}>Messagem</Text>
            <TextInput style={[styles.inputs, {height: 150, textAlignVertical: 'top'}]} multiline={true} numberOfLines={4}/>

            <TouchableOpacity>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Enviar</Text>
                </View>
            </TouchableOpacity>
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        
    )
}
import { Text, TextInput, View,  TouchableOpacity, Modal, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { styles } from './style'
import Picker from 'react-native-picker-select'
import { useState } from 'react'
import { Inter_600SemiBold, Inter_400Regular, useFonts } from '@expo-google-fonts/inter'
import { api } from '../../services/api'
import { Loading } from '../../components/Loading'
import InputScrollView from 'react-native-input-scroll-view'


export function Ouvidoria(){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [vinculo, setVinculo] = useState(null)
    const [motivo, setMotivo] = useState(null)
    const [mensagem, setMensagem] = useState('')
    const [procurouSetor, setProcurouSetor] = ('Sim')
    const [loading, setLoading] = useState(false)

    const optionsMotivo = [
        {label: "Crítica", value: "Crítica"},
        {label: "Denúncia", value: "Denúncia"},
        {label: "Elogio", value: "Elogio"},
        {label: "Informação", value: "Informação"},
        {label: "Reclamação", value: "Reclamação"},
        {label: "Solicitação", value: "Solicitação"},
        {label: "Sugestão", value: "Sugestão"}
    ]
    const optionsVinculo = [
        {label: "Servidor", value: "Servidor"},
        {label: "Aluno", value: "Aluno"},
        {label: "Professor", value: "Professor"},
        {label: "Terceirizado", value: "Terceirizado"},
        {label: "Usuário/Outros", value: "Usuário/Outros"},
    ]

    const [fontLoaded] = useFonts({
        Inter_600SemiBold, Inter_400Regular
    })
    if(!fontLoaded){
        return null
    }

    async function enviarForm(){
    if(nome === '' || email === '' || mensagem === '' || vinculo === null ){
       return alert('Preencha todos os campos.')
    }
    setLoading(true)
    try {

       await api.post('ouvidoria/create', {
            nome,
            email,
            vinculo,
            motivo,
            text: mensagem,
            procurouSetor
            }).then(e => console.log(`${e.data} - enviou! OUVIDORIA`))

        await api.post('ouvidoria/nodemailer', {
            nome,
            email,
            vinculo,
            motivo,
            text: mensagem,
            procurouSetor
        }).then(e => console.log(`${e.data} - enviou! NODEMAILER`))

        setLoading(false)
        return alert('Sua mensagem foi enviada!')

        } catch(err) {
            console.log(err.message)
            setLoading(false)
            return alert(err.message)
        }
        
    }
    let scrollOuvidoria = {}
    return(
         
         <InputScrollView keyboardOffset={250} showsVerticalScrollIndicator={false}>

        {loading && <Loading/>}
        <View style={styles.lowerHeader}> 

            <View style={styles.container}>
            
                <Text style={styles.title}>Ouvidoria</Text>
                <Text style={styles.subtitle}>Ajude a FAZAG a servi-lo melhor.</Text>

                <Text style={styles.label}>Nome Completo</Text>
                <TextInput style={styles.inputs} value={nome} onChangeText={setNome}/>

                <Text style={styles.label}>E-mail</Text>
                <TextInput style={styles.inputs} value={email} onChangeText={setEmail}/>

                <View style={styles.containerDoublePicker}>

                    <View style={styles.viewPicker}>
                    <Text style={styles.label}>Vínculo</Text>

                    <Picker 
                    placeholder={{label: 'Selecione seu vínculo...', value: null}}
                    onValueChange={(value) => setVinculo(value)}
                    items={optionsVinculo}
                    value={vinculo}
                    />
                       
                    </View>
                    
                    <View style={styles.viewPicker}>
                    <Text style={styles.label}>Motivo</Text>
                    
                    <Picker 
                    placeholder={{label: 'Selecione um motivo...', value: null}}
                    onValueChange={(value) => setMotivo(value)}
                    items={optionsMotivo}
                    value={motivo}
                    />
                       
                    </View>
                </View>
                <Text style={styles.label}>Mensagem</Text>
                <TextInput style={[styles.inputs, {height: 150, textAlignVertical: 'top'}]} multiline scrollEnabled={false} numberOfLines={4} value={mensagem} onChangeText={setMensagem} />
                
                <TouchableOpacity onPress={enviarForm}>
                    <View style={styles.submit}>
                        <Text style={styles.submitText}>Enviar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
        </View>

        </InputScrollView>
        
    )
}
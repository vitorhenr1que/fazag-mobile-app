import { Text, TextInput, View,  TouchableOpacity, Modal, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { styles } from './style'
import Picker from 'react-native-picker-select'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Inter_600SemiBold, Inter_400Regular, useFonts } from '@expo-google-fonts/inter'
import { useLinkProps } from '@react-navigation/native'
import { api } from '../../services/api'
import { Loading } from '../../components/Loading'




export function Coordenador(){

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)


    const options = [
        {label: 'Administração', value: 0},
        {label: 'Ciências Contábeis', value: 1},
        {label: 'Educação Física (Licenciatura)', value: 2},
        {label: 'Educação Física (Bacharelado)', value: 3},
        {label: 'Enfermagem', value: 4},
        {label: 'Engenharia Civil', value: 5},
        {label: 'Estética', value: 6},
        {label: 'Farmácia', value: 7},
        {label: 'Fisioterapia', value: 8},
        {label: 'Nutrição', value: 9},
        {label: 'Pedagogia', value: 10},
        {label: 'Psicologia', value: 11},
        {label: 'Serviço Social', value: 12}
    ]

    const cursos = {
        0: 'Administração',
        1: 'Ciências Contábeis',
        2: 'Educação Física (Bacharelado)',
        3: 'Educação Física (Licenciatura)',
        4: 'Enfermagem',
        5: 'Engenharia Civil',
        6: 'Estética',
        7: 'Farmácia',
        8: 'Fisioterapia',
        9: 'Nutrição',
        10: 'Pedagogia',
        11: 'Psicologia',
        12: 'Serviço Social'
    }

    const emailCoordenador = {
        0: 'daiana.paixão@gmail.com',
        1: 'vhpsantos@gmail.com',
        2: 'Educação Física (Bacharelado)',
        3: 'Educação Física (Licenciatura)',
        4: 'Enfermagem',
        5: 'Engenharia Civil',
        6: 'Estética',
        7: 'Farmácia',
        8: 'Fisioterapia',
        9: 'Nutrição',
        10: 'Pedagogia',
        11: 'Psicologia',
        12: 'Serviço Social'
    }


    const [fontLoaded] = useFonts({
        Inter_600SemiBold, Inter_400Regular
    })
    if(!fontLoaded){
        return null
    }




    async function enviarForm(){
    if(nome === '' || email === '' || mensagem === '' || selectedValue === null){
       return alert('Preencha todos os campos.')
    }
    setLoading(true)
    try {

       await api.post('ouvidoria/coordenador', {
            nome,
            email,
            curso: cursos[selectedValue],
            text: mensagem,
            }).then(e => console.log(`${e.data} - enviou! OUVIDORIA`))

        await api.post('ouvidoria/emailcoordenador', {
            nome,
            email,
            curso: cursos[selectedValue],
            emailCoordenador: emailCoordenador[selectedValue],
            text: mensagem,
        }).then(e => console.log(`${e.data} - enviou! NODEMAILER`))

        setLoading(false)
        return alert('Sua mensagem foi enviada!')

        } catch(err) {
            console.log(err.message)
            setLoading(false)
            return alert(err.message)
        }
        
    }

    return(
         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={20} style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                <ScrollView showsVerticalScrollIndicator={false} style={{flex : 1}}>
        {loading && <Loading/>}
       <View style={styles.lowerHeader}>
        <View style={styles.container}>
            
            <Text style={styles.title}>Fale com o seu coordenador</Text>
            <Text style={styles.subtitle}>.</Text>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput style={styles.inputs} value={nome} onChangeText={setNome}/>

            <Text style={styles.label}>E-mail</Text>
            <TextInput style={styles.inputs} value={email} onChangeText={setEmail}/>

           

                <View style={styles.viewPicker}>
                <Text style={styles.label}>Curso</Text>

               <Picker 
                placeholder={{label: "Selecione um curso...", value: null}}
                onValueChange={setSelectedValue}
                items={options}
                value={selectedValue}
                />
             
                
        
            </View>
            <Text style={styles.label}>Mensagem</Text>
            <TextInput style={[styles.inputs, {height: 150, textAlignVertical: 'top'}]} multiline scrollEnabled={false} numberOfLines={4} value={mensagem} onChangeText={setMensagem}/>

            <TouchableOpacity onPress={enviarForm}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Enviar</Text>
                </View>
            </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        
    )
}
import { Text, TextInput, View,  TouchableOpacity, Modal, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { styles } from './style'
import { Picker } from '@react-native-picker/picker'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Inter_600SemiBold, Inter_400Regular, useFonts } from '@expo-google-fonts/inter'
import { useLinkProps } from '@react-navigation/native'
import { api } from '../../services/api'
import { Loading } from '../../components/Loading'




export function Coordenador(){

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [curso, setCurso] = useState(0)
    const [mensagem, setMensagem] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailCoordenador, setEmailCoordenador] = useState('')

    const cursos = {
        0: 'Administração',
        1: 'Ciências Contábeis',
        2: 'Educação Física (Licenciatura)',
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
    console.log(cursos[curso])

    const [fontLoaded] = useFonts({
        Inter_600SemiBold, Inter_400Regular
    })
    if(!fontLoaded){
        return null
    }




    async function enviarForm(){
    if(nome === '' || email === '' || mensagem === '' ){
       return alert('Preencha todos os campos.')
    }
    setLoading(true)
    try {

       await api.post('ouvidoria/coordenador', {
            nome,
            email,
            curso,
            text: mensagem,
            }).then(e => console.log(`${e.data} - enviou! OUVIDORIA`))

        await api.post('ouvidoria/emailcoordenador', {
            nome,
            email,
            curso,
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

    return(
         
         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={40}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                <ScrollView showsVerticalScrollIndicator={false}>
        <Header/>
        {loading && <Loading/>}
        <View style={styles.container}>
            
            <Text style={styles.title}>Fale com o seu coordenador</Text>
            <Text style={styles.subtitle}>.</Text>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput style={styles.inputs} value={nome} onChangeText={setNome}/>

            <Text style={styles.label}>E-mail</Text>
            <TextInput style={styles.inputs} value={email} onChangeText={setEmail}/>

           

                <View style={styles.viewPicker}>
                <Text style={styles.label}>Curso</Text>
                    <Picker selectedValue={curso} onValueChange={(item, index) => setCurso(item)} style={styles.picker} >
                    <Picker.Item label="Administração" value={0} />
                    <Picker.Item label="Ciências Contábeis" value={1} />
                    <Picker.Item label="Educação Física (Bacharelado)" value={2} />
                    <Picker.Item label="Educação Física (Licenciatura)" value={3} />
                    <Picker.Item label="Enfermagem" value={4} />
                    <Picker.Item label="Engenharia Civil" value={5} />
                    <Picker.Item label="Estética" value={6} />
                    <Picker.Item label="Farmácia" value={7} />
                    <Picker.Item label="Fisioterapia" value={8} />
                    <Picker.Item label="Nutrição" value={9} />
                    <Picker.Item label="Pedagogia" value={10} />
                    <Picker.Item label="Psicologia" value={11} />
                    <Picker.Item label="Serviço Social" value={12} />
                    </Picker>
             
                
        
            </View>
            <Text style={styles.label}>Messagem</Text>
            <TextInput style={[styles.inputs, {height: 150, textAlignVertical: 'top'}]} multiline={true} numberOfLines={4} value={mensagem} onChangeText={setMensagem}/>

            <TouchableOpacity onPress={enviarForm}>
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
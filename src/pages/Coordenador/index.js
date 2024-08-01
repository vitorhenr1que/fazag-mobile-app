import { Text, TextInput, View,  TouchableOpacity, Modal, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { styles } from './style'

import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Inter_600SemiBold, Inter_400Regular, useFonts } from '@expo-google-fonts/inter'
import { useLinkProps } from '@react-navigation/native'
import { api } from '../../services/api'
import { Loading } from '../../components/Loading'
import InputScrollView from 'react-native-input-scroll-view'
import {Picker} from '@react-native-picker/picker';
import { TextFont } from '../../components/Basics/TextFont'
import { colors } from '../../../styles/theme'
import { ModalCoordenador } from '../../components/ModalForms/ModalCoordenador'


export function Coordenador(){

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

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
        "0": 'Administração',
        "1": 'Ciências Contábeis',
        "2": 'Educação Física (Bacharelado)',
        "3": 'Educação Física (Licenciatura)',
        "4": 'Enfermagem',
        "5": 'Engenharia Civil',
        "6": 'Estética',
        "7": 'Farmácia',
        "8": 'Fisioterapia',
        "9": 'Nutrição',
        "10": 'Pedagogia',
        "11": 'Psicologia',
        "12": 'Serviço Social'
    }

    const emailCoordenador = {
        "0": 'administracao@fazag.edu.br',
        "1": 'cienciascontabeis@fazag.edu.br',
        "2": 'educacaofisicab@fazag.edu.br',
        "3": 'educacaofisical@fazag.edu.br',
        "4": 'enfermagem@fazag.edu.br',
        "5": 'engenhariacivil@fazag.edu.br',
        "6": 'estetica@fazag.edu.br',
        "7": 'farmacia@fazag.edu.br',
        "8": 'fisioterapia@fazag.edu.br',
        "9": 'nutricao@fazag.edu.br',
        "10": 'pedagogia@fazag.edu.br',
        "11": 'psicologia@fazag.edu.br',
        "12": 'servicosocial@fazag.edu.br'
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


    function fecharModal(){
        if(modalVisible === true){
            setModalVisible(false)
        }
    }

                                                                                    // Fechar em 1 segundo quando soltar o toque para dar tempo de pegar o valor no iOS
    return(
         <InputScrollView keyboardOffset={250} showsVerticalScrollIndicator={false} onTouchEnd={() => {
            setTimeout(() => {
                fecharModal()
            }, 1000)
         }}>

        {loading && <Loading/>}
       <View style={styles.lowerHeader}>
        <View style={styles.container}>
            
            <Text style={styles.title}>Fale com o seu coordenador</Text>
            <Text style={styles.subtitle}>.</Text>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput style={styles.inputs} value={nome} onChangeText={setNome}/>

            <Text style={styles.label}>E-mail</Text>
            <TextInput style={styles.inputs} value={email} onChangeText={setEmail}/>

           
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.selectTextContainer}>
                    <TextFont texto={"Selecione seu Curso"} color={colors.white} fontWeight={'bold'}/>
                    <TextFont texto={cursos[selectedValue]} color={colors.gray[100]}/>
            </TouchableOpacity>


  
            <Modal visible={modalVisible} animationType='slide' transparent={true}>
             <ModalCoordenador fecharModal={fecharModal} selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>
            </Modal> 

             
        

            <Text style={styles.label}>Mensagem</Text>

            <TextInput style={[styles.inputs, {height: 150, textAlignVertical: 'top'}]} multiline numberOfLines={4} value={mensagem} scrollEnabled={false} onChangeText={setMensagem} />
 
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
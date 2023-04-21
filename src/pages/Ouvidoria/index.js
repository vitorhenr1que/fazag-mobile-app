import { Text, TextInput, View,  TouchableOpacity, Modal, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { styles } from './style'
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react'
import { Inter_600SemiBold, Inter_400Regular, useFonts } from '@expo-google-fonts/inter'
import { api } from '../../services/api'
import { Loading } from '../../components/Loading'
import InputScrollView from 'react-native-input-scroll-view'
import { TextFont } from '../../components/Basics/TextFont'
import { colors } from '../../../styles/theme';
import { ModalOuvidoriaVinculo } from '../../components/ModalForms/ModalOuvidoriaVinculo';
import { ModalOuvidoriaMotivo } from '../../components/ModalForms/ModalOuvidoriaMotivo';

export function Ouvidoria(){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [vinculo, setVinculo] = useState('')
    const [motivo, setMotivo] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [procurouSetor, setProcurouSetor] = ('Sim')
    const [loading, setLoading] = useState(false)
    const [modalVisibleVinculo, setModalVisibleVinculo] = useState(false)
    const [modalVisibleMotivo, setModalVisibleMotivo] = useState(false)
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
    if(nome === '' || email === '' || mensagem === '' || vinculo === '' ){
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
    
    function fecharModal(){
        if(modalVisibleVinculo === true || modalVisibleMotivo === true){
            setModalVisibleVinculo(false)
            setModalVisibleMotivo(false)
        }
    }

    return(
         
         <InputScrollView keyboardOffset={250} showsVerticalScrollIndicator={false} onTouchEnd={() => {
            setTimeout(() => {
                fecharModal()
            }, 1000)
         }}>

        
        
        <View style={styles.lowerHeader}> 
            {loading && <Loading/>}
            <View style={styles.container}>
            
                <Text style={styles.title}>Ouvidoria</Text>
                <Text style={styles.subtitle}>Ajude a FAZAG a servi-lo melhor.</Text>

                <Text style={styles.label}>Nome Completo</Text>
                <TextInput style={styles.inputs} value={nome} onChangeText={setNome}/>

                <Text style={styles.label}>E-mail</Text>
                <TextInput style={styles.inputs} value={email} onChangeText={setEmail}/>

                <View style={styles.vinculoMotivoContainer}>
                <TouchableOpacity onPress={() => setModalVisibleVinculo(!modalVisibleVinculo)} style={styles.vinculMotivoTextContainer}>
                    <TextFont texto={"Selecione o Vínculo"} color={colors.white} fontWeight={'bold'}/>
                    <TextFont texto={vinculo} color={colors.gray[100]}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisibleMotivo(!modalVisibleMotivo)} style={styles.vinculMotivoTextContainer}>
                    <TextFont texto={"Selecione o Motivo"} color={colors.white} fontWeight={'bold'}/>
                    <TextFont texto={motivo} color={colors.gray[300]}/>
                </TouchableOpacity>
                </View>

                
                <Modal visible={modalVisibleVinculo} animationType='slide' transparent={true}>
                <ModalOuvidoriaVinculo fecharModal={fecharModal} setVinculo={setVinculo} vinculo={vinculo}/>
                </Modal>

                <Modal visible={modalVisibleMotivo} animationType='slide' transparent={true}>
                    <ModalOuvidoriaMotivo fecharModal={fecharModal} setMotivo={setMotivo} motivo={motivo}/>
                </Modal>


                
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
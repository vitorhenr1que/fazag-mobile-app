import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { TextFont } from "../../components/Basics/TextFont";
import { useState } from "react";
import { Line } from "../../components/Basics/Line";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../styles/theme";

export function CanaisDeAtendimento(){
    const [hours, setHours] = useState('')
    const [message, setMessage] = useState('')
    
    function abrirWhatsapp(phoneNumber){

        setHours(new Date().getHours()) 

        if(hours >= 5 && hours < 12){
            setMessage('Olá, bom dia!')
        } 
        else if (hours >= 12 && hours < 18){
            setMessage('Olá, boa tarde!')
        } else {
            setMessage('Olá, boa noite!')
        }

        const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`

        const isSupported = Linking.canOpenURL(url)
        if(isSupported){
            return Linking.openURL(url)
        } else {
            <Text>Link não suportado no dispositivo (Entre em contato com o suporte para saber mais)</Text>
        }
    }

    return (
        <View style={styles.backContainer}>
            <ScrollView style={styles.frontContainer}>

                <TextFont texto={"Canais de Atendimento:"} fontSize={16} fontWeight={"bold"}/>

                <TouchableOpacity style={styles.contactFirstContainer} onPress={() => abrirWhatsapp('5575982296725')}>
                    <View style={styles.contactSecContainer}>
                        <View style={styles.imageContactBox}>
                            <Image source={require('../../../assets/logo-white.png')} style={styles.imageContact}/>
                        </View>
                        <View style={styles.textContactBox}>
                            <TextFont texto={"Atendimento Geral"} fontSize={16} fontWeight={"bold"} color={colors.white}/>
                            <TextFont texto={"faculdade.fazag@gmail.com"} fontSize={12} fontWeight={"regular"} color={colors.white}/>
                        </View>
                        <View style={styles.iconContactBox}>
                            <Ionicons name="logo-whatsapp" size={24} color="white"/>
                        </View> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactFirstContainer} onPress={() => abrirWhatsapp('5575981044923')}>
                    <View style={styles.contactSecContainer}>
                        <View style={styles.imageContactBox}>
                            <Image source={require('../../../assets/logo-white.png')} style={styles.imageContact}/>
                        </View>
                        <View style={styles.textContactBox}>
                            <TextFont texto={"Secretaria de Registros Acadêmicos"} fontSize={16} fontWeight={"bold"} color={colors.white}/>
                            <TextFont texto={"matriculasfazag@gmail.com"} fontSize={12} fontWeight={"regular"} color={colors.white}/>
                        </View>
                        <View style={styles.iconContactBox}>
                            <Ionicons name="logo-whatsapp" size={24} color="white"/>
                        </View> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactFirstContainer} onPress={() => abrirWhatsapp('5575982181138')}>
                    <View style={styles.contactSecContainer}>
                        <View style={styles.imageContactBox}>
                            <Image source={require('../../../assets/logo-white.png')} style={styles.imageContact}/>
                        </View>
                        <View style={styles.textContactBox}>
                            <TextFont texto={"Financeiro do Aluno"} fontSize={16} fontWeight={"bold"} color={colors.white}/>
                            <TextFont texto={"tainara_financeirofazag@hotmail.com"} fontSize={10} fontWeight={"regular"} color={colors.white}/>
                        </View>
                        <View style={styles.iconContactBox}>
                            <Ionicons name="logo-whatsapp" size={24} color="white"/>
                        </View> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactFirstContainer} onPress={() => abrirWhatsapp('5575982181511')}>
                    <View style={styles.contactSecContainer}>
                        <View style={styles.imageContactBox}>
                            <Image source={require('../../../assets/logo-white.png')} style={styles.imageContact}/>
                        </View>
                        <View style={styles.textContactBox}>
                            <TextFont texto={"Setor de Diplomas"} fontSize={16} fontWeight={"bold"} color={colors.white}/>
                            <TextFont texto={"diplomasfazag@gmail.com"} fontSize={12} fontWeight={"regular"} color={colors.white}/>
                        </View>
                        <View style={styles.iconContactBox}>
                            <Ionicons name="logo-whatsapp" size={24} color="white"/>
                        </View> 
                    </View>
                </TouchableOpacity>

              

            </ScrollView>
            
        </View>
    )
}
import { ImageBackground, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { colors } from "../../../styles/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from "./style";
import { TouchableOpacity, Modal, Button } from "react-native";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_300Light, Inter_700Bold } from "@expo-google-fonts/inter";
import { useState } from "react";
import { ModalPage } from "../../components/ModalPage";


export function SignInPage(){
    const [modalVisible, setModalVisible] = useState(false)
    const [fontLoaded] = useFonts({
        Inter_600SemiBold, Inter_400Regular, Inter_300Light, Inter_700Bold
    })
    if(!fontLoaded){
        return null
    }

    function closeModal(){
        setModalVisible(false)
    }

    return (
        <>
        
        <ImageBackground source={require('../../../assets/fazag.png')} style={styles.imageBackground} >
        <LinearGradient start={{x: 0, y: 1}} end={{x: 0, y:0}} colors={['rgba(0,0,0,0.8)', 'transparent']} locations={[.2, 1]} style={styles.gradiantContainer}/>
            <View style={styles.container}>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>{`Aplicativo da FAZAG`}</Text>
            <Text style={styles.subtitle}>Envie mensagens para a ouvidoria, fale com o seu coordenador, consulte o calendário acadêmico e muito mais.</Text>
            </View>
            <TouchableOpacity style={styles.signInButtonContainer} onPress={() => setModalVisible(true)}>
                    <Text style={styles.signInButton}>Entrar</Text>
            </TouchableOpacity>

                <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>

                    <ModalPage fecharModal={closeModal}/>

                </Modal>

            </View>
        </ImageBackground>
        </>
    )
}
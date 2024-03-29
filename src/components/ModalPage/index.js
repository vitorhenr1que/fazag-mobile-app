import { useFonts, Inter_600SemiBold, Inter_400Regular, Inter_300Light, Inter_700Bold, Inter_500Medium } from "@expo-google-fonts/inter";
import { useContext, useState } from "react";
import { ActivityIndicator, Button, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Platform } from "react-native";
import { colors } from "../../../styles/theme";
import { AuthContext } from "../../contexts/auth";
import { jaguar } from "../../services/api";
import { styles } from "./style";
import axios from "axios";

export function ModalPage({fecharModal}){
    const [usuario, setUsuario] = useState('')
    const [pass, setPass] = useState('')
    const {setUser, user, signIn, userVerification, loading} = useContext(AuthContext)
    const [fontLoaded] = useFonts({
        Inter_600SemiBold, Inter_400Regular, Inter_300Light, Inter_700Bold, Inter_500Medium
    })
    if(!fontLoaded){
        return null
    }
    
 

    function logar(){
        signIn(usuario, pass)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} style={{flex: 1}}>
            
            <TouchableWithoutFeedback onPress={() => fecharModal()}>
           
            <View style={styles.modalContainer}>
            
                    <View style={styles.modal}>
               
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Bem-vindo</Text>
                        <Text style={styles.subtitle}>Entre com o seu CPF, E-mail ou CGA.</Text>
                        <Text style={styles.userVerification}>{userVerification}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputUser}  placeholder="Usuário" scrollEnabled={false} placeholderTextColor={colors.gray[500]} value={usuario} onChangeText={(e) => {setUsuario(e)}} />
                        <TextInput style={styles.inputPass} placeholder="Senha" scrollEnabled={false} placeholderTextColor={colors.gray[500]} value={pass} onChangeText={(e) => {setPass(e)}} secureTextEntry/>
                    </View>
                    <TouchableOpacity onPress={() => logar()}>
                        <View style={styles.signInButton}>
                            <Text style={styles.signInButtonText}>{loading ? <ActivityIndicator color={'white'}/> : "Log In"}</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text style={styles.forgotPass}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                  
                    </View>
                    
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
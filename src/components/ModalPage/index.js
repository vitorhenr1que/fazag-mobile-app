import { useFonts, Inter_600SemiBold, Inter_400Regular, Inter_300Light, Inter_700Bold, Inter_500Medium } from "@expo-google-fonts/inter";
import { Button, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { colors } from "../../../styles/theme";
import { styles } from "./style";

export function ModalPage({fecharModal}){
    const [fontLoaded] = useFonts({
        Inter_600SemiBold, Inter_400Regular, Inter_300Light, Inter_700Bold, Inter_500Medium
    })
    if(!fontLoaded){
        return null
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'padding'} keyboardVerticalOffset={0} style={{flex: 1}}>
            
            <TouchableWithoutFeedback onPress={fecharModal}>
           
            <View style={styles.modalContainer}>
            
                    <View style={styles.modal}>
               
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Bem-vindo</Text>
                        <Text style={styles.subtitle}>Entre com o seu CPF, E-mail ou CGA.</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputUser} placeholder="Usuário" placeholderTextColor={colors.gray[500]}/>
                        <TextInput style={styles.inputPass} placeholder="Senha" placeholderTextColor={colors.gray[500]} secureTextEntry/>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.signInButton}>
                            <Text style={styles.signInButtonText}>Log In</Text>
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
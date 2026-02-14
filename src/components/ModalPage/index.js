import { useContext, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Platform, Keyboard } from "react-native";
import { colors } from "../../../styles/theme";
import { AuthContext } from "../../contexts/auth";
import { styles } from "./style";

export function ModalPage({ fecharModal }) {
    const [usuario, setUsuario] = useState('')
    const [pass, setPass] = useState('')
    const { signIn, userVerification, loading } = useContext(AuthContext)

    function logar() {
        if (usuario && pass) {
            signIn(usuario, pass)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
                fecharModal();
            }}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modal}>
                            {/* Modal Handle */}
                            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 40, height: 4, backgroundColor: colors.gray[200], borderRadius: 2 }} />
                            </View>

                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Bem-vindo</Text>
                                <Text style={styles.subtitle}>Entre com o seu CPF, E-mail ou CGA.</Text>
                                {!!userVerification && <Text style={styles.userVerification}>{userVerification}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.inputUser}
                                    placeholder="Usuário"
                                    placeholderTextColor={colors.gray[400]}
                                    value={usuario}
                                    autoCapitalize="none"
                                    onChangeText={setUsuario}
                                />
                                <TextInput
                                    style={styles.inputPass}
                                    placeholder="Senha"
                                    placeholderTextColor={colors.gray[400]}
                                    value={pass}
                                    onChangeText={setPass}
                                    secureTextEntry
                                />
                            </View>

                            <TouchableOpacity
                                onPress={logar}
                                activeOpacity={0.8}
                                disabled={loading}
                            >
                                <View style={[styles.signInButton, { opacity: loading ? 0.7 : 1 }]}>
                                    {loading ? (
                                        <ActivityIndicator color={colors.white} />
                                    ) : (
                                        <Text style={styles.signInButtonText}>Entrar</Text>
                                    )}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.6}>
                                <Text style={styles.forgotPass}>Esqueceu a senha?</Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
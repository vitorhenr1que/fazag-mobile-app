import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { useState } from 'react'
import { api } from '../../services/api'
import { Loading } from '../../components/Loading'
import InputScrollView from 'react-native-input-scroll-view'
import { colors } from '../../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ModernSelectModal } from '../../components/ModernSelectModal';

export function Ouvidoria() {
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
        { label: "Crítica", value: "Crítica" },
        { label: "Denúncia", value: "Denúncia" },
        { label: "Elogio", value: "Elogio" },
        { label: "Informação", value: "Informação" },
        { label: "Reclamação", value: "Reclamação" },
        { label: "Solicitação", value: "Solicitação" },
        { label: "Sugestão", value: "Sugestão" }
    ]

    const optionsVinculo = [
        { label: "Servidor", value: "Servidor" },
        { label: "Aluno", value: "Aluno" },
        { label: "Professor", value: "Professor" },
        { label: "Terceirizado", value: "Terceirizado" },
        { label: "Usuário/Outros", value: "Usuário/Outros" },
    ]

    async function enviarForm() {
        if (nome === '' || email === '' || mensagem === '' || vinculo === '') {
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

        } catch (err) {
            console.log(err.message)
            setLoading(false)
            return alert(err.message)
        }
    }

    return (
        <View style={styles.container}>
            <InputScrollView
                keyboardOffset={100}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {loading && <Loading />}

                <LinearGradient
                    colors={[colors.primary[800], colors.primary[600]]}
                    style={styles.headerGradient}
                >
                    <Text style={styles.title}>Ouvidoria</Text>
                    <Text style={styles.subtitle}>Ajude a FAZAG a servi-lo melhor.{'\n'}Sua opinião é fundamental.</Text>
                </LinearGradient>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput
                        style={styles.inputs}
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Digite seu nome"
                        placeholderTextColor={colors.gray[400]}
                    />

                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.inputs}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="sexemplo@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={colors.gray[400]}
                    />

                    <View style={styles.vinculoMotivoContainer}>
                        <TouchableOpacity onPress={() => setModalVisibleVinculo(true)} style={styles.vinculMotivoTextContainer}>
                            <Text style={styles.selectorLabel}>Vínculo</Text>
                            <Text style={styles.selectorValue}>{vinculo || "Selecionar"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisibleMotivo(true)} style={styles.vinculMotivoTextContainer}>
                            <Text style={styles.selectorLabel}>Motivo</Text>
                            <Text style={styles.selectorValue}>{motivo || "Selecionar"}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Mensagem</Text>
                    <TextInput
                        style={[styles.inputs, { height: 120, paddingTop: 15, textAlignVertical: 'top' }]}
                        multiline
                        numberOfLines={4}
                        value={mensagem}
                        onChangeText={setMensagem}
                        placeholder="Escreva sua mensagem aqui..."
                        placeholderTextColor={colors.gray[400]}
                    />

                    <TouchableOpacity onPress={enviarForm} activeOpacity={0.8}>
                        <View style={styles.submit}>
                            <Text style={styles.submitText}>Enviar Mensagem</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <ModernSelectModal
                    visible={modalVisibleVinculo}
                    onClose={() => setModalVisibleVinculo(false)}
                    title="Selecione seu Vínculo"
                    options={optionsVinculo}
                    onSelect={setVinculo}
                    selectedValue={vinculo}
                />

                <ModernSelectModal
                    visible={modalVisibleMotivo}
                    onClose={() => setModalVisibleMotivo(false)}
                    title="Selecione o Motivo"
                    options={optionsMotivo}
                    onSelect={setMotivo}
                    selectedValue={motivo}
                />

            </InputScrollView>
        </View>
    )
}
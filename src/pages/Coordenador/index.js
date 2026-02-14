import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import { styles } from './style'
import { useState } from 'react'
import { api } from '../../services/api'
import { Loading } from '../../components/Loading'
import InputScrollView from 'react-native-input-scroll-view'
import { colors } from '../../../styles/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { ModernSelectModal } from '../../components/ModernSelectModal'

export function Coordenador() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

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

    // Convert cursos object to array options for ModernSelectModal
    const courseOptions = Object.entries(cursos).map(([key, value]) => ({
        label: value,
        value: key
    })).sort((a, b) => a.label.localeCompare(b.label)); // Alphabetical sort

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

    async function enviarForm() {
        if (nome === '' || email === '' || mensagem === '' || selectedValue === null || selectedValue === '') {
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
                    <Text style={styles.title}>Fale com o Coordenador</Text>
                    <Text style={styles.subtitle}>Entre em contato direto com a coordenação{'\n'}do seu curso.</Text>
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
                        placeholder="seuemail@exemplo.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={colors.gray[400]}
                    />

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectTextContainer}>
                        <Text style={styles.selectorLabel}>SEU CURSO</Text>
                        <Text style={styles.selectorValue}>{cursos[selectedValue] || "Toque para selecionar"}</Text>
                    </TouchableOpacity>

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
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Selecione seu Curso"
                    options={courseOptions}
                    onSelect={setSelectedValue}
                    selectedValue={selectedValue}
                />
            </InputScrollView>
        </View>
    )
}
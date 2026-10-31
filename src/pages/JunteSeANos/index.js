import { useContext, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator, Image, ImageBackground, Keyboard, KeyboardAvoidingView,
    Platform, ScrollView, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';
import { criarPayloadIndicacao, mensagemErroIndicacao } from '../../utils/junteSeANos';
import { styles } from './style';
import { ModernSelectModal } from '../../components/ModernSelectModal';

const etapas = [
    ['Cadastre sua indicação', 'Informe abaixo os dados de quem você quer trazer para a FAZAG.'],
    ['A FAZAG entra em contato', 'Nossa equipe apresenta a instituição e auxilia o indicado na matrícula.'],
    ['Receba seu benefício', 'Após o pagamento da primeira mensalidade do indicado e a validação do Financeiro, o desconto será aplicado na sua próxima parcela a vencer.'],
];

export function JunteSeANos() {
    const { user } = useContext(AuthContext);
    const insets = useSafeAreaInsets();
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [telefone, setTelefone] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [aviso, setAviso] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [carregandoCursos, setCarregandoCursos] = useState(true);
    const [erroCursos, setErroCursos] = useState('');
    const [tentativaCursos, setTentativaCursos] = useState(0);
    const [seletorCursoVisivel, setSeletorCursoVisivel] = useState(false);
    const envioEmAndamento = useRef(false);
    const scrollRef = useRef(null);
    const posicaoConteudo = useRef(0);
    const posicaoFormulario = useRef(0);
    const telefoneRef = useRef(null);

    useEffect(() => {
        const controller = new AbortController();
        async function carregarCursos() {
            setCarregandoCursos(true);
            setErroCursos('');
            try {
                const { data } = await api.get('cursos', { signal: controller.signal, timeout: 15000 });
                if (controller.signal.aborted) return;
                if (!Array.isArray(data)) throw new Error('Resposta de cursos inválida');
                const opcoes = data
                    .filter(item => item?.active === true && typeof item.name === 'string' && item.name.trim())
                    .map(item => ({ label: item.name.trim(), value: item.name.trim() }));
                setCursos(opcoes);
                if (!opcoes.length) setErroCursos('Nenhum curso disponível no momento. Tente novamente mais tarde.');
            } catch (error) {
                if (!controller.signal.aborted) {
                    setCursos([]);
                    setErroCursos('Não foi possível carregar os cursos. Verifique sua conexão e tente novamente.');
                }
            } finally {
                if (!controller.signal.aborted) setCarregandoCursos(false);
            }
        }
        carregarCursos();
        return () => controller.abort();
    }, [tentativaCursos]);

    function irParaFormulario() {
        Keyboard.dismiss();
        scrollRef.current?.scrollTo({
            y: Math.max(0, posicaoConteudo.current + posicaoFormulario.current - 12),
            animated: true,
        });
    }

    function abrirSeletorCurso() {
        if (enviando || carregandoCursos || !cursos.length) return;
        Keyboard.dismiss();
        setSeletorCursoVisivel(true);
    }

    async function enviarIndicacao() {
        if (envioEmAndamento.current) return;
        setAviso(null);
        let payload;
        try {
            payload = criarPayloadIndicacao(user, { nome, curso, telefone });
        } catch (error) {
            setAviso({ tipo: 'erro', texto: error.message });
            return;
        }
        envioEmAndamento.current = true;
        setEnviando(true);
        try {
            await api.post('junte-se-a-nos/create', payload);
            setNome('');
            setCurso('');
            setTelefone('');
            setAviso({ tipo: 'sucesso', texto: 'Indicação enviada! Nossa equipe entrará em contato com o indicado. O benefício depende da efetivação do ingresso e da validação financeira.' });
        } catch (error) {
            setAviso({ tipo: 'erro', texto: mensagemErroIndicacao(error) });
        } finally {
            envioEmAndamento.current = false;
            setEnviando(false);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 24) + 24 }]}>
                <ImageBackground source={require('../../../assets/junte-se-a-nos/fundo.png')} style={styles.hero}>
                    <View style={styles.heroShade}>
                        <Image source={require('../../../assets/junte-se-a-nos/logo.png')} style={styles.logo}
                            resizeMode="contain" accessibilityLabel="Junte-se a nós 2027" />
                        <Text accessibilityRole="header" style={styles.heroTitle}>Indique amigos.{ '\n' }Ganhe descontos.</Text>
                        <Text style={styles.heroText}>Sua indicação aproxima novos alunos da FAZAG e pode render descontos cumulativos para você.</Text>
                        <TouchableOpacity style={styles.indicateButton} onPress={irParaFormulario}
                            activeOpacity={0.85} accessibilityRole="button"
                            accessibilityHint="Rola a página até o formulário de indicação">
                            <Feather name="user-plus" size={22} color="#073E60" />
                            <Text style={styles.indicateButtonText}>Indicar uma pessoa</Text>
                            <Feather name="arrow-down" size={20} color="#073E60" />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={styles.content} onLayout={event => { posicaoConteudo.current = event.nativeEvent.layout.y; }}>
                    <Text style={styles.eyebrow}>PROGRAMA DE INDICAÇÃO • 2027</Text>
                    <Text accessibilityRole="header" style={styles.title}>Junte-se a nós</Text>
                    <Text style={styles.body}>Um programa exclusivo para alunos ativos da FAZAG que indicam novos ingressantes de forma direta.</Text>

                    <View style={styles.benefits}>
                        <View style={[styles.benefit, styles.sameCourse]}>
                            <Text style={styles.percent}>100%</Text>
                            <Text style={styles.benefitTitle}>Mesmo curso</Text>
                            <Text style={styles.benefitText}>de desconto no valor da matrícula por indicação validada.</Text>
                        </View>
                        <View style={[styles.benefit, styles.otherCourse]}>
                            <Text style={styles.percent}>50%</Text>
                            <Text style={styles.benefitTitle}>Outro curso</Text>
                            <Text style={styles.benefitText}>de desconto no valor da matrícula por indicação validada.</Text>
                        </View>
                    </View>
                    <View style={styles.note}>
                        <Feather name="trending-up" size={22} color="#073E60" />
                        <View style={styles.noteContent}>
                            <Text style={styles.noteTitle}>As indicações se somam</Text>
                            <Text style={styles.body}>Os benefícios podem alcançar as parcelas seguintes. Por exemplo: 2 indicações validadas para o mesmo curso geram isenção da matrícula e da mensalidade subsequente.</Text>
                        </View>
                    </View>

                    <Text accessibilityRole="header" style={styles.sectionTitle}>Como funciona</Text>
                    {etapas.map(([titulo, descricao], index) => (
                        <View key={titulo} style={styles.step}>
                            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{index + 1}</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>{titulo}</Text>
                                <Text style={styles.body}>{descricao}</Text>
                            </View>
                        </View>
                    ))}
                    <Text style={styles.rule}>Vale a primeira indicação registrada: candidatos já indicados por outro aluno não geram um novo benefício.</Text>

                    <View style={styles.form} onLayout={event => { posicaoFormulario.current = event.nativeEvent.layout.y; }}>
                        <Text accessibilityRole="header" style={styles.sectionTitle}>Quem vem com você?</Text>
                        <Text style={styles.formIntro}>Preencha os dados do indicado. Seu nome, CPF, curso e matrícula serão vinculados automaticamente à indicação.</Text>

                        <Text style={styles.label}>Nome completo do indicado</Text>
                        <TextInput style={styles.input} value={nome} onChangeText={setNome} editable={!enviando}
                            placeholder="Ex.: João Souza" placeholderTextColor="#64748B" autoCapitalize="words"
                            accessibilityLabel="Nome completo do indicado" returnKeyType="next"
                            onSubmitEditing={abrirSeletorCurso} />

                        <Text style={styles.label}>Curso de interesse</Text>
                        <TouchableOpacity style={[styles.input, styles.courseSelect]} onPress={abrirSeletorCurso}
                            disabled={enviando || carregandoCursos || !cursos.length} accessibilityRole="button"
                            accessibilityLabel={`Curso de interesse: ${curso || 'Selecione um curso'}`}
                            accessibilityState={{ disabled: enviando || carregandoCursos || !cursos.length, expanded: seletorCursoVisivel }}>
                            <Text style={[styles.courseText, !curso && styles.coursePlaceholder]}>
                                {carregandoCursos ? 'Carregando cursos…' : curso || 'Selecione um curso'}
                            </Text>
                            {carregandoCursos ? <ActivityIndicator color="#073E60" /> : <Feather name="chevron-down" size={20} color="#073E60" />}
                        </TouchableOpacity>
                        {!!erroCursos && <View style={styles.courseError}>
                            <Text accessibilityRole="alert" style={styles.body}>{erroCursos}</Text>
                            <TouchableOpacity onPress={() => setTentativaCursos(value => value + 1)} accessibilityRole="button">
                                <Text style={styles.retryText}>Tentar novamente</Text>
                            </TouchableOpacity>
                        </View>}

                        <Text style={styles.label}>Telefone do indicado com DDD</Text>
                        <TextInput ref={telefoneRef} style={styles.input} value={telefone} onChangeText={setTelefone} editable={!enviando}
                            placeholder="Ex.: (75) 99999-9999" placeholderTextColor="#64748B" keyboardType="phone-pad"
                            accessibilityLabel="Telefone do indicado com DDD" />
                        <Text style={styles.hint}>Todos os campos são obrigatórios. Informe um contato que o indicado autorize compartilhar com a FAZAG.</Text>

                        {aviso && <View accessibilityRole="alert" accessibilityLiveRegion="polite"
                            style={[styles.feedback, aviso.tipo === 'sucesso' ? styles.success : styles.error]}>
                            <Text style={styles.feedbackTitle}>{aviso.tipo === 'sucesso' ? 'Indicação recebida' : 'Confira sua indicação'}</Text>
                            <Text style={styles.body}>{aviso.texto}</Text>
                        </View>}

                        <TouchableOpacity style={[styles.submit, enviando && styles.disabled]} onPress={enviarIndicacao}
                            disabled={enviando} activeOpacity={0.8} accessibilityRole="button"
                            accessibilityState={{ disabled: enviando, busy: enviando }}>
                            {enviando ? <ActivityIndicator color="#FFFFFF" /> : <Feather name="user-plus" size={20} color="#FFFFFF" />}
                            <Text style={styles.submitText}>{enviando ? 'Enviando indicação…' : 'Enviar indicação'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <ModernSelectModal visible={seletorCursoVisivel} onClose={() => setSeletorCursoVisivel(false)}
                title="Selecione o curso de interesse" options={cursos} onSelect={setCurso} selectedValue={curso} />
        </KeyboardAvoidingView>
    );
}

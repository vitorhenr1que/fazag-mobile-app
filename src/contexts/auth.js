import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from "react";
import { OneSignal } from 'react-native-onesignal';
import { QualinfoDataLayer } from '../services/qualinfo/dataLayer';
import { AcadwebDataLayer } from '../services/acadweb/dataLayer';
import { CONFIG } from '../config/integrations';

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [userVerification, setUserVerification] = useState('')
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userHistoric, setUserHistoric] = useState([])
    const [userHorario, setUserHorario] = useState([])
    const [urlBv, setUrlBv] = useState('')

    useEffect(() => {
        async function isLogged() {
            try {
                const asyncUserLogged = await AsyncStorage.getItem('user')
                if (asyncUserLogged) {
                    const userData = JSON.parse(asyncUserLogged);
                    // Normalização para compatibilidade com o legado
                    const normalizedUser = {
                        ...userData,
                        name: userData.name || userData.aluno_nome_social || userData.aluno_nome,
                        id: userData.id || userData.aluno_id,
                        curso: userData.curso || userData.cursos?.[0]?.curso_descricao || "",
                        email: userData.email || userData.aluno_email || "",
                        cpf: userData.cpf || userData.aluno_cpf || "",
                        telefone: userData.telefone || userData.aluno_telefone || userData.aluno_celular || "",
                        status: userData.status || userData.cursos?.[0]?.situacao_descricao || ""
                    };
                    setUser(normalizedUser);
                }
            } catch (e) {
                console.error("Erro ao recuperar sessão:", e)
            } finally {
                setLoading(false)
            }
        }
        isLogged()
    }, [])

    async function signIn(usuario, pass) {
        setLoading(true)
        setUserVerification('')

        if (usuario === '' || pass === '') {
            setLoading(false)
            return setUserVerification('Preencha os campos de Usuário e Senha*')
        }

        try {
            let response;
            let userData;
            let token;

            if (CONFIG.MODE === 'ACADWEB') {
                response = await AcadwebDataLayer.signIn(usuario, pass);
                // Normalização para o retorno do Acadweb
                // Se o retorno vier dentro de data ou direto no root, adaptamos
                userData = response.user || response.aluno || response;
                token = response.token || null;
            } else {
                response = await QualinfoDataLayer.signIn(usuario, pass);
                userData = response.user;
                token = response.token;
            }

            // Normalização unificada para o app
            const normalizedUser = {
                ...userData,
                name: userData.aluno_nome_social || userData.aluno_nome || userData.name || "Aluno",
                id: userData.aluno_id || userData.id || userData.pk_aluno,
                curso: userData.cursos?.[0]?.curso_descricao || userData.curso || userData.curso_nome || "",
                email: userData.aluno_email || userData.email || "",
                cpf: userData.aluno_cpf || userData.cpf || "",
                telefone: userData.aluno_telefone || userData.aluno_celular || userData.telefone || "",
                status: userData.cursos?.[0]?.situacao_descricao || userData.situacao || userData.status || ""
            };


            setUser(normalizedUser);
            await AsyncStorage.setItem('user', JSON.stringify(normalizedUser));

            if (token) {
                await AsyncStorage.setItem('token', token);
            }

            // Notificações
            const externalId = String(normalizedUser.id);
            OneSignal.login(externalId);
            OneSignal.User.addTag("cga", externalId);

            if (normalizedUser.curso) {
                // Normaliza o nome do curso para usar como tag (remover espaços e acentos se preferível, mas mantendo simples: lowercase)
                const cursoTag = normalizedUser.curso
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
                    .replace(/\s+/g, '_'); // Substitui espaços por underline para consistência de segmentação

                OneSignal.User.addTag("curso", cursoTag);
            }

            if (normalizedUser.status) {
                OneSignal.User.addTag("status", normalizedUser.status.toLowerCase());
            }

            // Sincronização com o módulo de Eventos
            try {
                const { EventosService } = require('../services/eventos/eventosService');
                await EventosService.upsertAluno({
                    id: normalizedUser.id,
                    nome: normalizedUser.name,
                    email: userData.aluno_email || userData.email || ""
                });
            } catch (eventError) {
                console.warn('Erro ao sincronizar com sistema de eventos:', eventError);
            }

        } catch (error) {
            setUserVerification(error.message || 'Erro ao conectar ao servidor')
        } finally {
            setLoading(false)
        }
    }

    async function signOut() {
        setUser(false)
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('historic')
        await AsyncStorage.removeItem('horario')
        OneSignal.logout()
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            setUser,
            signOut,
            signIn,
            userVerification,
            loading,
            userHistoric,
            userHorario,
            setUserHistoric,
            setLoading,
            urlBv,
            setUrlBv
        }}>
            {children}
        </AuthContext.Provider>
    )
}
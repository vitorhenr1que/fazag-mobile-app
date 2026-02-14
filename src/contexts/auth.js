import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from "react";
import { OneSignal } from 'react-native-onesignal';
import { QualinfoDataLayer } from '../services/qualinfo/dataLayer';

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
                        curso: userData.curso || userData.cursos?.[0]?.curso_descricao || ""
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
            const response = await QualinfoDataLayer.signIn(usuario, pass);

            // Suporte ao novo contrato (user + token)
            const userData = response.user;
            const token = response.token;

            // Normalização para compatibilidade com o legado
            const normalizedUser = {
                ...userData,
                name: userData.aluno_nome_social || userData.aluno_nome || userData.name,
                id: userData.aluno_id || userData.id,
                curso: userData.cursos?.[0]?.curso_descricao || userData.curso || ""
            };

            setUser(normalizedUser);
            await AsyncStorage.setItem('user', JSON.stringify(normalizedUser));

            if (token) {
                await AsyncStorage.setItem('token', token);
            }

            // Notificações - Prioriza campos Qualinfo, fallback para legado if any
            const externalId = userData.aluno_id || userData.id;
            OneSignal.login(externalId);
            OneSignal.User.addTag("cga", externalId);

            if (userData.curso_id || userData.curso) {
                const cursoTag = (userData.curso_descricao || userData.curso || "").toLowerCase();
                OneSignal.User.addTag("curso", cursoTag);
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
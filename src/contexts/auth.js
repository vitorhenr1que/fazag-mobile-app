import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { OneSignal } from 'react-native-onesignal';

export const AuthContext = createContext()
export default function AuthProvider({children}){
    const [userVerification, setUserVerification] = useState('')
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userHistoric, setUserHistoric] = useState('')
    const [userHorario, setUserHorario] = useState('')

    console.log(user)
        useEffect(() => {
            async function isLogged(){
                console.log('ENTROU NO USEEFFECT')
                const asyncUserLogged = await AsyncStorage.getItem('user')
                const asyncHistoricLogged = await AsyncStorage.getItem('historic')
                const asyncHorarioLogged = await AsyncStorage.getItem('horario')
                const keys = AsyncStorage.getAllKeys()
                console.log(keys)

                if(!!asyncUserLogged === true){
                    setUser(JSON.parse(asyncUserLogged))
                }
                if(asyncHistoricLogged){
                    setUserHistoric(JSON.parse(asyncHistoricLogged))
                }
                if(asyncHorarioLogged){
                    setUserHorario(JSON.parse(asyncHorarioLogged))
                }
            }
            isLogged()
        },[])


   


    async function signIn(usuario, pass){ // Logar Usuário
        
        setLoading(true)
        const paramsUser = {
            banco: 'jaguar_fazag',
             proc: `[FX jaguar fazag] "loginaluno", "${usuario}", "${pass}"`
            }
            
        const response = await axios.post('http://jaguar.solutio.net.br:9002/jaguar', paramsUser).then(res => res.data)
        const isLogged = response[0]
        
        if(usuario === '' || pass === ''){
            setLoading(false)
            
            return setUserVerification('Preencha os campos de Usuário e Senha*')
            
        }
        else if (!!isLogged.a_id === true){    // Se a response tiver a_id adicione ao usuário...
            
            const matricula = await axios.post('http://jaguar.solutio.net.br:9002/jaguar', { banco: 'jaguar_fazag', proc: `[FX jaguar fazag] "list-matricula", "${isLogged.a_id.trim()}"` }).then(res => res.data[0])
            const m_id = matricula.m_id
            const semestre = matricula.t_descricao.split(' ')[0] // na API vem ex: "1° SEMESTRE PSICOLOGIA - NOTURNO" > pego só a primeira palavra

            
            //↓ Horário para o mapa de sala ↓
                const horario = await axios.post('http://jaguar.solutio.net.br:9002/jaguar', {banco: 'jaguar_fazag', proc: `[FX jaguar fazag] "horario", ${m_id}`}).then(res => {
                    if(!!res.data.length === true){
                        setUserHorario(res.data)
                        AsyncStorage.setItem('horario', JSON.stringify(res.data))
                    }
                })
            
            
            setUser({                           
                id: isLogged.a_id.trim(),
                name: isLogged.a_nome.trim(),
                cpf: isLogged.au_cpf.trim(),
                email: isLogged.au_email.trim(),
                m_id: m_id,
                semestre: semestre
            })
            const loggedAsyncStorage = await AsyncStorage.setItem('user', JSON.stringify({ // Se a response tiver a_id adicione ao AsyncStorage...
                id: isLogged.a_id.trim(),
                name: isLogged.a_nome.trim(),
                cpf: isLogged.au_cpf.trim(),
                email: isLogged.au_email.trim(),
                m_id: m_id,
                semestre: semestre
            }))
            const paramsHistoric = await axios.post('http://jaguar.solutio.net.br:9002/jaguar', { //AsyncStorage Histórico Acadêmico
            banco: 'jaguar_fazag',
            proc: `[FX jaguar fazag] "historico", "${isLogged.a_id.trim()}"`
            }).then(res => {
                if(!!res.data.length === true){       //Se tiver alguma coisa dentro da resposta adicione a resposta : se não adicione o histórico fake para não dar erro
                    setUserHistoric(res.data)
                    AsyncStorage.setItem('historic', JSON.stringify(res.data))
                    OneSignal.login(isLogged.a_id.trim())
                    OneSignal.User.addTag("curso", `${res.data[0].s_descricao.split('<')[0].toLowerCase()}`) //Obter curso minúsculo e add tag no OneSignal
                    OneSignal.User.addTag("cga", `${isLogged.a_id.trim()}`)
                }else{            
                    let fakeHistoric =  [{
                        s_descricao: "Curso não encontrado",
                        aperiodo: "0°",
                        carga_horaria_cursada: "0",
                        carga_horaria_curso: "0"
                      }]
                    setUserHistoric(
                       fakeHistoric
                    )
                    AsyncStorage.setItem('historic', JSON.stringify(fakeHistoric))
                }
                
            })
            
        }
        else {
            setUserVerification('Usuário Inválido*')
        }
    
        return setLoading(false)
    }

    async function signOut(){ // Deslogar Usuário
        setUser(false)
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('historic')
        await AsyncStorage.removeItem('horario')
         OneSignal.logout()
    }



return (
    <AuthContext.Provider value={{signed: !!user , user, setUser, signOut, signIn, userVerification, loading, userHistoric, userHorario, setUserHistoric, setLoading}}>
        {children}
    </AuthContext.Provider>
)
}
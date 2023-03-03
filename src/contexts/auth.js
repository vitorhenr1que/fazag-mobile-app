import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()
export default function AuthProvider({children}){
    const [userVerification, setUserVerification] = useState('')
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userHistoric, setUserHistoric] = useState('')

    console.log(user)
        useEffect(() => {
            async function isLogged(){
                const asyncUserLogged = await AsyncStorage.getItem('user')
                const asyncHistoricLogged = await AsyncStorage.getItem('historic')

                if(!!asyncUserLogged === true){
                    setUser(JSON.parse(asyncUserLogged))
                }
                if(!!asyncHistoricLogged === true){
                    setUserHistoric(JSON.parse(asyncHistoricLogged))
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
            setUserVerification('Preencha os campos de Usuário e Senha*')
            
        }
        else if (!!isLogged.a_id === true){    // Se a response tiver a_id adicione ao usuário...
            setUser({                           
                id: isLogged.a_id.trim(),
                name: isLogged.a_nome.trim(),
                cpf: isLogged.au_cpf.trim(),
                email: isLogged.au_email.trim(),
            })
            const loggedAsyncStorage = await AsyncStorage.setItem('user', JSON.stringify({ // Se a response tiver a_id adicione ao AsyncStorage...
                id: isLogged.a_id.trim(),
                name: isLogged.a_nome.trim(),
                cpf: isLogged.au_cpf.trim(),
                email: isLogged.au_email.trim(),
            }))
            const paramsHistoric = await axios.post('http://jaguar.solutio.net.br:9002/jaguar', { //AsyncStorage Histórico Acadêmico
            banco: 'jaguar_fazag',
            proc: `[FX jaguar fazag] "historico", "${isLogged.a_id.trim()}"`
            }).then(res => setUserHistoric(res.data))
            await AsyncStorage.setItem('historic', JSON.stringify(userHistoric))
            
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
    }



return (
    <AuthContext.Provider value={{signed: !!user , user, setUser, signOut, signIn, userVerification, loading, userHistoric}}>
        {children}
    </AuthContext.Provider>
)
}
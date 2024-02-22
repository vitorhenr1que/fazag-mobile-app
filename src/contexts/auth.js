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
                console.log('ENTROU NO USEEFFECT')
                const asyncUserLogged = await AsyncStorage.getItem('user')
                const asyncHistoricLogged = await AsyncStorage.getItem('historic')
                const keys = AsyncStorage.getAllKeys()
                console.log(keys)

                if(!!asyncUserLogged === true){
                    setUser(JSON.parse(asyncUserLogged))
                }
                if(asyncHistoricLogged){
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
            setLoading(false)
            return setUserVerification('Preencha os campos de Usuário e Senha*')
            
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
            }).then(res => {
                if(!!res.data.length === true){       //Se tiver alguma coisa dentro da resposta adicione a resposta : se não adicione o histórico fake para não dar erro
                    setUserHistoric(res.data)
                    AsyncStorage.setItem('historic', JSON.stringify(res.data))
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

    }



return (
    <AuthContext.Provider value={{signed: !!user , user, setUser, signOut, signIn, userVerification, loading, userHistoric, setUserHistoric, setLoading}}>
        {children}
    </AuthContext.Provider>
)
}
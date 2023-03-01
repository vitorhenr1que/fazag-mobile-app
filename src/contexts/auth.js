import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()
export default function AuthProvider({children}){

    const [user, setUser] = useState(false)
    console.log(user)
        useEffect(() => {
            async function isLogged(){
                const asyncLogged = await AsyncStorage.getItem('user')
                if(!!asyncLogged === true){
                    setUser(JSON.parse(asyncLogged))
                }
            }
            isLogged()
        },[])


   


    async function signIn(usuario, pass){ // Logar Usuário
        const params = {
            banco: 'jaguar_fazag',
             proc: `[FX jaguar fazag] "loginaluno", "${usuario}", "${pass}"`
            }
        const response = await axios.post('http://jaguar.solutio.net.br:9002/jaguar', params).then(res => res.data)
        const isLogged = response[0]
        if(usuario === '' || pass === ''){
            console.log('Preencha os campos de Usuário e Senha')
        }
        else if (!!isLogged.a_id === true){    // Se a response tiver a_id adicione ao usuário...
            setUser({                           
                id: isLogged.a_id.trim(),
                name: isLogged.a_nome.trim(),
                cpf: isLogged.au_cpf.trim(),
                email: isLogged.au_email.trim(),
            })
            const logged = await AsyncStorage.setItem('user', JSON.stringify({ // Se a response tiver a_id adicione ao AsyncStorage...
                id: isLogged.a_id.trim(),
                name: isLogged.a_nome.trim(),
                cpf: isLogged.au_cpf.trim(),
                email: isLogged.au_email.trim(),
            }))
        }
        else {
            console.log('Usuário Inválido')
        }
    }

    async function signOut(){ // Deslogar Usuário
        setUser(false)
        await AsyncStorage.removeItem('user')
    }



return (
    <AuthContext.Provider value={{signed: !!user , user, setUser, signOut, signIn}}>
        {children}
    </AuthContext.Provider>
)
}
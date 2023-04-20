import { useContext, useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'
import { AuthContext } from '../../contexts/auth'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import { Loading } from '../../components/Loading'
import { styles } from './style'
import { TextFont } from '../../components/Basics/TextFont'
import { colors } from '../../../styles/theme'

export function Ava(){
    const {user, loading, setLoading} = useContext(AuthContext)
    const [url, setUrl] = useState(``)
    const [go, setGo] = useState(false)
    const [textError, setTextError] = useState(false)
    const bannerAVA = require("../../../assets/bannerava.png")

        async function getUrl(){
           setLoading(true)
           
           const response = await axios(`https://moodle.fazag.edu.br/webservice/rest/server.php?wstoken=096833d312cf089dc2975f054ff66ed6&wsfunction=auth_userkey_request_login_url&moodlewsrestformat=json&user[username]=${user.cpf}`)
           const loginurl = await response.data.loginurl
           setUrl(loginurl)
           console.log(loading)

           if(loginurl === '' || loginurl === undefined){
           console.log('está vazio')
           setLoading(false)
           setTextError(true)
           console.log(loading)
           return setGo(false)
           }

           else {
               console.log('Deu green!')
               console.log(url)
               setLoading(false)
               console.log(loading)
               return setGo(true)
           }
     
         }
         


    
    
    if(go === false){
        return (
            <View style={styles.backContainer}>
            <View style={styles.frontContainer}>
                <View style={styles.entrarContainer}>
                    <TextFont texto={"Bem vindo ao Ambiente Virtual de Aprendizagem da FAZAG"} fontSize={24} fontWeight={'bold'} textAlign={'center'} />
                </View>
                <View style={styles.bannerContainer}>
                    <Image source={bannerAVA} style={styles.bannerAVA}/>
                </View>
                <View style={styles.entrarContainer}>
                    {textError && <TextFont texto={"Credenciais Inválidas, Procure o Suporte."} color={colors.red[300]} />}
                    <TouchableOpacity style={styles.buttonEntrar} onPress={() => getUrl()}>
                     <TextFont texto={loading ? <ActivityIndicator color={colors.white}/> : "Entrar no AVA"} color={colors.white} fontSize={16} fontWeight={'bold'}/>
                    </TouchableOpacity>
                </View>
                
            </View>
            </View>
        )
    } else {
        return(
            <WebView source={{uri: url}}/> 
         )
    }
}
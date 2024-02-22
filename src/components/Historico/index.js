import { useContext } from "react";
import { Text, TouchableOpacity, View, Linking } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { styles } from "./style";



export function Historico(){
    const {user} = useContext(AuthContext)
    
    async function handleGenerateHistoricButton(){
        const url = `http://jaguar.solutio.net.br/jaguar/wjaprepararel20.jsp?servidor=jaguar.solutio.net.br&banco=jaguar_fazag&relatorio=historico.jasper&a_id=${user.id}`
        const isSupported = Linking.canOpenURL(url)
        
        if(isSupported){
            Linking.openURL(url)
        } else {
            console.log('Não foi possível abrir o link')
        }
    }

    return (
        <>
            <TouchableOpacity style={styles.buttonGenerateHistoric} onPress={() => handleGenerateHistoricButton()} >
                <Text style={styles.textButton}>Histórico Completo</Text>
            </TouchableOpacity>
        </>
    )
}
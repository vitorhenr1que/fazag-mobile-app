import { useContext } from "react";
import { Text, TouchableOpacity, View, Linking } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { styles } from "./styles";



export function ComprovanteDeMatricula(){
    const {user} = useContext(AuthContext)
    
    async function handleGenerateProofButton(){
        const url = `http://jaguar.solutio.net.br/jaguar/wjaprepararel20.jsp?servidor=jaguar.solutio.net.br&banco=jaguar_fazag&relatorio=compmatricula.jasper&sol_id=35782&m_id=${user.m_id}&matricula=${user.m_id}&SOLID=35782&a_id=${user.id}%20&CGA=${user.id}%20&codigo=11&complemento=`
        const isSupported = Linking.canOpenURL(url)
        
        if(isSupported){
            Linking.openURL(url)
        } else {
            console.log('Não foi possível abrir o link')
        }
    }

    return (
        <>
            <TouchableOpacity style={styles.buttonGenerateProof} onPress={() => handleGenerateProofButton()} >
                <Text style={styles.textButton}>Comprovante de Matrícula</Text>
            </TouchableOpacity>
        </>
    )
}
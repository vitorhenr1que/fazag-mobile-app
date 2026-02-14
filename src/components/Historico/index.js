import { useContext } from "react";
import { Text, TouchableOpacity, Linking } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { styles } from "./style";
import { Feather } from '@expo/vector-icons';
import { colors } from "../../../styles/theme";

export function Historico() {
    const { user } = useContext(AuthContext)

    async function handleGenerateHistoricButton() {
        const url = `http://jaguar.solutio.net.br/jaguar/wjaprepararel20.jsp?servidor=jaguar.solutio.net.br&banco=jaguar_fazag&relatorio=historico.jasper&a_id=${user.id}`
        const isSupported = await Linking.canOpenURL(url)

        if (isSupported) {
            Linking.openURL(url)
        } else {
            console.log('Não foi possível abrir o link')
        }
    }

    return (
        <TouchableOpacity style={styles.buttonGenerateHistoric} onPress={() => handleGenerateHistoricButton()} activeOpacity={0.7}>
            <Feather name="file-text" size={20} color={colors.blue[500]} />
            <Text style={styles.textButton}>Histórico Completo</Text>
        </TouchableOpacity>
    )
}
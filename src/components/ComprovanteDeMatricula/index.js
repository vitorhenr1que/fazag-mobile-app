import { useContext } from "react";
import { Text, TouchableOpacity, Linking } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { styles } from "./styles";
import { Feather } from '@expo/vector-icons';
import { colors } from "../../../styles/theme";

export function ComprovanteDeMatricula() {
    const { user } = useContext(AuthContext)

    async function handleGenerateProofButton() {
        const url = `http://jaguar.solutio.net.br/jaguar/wjaprepararel20.jsp?servidor=jaguar.solutio.net.br&banco=jaguar_fazag&relatorio=comprovantematricula.jasper&a_id=${user.id}`
        const isSupported = await Linking.canOpenURL(url)

        if (isSupported) {
            Linking.openURL(url)
        } else {
            console.log('Não foi possível abrir o link')
        }
    }

    return (
        <TouchableOpacity style={styles.buttonGenerateProof} onPress={() => handleGenerateProofButton()} activeOpacity={0.7}>
            <Feather name="check-square" size={20} color={colors.blue[500]} />
            <Text style={styles.textButton}>Comprovante de Matrícula</Text>
        </TouchableOpacity>
    )
}
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./style";
import axios from "axios";
import { useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export function ItemBibliotecaVirtual({ iconName, size, color, text }) {
    const { urlBv, setUrlBv } = useContext(AuthContext);
    const navegar = useNavigation();

    async function handleClick() {
        const sort = Math.floor(Math.random() * 300);

        const xmlData = `<?xml version="1.0" encoding="utf-8"?>
                            <CreateAuthenticatedUrlRequest xmlns="http://dli.zbra.com.br"
                            xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                            <FirstName>Aluno</FirstName>
                            <LastName>FAZAG</LastName>
                            <Email>aluno${sort}</Email>
                        </CreateAuthenticatedUrlRequest>`;

        console.log('TESTE DO XML -->> ', xmlData);
        try {
            const AuthURL = await axios.post('https://integracao.dli.minhabiblioteca.com.br/DigitalLibraryIntegrationService/AuthenticatedUrl',
                xmlData, {
                headers: {
                    "Content-Type": "text/xml;charset=utf-8",
                    "X-DigitalLibraryIntegration-API-Key": `${process.env.EXPO_PUBLIC_MINHA_BIBLIOTECA}`
                }
            });

            const match = AuthURL.data.match(/<AuthenticatedUrl>(.*?)<\/AuthenticatedUrl>/);
            const url = match ? match[1] : null;
            console.log('URL -->> ', url);

            setUrlBv(url);
            navegar.navigate('BibliotecaVirtual');
        } catch (error) {
            console.error("Erro ao acessar Biblioteca Virtual:", error);
        }
    }

    return (
        <TouchableOpacity style={styles.box} onPress={handleClick}>
            <View style={styles.boxCircleContainer}>
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}
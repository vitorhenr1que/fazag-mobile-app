import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { TextFont } from "../Basics/TextFont";
import { styles } from "./style";
import axios from "axios";
import {useContext} from 'react'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export function ItemBibliotecaVirtual({iconName, size, color, text}){
    const {urlBv, setUrlBv} = useContext(AuthContext)
    const navegar = useNavigation()
    async function handleClick(){
        const sort = Math.floor(Math.random() * 300)
        await axios.post('https://integracao.dli.minhabiblioteca.com.br/DigitalLibraryIntegrationService/AuthenticatedUrl', {
                "email": `aluno${sort}`,
                "FirstName": "Aluno",
                "LastName": "FAZAG"
        }, {
            headers: {
                
                "X-DigitalLibraryIntegration-API-Key": "30954bda-f0b0-44a8-936e-da12723b042f"
            }
        }).then(res => setUrlBv(res.data["AuthenticatedUrl"]))
        console.log(urlBv)
         const nav = navegar.navigate('BibliotecaVirtual')
    }

    return (
    <TouchableOpacity style={styles.box} onPress={handleClick}>
            <View style={styles.boxCircleContainer}>
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
            </View>
            <TextFont textAlign={'center'} color={'#000'} texto={text}/>
        </TouchableOpacity>
    )
}
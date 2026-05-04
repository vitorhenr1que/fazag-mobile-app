import { TouchableOpacity, View } from "react-native";
import { BoxMainVertical } from "./";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

const data = [{
    id: 1,
    name: "Ouvidoria FAZAG",
    image: require('../../../assets/ouvidoria.png'),
    description: "Ajude a FAZAG a servi-lo melhor.",
    route: 'Ouvidoria'
},
{
    id: 2,
    name: "Fale com o seu coordenador",
    image: require('../../../assets/coordenador.png'),
    description: "Agora você pode entrar em contato direto com o seu coordenador.",
    route: 'Coordenador'
},
{
    id: 3,
    name: "Calendário Acadêmico",
    image: require('../../../assets/calendar.png'),
    description: "Fique por dentro de tudo que acontecerá na FAZAG durante o semestre.",
    route: 'Calendario'
},
{
    id: 5,
    name: "Financeiro",
    image: require('../../../assets/calendar.png'), // Placeholder
    description: "Consulte boletos, benefícios e seu histórico de pagamentos.",
    route: 'Financeiro'
},
{
    id: 6,
    name: "Eventos e Cursos",
    image: require('../../../assets/pedagogico.png'), // Using pedagogical icon as placeholder or similar
    description: "Inscreva-se em palestras, workshops e emita seus certificados.",
    route: 'Eventos'
},
{
    id: 4,
    name: "Canais de Atendimento",
    image: require('../../../assets/whatsapp-icon.png'),
    description: "Entre em contato com nossos setores de atendimento por whatsapp ou e-mail.",
    route: 'CanaisDeAtendimento'
},
{
    id: 7,
    name: "Publicações Institucionais",
    image: require('../../../assets/pedagogico.png'),
    description: "Acesse editais, regulamentos e outros documentos da FAZAG.",
    route: 'PublicacoesInstitucionais'
}
]

export function ListBoxMainVertical() {
    return (
        <View style={styles.listMap}>
            {data.map((index) => {
                return (

                    <BoxMainVertical key={index.id} name={index.name} image={index.image} description={index.description} route={index.route} />

                )
            })}
        </View>
    )
}
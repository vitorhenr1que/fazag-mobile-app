import { FlatList } from "react-native";
import { BoxMainVertical } from ".";

const data = [{
    id: 1,  
    name: "Ouvidoria FAZAG",
    image: require('../../../assets/ouvidoria.png')
}, 
{
    id: 2,
    name: "Fale com o seu coordenador",
    image: require('../../../assets/coordenador.png')
},
{
    id: 3,
    name: "Fale com o seu coordenador",
    image: require('../../../assets/coordenador.png')
},
{
    id: 4,
    name: "Fale com o seu coordenador",
    image: require('../../../assets/coordenador.png')
}
]

export function List(){
    <FlatList data={data} renderItem={(index) => {<BoxMainVertical name={index.name} image={index.image}/>}}/>
}
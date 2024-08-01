import { View } from 'react-native'
import { BoxMainHorizontal } from './'
import { styles } from './styles'



export function ListBoxMainHorizontal(){


    const horizontalItems = [
        {
            id: '0',
            title: 'Financeiro',
            image: require('../../../assets/financeiro.png'),
            disabled: {
                backgroundColor: '#a9a9a9'
            },
            route: 'Home'
        },
        {
            id: '1',
            title: 'Pedagógico',
            image: require('../../../assets/pedagogico.png'),
            route: 'Pedagogico'
        },
        {
            id: '2',
            title: 'Serviços',
            image: require('../../../assets/servicos.png'),
            route: 'Servicos'
        },
    ]
    
    return (
        <View style={styles.divScroll}>
            {horizontalItems.map((item) => {
                if(item.id === '0'){
                    return <BoxMainHorizontal key={item.id} title={item.title} image={item.image} color={item.disabled} route={item.route}/>
                }
                return <BoxMainHorizontal key={item.id} title={item.title} image={item.image} route={item.route}/>
            })}
        </View>
    )
}
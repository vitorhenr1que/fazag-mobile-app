import { View } from 'react-native'
import { BoxMainHorizontal } from './'
import { styles } from '../Main/style' // Import styles from Main to access grid layout

export function ListBoxMainHorizontal() {
    const horizontalItems = [
        {
            id: '0',
            title: 'Financeiro',
            image: require('../../../assets/financeiro.png'),
            route: 'Financeiro'
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
        <View style={styles.quickAccessGrid}>
            {horizontalItems.map((item) => {
                return <BoxMainHorizontal key={item.id} title={item.title} image={item.image} route={item.route} />
            })}
        </View>
    )
}
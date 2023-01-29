import { View, StatusBar } from 'react-native';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { styles } from './home';

export function Home(){
    return (
        <View style={styles.container} >
        <Header/>
        <Main/>
        {/*<Footer/>*/}
      </View>
    )
}
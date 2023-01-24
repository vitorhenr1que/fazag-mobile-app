
import { View, StatusBar } from 'react-native';
import { Footer } from './src/components/Footer';
import { Header } from './src/components/Header';
import { Main } from './src/components/Main';
import { styles } from './styles/home';

export default function App() {
  return (
    <View style={styles.container} >
      <StatusBar barStyle={'default'}/>
      <Header/>
      <Main/>
      <Footer/>
    </View>
  );
}


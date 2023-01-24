import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Form } from './src/components/Form';
import { Header } from './src/components/Header';
import { Main } from './src/components/Main';
import { Title } from './src/components/Title';
import { styles } from './styles/home';

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <Main/>
    </View>
  );
}


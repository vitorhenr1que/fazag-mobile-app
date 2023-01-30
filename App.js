import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './src/components/Header';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';

export default function App() {

  return (
    <NavigationContainer>
    <AuthProvider>
      <StatusBar/>
      <Routes/>
    </AuthProvider>
    </NavigationContainer>
  );
}


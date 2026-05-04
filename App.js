import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './src/components/Header';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
import { useEffect } from 'react';
import { OneSignal, LogLevel } from 'react-native-onesignal';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { Alert, Linking } from 'react-native';

const linking = {
  prefixes: ['fazag://', 'https://fazag.edu.br', 'https://www.fazag.edu.br'],
  config: {
    screens: {
      CanaisDeAtendimento: 'atendimento/:sector?',
      Ouvidoria: 'ouvidoria',
      Calendario: 'calendario',
      Coordenador: 'coordenador',
      Financeiro: 'financeiro',
      Eventos: 'eventos',
      PublicacoesInstitucionais: 'publicacoes',
      Nusp: 'nusp',
      AVA: 'ava',
      Mapa_de_Sala: 'mapa',
      Perfil: 'perfil',
      BibliotecaVirtual: 'biblioteca',
      Pedagogico: 'pedagogico',
      Servicos: 'servicos',
    },
  },
};

// para o expo go não crashar no iOS:
// ... (comentários omitidos para brevidade no diff, mas mantidos no arquivo)

export default function App() {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);
    
    // Also need enable notifications to complete OneSignal setup
    OneSignal.Notifications.requestPermission(true); 

    // Verificar atualizações OTA
    async function updateApp() {
      if (!__DEV__) {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            Alert.alert(
              'Nova Versão Disponível',
              'Uma atualização foi baixada e está pronta para uso. Deseja reiniciar o app agora?',
              [
                { text: 'Mais tarde', style: 'cancel' },
                { text: 'Reiniciar agora', onPress: () => Updates.reloadAsync() }
              ]
            );
          }
        } catch (e) {
          console.log('Erro ao buscar atualização:', e);
        }
      }
    }
    updateApp();
  },[]) 

  return (
    <NavigationContainer linking={linking}>
    <AuthProvider>
      <StatusBar/>
      <Routes/>
    </AuthProvider>
    </NavigationContainer>
  );
}


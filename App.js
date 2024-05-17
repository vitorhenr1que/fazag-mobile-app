import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './src/components/Header';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
import { useEffect } from 'react';
import { OneSignal, LogLevel } from 'react-native-onesignal';
import Constants from 'expo-constants';

// para o expo go não crashar no iOS:
// npm uninstall onesignal-expo-plugin
// npm uninstall react-native-onesignal
// comentar useEffect
// Comentar linhas do Login e Logout do OneSignal no auth.js
// remover import do OneSignal do auth.js e do App.js
// Remover de app.json - OneSignal ID e Plugins

export default function App() {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);
    
    // Also need enable notifications to complete OneSignal setup
    OneSignal.Notifications.requestPermission(true); 
  },[]) 

  return (
    <NavigationContainer>
    <AuthProvider>
      <StatusBar/>
      <Routes/>
    </AuthProvider>
    </NavigationContainer>
  );
}


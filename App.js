import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './src/components/Header';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
import OneSignal from 'react-native-onesignal';
import { useEffect } from 'react';


export default function App() {
  useEffect(() => {
    // OneSignal Initialization
OneSignal.setAppId("cfaa1db6-012b-4078-be46-ab8df7146f83");

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});
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


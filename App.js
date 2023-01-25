

import { Footer } from './src/components/Footer';
import { Header } from './src/components/Header';
import { Main } from './src/components/Main';
import { styles } from './src/pages/Home/home';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './src/pages/Home';
import { User } from './src/pages/User';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Atendimento } from './src/pages/Atendimento';
import { Historico } from './src/pages/Historico';
import { Ouvidoria } from './src/pages/Ouvidoria';

const Tab = createBottomTabNavigator()
export default function App() {

icons = {
  Home: {
    name: 'home-outline'
  },
  Historico: {
    name: 'document-attach-outline'
  },
  Atendimento: {
    name: 'message-circle'
  },
  Perfil: {
    name: 'user'
  },
}

  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({route}) => ({ // pegar a rota atual
        tabBarIcon: ({color, size}) => {
          const { name } = icons[route.name]
          if(name === 'home-outline'){
            return <Ionicons name={name} size={size} color={color} />
          }
          if(name === 'document-attach-outline'){
            return <Ionicons name={name} size={size} color={color} />
          }
          if(name === 'message-circle'){
            return <Feather name={name} size={size} color={color} />
          }
          if(name === 'user'){
            return <Feather name={name} size={size} color={color} />
          }
        },
        tabBarStyle: { // Estilo da Barra de Navegação
          height: 55,
          alignItems: 'center',
          
        },
        tabBarActiveTintColor: 'black',
        //tabBarInactiveTintColor: 'black',
        headerShown: false,
      }
      
      
      )}>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Historico" component={Historico}/>
        <Tab.Screen name="Atendimento" component={Atendimento}/>
        <Tab.Screen name="Perfil" component={User}/>
        <Screen name="Ouvidoria" component={Ouvidoria}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}


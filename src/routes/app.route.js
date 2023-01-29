
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../../src/pages/Home';
import { User } from '../../src/pages/User';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Atendimento } from '../../src/pages/Atendimento';
import { Historico } from '../../src/pages/Historico';
import { Ouvidoria } from '../../src/pages/Ouvidoria';
import { Calendario } from '../../src/pages/Calendario';
import { Coordenador } from '../../src/pages/Coordenador';
import { Header } from '../components/Header';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const icons = {
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

function Tabs(){
 return (
  <Tab.Navigator
  screenOptions={({route}) => ({ // pegar a rota atual
    tabBarIcon: ({color, size}) => {
      const { name } = icons[route.name] //desestruture o "name:" de dentro da const icons['rota.name']

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
</Tab.Navigator>
 )
}

export default function AppRoute() {

  return (
    <>
    <Header/>
     <Stack.Navigator 
     screenOptions={{
      headerShown: false
     }
     }>
      <Stack.Screen name='Tabs' component={Tabs}/>
      <Stack.Screen name='Ouvidoria' component={Ouvidoria}/>
      <Stack.Screen name='Calendario' component={Calendario}/>
      <Stack.Screen name='Coordenador' component={Coordenador}/>
     </Stack.Navigator>
     </>
  );
}


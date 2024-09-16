
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../../src/pages/Home';
import { User } from '../../src/pages/User';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { MapaDeSala } from '../../src/pages/MapaDeSala';
import { Ouvidoria } from '../../src/pages/Ouvidoria';
import { Calendario } from '../../src/pages/Calendario';
import { Coordenador } from '../../src/pages/Coordenador';
import { Header } from '../components/Header';
import { CanaisDeAtendimento } from '../pages/CanaisDeAtendimento';
import { Ava } from '../pages/Ava';
import { Servicos } from '../pages/Servicos';
import { Pedagogico } from '../pages/Pedagogico';
import { BibliotecaVirtual } from '../pages/BibliotecaVirtual';
import { Nusp } from '../pages/Nusp';


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const icons = {
  Home: {
    name: 'home-outline'
  },
  AVA: {
    name: 'chalkboard-teacher'
  },
  Mapa_de_Sala: {
    name: 'map'
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
      if(name === 'chalkboard-teacher'){
        return <FontAwesome5 name={name} size={size} color={color} />
      }
      if(name === 'map'){
        return <Feather name="map" size={size} color={color} />
      }
      if(name === 'user'){
        return <Feather name={name} size={size} color={color} />
      }
    },
    tabBarStyle: { // Estilo da Barra de Navegação
      height: "8%",
      alignItems: 'center',
      
    },
    tabBarActiveTintColor: 'black',
    //tabBarInactiveTintColor: 'black',
    headerShown: false,
  }
  
  
  )}>
    <Tab.Screen name="Home" component={Home}/>
    <Tab.Screen name="AVA" component={Ava}/>
    <Tab.Screen name="Mapa_de_Sala" component={MapaDeSala}/>
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
      <Stack.Screen name='CanaisDeAtendimento' component={CanaisDeAtendimento}/>
      <Stack.Screen name='Ava' component={Ava}/>
      <Stack.Screen name='Servicos' component={Servicos}/>
      <Stack.Screen name='Pedagogico' component={Pedagogico}/>
      <Stack.Screen name='BibliotecaVirtual' component={BibliotecaVirtual}/>
      <Stack.Screen name='Nusp' component={Nusp}/>
     </Stack.Navigator>
     </>
  );
}


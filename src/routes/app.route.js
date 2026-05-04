
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


import { Financeiro } from '../pages/Financeiro';
import { Eventos } from '../pages/Eventos';
import { EventoDetail } from '../pages/Eventos/EventoDetail';
import { MinhasInscricoes } from '../pages/Eventos/MinhasInscricoes';
import { CertificateViewer } from '../pages/Eventos/CertificateViewer';
import { PublicacoesInstitucionais } from '../pages/PublicacoesInstitucionais';
import { PublicationViewer } from '../pages/PublicacoesInstitucionais/PublicationViewer';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

import { View, Platform } from 'react-native';
import { colors } from '../../styles/theme';

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Cleaner look without labels, or keep true if preferred
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 20,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: colors.white,
          borderRadius: 25,
          height: 70,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          paddingBottom: 0, // Fix alignment
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'AVA') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Mapa_de_Sala') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Custom styling for active icon container
          return (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top: Platform.OS === 'ios' ? 10 : 0
            }}>
              <Ionicons name={iconName} size={26} color={color} />
              {focused && (
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: colors.primary[600],
                  marginTop: 6
                }} />
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="AVA" component={Ava} />
      <Tab.Screen name="Mapa_de_Sala" component={MapaDeSala} />
      <Tab.Screen name="Perfil" component={User} />
    </Tab.Navigator>
  )
}

export default function AppRoute() {

  return (
    <>
      <Header />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }
        }>
        <Stack.Screen name='Tabs' component={Tabs} />
        <Stack.Screen name='Ouvidoria' component={Ouvidoria} />
        <Stack.Screen name='Calendario' component={Calendario} />
        <Stack.Screen name='Coordenador' component={Coordenador} />
        <Stack.Screen name='CanaisDeAtendimento' component={CanaisDeAtendimento} />
        <Stack.Screen name='Ava' component={Ava} />
        <Stack.Screen name='Servicos' component={Servicos} />
        <Stack.Screen name='Pedagogico' component={Pedagogico} />
        <Stack.Screen name='BibliotecaVirtual' component={BibliotecaVirtual} />
        <Stack.Screen name='Nusp' component={Nusp} />
        <Stack.Screen name='Financeiro' component={Financeiro} />
        <Stack.Screen name='Eventos' component={Eventos} />
        <Stack.Screen name='EventoDetail' component={EventoDetail} />
        <Stack.Screen name='MinhasInscricoes' component={MinhasInscricoes} />
        <Stack.Screen name='CertificateViewer' component={CertificateViewer} />
        <Stack.Screen name='PublicacoesInstitucionais' component={PublicacoesInstitucionais} />
        <Stack.Screen name='PublicationViewer' component={PublicationViewer} />
      </Stack.Navigator>
    </>
  );
}



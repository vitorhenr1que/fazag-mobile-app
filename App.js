

import { Footer } from './src/components/Footer';
import { Header } from './src/components/Header';
import { Main } from './src/components/Main';
import { styles } from './src/pages/Home/home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './src/pages/Home';
import { User } from './src/pages/User';

const Tab = createBottomTabNavigator()
export default function App() {



  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="User" component={User}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}


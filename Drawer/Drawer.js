import React from 'react'
import { View } from 'react-native-animatable'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import DashBoard from '../Pages/DashBoard';
import Drink from '../Pages/Drink';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DrawerContent } from '../Pages/DrawerContent';
import Sleep from '../Pages/Sleep';
import Sport from '../Pages/Sport';
import Medicine from '../Pages/Medicine';
import Food from '../Pages/Food';
import SplashScreen from '../Pages/SplashScreen';




export default function Drawer(props) {

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="DashBoard" component={DashBoard} />
      <Drawer.Screen name="Drink" component={Drink} />
      <Drawer.Screen name="Sport" component={Sport} />
      <Drawer.Screen name="Food" component={Food} />
      <Drawer.Screen name="Sleep" component={Sleep} />
      <Drawer.Screen name="Logout" component={SplashScreen} />
      <Drawer.Screen name="Medicine" component={Medicine} />
    </Drawer.Navigator>
  )
}


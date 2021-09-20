import React from 'react'
import { View } from 'react-native-animatable'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import DashBoard from '../Pages/DashBoard';
import Drink from '../Pages/Drink';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DrawerContent } from '../Pages/DrawerContent';
  
export default function Drawer(props) {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator screenOptions={{headerShown:false}} drawerContent={props => <DrawerContent {...props}/>}
        >
      
        <Drawer.Screen name="DashBoard" component={DashBoard} />
        <Drawer.Screen name="Drink" component={Drink} />
        <Drawer.Screen name="Sport" component={Drink} />
        <Drawer.Screen name="Food" component={Drink} />
        <Drawer.Screen name="Medics" component={Drink} />
        <Drawer.Screen name="Sleep" component={Drink} /> 
      <Drawer.Screen name="Logout" component={Drink} />
      </Drawer.Navigator> 
      )
}


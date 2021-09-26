import React from 'react';
import StackBeforeLogin from './Stacks/StackBeforeLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from './Drawer/Drawer';
import { StatusBar } from 'react-native';


export default function App() {
  return (

    <NavigationContainer>
      <StatusBar hidden /> 
      {/* <Drawer/> */}
      <StackBeforeLogin />
    </NavigationContainer>
  );
}

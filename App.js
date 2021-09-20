import React from 'react';
import StackBeforeLogin from './Stacks/StackBeforeLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from './Drawer/Drawer';


export default function App() {
  return (

    <NavigationContainer>
      <Drawer/>
    </NavigationContainer>
    //   <NavigationContainer>
    //     <StackBeforeLogin />
    //  </NavigationContainer>
  );
}

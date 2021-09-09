import React from 'react';
import StackBeforeLogin from './Stacks/StackBeforeLogin';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer>
      <StackBeforeLogin />
   </NavigationContainer>
  );
}

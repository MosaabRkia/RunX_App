import React from 'react'
import { View } from 'react-native-animatable'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBoard from '../Pages/DashBoard';
import Drink from '../Pages/Drink';


export default function Drawer() {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName="DashBoard" 
            screenOptions = {{headerShown: false}}
            openByDefault="open"
        >
            <Drawer.Screen name="DashBoard" component={DashBoard} />
            <Drawer.Screen name="Drink" component={Drink} />
        </Drawer.Navigator>
    )
}

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Pages/SplashScreen';
import MainPageBeforeLogin from '../Pages/MainPageBeforeLogin';
import RegisterForm from '../Pages/RegisterForm';
import RegisterForm1 from '../Pages/RegisterForm1';
import RegisterForm2 from '../Pages/RegisterForm2';
import RegisterForm3 from '../Pages/RegisterForm3';

const Stack = createStackNavigator();

const StackBeforeLogin = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
 <Stack.Screen name="register4" component={RegisterForm3}/>
            <Stack.Screen name="splashScreen" component={SplashScreen}/>
            <Stack.Screen name="loginPage" component={MainPageBeforeLogin}/>
            <Stack.Screen name="register1" component={RegisterForm}/>
            <Stack.Screen name="register2" component={RegisterForm1}/>
            <Stack.Screen name="register3" component={RegisterForm2}/>
           
            
        </Stack.Navigator>
    )
}
export default StackBeforeLogin;

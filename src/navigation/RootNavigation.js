import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome/Welcome';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';
import PinSetupScreen from '../screens/Auth/PinSetupScreen';
import PinEnterScreen from '../screens/Auth/PinEnterScreen';
import { useSelector } from 'react-redux';

const RootNavigation = () => {
    const Stack = createStackNavigator()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    
    // screenOptions={{ headerShown: false }} ВПИСАТЬ В АТРИБУТ НАВИГАТОР , коррекция компонентов
    
  return (
    <Stack.Navigator initialRouteName="Welcome" >
        <Stack.Screen name="Welcome" component={Welcome} />
        {!isLoggedIn ? 
            <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="PinSetup" component={PinSetupScreen} />
            </>
            :
            <Stack.Screen name="Home" component={HomeScreen} />
        }
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="PinEnter" component={PinEnterScreen} />
    </Stack.Navigator>
  )
}

export default RootNavigation
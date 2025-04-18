import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome/Welcome';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';
import PinSetupScreen from '../screens/Auth/PinSetupScreen';
import PinEnterScreen from '../screens/Auth/PinEnterScreen';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

const RootNavigation = () => {
    const Stack = createStackNavigator()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ !isLoggedIn ? 'Welcome' : 'Home'} screenOptions={{ headerShown: false }} >

        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PinSetup" component={PinSetupScreen} />
        <Stack.Screen name="PinEnter" component={PinEnterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
    
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default RootNavigation
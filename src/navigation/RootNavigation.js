import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../screens/Welcome/Welcome'
import LoginScreen from '../screens/Auth/LoginScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import RegistrationScreen from '../screens/Auth/RegistrationScreen'
import PinSetupScreen from '../screens/Auth/PinSetupScreen'
import PinEnterScreen from '../screens/Auth/PinEnterScreen'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import PostDetailScreen from '../screens/Home/PostDetailScreen'
import SettingsScreen from '../screens/Settings/SettingsScreen'
import LanguageScreen from '../screens/Settings/LanguageScreen'
import SearchScreen from '../screens/Search/SearchScreen'

const RootNavigation = () => {
    const Stack = createStackNavigator()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ !isLoggedIn ? 'Welcome' : 'Welcome'} screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="PinSetup" component={PinSetupScreen} />
                <Stack.Screen name="PinEnter" component={PinEnterScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="PostDetails" component={PostDetailScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Language" component={LanguageScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation
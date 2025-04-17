import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Keychain from 'react-native-keychain'
import HeaderComponent from '../../components/HeaderComponent';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccsess } from '../../store/slices/authSlice';

const LoginScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const [isLoginError, setIsLoginError] = useState(false)

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username: 'kminchelle',
        password: '0lelplR',
      },  {
        headers: { 'Content-Type': 'application/json' }
      })
      const token = res.data.token

      await Keychain.setGenericPassword('token', token)
      dispatch(loginSuccsess(token))
      navigation.replace('PinSetup')
    } catch (err) {
      console.warn('Login failed', err.message)
    } 
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EBEFF5'}}>
      <ImageBackground
        source={require('../../../assets/bg/bgGrey.png')}
        style={{
          flex: 1,
          position: 'relative'
        }}
      >
        <ImageBackground
          source={require('../../../assets/bg/bgWhite.png')}
          style={{
            flex: 1,
            position: 'relative'
          }}
        >
          <View style={styles.container}> 
            <HeaderComponent title={'Login'}/>
            
            <View style={styles.wrapper}>
              {/* TYT sdelat proverky ! */}
              <Text style={{display: isLoginError ? 'flex' : 'none', color: '#D63C41', marginLeft: 16, fontFamily: 'Inter-Regular'}}>Error: Invalid E-mail or Password</Text>
              <Text style={styles.title}>E-mail</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper }>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your e-mail"
                        value={value}
                        onChangeText={onChange}
                      />
                      {isLoginError ? <Image style={{position: 'absolute', top: 15, right: 15}} source={require('../../../assets/info.png')}/> : null}
                    </View>
                  </View>
                )}
              />
            </View>
          
            <View style={styles.wrapper}>
              <Text style={styles.title}>Password</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry={!isPasswordVisible}
                        value={value}
                        onChangeText={onChange}
                      />
                        <TouchableOpacity
                          style={{position: 'absolute', top: 15, right: isLoginError ? 45 : 15}}
                          onPress={handlePasswordVisibility}  
                        >
                          <Image  source={require('../../../assets/EyeRed.png')}/>
                        </TouchableOpacity> 
                        <Text>TODO " FORGOT ?" HERE</Text>
                        {isLoginError ? <Image style={{position: 'absolute', top: 15, right: 15}} source={require('../../../assets/info.png')}/> : null}
                    </View>
                  </View>
                )}
              />      
            </View>

          </View>
        </ImageBackground>
      </ImageBackground>
      
      <View style={{position: 'absolute', bottom: 0, width: '100%', paddingHorizontal: 16, marginBottom: 14}}>
        <CustomButton label={'Continue'} onPressFunc={handleSubmit(onSubmit)}/>
      </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 10
  },
  container: {
    width: '100%',
    position: 'absolute',
    top: 80,
    padding: 16,
    justifyContent: 'space-between'
  },
  inputWrapper: {
    position: 'relative'
  },
  helpImg: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  title: {
    color: '#606773',
    marginLeft: 16,
    fontFamily: 'Inter-Regular'
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 56,
    borderColor: '#CED5E0',
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 16,
    marginTop: 4
  },
});

export default LoginScreen;
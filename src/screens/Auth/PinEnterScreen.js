import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as LocalAuthentication from 'expo-local-authentication';
import { useDispatch } from 'react-redux';
import { loginSuccsess } from '../../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const PinEnterScreen = () => {
  const [pin, setPin] = useState('')
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const verifyBiometric = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    const enrolled = await LocalAuthentication.isEnrollAsync()
  
    if(compatible && enrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promtMessage: 'Authenticate with biometrics'
      })

      if(result.successs) {
        const creds = await Keychain.getGenericPassword()
        if(creds) {
          dispatch(loginSuccsess(creds.password))
          navigation.replace('Home')
        }
      }
    }
  }

  useEffect(() => {
    verifyBiometric()
  }, [])

  const handleCheckPin = async () => {
    const storedPin = await Keychain.getGenericPassword('userPin')
    if(storedPin && storedPin.password === pin) {
      dispatch(loginSuccsess(storedPin.password))
      navigation.replace('Home')
    } else {
      Alert.alert('Wrong PIN');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your PIN</Text>

      <TextInput
        style={styles.input}
        secureTextEntry
        keyboardType="number-pad"
        value={pin}
        onChangeText={setPin}
      />

      <Button
        title="Continue"
        onPress={handleCheckPin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

export default PinEnterScreen;

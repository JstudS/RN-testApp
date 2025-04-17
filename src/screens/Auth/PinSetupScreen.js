import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useNavigation } from '@react-navigation/native';

const PinSetupScreen = () => {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();

  const handleCreatePin = async () => {
    if(pin.length !== 4) {
      Alert.alert('PIN must contain 4 numbers');
      return;
    }

    try {
      await Keychain.setInternetCredentials('userPin', 'pin', pin)
      navigation.replace('PinEnter')
    } catch (err) {
      console.warn('Can not save the PIN', err)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your PIN</Text>

      <TextInput
        style={styles.input}
        secureTextEntry
        maxLength={4}
        keyboardType="number-pad"
        value={pin}
        onChangeText={setPin}
      />

      <Button
        title="Save the PIN"
        onPress={handleCreatePin}
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

export default PinSetupScreen;

import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
import ArrowDropdown from '../../components/ArrowDropdown'
import CustomButton from '../../components/CustomButton'
import PinHeader from '../../components/PinHeader'

const PinSetupScreen = ({ navigation }) => {
    const [pin, setPin] = useState('')
    const [repeatPin, setRepeatPin] = useState('')
    const [isConfirmStep, setIsConfirmStep] = useState(false)

    const handlePress = (val) => {
      !isConfirmStep
        ? pin.length < 5 && setPin(prev => prev + val)
        : repeatPin.length < 5 && setRepeatPin(prev => prev + val)
    }

    const handleDelete = () => {
      isConfirmStep
        ? setRepeatPin(prev => prev.slice(0, -1))
        : setPin(prev => prev.slice(0, -1))
    }

    const handleContinue = async () => {
        if (!isConfirmStep && pin.length === 5) {
            setIsConfirmStep(true)
        } else if (isConfirmStep && repeatPin.length === 5) {
            if (pin === repeatPin) {
                Alert.alert(
                    'Do you want to allow "App" to use Biometrics?',
                    'Biometrics Authentication',
                    [{
                        text: "Don't Allow",
                        style: 'cancel',
                        onPress: async () => {
                          await SecureStore.setItemAsync('biometricsEnabled', 'false')
                          await SecureStore.setItemAsync('userPin', pin)
                          console.log('User denied permission')
                          navigation.replace('Home')
                        },
                    },
                    {
                        text: 'Allow',
                        onPress: async () => {
                          await SecureStore.setItemAsync('biometricsEnabled', 'true')
                          await SecureStore.setItemAsync('userPin', pin)
                          console.log('User granted permission')
                          navigation.replace('Home')
                        },
                    },],
                { cancelable: false }
                )
            } else {
                setRepeatPin('')
            }
        }
    }

    const currentPin = isConfirmStep ? repeatPin : pin

    useFocusEffect(
      useCallback(() => {
          setPin('')
          setRepeatPin('')
          setIsConfirmStep(false)
      }, [])
    )

    return (
        <SafeAreaView style={{flex: 1}}>
            <ArrowDropdown navigation={navigation}/>
            <View style={styles.container}>

                <View style={styles.pinHeader}>
                {!isConfirmStep ? 
                  <PinHeader label={'Create a Pin code'}/>
                  :
                  <PinHeader label={'Repeat a Pin code'}/>
                }
                <View style={styles.digits}>
                    <Text style={styles.subtitle}>enter 5 digit code:</Text>
                    <View style={styles.dots}>
                    {[...Array(5)].map((_, i) => (
                      <View
                        key={i}
                        style={[styles.dot, i < currentPin.length ? styles.dotFilled : styles.dotEmpty]}
                      />
                    ))}
                    </View>
                </View>
                </View>

                
                <View style={{position: 'relative'}}>
                    <View style={styles.borderTop}></View>
                    <View style={styles.keypad}>
                        {[
                            ['1', '2', '3'],
                            ['4', '5', '6'],
                            ['7', '8', '9'],
                            ['', '0', 'del'],
                        ].map((row, rowIndex) => (
                            <View style={styles.row} key={rowIndex}>
                                {row.map((item, index) =>
                                    item === 'del' ? (
                                        <Pressable key={index} onPress={handleDelete} style={({ pressed }) => [ styles.key, pressed && styles.keyPressed ]}>
                                            <Image source={require('../../../assets/Union.png')}/>
                                        </Pressable>
                                    ) : item ? (
                                        <Pressable key={index} onPress={() => handlePress(item)} style={({ pressed }) => [ styles.key, pressed && styles.keyPressed ]}>
                                            <Text style={styles.keyText}>{item}</Text>
                                        </Pressable>
                                    ) : (
                                        <View key={index} style={styles.key} />
                                    )
                                )}
                            </View>
                        ))}
                    </View>

                    <View style={styles.borderBottom}></View>
                </View>

            </View>
            
            <View style={styles.button}>
                <CustomButton label={'Continue'} onPressFunc={handleContinue}/>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 13,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },
  pinHeader: {
    gap: 38
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 400,
    fontFamily: 'Inter-Regular',
    marginTop: 8,
    marginBottom: 24,
    color: '#606773',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 16,
  },
  dotFilled: {
    backgroundColor: '#FA8A34',
  },
  dotEmpty: {
    backgroundColor: '#C1C4CB',
  },
  keypad: {
    gap: 20,
    marginBottom: 40,
  },
  borderTop: {
    position: 'absolute',
    top: -20,
    left: 0,
    height: 1,
    width: '100%',
    backgroundColor: "#EBEFF5",
  },
  borderBottom: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    height: 1,
    width: '100%',
    backgroundColor: "#EBEFF5",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  key: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyPressed: {
    backgroundColor: '#EBF4FF'
  },
  keyText: {
    fontSize: 28,
    fontFamily: 'Inter-Regular',
    fontWeight: 700
  },
  button: {
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  digits: {
    gap: 5
  },
})

export default PinSetupScreen

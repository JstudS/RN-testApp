import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as LocalAuthentication from 'expo-local-authentication'
import * as SecureStore from 'expo-secure-store'
import ArrowDropdown from '../../components/ArrowDropdown'
import CustomButton from '../../components/CustomButton'
import PinHeader from '../../components/PinHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { logout } from '../../store/slices/authSlice'
import { removeTokenFromSecureStore } from '../../utlis/secureStore'
import { setLanguage } from '../../store/slices/i18nSlice'

const PinEnterScreen = ({ navigation }) => {
    const [pin, setPin] = useState('')
    const userData = useSelector(state => state.auth.userProfile)
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const handlePress = (val) => {
        pin.length < 5 && setPin(prev => prev + val)
    }

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1))
    }

    const handleContinue = () => {
        if (pin.length === 5) {
            navigation.replace('Home')
        }
    }


    useFocusEffect(
        useCallback(() => {
            const checkBiometrics = async () => {
                const biometricsEnabled = await SecureStore.getItemAsync('biometricsEnabled')
                const hasHardware = await LocalAuthentication.hasHardwareAsync()
                const isEnrolled = await LocalAuthentication.isEnrolledAsync()

                if (!hasHardware) {
                    console.log('Biometric hardware is not supported')
                    return
                }

                if (!isEnrolled) {
                    console.log('User has not registered biometric data')
                    return
                }

                if (biometricsEnabled === 'true') {
                    const result = await LocalAuthentication.authenticateAsync({
                        promptMessage: 'Sign in with fingerprint',
                        fallbackLabel: 'Enter PIN',
                        cancelLabel: 'Cancel',
                    })

                    if (result.success) {
                        navigation.replace('Home')
                    }
                }
            }
            checkBiometrics()
        }, [])
    )

    const changeAccount = () => {
        removeTokenFromSecureStore()
        dispatch(setLanguage('en'))
        dispatch(logout())
        navigation.replace('Login')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ArrowDropdown />
            <View style={styles.container}>

                <View style={styles.pinHeader}>
                    <View style={styles.pinAccount}>
                        <PinHeader label={userData.email} />
                        <TouchableOpacity onPress={changeAccount}>
                            <Text style={styles.changeAccount}>{t('changeAccount')}</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.digits}>
                        <Text style={styles.subtitle}>{t('digit')}:</Text>
                        <View style={styles.dots}>
                            {[...Array(5)].map((_, i) => (
                                <View
                                    key={i}
                                    style={[styles.dot, i < pin.length ? styles.dotFilled : styles.dotEmpty]}
                                />
                            ))}
                        </View>
                    </View>
                </View>

                <View style={{ position: 'relative' }}>
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
                                        <Pressable key={index} onPress={handleDelete} style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}>
                                            <Image source={require('../../../assets/Union.png')} />
                                        </Pressable>
                                    ) : item ? (
                                        <Pressable key={index} onPress={() => handlePress(item)} style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}>
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
                <CustomButton label={t('continue')} onPressFunc={handleContinue} />
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
        fontFamily: 'Inter-Bold',
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
    changeAccount: {
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
        color: '#FA8A34',
        fontWeight: 400,
        fontSize: 15
    },
    pinAccount: {
        gap: 7
    }
})

export default PinEnterScreen

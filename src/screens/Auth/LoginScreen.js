import React, {  useState } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
import HeaderComponent from '../../components/HeaderComponent'
import CustomButton from '../../components/CustomButton'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '../../store/slices/authSlice'
import ArrowDropdown from '../../components/ArrowDropdown'
import { useTranslation } from 'react-i18next'

const LoginScreen = ({ navigation }) => {
    const { control, handleSubmit, reset } = useForm()
    const dispatch = useDispatch()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false) 
    const [isLoginError, setIsLoginError] = useState(false)
    const { t } = useTranslation()
    
    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const onSubmit = async (data) => {
        try {   
            const res = await axios.post('https://dummyjson.com/auth/login', 
                {
                    username: data.email,
                    password: data.password,
                },
            )
            const token = res.data.accessToken
            const refreshToken = res.data.refreshToken
            await SecureStore.setItemAsync('accessToken', token)
            await SecureStore.setItemAsync('refreshToken', refreshToken)
            dispatch(loginSuccess({ 
                token: token, 
                userProfile: {
                    email: res.data.email,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                }
            }))
            
            navigation.replace('PinSetup')
        } catch (err) {
            reset()
            setIsLoginError(true)
            console.warn('Login failed', err.message)
        } 
    }

    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#EBEFF5', position: 'relative'}}>
            <ArrowDropdown navigation={navigation}/>
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
                            <Text style={{display: isLoginError ? 'flex' : 'none', color: '#D63C41', marginLeft: 16, fontFamily: 'Inter-Bold', fontSize: 15}}>Error: Invalid E-mail or Password</Text>
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
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={styles.title}>Password</Text>
                                <Text style={{display: isLoginError ? 'flex' : 'none', color: '#FA8A34', fontFamily: 'Inter-Bold', marginRight: 15, fontSize: 15}}>Forgot?</Text>
                            </View>
                            
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

                                        {isLoginError ? <Image style={{position: 'absolute', top: 13, right: 15}} source={require('../../../assets/info.png')}/> : null}
                                    </View>
                                    </View>
                                )}
                            />      
                        </View>

                        <View style={styles.buttonsWrapper}>
                            <CustomButton label={t('continue')} onPressFunc={handleSubmit(onSubmit)}/>
                            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                                <Text style={styles.createAccount}>{t('createAccount')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </ImageBackground>
            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  container: {
    width: '100%',
    position: 'absolute',
    top: 100,
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
    fontFamily: 'Inter-Regular',
    fontSize: 15
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonsWrapper: {
    width: '100%', 
    gap: 15,
    marginTop: 15
  },
  input: {
    height: 56,
    borderColor: '#CED5E0',
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 16,
    fontSize: 15
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 16,
    marginTop: 4
  },
  createAccount: {
    color: '#FA8A34',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 600,
    fontFamily: 'Inter-Bold',
    fontSize: 15
  }
})

export default LoginScreen
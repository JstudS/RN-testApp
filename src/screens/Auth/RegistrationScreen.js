import React, { useState } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderComponent from '../../components/HeaderComponent'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import ArrowDropdown from '../../components/ArrowDropdown'
import { useTranslation } from 'react-i18next'

const RegistrationScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const navigation = useNavigation()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false) 
    const { t } = useTranslation() 

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }
        const onSubmit = () => {
        console.log('Registration done')
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
                        <HeaderComponent title={'Sign up'}/>
                        
                        <View style={styles.wrapper}>
                            <Text style={styles.title}>Name</Text>
                            <Controller
                                control={control}
                                name="name"
                                rules={{ required: 'Name required' }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter your name"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                                    </View>
                            )}
                            />
                    </View>
                    
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>E-mail</Text>
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'E-mail required',
                                pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid e-mail',
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your e-mail"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                                </View>
                            )}
                        />
                    </View>
                    
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>Password</Text>
                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: 'Password required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                                maxLength: { value: 64, message: 'Password must contain less then 64 letters long' }
                            }}
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
                                        style={styles.eyeImg}
                                        onPress={handlePasswordVisibility}  
                                    >
                                        <Image  source={require('../../../assets/Eye.png')}/>
                                    </TouchableOpacity> 
                                </View>

                                    {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                                </View>
                            )}
                        />      
                    </View>

                    </View>
                </ImageBackground>
            </ImageBackground>
            
            <View style={{position: 'absolute', bottom: 0, width: '100%', paddingHorizontal: 16, marginBottom: 14}}>
                <CustomButton label={t('continue')} onPressFunc={handleSubmit(onSubmit)}/>
                <Text></Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10
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
  eyeImg: {
    width: '24px',
    height: '24px',
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
  input: {
    height: 56,
    borderColor: '#CED5E0',
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 15
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 16,
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
})

export default RegistrationScreen
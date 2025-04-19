import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { useTranslation } from 'react-i18next'



const Welcome = ({}) => {
    const navigation = useNavigation()
    const { t } = useTranslation()

    const columnOneArr = [ 
        {
            text: 'Crowd real estate', 
            src:[require(`../../../assets/icons/icon11.png`), require(`../../../assets/icons/icon12.png`), require(`../../../assets/icons/icon13.png`)]
        }, 
        {
            text: 'ETFs', 
            src:[require(`../../../assets/icons/icon31.png`), require(`../../../assets/icons/icon32.png`), require(`../../../assets/icons/icon33.png`)]
        },
    ]
    
    const columnTwoArr = [ 
        {
            text: "Crowd lending", 
            src:[require(`../../../assets/icons/icon21.png`), require(`../../../assets/icons/icon22.png`), require(`../../../assets/icons/icon23.png`)]
        }, 
        {
            text: "Commodities", 
            src:[require(`../../../assets/icons/icon41.png`), require(`../../../assets/icons/icon42.png`), require(`../../../assets/icons/icon43.png`)]
        },
        {
            text: "Crypto", 
            src:[require(`../../../assets/icons/icon51.png`), require(`../../../assets/icons/icon52.png`), require(`../../../assets/icons/icon53.png`)]
        },
    ]

    const handleSignIn = () => {
        navigation.navigate('Login')
    }

    const handleSignUp = () => {
        navigation.navigate('Registration')
    }

    return (
        <SafeAreaView style={{flex: 1, paddingTop: 9}}>
            <ImageBackground
                source={require('../../../assets/bg/bgGrey.png')}
                style={{flex: 1, }}
                imageStyle={{transform: [{translateY: 400}], }}
            >
                <View style={styles.main}>
                    <View style={styles.content}>
                        <View style={styles.columnOne}>
                            <View style={styles.logoView}>
                                <Image style={styles.logoImg} source={require('../../../assets/splash-icon.png')}/>
                            </View>

                            {columnOneArr.map((item, i) => 
                                <View key={i} style={styles.columnItem}>
                                    <View style={styles.images}>
                                        {item.src.map((el, index) => 
                                            <Image key={index} style={index === 1 ? styles.middleImg : null} source={el}/>
                                        )}
                                    </View>
                                    <Text style={styles.text}>{item.text}</Text>
                                </View>
                            )}

                        </View>

                        <View style={styles.columnTwo}>
                            {columnTwoArr.map((item, i) => 
                                <View key={i} style={styles.columnItem}>
                                    <View style={styles.images}>
                                        {item.src.map((el, index) => 
                                            <Image key={index} style={index === 1 ? styles.middleImg : null} source={el}/>
                                        )}
                                    </View>
                                    <Text style={styles.text}>{item.text}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleSignIn}>
                            <Text style={styles.signUp}>{t('signIn')}</Text>
                        </TouchableOpacity>
                        <CustomButton bolder={true} label={t('signUp')} onPressFunc={handleSignUp}/>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
        
    )
}

export default Welcome

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        fontWeight: 600
    },
    signUp: {
        color: '#FA8A34',
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: 600,
        fontFamily: 'Inter-Regular',
        fontSize: 15
    },
    columnOne: {
        width: '48%'
    },  
    columnTwo: {
        marginTop: 60,
        width: '48%'
    },
    columnItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
        height: 136,
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16
    },
    images: {
        flexDirection: 'row',
        gap: 7,
        position: 'relative'
    },
    text: {
        fontFamily: 'Inter-Regular', 
        fontSize: 12
    },  
    logoView: {
        marginTop: 10,
        height: 136,
    },
    logoImg: {
        borderRadius: 16,
        height: '100%',
        objectFit: 'cover'
    },
    middleImg: {
        position: 'absolute',
        top: 0,
        left: 25,
        zIndex: 2
    }

    
})
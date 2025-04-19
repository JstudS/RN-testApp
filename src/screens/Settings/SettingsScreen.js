import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ArrowDropdown from '../../components/ArrowDropdown'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FooterComponent from '../../components/FooterComponent'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { useTranslation } from 'react-i18next'
import { removeTokenFromSecureStore } from '../../utlis/secureStore'

const SettingsScreen = ({ navigation }) => {
    const userData = useSelector(state => state.auth.userProfile)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const logoutUser = () => {
        removeTokenFromSecureStore()
        dispatch(logout())
        navigation.replace('Welcome')
    }

    return (
        <SafeAreaView style={{flex: 1, position: 'relative', backgroundColor: '#FFFFFF'}}>
            <ArrowDropdown navigation={navigation}/>

            <View style={styles.wrapper}>
                <View style={styles.headerWrapper}>
                    <Text style={[styles.mainTitle, styles.interFont]}>{t('settings')}</Text>
                    <View style={[styles.header, styles.border]}>
                        <Image source={require('../../../assets/roundImg.png')}/>
                        <Text style={styles.title}>{`${userData.firstName} ${userData.lastName}`}</Text>   
                    </View>
                </View>

                <View style={styles.settingsWrapper}>
                    <View style={styles.settingsBase}>
                        <Text style={[styles.text, styles.interFontRegular]}>{t('basic')}</Text>
                        <TouchableOpacity style={[styles.body, styles.border]} onPress={() => navigation.navigate('Language')}>
                            <View style={styles.bodyBase}>
                                <Image source={require('../../../assets/Globe.png')}/>
                                <Text style={styles.title}>{t('language')}</Text>
                            </View>
                            <Image source={require('../../../assets/arrow-dropdownGrey.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.settingsBase}>
                        <Text style={[styles.text, styles.interFontRegular]}>{t('other')}</Text>
                        <TouchableOpacity style={[styles.body, styles.border]} onPress={logoutUser}>
                            <View style={styles.bodyBase}>
                                <Image source={require('../../../assets/logout.png')}/>
                                    <Text style={styles.title}>{t('logout')}</Text>
                            </View>
                            <Image source={require('../../../assets/arrow-dropdownGrey.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <FooterComponent navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
        gap: 32
    },
    headerWrapper: {
        marginTop: 52,
        gap: 10
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        borderWidth: 1,
        borderColor: '#CED5E0',
        padding: 20,
        borderRadius: 16
    },
    interFont: {
        fontFamily: 'Inter-Regular'
    },  
    border: {
        borderWidth: 1,
        borderColor: '#CED5E0',
        borderRadius: 16
    },
    mainTitle : {
        color: '#06070A',
        fontSize: 22,
        fontWeight: 600,
        lineHeight: 32
    },
    title: {
        color: '#06070A',
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 24,
        marginBottom: 2,
    },
    settingsWrapper: {
        gap: 32
    },
    settingsBase: {
        gap: 5
    },
    text: {
        color: '#606773',
        fontSize: 15,
        lineHeight: 16,
        fontWeight: 400
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#CED5E0',
        borderRadius: 16
    },
    bodyBase: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})

export default SettingsScreen
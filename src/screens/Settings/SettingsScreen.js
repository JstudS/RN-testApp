import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ArrowDropdown from '../../components/ArrowDropdown'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useUser } from '../../api/queryClient'
import FooterComponent from '../../components/FooterComponent'
import { useSelector } from 'react-redux'

const SettingsScreen = ({ navigation }) => {
    const userData = useSelector(state => state.auth.userProfile)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logout())
    }

    return (
        <SafeAreaView style={{flex: 1, position: 'relative', backgroundColor: '#FFFFFF'}}>
            <ArrowDropdown navigation={navigation}/>

            <View style={styles.wrapper}>
                <View style={styles.headerWrapper}>
                    <Text style={[styles.mainTitle, styles.interFont]}>Settings</Text>
                    <View style={[styles.header, styles.border]}>
                        <Image source={require('../../../assets/roundImg.png')}/>
                        <Text style={styles.title}>{`${userData.firstName} ${userData.lastName}`}</Text>   
                    </View>
                </View>

                <View style={styles.settingsWrapper}>
                    <View style={styles.settingsBase}>
                        <Text style={[styles.text, styles.interFont]}>Basic</Text>
                        <TouchableOpacity style={[styles.body, styles.border]} onPress={() => navigation.navigate('Language')}>
                            <View style={styles.bodyBase}>
                                <Image source={require('../../../assets/Globe.png')}/>
                                <Text style={styles.title}>Language</Text>
                            </View>
                            <Image source={require('../../../assets/arrow-dropdownGrey.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.settingsBase}>
                        <Text style={[styles.text, styles.interFont]}>Other</Text>
                        <View style={[styles.body, styles.border]}>
                            <View style={styles.bodyBase}>
                                <Image source={require('../../../assets/logout.png')}/>
                                <TouchableOpacity onPress={logout}>
                                    <Text style={styles.title}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                            <Image source={require('../../../assets/arrow-dropdownGrey.png')}/>
                        </View>
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
        marginBottom: 2
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
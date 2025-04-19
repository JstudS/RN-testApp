import React from 'react'
import ArrowDropdown from '../../components/ArrowDropdown'
import FooterComponent from '../../components/FooterComponent'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LanguageScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{flex: 1, position: 'relative', backgroundColor: '#FFFFFF'}}>
            <ArrowDropdown navigation={navigation}/>

            <View style={styles.wrapper}>
                <Text style={[styles.mainTitle, styles.interFont]}>Language</Text>

                <View style={[styles.body, styles.border]}>
                    <View style={styles.bodyBase}>
                        <Image source={require('../../../assets/Globe.png')}/>
                        <Text style={styles.title}>English</Text>
                    </View>
                    <Image source={require('../../../assets/activeImg.png')}/>
                </View>

                <View style={[styles.body, styles.border]}>
                    <View style={styles.bodyBase}>
                        <Image source={require('../../../assets/Globe.png')}/>
                        <Text style={styles.title}>Arabic</Text>
                    </View>
                    <Image source={require('../../../assets/roundImg.png')}/>
                </View>
            </View>
        
            <FooterComponent navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
        marginTop: 52,
        gap: 15
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
        marginBottom: 3
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

export default LanguageScreen
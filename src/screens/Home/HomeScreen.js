import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import TestTaskComp from '../../components/TestTaskComp'
import CardsComponent from '../../components/CardsComponent'
import Posts from '../../components/Posts'
import FooterComponent from '../../components/FooterComponent'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'


const HomeScreen = ({ navigation }) => {
    const userData = useSelector(state => state.auth.userProfile)
    const { t } = useTranslation()
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#F2F3F5'}}>
            <ScrollView style={{flexGrow: 1, position: 'relative'}}>
                <View style={styles.bgHomeContainer}>
                    <Image 
                    style={styles.bgHome} 
                    source={require('../../../assets/bg/bgHome.png')}
                    />
                </View>
                
                <View style={styles.header}>
                    <Text style={styles.yourName}>{t('yourName')}</Text>
                    <Text style={styles.name}>{`${userData.firstName} ${userData.lastName}`}</Text>
                </View>

                <TestTaskComp />
                
                <CardsComponent title={t('beforeStart')}/>

                <Posts navigation={navigation} title={t('posts')}/>
            </ScrollView>

            <FooterComponent navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 96,
        gap: 8,
        alignItems: 'center'
    },
        bgHomeContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 296
    },
        bgHome: {
        height: '100%',
        width: '100%',
        objectFit: 'fill',
    },
        yourName: {
        fontWeight: 400, 
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        color: '#FFFFFF'
    },
        name: {
        fontWeight: 700,
        color: '#FFFFFF',
        fontFamily: 'Inter-Bold',
        fontSize: 28,
    },
})

export default HomeScreen
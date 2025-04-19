import React, { useCallback, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import TestTaskComp from '../../components/TestTaskComp'
import CardsComponent from '../../components/CardsComponent'
import Posts from '../../components/Posts'
import FooterComponent from '../../components/FooterComponent'
import { useFocusEffect } from '@react-navigation/native'
import { authApi } from '../../api/axios'
import { useSelector } from 'react-redux'
import { getRefreshTokenFromSecureStore } from '../../utlis/secureStore'
import { useUser } from '../../api/queryClient'
import { SafeAreaView } from 'react-native-safe-area-context'


const HomeScreen = ({ navigation }) => {
    const userData = useSelector(state => state.auth.userProfile)
    
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
                    <Text style={styles.yourName}>Your name</Text>
                    <Text style={styles.name}>{`${userData.firstName} ${userData.lastName}`}</Text>
                </View>

                <TestTaskComp />
                
                <CardsComponent />

                <Posts navigation={navigation} />
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
        fontFamily: 'Inter-Regular',
        fontSize: 28,
    },
})

export default HomeScreen
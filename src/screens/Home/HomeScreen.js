import React, { useCallback, useState } from 'react'
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import TestTaskComp from '../../components/TestTaskComp'
import CardsComponent from '../../components/CardsComponent'
import Posts from '../../components/Posts'
import HomeFooter from '../../components/HomeFooter'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '../../utlis/api'
i

const HomeScreen = () => {
  const [userName, setUserName] = useState('')

    // useFocusEffect(
    //   useCallback( async () => {
    //     const res = await api.get('/auth/me')
    //     setUserName(`${res.data.firstName} ${res.data.lastName}`)
    //   }, [])
    // )

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2F3F5'}}>
        <ScrollView style={{flexGrow: 1, position: 'relative'}}>
          <View style={styles.bgHomeContainer}>
            <Image style={styles.bgHome} source={require('../../../assets/bg/bgHome.png')}/>
          </View>
          
          <View style={styles.header}>
            <Text style={styles.yourName}>Your name</Text>
            <Text style={styles.name}>{userName}</Text>
          </View>

          <TestTaskComp />
          
          <CardsComponent />

          <Posts />

        </ScrollView>

        <HomeFooter />
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
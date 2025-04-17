import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const HeaderComponent = ({title}) => {
  return (
    <View style={{position: 'relative'}}>
      <View style={styles.title}>
        <Image style={{width: 48, height: 52, marginLeft: 10, marginBottom: 40}} source={require('../../assets/img.png')}/>
        <View>
          <Text style={{fontFamily: 'Inter-Regular'}}>{title}</Text>
          <Text style={{color: 'grey', fontFamily: 'Inter-Regular'}}>Personal Account</Text>
        </View>
      </View>

      <View 
        style={{
          height: 1,
          width: '110%',
          position: 'absolute',
          top: 50,
          left: -18,
          backgroundColor: '#EBEFF5', 
          marginTop: 15, 
          marginBottom: 30, 
        }} />
    </View>
  )
}

export default HeaderComponent

const styles = StyleSheet.create({
    title: {
      flexDirection: 'row',
      gap: 10,
      fontFamily: 'Inter-Regular'
    },
})
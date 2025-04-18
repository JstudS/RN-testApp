import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const HomeFooter = () => {
  return (
    <View style={styles.footer}>
        <View style={styles.imgWrapper}>
            <Image style={styles.img} source={require('../../assets/footer/item1.png')}/>
            <Image style={styles.img} source={require('../../assets/footer/item2.png')}/>
            <Image style={styles.img} source={require('../../assets/footer/item3.png')}/>
            <Image style={styles.img} source={require('../../assets/footer/item4.png')}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 1
    },
    imgWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#E6EBF5'
    },
    img: {
        height: 49,
        width: 76
    }
}) 

export default HomeFooter
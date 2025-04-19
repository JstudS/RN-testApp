import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const HeaderComponent = ({title}) => {
    const route = useRoute()
    return (
        <View style={{position: 'relative'}}>
            <View style={{flexDirection: 'row', gap: 10,}}>
            <Image style={{width: 48, height: 52, marginLeft: 10, marginBottom: 40}} source={route === 'Login' ? require('../../assets/imgAuth.png') : require('../../assets/imgRegister.png')}/>
            <View>
                <Text style={{fontFamily: 'Inter-Regular', fontSize: 15}}>{title}</Text>
                <Text style={{color: 'Personal Account', fontFamily: 'Inter-Regular', fontWeight: 400, fontSize: 15}}>Personal Account</Text>
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
                }} 
            />
        </View>
    )
}

export default HeaderComponent

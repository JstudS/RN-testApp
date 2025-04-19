import React from 'react'
import { Image, Text, View } from 'react-native'

const PinHeader = ({ label }) => {
    return (
        <View style={{alignItems: 'center', gap: 10}}>
            <Image source={require('../../assets/imgPin.png')}/>
            <Text style={{fontFamily: 'Inter-Regular', fontWeight: 500, fontSize: 15}}>{label}</Text>
        </View>
    )
}

export default PinHeader
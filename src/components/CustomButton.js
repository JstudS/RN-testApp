import React from 'react'
import { Pressable, Text, View } from 'react-native'

const CustomButton = ({ label, onPressFunc, bolder}) => {
  return (
    <View>
      <Pressable
        style={{
          width: '100%',
          height: '48px',
          backgroundColor: '#FA8A34',
          padding: 12,
          borderRadius: 16,
          alignItems: 'center',
          marginTop: 5,
          fontFamily: 'Inter-Regular' 
        }}
        onPress={() => onPressFunc()}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: bolder ? '600' : '500' }}>{label}</Text>
      </Pressable>
    </View>
    
  )
}

export default CustomButton
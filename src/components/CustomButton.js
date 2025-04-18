import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'

const CustomButton = ({ label, onPressFunc, bolder}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          width: '100%',
          height: '48px',
          backgroundColor: '#FA8A34',
          padding: 12,
          borderRadius: 16,
          alignItems: 'center',
          marginBottom: 6,
        }}
        onPress={() => onPressFunc()}
      >
          <Text style={{ color: '#FFFFFF', fontWeight: bolder ? 600 : 500 , fontFamily: 'Inter-Regular', fontSize: 15 }}>{label}</Text>
      </TouchableOpacity>
    </View>
    
  )
}

export default CustomButton
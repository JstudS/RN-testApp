import React from 'react'
import { Image, Pressable} from 'react-native'

const ArrowDropdown = ({ navigation }) => {
    const goBackFunc = navigation?.goBack;
  
    return (
      <Pressable
        style={{ position: 'absolute', top: 57, left: 16, zIndex: 3 }}
        onPress={goBackFunc}
        disabled={!goBackFunc}
      >
        <Image source={require('../../assets/arrow-dropdown.png')} />
      </Pressable>
    );
  };
  
  export default ArrowDropdown;
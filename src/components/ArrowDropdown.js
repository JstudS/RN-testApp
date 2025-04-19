import React from 'react'
import { Image, TouchableOpacity} from 'react-native'

const ArrowDropdown = ({ navigation }) => {
    const goBackFunc = navigation?.goBack;
  
    return (
        <TouchableOpacity
            style={{ position: 'absolute', top: 10, left: 14, zIndex: 3 }}
            onPress={goBackFunc}
            disabled={!goBackFunc}
        >
            <Image source={require('../../assets/arrow-dropdown.png')} />
        </TouchableOpacity>
    );
  };
  
  export default ArrowDropdown;
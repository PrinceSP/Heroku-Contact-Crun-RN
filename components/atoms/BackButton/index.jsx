import React from 'react';
import { TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const BackButton = ({onPress,color="#000"}) => {
  return (
    <TouchableOpacity style={{borderRadius:6,zIndex:3}} onPress={onPress}>
      <EvilIcons name="arrow-left" size={45} color={color} />
    </TouchableOpacity>
  );
}

export default BackButton

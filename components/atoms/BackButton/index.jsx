import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const BackButton = ({onPress,color="#000",...rest}) => {
  return (
    <TouchableOpacity testID="back-button" style={{width:45,height:45,alignItems:'center',justifyContent:'center',borderRadius:30,zIndex:3,...rest}} onPress={onPress}>
      <AntDesign name="arrowleft" size={26} color={color} />
    </TouchableOpacity>
  );
}

export default BackButton

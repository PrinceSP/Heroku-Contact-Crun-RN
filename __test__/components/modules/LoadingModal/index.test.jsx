import React from 'react';
import { ActivityIndicator,Text, View,Dimensions } from 'react-native';

const {width,height} = Dimensions.get('window')

const LoadingModal = () => {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:"#fff"}}>
      <Text>Please Wait</Text>
      <ActivityIndicator size='large' color="#00f"/>
    </View>
  );
}

export default LoadingModal

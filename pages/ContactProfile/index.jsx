import React,{memo} from 'react'
import {View,Text,StyleSheet,SafeAreaView,Dimensions,TextInput,FlatList,Image,Pressable} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useGetData} from '../../custom-hooks'
import {BackButton} from '../../components'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { useSelector } from 'react-redux';

const {width,fontScale} = Dimensions.get('screen')

const ContactProfile = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const id = useSelector(state => state.currentID.currentId);
  const {firstName:first,lastName:last,age,photo } = useGetData(`${process.env.BASE_URL}/${id}`)?.data
  console.log(first);

  return (
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <View style={styles.header}>
        <BackButton onPress={()=>navigation.goBack()}/>
        <MaterialCommunityIcons name="pencil-outline" size={18} color="#777" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    height:"100%",
    paddingHorizontal:21,
    backgroundColor:"#fff"
  },
  title: {
    alignSelf: 'center',
    color:"#000",
    fontSize:26/fontScale,
    marginTop:25,
    fontWeight:'700'
  }
});

export default ContactProfile

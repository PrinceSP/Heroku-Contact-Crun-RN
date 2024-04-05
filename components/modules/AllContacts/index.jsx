import React,{memo} from 'react'
import {View,Text,StyleSheet,Dimensions,FlatList,Image,Pressable} from 'react-native'
import { AntDesign,Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { getID } from '../../../store/contactId'; // Import the action creator

const {fontScale} = Dimensions.get('window')

const AllContacts = memo(({item,navigation} ) =>{
  const dispatch = useDispatch();
  const getCurrentContact = () => {
    dispatch(getID({currentId:item.id}))
    navigation.navigate("ContactProfile")
  }

  return(
    <Pressable
      onPress={getCurrentContact}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: item.photo }} style={{ height: 50, width: 50, borderRadius: 14 }} />
        <Text style={{ marginLeft: 20, color: '#444', fontSize: 18 / fontScale }}>{item.firstName + ' ' + item.lastName}</Text>
      </View>
      <View style={{ backgroundColor: '#AED6F1', padding: 5, borderRadius: 5 }}>
        <AntDesign name="right" size={16} color="#fff" />
      </View>
    </Pressable>
  )
});

export default AllContacts

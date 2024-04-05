import React,{memo} from 'react'
import {View,Text,StyleSheet,SafeAreaView,Dimensions,TextInput,FlatList,Image,ImageBackground,Pressable} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import {useGetData} from '../../custom-hooks'
import {BackButton} from '../../components'

const {width,fontScale} = Dimensions.get('window')

const ContactProfile = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const id = useSelector(state => state.currentID.currentId);
  const selectedContact = useGetData(`${process.env.BASE_URL}/${id}`)
  const {firstName:first,lastName:last,age,photo } = Object(selectedContact?.data)

  return (
    <View style={styles.container}>
      <ImageBackground blurRadius={3} style={{flex:1,paddingHorizontal:21,alignItems:'center'}} source={{uri:photo}}>
        <View style={[styles.header,{marginTop:insets.top}]}>
          <BackButton onPress={()=>navigation.goBack()} backgroundColor="#fff" color="#777" padding={8}/>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: photo }} />
          </View>
          <Text style={styles.name}>{`${first} ${last}` || "-"}</Text>
          <Pressable style={{backgroundColor:"#aea3a5",borderRadius:50,paddingVertical:10,paddingHorizontal:5}}>
            <Feather name="edit-3" size={24} color="black" />
            <Text>Edit Contact</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    alignSelf: 'center',
    color:"#000",
    fontSize:26/fontScale,
    marginTop:25,
    fontWeight:'700'
  },
  header:{
    width,
    paddingHorizontal:21
  },
  contentContainer:{
    width,
    flex:1,
    backgroundColor:"#fff",
    alignItems:'center',
    marginTop:130,
    borderTopRightRadius:40,
    borderTopLeftRadius:40
  },
  imageContainer:{
    width:130,
    height:130,
    borderRadius:34,
    borderWidth:3,
    borderColor:"#f56e53",
    position:'absolute',
    top:-70,
    padding:2
  },
  image:{
    width: "100%",
    height: "100%",
    borderRadius: 30
  },
  name:{
    fontSize:24/fontScale,
    fontWeight:'800',
    color:"#454545",
    marginTop:90
  }
});

export default ContactProfile

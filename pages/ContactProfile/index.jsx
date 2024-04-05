import React from 'react'
import {View,Text,StyleSheet,SafeAreaView,Dimensions,TextInput,FlatList,Image,ImageBackground,Pressable} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Feather,MaterialIcons,Ionicons } from '@expo/vector-icons';
import {useGetData} from '../../custom-hooks'
import {BackButton,MenuButton,FloatingInput} from '../../components'

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
          <Pressable onPress={()=>navigation.navigate('EditContact')} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:"#fef3f5",borderRadius:50,paddingVertical:12,paddingHorizontal:15,marginTop:20}}>
            <Feather name="edit-3" size={22} color="#555" />
            <Text style={{fontFamily:"Regular",marginLeft:10,fontSize:16/fontScale,color:"#555"}}>Edit Contact</Text>
          </Pressable>
          <View style={{width:"100%",marginTop:12,backgroundColor:"#fff",borderRadius:10,paddingVertical:21,paddingHorizontal:20}}>
            <MenuButton
              icon={
                <MaterialIcons name="notifications-none" size={24} color="#0D86E7" />
              }
              iconValue="Notifications"
              onPress = {() => console.log(true)}
            />
            <MenuButton
              icon={
                <Ionicons name="language-outline" size={26} color="#0D86E7" />
              }
              iconValue="Language"
              onPress = {() => console.log(true)}
            />
            <MenuButton
              icon={
                <Ionicons name="information-circle-outline" size={26} color="#0D86E7" />
              }
              iconValue="App info"
              onPress = {() => navigation.navigate("AppInfo")}
            />
          </View>
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
    fontFamily:"Medium",
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
    fontFamily:"SemiBold",
    color:"#454545",
    marginTop:90
  }
});

export default ContactProfile

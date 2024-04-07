import React,{useCallback,useState} from 'react'
import {View,Text,StyleSheet,SafeAreaView,Dimensions,TouchableOpacity,TextInput,FlatList,Image,ImageBackground,Pressable} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector,useDispatch } from 'react-redux';
import { Entypo,Feather,MaterialIcons,Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'
import {useGetData,useSaveData} from '../../custom-hooks'
import {BackButton,MenuButton,FloatingInput,LoadingModal} from '../../components'
import {getData} from '../../store/selectedContact'

const {width,fontScale} = Dimensions.get('window')

const ContactProfile = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [isMenu,showMenu] = useState(false)
  const id = useSelector(state => state.currentID.currentId);
  const { datas, refetch } = useGetData(`https://contact.herokuapp.com/contact/${id}`);
  const { updateData } = useSaveData(`https://contact.herokuapp.com/contact/${id}`);
  console.log(id);
  const { firstName, lastName, age, photo } = Object(datas?.data);

  const getContact = () => {
    dispatch(getData({firstName, lastName, age, photo}));
    navigation.navigate('EditContact');
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (!datas) {
    return <LoadingModal testID="activity-indicator"/>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground blurRadius={3} style={{flex:1,paddingHorizontal:21,alignItems:'center'}} source={{uri:photo}}>
        <View style={[styles.header,{marginTop:insets.top}]}>
          <BackButton onPress={()=>navigation.goBack()} backgroundColor="#fff" color="#777" padding={8}/>
          <View>
            <Entypo name="dots-three-vertical" size={24} color="#fff" onPress={()=>showMenu(!isMenu)}/>
            {
              isMenu === true ?
              <TouchableOpacity style={{position:'absolute',right:20,padding:10,backgroundColor:"#fff",borderRadius:2,width:100,alignItems:'center'}} onPress={updateData}>
                <Text style={{textAlign:'center'}}>delete contact</Text>
              </TouchableOpacity> : null
            }
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: photo }} />
          </View>
          <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
          <Pressable onPress={getContact} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:"#fef3f5",borderRadius:50,paddingVertical:12,paddingHorizontal:15,marginTop:20}}>
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
    paddingHorizontal:21,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
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

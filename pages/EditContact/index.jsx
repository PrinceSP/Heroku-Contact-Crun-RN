import React,{useCallback,useState} from 'react'
import {View,Text,StyleSheet,ToastAndroid,SafeAreaView,Dimensions,TextInput,TouchableOpacity,FlatList,Image,ImageBackground,Pressable} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import {BackButton,FloatingInput,LoadingModal} from '../../components'
import {useSaveData} from '../../custom-hooks'

const {width,fontScale} = Dimensions.get('window')

const EditContact = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const contactData = useSelector(state => state.contactData);
  const id = useSelector(state => state.currentID.currentId);

  const [datas,setDatas] = useState({
    firstName: contactData.firstName,
    lastName: contactData.lastName,
    age: contactData.age.toString(),
    photo: contactData.photo
  })

  const { loading,response,updateData} = useSaveData(`${process.env.BASE_URL}/${id}`,"PUT",datas);

  const [libraryStatus, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const handleLaunchLibrary = useCallback(async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setDatas({...datas,photo:result.assets[0].uri});
    }
  },[])

  const pickImage = useCallback(async () => {
    if (libraryStatus) {
      if (
        libraryStatus.status === ImagePicker.PermissionStatus.UNDETERMINED ||
        (libraryStatus.status === ImagePicker.PermissionStatus.DENIED && libraryStatus.canAskAgain)
      ) {
        const permission = await requestPermission()
        if (permission.granted) {
          await handleLaunchLibrary()
        }
      } else if (libraryStatus.status === ImagePicker.PermissionStatus.DENIED) {
        await Linking.openSettings()
      } else {
        await handleLaunchLibrary()
      }
    }
  }, [libraryStatus, handleLaunchLibrary, requestPermission])

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const update=()=>{
    updateData()
    showToast("Data is updated!")
    setTimeout(()=>{
      navigation.navigate("ContactProfile")
    },500)
  }

  return (
    <View style={styles.container}>
      <ImageBackground blurRadius={3} style={{flex:1,alignItems:'center'}} source={{uri:datas.photo}}>
        <View style={[styles.header,{marginTop:insets.top}]}>
          <BackButton onPress={()=>navigation.goBack()} backgroundColor="#fff" color="#777" padding={8}/>
        </View>
        <View style={styles.contentContainer}>
          <Pressable onPress={pickImage} style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: datas.photo }} />
          </Pressable>
          <View style={{marginVertical:50}}/>
          <FloatingInput label="First name" onChangeText={(value)=>setDatas({...datas,firstName:value})} values={datas.firstName}/>
          <FloatingInput label="Last name" onChangeText={(value)=>setDatas({...datas,lastName:value})} values={datas.lastName}/>
          <FloatingInput label="Age" onChangeText={(value)=>setDatas({...datas,age:value})} values={datas.age}/>
          <TouchableOpacity style={styles.submitBtn} onPress={update}>
            <Text style={{ fontFamily:"Regular",paddingTop:8,fontSize: 20/fontScale, color: "#fff" }}>Update</Text>
          </TouchableOpacity>
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
    paddingHorizontal:21,
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
    padding:2,
  },
  image:{
    width: "100%",
    height: "100%",
    borderRadius: 30
  },
  submitBtn:{
    marginTop:50,
    borderRadius: 6,
    backgroundColor: "#7866DC",
    alignItems: "center",
    padding: 8,
    width:"100%"
  },
});

export default EditContact

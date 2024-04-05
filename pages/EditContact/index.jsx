import React from 'react'
import {View,Text,StyleSheet,SafeAreaView,Dimensions,TextInput,FlatList,Image,ImageBackground,Pressable} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import {BackButton,FloatingInput} from '../../components'

const {width} = Dimensions.get('window')

const EditContact = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const id = useSelector(state => state.currentID.currentId);

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
          <FloatingInput label="First name" values="Prince"/>
          <FloatingInput label="Last name" values="Siachin"/>
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
});

export default EditContact

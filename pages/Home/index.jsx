import React,{useCallback} from 'react'
import {View,Text,StyleSheet,SafeAreaView,Dimensions,TextInput,FlatList,Image,Pressable} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign,Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'
import {useGetData} from '../../custom-hooks'
import {AllContacts,RecentAdd,LoadingModal} from '../../components'

const {width,fontScale,height} = Dimensions.get('screen')

const Home = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const {datas,refetch} = useGetData(`https://contact.herokuapp.com/contact`)

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (!datas) {
    return <LoadingModal/>;
  }

  return (
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <Text style = {styles.title}>Contacts</Text>
      <View style={styles.SearchContact}>
        <Feather name="search" size={24} color="#B7B8BB" />
        <TextInput clearButtonMode="always" placeholder="Search name here..." inputMode="search" autoCapitalize="none" returnKeyLabel="search" style={styles.input}/>
      </View>
      <Text style={{fontSize:18/fontScale,fontWeight:"600",marginTop:10}}>Recent Added</Text>
      <RecentAdd datas={datas?.data.slice(0,10)} navigation={navigation}/>
      <Text style={{fontSize:18/fontScale,fontWeight:"600"}}>All Contacts ({datas?.data.length})</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={datas?.data}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><AllContacts item={item} navigation={navigation}/>}/>
      <Pressable testID="add-button" style={styles.addBtn} onPress={()=>navigation.navigate("AddContact")}>
        <AntDesign name="adduser" size={32} color="#fff" />
      </Pressable>
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
  },
  SearchContact:{
    flexDirection:"row",
    borderRadius:16,
    backgroundColor:"rgb(243,244,245)",
    borderColor:"#d7d8dd",
    borderWidth:1,
    padding:14,
    marginVertical:25,
    alignItems:'center'
  },
  input:{
    fontSize:18/fontScale,
    color:"#B7B8BB",
    marginLeft:16
  },
  addBtn:{
    position:'absolute',
    bottom:30,
    right:30,
    width:70,
    height:70,
    borderRadius:70,
    backgroundColor: "#7866DC",
    alignItems:'center',
    justifyContent:'center'
  }
});

export default Home

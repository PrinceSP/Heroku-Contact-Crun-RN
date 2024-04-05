import React,{memo} from 'react'
import {View,Text,StyleSheet,SafeAreaView,Dimensions,TextInput,FlatList,Image,Pressable} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign,Feather } from '@expo/vector-icons';
import {useGetData} from '../../custom-hooks'
import {AllContacts,RecentAdd} from '../../components'

const {width,fontScale,height} = Dimensions.get('screen')

const Home = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const allContacts = useGetData(`${process.env.BASE_URL}`)

  return (
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <Text style = {styles.title}>Contacts</Text>
      <View style={styles.SearchContact}>
        <Feather name="search" size={24} color="#B7B8BB" />
        <TextInput clearButtonMode="always" placeholder="Search name here..." inputMode="search" autoCapitalize="none" returnKeyLabel="search" style={styles.input}/>
      </View>
      <Text style={{fontSize:18/fontScale,fontWeight:"600",marginTop:10}}>Recent Added</Text>
      <RecentAdd datas={allContacts?.data.slice(0,10)}/>
      <Text style={{fontSize:18/fontScale,fontWeight:"600"}}>All Contacts ({allContacts?.data.length})</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={allContacts?.data}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><AllContacts item={item} navigation={navigation}/>}/>
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
  }
});

export default Home

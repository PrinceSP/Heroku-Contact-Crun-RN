import React,{memo} from 'react'
import {View,Text,StyleSheet,SafeAreaView,Dimensions,TextInput,FlatList,Image,Pressable} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign,Feather } from '@expo/vector-icons';
import {useGetData} from '../../custom-hooks'

const {width,fontScale,height} = Dimensions.get('screen')

const ContactCard = memo(({item} ) => (
  <Pressable
    onPress={() => console.log(item.id)}
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
));

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
      <View style={{height:150}}>
        <FlatList
          horizontal={true} 
          contentContainerStyle={{paddingHorizontal:10}}
          showsHorizontalScrollIndicator={false}
          data={allContacts?.data.slice(0,10)}
          maxToRenderPerBatch={10}
          keyExtractor={(item)=>item.id.toString()}
          renderItem={({item})=>{
          return(
            <Pressable style={{marginRight:20,marginVertical:20,alignItems:'center'}}>
              <Image source={{uri:item.photo}} style={{height:70,width:70,borderRadius:22}}/>
              <Text style={{marginTop:10,color:"#444",fontSize:14/fontScale}}>{item.firstName}</Text>
            </Pressable>
          )
        }}/>
      </View>
      <Text style={{fontSize:18/fontScale,fontWeight:"600"}}>All Contacts ({allContacts?.data.length})</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={allContacts?.data}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><ContactCard item={item}/>}/>
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

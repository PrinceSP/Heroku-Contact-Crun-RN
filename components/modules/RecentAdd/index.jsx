import React from 'react'
import {View,Text,StyleSheet,Dimensions,FlatList,Image,Pressable} from 'react-native'

const {fontScale} = Dimensions.get('screen')

const RecentAdd = ({datas}) => {
  return (
    <View style={{height:150}}>
      <FlatList
        horizontal={true}
        contentContainerStyle={{paddingHorizontal:10}}
        showsHorizontalScrollIndicator={false}
        data={datas}
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
  )
}

export default RecentAdd

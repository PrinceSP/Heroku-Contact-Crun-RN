import React from 'react'
import {Pressable,View,Text,StyleSheet,Dimensions} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const {fontScale} = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer : {
    flexDirection : 'row',
    marginTop: 23,
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: '#fff',
  },
  iconValue: {
    marginLeft: 12,
    fontFamily:"Medium",
    fontSize:17/fontScale,
    color:"#404040"
  }
})

const MenuButton = ({icon, iconValue, onPress}) => {
  return (
    <Pressable onPress={onPress}>
     <View style = {styles.cardContainer}>
      <View style={{flexDirection:'row',alignItems:'center',}}>
        <View style={{padding:8,borderRadius:12,backgroundColor:"rgba(93,188,255,0.19)"}}>
          {icon}
        </View>
        <Text style= {styles.iconValue}>{iconValue}</Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={34} color="black" />
     </View>
    </Pressable>
  );
}

export default MenuButton

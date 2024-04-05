import React, { useState, useEffect, useRef } from 'react';
import { Animated,LayoutAnimation,TextInput,Text,View } from 'react-native';

const FloatingInput = ({ label,backgroundColor="transparent",values,editable=true,width="100%",marginBottom=20, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(values?.length > 0 ? 1 : 0)).current;

  const handleFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(true);
  };

  const handleBlur = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(false);
  };

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, animatedIsFocused, values]);

  const labelStyle = {
    width:'100%',
    fontFamily: 'Medium',
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 13],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#AFAFAF'],
    }),
    position: 'absolute',
    left: 17,
    // top: isFocused || values ? 5 : 18,
    top: isFocused === true ? 5 : (values?.length>0 ? 5 : 18),
  };

  return (
    <View style={{ backgroundColor,width,marginBottom,alignItems:'flex-start',justifyContent:'center',paddingHorizontal: 17 ,paddingVertical: isFocused || values ? 15 : 0,height:isFocused || values ? 70 : 60,borderWidth:1,borderColor:"#D0D0D0",borderRadius:8}}>
      <TextInput
        {...props}
        defaultValue={values}
        style={{ width:"100%",zIndex:1,
        marginTop: isFocused === true ? 16 : (values?.length>0 ? 16 : 0),
        fontFamily:'Medium',height: "100%", fontSize: 18, color: '#000',alignItems:'flex-end',justifyContent:'flex-end'}}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit
        editable={editable}
      />
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
    </View>
  );
};

export default FloatingInput

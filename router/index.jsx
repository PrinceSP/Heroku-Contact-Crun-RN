import React from 'react';
import { Easing } from 'react-native';
import { createNativeStackNavigator,TransitionPreset,CardStyleInterpolators } from '@react-navigation/native-stack';
import {Home,ContactProfile,EditContact,AddContact} from "../pages"

const Stack = createNativeStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeconfig = {
  animation: 'timing',
  config: {
    duration:500,
    easing:Easing.linear
  },
};

const Router = () => {

  return (
    <Stack.Navigator
      screenOptions={
        {
          gestureEnabled:true,
          gestureDirection:"horizontal",
          transitionSpec:{
            open:config,
            close:config
          },
          headerShown: false,
          cardStyle: {
            backgroundColor: '#fff',
          },
        }
      }
    >
      <Stack.Screen name='Home' component={Home}></Stack.Screen>
      <Stack.Screen name='ContactProfile' component={ContactProfile}></Stack.Screen>
      <Stack.Screen name='EditContact' component={EditContact}></Stack.Screen>
      <Stack.Screen name='AddContact' component={AddContact}></Stack.Screen>

        {/* You can add you screen here */}
    </Stack.Navigator>
  );
}

export default Router

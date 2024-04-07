import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux'
import {useFonts} from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import {store} from './store'
import Router from './router'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Black': require('./assets/Poppins/Poppins-Black.ttf'),
    'Bold': require('./assets/Poppins/Poppins-Bold.ttf'),
    'ExtraBold': require('./assets/Poppins/Poppins-ExtraBold.ttf'),
    'ExtraLight': require('./assets/Poppins/Poppins-ExtraLight.ttf'),
    'Italic': require('./assets/Poppins/Poppins-Italic.ttf'),
    'Light': require('./assets/Poppins/Poppins-Light.ttf'),
    'Medium': require('./assets/Poppins/Poppins-Medium.ttf'),
    'Regular': require('./assets/Poppins/Poppins-Regular.ttf'),
    'SemiBold': require('./assets/Poppins/Poppins-SemiBold.ttf'),
    'Thin': require('./assets/Poppins/Poppins-Thin.ttf'),
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Router/>
      </NavigationContainer>
    </Provider>
  );
}

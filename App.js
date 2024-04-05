import React from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux'
import {store} from './store'
import Router from './router'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router/>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      </NavigationContainer>
    </Provider>
  );
}

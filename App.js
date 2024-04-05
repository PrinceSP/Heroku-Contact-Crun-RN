import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux'
import {store} from './store'
import Router from './router'
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Router/>
      </NavigationContainer>
    </Provider>
  );
}

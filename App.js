import React from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router'

export default function App() {
  return (
    <NavigationContainer>
      <Router/>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
    </NavigationContainer>
  );
}

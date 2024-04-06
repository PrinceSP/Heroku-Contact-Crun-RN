import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import App from '../App';
import { store } from './store';

// Mocking NavigationContainer and StatusBar
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: jest.fn(({ children }) => children),
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: jest.fn(),
}));

// Mocking useFonts
jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true]), // Mocking that fonts are loaded
}));

describe('App component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(NavigationContainer).toHaveBeenCalled();
    expect(StatusBar).toHaveBeenCalledWith('auto');
  });
});

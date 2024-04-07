import React from 'react';
import { render } from '@testing-library/react-native';
import Router from '../router';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '../store';

// Mocking useFonts hook since it's not relevant for this unit test
jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true]), // Assuming fonts are loaded successfully
}));

// Mocking StatusBar component
jest.mock('expo-status-bar', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mocking Router component since we only need to test the App component
jest.mock('../router', () => () => <Router data-testid="mock-router"/>);

describe('App component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
    );

    expect(getByTestId('mock-router')).toBeTruthy(); // Assuming 'mock-router' is an element rendered by the Router component
  });
});

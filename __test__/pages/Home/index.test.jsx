import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Home } from '../../../pages';
import { useGetData } from '../../../custom-hooks';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Import SafeAreaProvider

// Mock useFocusEffect and useGetData
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn(),
}));

jest.mock('../../../custom-hooks', () => ({
  useGetData: jest.fn(),
}));

describe('Home component', () => {
  const navigationMock = {
    navigate: jest.fn(),
  };

  const mockData = {
    data: [
      { id: 1, firstName: 'John', lastName: 'Doe', age: 22, photo: 'https://example.com/photo1.jpg' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', age: 22, photo: 'https://example.com/photo2.jpg' },
    ],
  };

  beforeEach(() => {
    useGetData.mockReturnValueOnce({ data: mockData, refetch: jest.fn() }); // Fix typo here 'datas' -> 'data'
  });

  it('renders correctly', async () => {
    const { findByText, getByPlaceholderText, getByText, getByTestId } = render(
      <SafeAreaProvider>
        <Home navigation={navigationMock} />
      </SafeAreaProvider>
    );

    // Ensure the component has finished rendering
    await act(async () => {
      const contactsText = await findByText('Contacts');
      expect(contactsText).toBeTruthy();
    });
  });
});

import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import { useFocusEffect } from '@react-navigation/native';
import {Home} from '../../../../pages';
import { useGetData } from '../../../../custom-hooks';

// Mock useFocusEffect and useGetData
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
}));

jest.mock('../../custom-hooks', () => ({
  useGetData: jest.fn(),
}));

describe('Home component', () => {
  const navigationMock = {
    navigate: jest.fn(),
  };

  const mockData = {
    data: [
      { id: 1, firstName: 'John', lastName: 'Doe', photo: 'https://example.com/photo1.jpg' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', photo: 'https://example.com/photo2.jpg' },
    ],
  };

  beforeEach(() => {
    useGetData.mockReturnValueOnce({ datas: mockData, refetch: jest.fn() });
  });

  it('renders correctly', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<Home navigation={navigationMock} />);

    expect(getByText('Contacts')).toBeTruthy();
    expect(getByPlaceholderText('Search name here...')).toBeTruthy();
    expect(getByText('Recent Added')).toBeTruthy();
    expect(getByText('All Contacts (2)')).toBeTruthy();
    expect(getByTestId('recent-add')).toBeTruthy();
    expect(getByTestId('flat-list')).toBeTruthy();
    expect(getByTestId('add-button')).toBeTruthy();
  });

  it('calls useGetData hook on focus', () => {
    render(<Home navigation={navigationMock} />);

    expect(useFocusEffect).toHaveBeenCalled();
  });

  it('navigates to AddContact screen when add button is pressed', () => {
    const { getByTestId } = render(<Home navigation={navigationMock} />);

    const addButton = getByTestId('add-button');
    fireEvent.press(addButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('AddContact');
  });
});

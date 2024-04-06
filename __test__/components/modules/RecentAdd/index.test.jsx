import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import {RecentAdd} from '../../../../components';

describe('RecentAdd component', () => {
  const datas = [
    { id: 1, firstName: 'John', photo: 'https://example.com/photo1.jpg' },
    { id: 2, firstName: 'Jane', photo: 'https://example.com/photo2.jpg' },
  ];

  const navigationMock = {
    navigate: jest.fn(),
  };

  const dispatchMock = jest.fn();

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<RecentAdd datas={datas} navigation={navigationMock} />);

    expect(getByText('John')).toBeTruthy();

    expect(getByTestId('flat-list')).toBeTruthy();
  });

  it('calls getCurrentContact with correct item when pressed', () => {
    const { getByText } = render(<RecentAdd datas={datas} navigation={navigationMock} />);

    const johnButton = getByText('John');
    fireEvent.press(johnButton);

    expect(dispatchMock).toHaveBeenCalledWith({ currentId: 1 });
    expect(navigationMock.navigate).toHaveBeenCalledWith('ContactProfile');
  });
});

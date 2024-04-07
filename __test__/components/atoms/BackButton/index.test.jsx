import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import {BackButton} from '../../../../components';

describe('BackButton component', () => {
  const onPressMock = jest.fn();

  it('renders correctly', () => {
    const { getByTestId } = render(<BackButton onPress={onPressMock} />);

    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('calls onPress callback when pressed', () => {
    const { getByTestId } = render(<BackButton onPress={onPressMock} />);

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(onPressMock).toHaveBeenCalled();
  });
});

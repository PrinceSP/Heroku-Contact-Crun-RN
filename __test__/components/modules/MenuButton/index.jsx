import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import {MenuButton} from '../../../../MenuButton';
import { MaterialIcons } from '@expo/vector-icons';

describe('MenuButton component', () => {
  const onPressMock = jest.fn();

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <MenuButton icon={<MaterialIcons name="icon-name" />} iconValue="Icon Value" onPress={onPressMock} />
    );

    // Check if the icon value text is rendered
    expect(getByText('Icon Value')).toBeTruthy();

    // Check if the MaterialIcons component is rendered
    expect(getByTestId('material-icons')).toBeTruthy();
  });

  it('calls onPress callback when pressed', () => {
    const { getByTestId } = render(
      <MenuButton icon={<MaterialIcons name="icon-name" />} iconValue="Icon Value" onPress={onPressMock} />
    );

    const button = getByTestId('menu-button');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});

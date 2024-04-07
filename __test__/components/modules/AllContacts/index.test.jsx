import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from '../../../../store'; // Import your Redux store
import { AllContacts } from '../../../../components';

const navigation = {
  navigate: jest.fn(),
};

describe('AllContacts component', () => {
  const item = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    photo: 'https://example.com/photo.jpg',
  };

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <AllContacts item={item} navigation={navigation} />
      </Provider>
    );

    expect(getByText(`${item.firstName} ${item.lastName}`)).toBeTruthy();
    expect(getByTestId('right-arrow-icon')).toBeTruthy();
  });

  it('navigates to ContactProfile screen on press', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AllContacts item={item} navigation={navigation} />
      </Provider>
    );
    const contactItem = getByTestId('contact-item');

    fireEvent.press(contactItem);
    expect(navigation.navigate).toHaveBeenCalledWith('ContactProfile');
  });
});

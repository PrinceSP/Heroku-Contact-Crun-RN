import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import {AllContacts} from '../../components';

// Mocked navigation object
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
    const { getByText, getByTestId } = render(<AllContacts item={item} navigation={navigation} />);

    // Check if the contact's full name is rendered
    expect(getByText(`${item.firstName} ${item.lastName}`)).toBeTruthy();

    // Check if the right arrow icon is rendered
    expect(getByTestId('right-arrow-icon')).toBeTruthy();
  });

  it('navigates to ContactProfile screen on press', () => {
    const { getByTestId } = render(<AllContacts item={item} navigation={navigation} />);
    const contactItem = getByTestId('contact-item');

    // Simulate press event
    fireEvent.press(contactItem);

    // Check if the navigation function is called with the correct arguments
    expect(navigation.navigate).toHaveBeenCalledWith('ContactProfile');

    // Check if the getID action is dispatched with the correct ID
    // This would depend on the implementation of your Redux store and action creator,
    // you might need to mock useDispatch and getID function for this test.
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import {FloatingInput} from '../../components';

describe('FloatingInput component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <FloatingInput label="Username" placeholder="Enter your username" />
    );

    const input = getByPlaceholderText('Enter your username');
    const label = getByText('Username');

    expect(input).toBeTruthy();
    expect(label).toBeTruthy();
  });

  it('displays label when input is focused', () => {
    const { getByPlaceholderText, getByText } = render(
      <FloatingInput label="Username" placeholder="Enter your username" />
    );

    const input = getByPlaceholderText('Enter your username');
    fireEvent.focus(input);

    const label = getByText('Username');
    expect(label.props.style.top).toBe(5);
  });

  it('hides label when input loses focus and has no value', () => {
    const { getByPlaceholderText, getByText } = render(
      <FloatingInput label="Username" placeholder="Enter your username" />
    );

    const input = getByPlaceholderText('Enter your username');
    fireEvent.blur(input);

    const label = getByText('Username');
    expect(label.props.style.top).toBe(18);
  });

  it('keeps label visible when input has value', () => {
    const { getByPlaceholderText, getByText } = render(
      <FloatingInput label="Username" placeholder="Enter your username" values="JohnDoe" />
    );

    const input = getByPlaceholderText('Enter your username');

    const label = getByText('Username');
    expect(label.props.style.top).toBe(5);
  });
});

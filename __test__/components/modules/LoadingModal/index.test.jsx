import React from 'react';
import { render } from '@testing-library/react-native';
import {LoadingModal} from '../../../../components';

describe('LoadingModal component', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<LoadingModal />);

    expect(getByText('Please Wait')).toBeTruthy();
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });
});

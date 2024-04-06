import React from 'react';
import { render } from '@testing-library/react-native';
import Router from '../../../router';

describe('Router component', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Router />);

    expect(toJSON()).toMatchSnapshot();
  });
});

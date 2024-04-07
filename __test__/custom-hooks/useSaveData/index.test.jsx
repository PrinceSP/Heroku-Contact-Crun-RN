import React from 'react';
import { render, act } from '@testing-library/react-native';
import {useSaveData} from '../../../custom-hooks';

describe('useSaveData custom hook', () => {
  const mockUrl = 'https://contact.herokuapp.com/contact';
  const mockData = { id: 1, firstName: 'John',lastName:'Doe',age:20,photo:'string' };
  const mockMethod = 'POST';

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
      })
    );
  });

  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('sends data to the provided URL using the specified HTTP method', async () => {
    let hookResult;

    const TestComponent = () => {
      hookResult = useSaveData(mockUrl, mockMethod, mockData);
      return null;
    };

    render(<TestComponent />);

    // Wait for the updateData function to be called
    await act(async () => {
      await hookResult.updateData();
    });

    expect(global.fetch).toHaveBeenCalledWith(mockUrl, {
      method: mockMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockData),
    });
  });

  it('handles loading state correctly', async () => {
    let hookResult;

    const TestComponent = () => {
      hookResult = useSaveData(mockUrl, mockMethod, mockData);
      return null;
    };

    render(<TestComponent />);

    expect(hookResult.loading).toBe(false);

    await act(async () => {
      await hookResult.updateData();
    });

    expect(hookResult.loading).toBe(false);
  });

  it('handles response state correctly', async () => {
    let hookResult;

    const TestComponent = () => {
      hookResult = useSaveData(mockUrl, mockMethod, mockData);
      return null;
    };

    render(<TestComponent />);

    expect(hookResult.response).toBe('');

    await act(async () => {
      await hookResult.updateData();
    });

    expect(hookResult.response).toBe(200);
  });
});

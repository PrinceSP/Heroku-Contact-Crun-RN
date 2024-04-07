import React from 'react';
import { render, act } from '@testing-library/react-native';
import {useGetData} from '../../../custom-hooks';

describe('useGetData custom hook', () => {
  const mockData = [
    { id: 1, firstName: 'John',lastName:'Doe',age:20,photo:'string' },
    { id: 2, firstName: 'John',lastName:'Doe',age:20,photo:'string' },
    { id: 3, firstName: 'John',lastName:'Doe',age:20,photo:'string' },
  ];
  const nullData = []
  const mockUrl = 'https://contact.herokuapp.com/contact';

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
  });

  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('fetches data from the provided URL and updates state', async () => {
    let hookResult;

    const TestComponent = () => {
      hookResult = useGetData(mockUrl);
      return null;
    };

    render(<TestComponent />);

    // Wait for the fetch to be resolved
    await act(async () => {
      await hookResult.refetch();
    });

    expect(global.fetch).toHaveBeenCalledWith(mockUrl);
    expect(hookResult.datas).toEqual(mockData);
  });

  it('returns null when there is an error fetching data', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('Fetch error'));

    let hookResult;

    const TestComponent = () => {
      hookResult = useGetData(nullData);
      return null;
    };

    render(<TestComponent />);

    // Wait for the fetch to be resolved
    await act(async () => {
      await hookResult.refetch();
    });

    expect(global.fetch).toHaveBeenCalledWith(nullData);
    expect(hookResult.datas).toBeNull();
  });
});

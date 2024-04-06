import React from 'react';
import { render, act } from '@testing-library/react';
import {useGetData} from '../../../../store/useGetData';

describe('useGetData custom hook', () => {
  const mockData = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
  const mockUrl = 'https://example.com/data';

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
      hookResult = useGetData(mockUrl);
      return null;
    };

    render(<TestComponent />);

    // Wait for the fetch to be resolved
    await act(async () => {
      await hookResult.refetch();
    });

    expect(global.fetch).toHaveBeenCalledWith(mockUrl);
    expect(hookResult.datas).toBeNull();
  });
});

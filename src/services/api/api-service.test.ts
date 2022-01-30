import { API_KEY } from '../../constants/api.constants';
import { makeApiRequest } from './api.service';

describe('Services - makeApiRequest', () => {
  beforeEach(() => {
    const mockFetch = jest.spyOn(window, 'fetch');

    const mockResponse = Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          mockData: 'mock value',
        }),
    }) as Promise<Response>;

    mockFetch.mockReturnValueOnce(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return the data from the response', async () => {
    const result = await makeApiRequest({ path: 'url/path' });

    expect(result).toStrictEqual({
      mockData: 'mock value',
    });
  });

  test('should call fetch with the path that was passed in', async () => {
    await makeApiRequest({ path: 'url/path' });

    expect(window.fetch).toHaveBeenCalledTimes(1);

    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/url/path',
      {
        method: 'GET',
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );
  });

  test('should call fetch with the request method that was passed in', async () => {
    await makeApiRequest({ path: 'url/path', method: 'POST' });

    expect(window.fetch).toHaveBeenCalledTimes(1);

    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/url/path',
      {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );
  });

  test('should call fetch with the correct query string, if any search params were passed in ', async () => {
    await makeApiRequest({
      path: 'url/path',
      method: 'GET',
      searchParams: {
        paramOne: 1,
        paramTwo: 2,
      },
    });

    expect(window.fetch).toHaveBeenCalledTimes(1);

    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/url/path?paramOne=1&paramTwo=2',
      {
        method: 'GET',
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );
  });
});

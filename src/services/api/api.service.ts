import { BASE_URL, API_KEY } from '../../constants/api.constants';
import { SearchParams } from '../../types/search-params';
import { getQueryString } from '../../utils/get-query-string/get-query-string';

interface IMakeApiRequest {
  path: string;
  body?: RequestInit['body'];
  method?: 'GET' | 'POST';
  searchParams?: SearchParams;
}

export const makeApiRequest = <T>({
  path,
  method = 'GET',
  searchParams,
  body,
}: IMakeApiRequest): Promise<T> => {
  const queryString = getQueryString(searchParams);
  const requestUrl = `${BASE_URL}/${path}${queryString}`;

  return fetch(requestUrl, {
    method,
    headers: {
      'x-api-key': API_KEY,
    },
    body,
  }).then((response) => response.json());
};

import { BASE_URL, API_KEY } from '../../constants/api.constants';
import { ISearchParams } from '../../types/search-params';
import { getQueryString } from '../../utils/get-query-string/get-query-string';

interface IMakeApiRequest {
  path: string;
  method?: 'GET' | 'POST';
  searchParams?: ISearchParams;
}

export const makeApiRequest = <T>({
  path,
  method = 'GET',
  searchParams,
}: IMakeApiRequest): Promise<T> => {
  const queryString = getQueryString(searchParams);
  const requestUrl = `${BASE_URL}/${path}${queryString}`;

  return fetch(requestUrl, {
    method,
    headers: {
      'x-api-key': API_KEY,
    },
  }).then((response) => response.json());
};

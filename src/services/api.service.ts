import { BASE_URL, API_KEY } from '../constants/api.constants';
import { SearchParams } from '../types/search-params';
import { getQueryString } from '../utils/get-query-string';

interface IMakeApiRequest {
  path: string;
  isJSON?: boolean;
  body?: RequestInit['body'];
  method?: 'GET' | 'POST' | 'DELETE';
  withSubId?: string;
  searchParams?: SearchParams;
}

export const makeApiRequest = ({
  path,
  body,
  method = 'GET',
  searchParams,
  isJSON = true,
}: IMakeApiRequest): Promise<Response> => {
  const queryString = getQueryString(searchParams);
  const requestUrl = `${BASE_URL}/${path}${queryString}`;

  return fetch(requestUrl, {
    method,
    headers: {
      'x-api-key': API_KEY,
      ...(isJSON ? { 'Content-Type': 'application/json' } : {}),
    },
    body,
  }).then((response) => {
    return response;
  });
};

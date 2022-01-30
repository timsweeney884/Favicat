import { SearchParams } from '../../types/search-params';

export const getQueryString = (searchParams?: SearchParams): string => {
  const queryString = Object.entries(searchParams || {})
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return queryString ? `?${queryString}` : '';
};

import { getQueryString } from './get-query-string';

describe('Utils - getQueryString', () => {
  test('should generate the query string correctly if there are any search params', () => {
    expect(
      getQueryString({
        paramOne: 1,
        paramTwo: 2,
        paramThree: 3,
      })
    ).toEqual('?paramOne=1&paramTwo=2&paramThree=3');
  });

  test('should return an empty string if there are no search params', () => {
    expect(getQueryString()).toEqual('');
  });
});

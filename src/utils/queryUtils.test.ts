import { getQueryParams } from './queryUtils'

describe('getQueryParams', () => {
  it('should return query params', () => {
    const location = {
      search: '?q=one+two',
    } as Location

    expect(getQueryParams(location, 'q')).toEqual('one two')
  })
})
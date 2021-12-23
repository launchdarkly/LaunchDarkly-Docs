import { findMatch, getQueryParams } from './details'

describe('findMatch', () => {
  it('should return true when it finds a match', () => {
    const content = 'Some text string to match'
    const terms = ['not', 'match']

    expect(findMatch(content, terms)).toBeTruthy()
  })

  it("should return false when it can't find a match", () => {
    const content = 'Some text string to match'
    const terms = ['not']

    expect(findMatch(content, terms)).toBeFalsy()
  })
})

describe('getQueryParams', () => {
  it('should return query params', () => {
    const location = {
      search: '?q=one+two',
    } as Location

    expect(getQueryParams(location, 'q')).toEqual('one two')
  })
})

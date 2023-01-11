import { findMatch } from './details'

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

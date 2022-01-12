import { stripTrailingSlash } from './navigationDataUtils'

describe('stripTrailingSlash', () => {
  it('should strip trailing slash if it exists', () => {
    expect(stripTrailingSlash('path.com/path/')).toEqual('path.com/path')
  })

  it("should return the same string if there's no trailing slash", () => {
    expect(stripTrailingSlash('path.com/path')).toEqual('path.com/path')
  })
})

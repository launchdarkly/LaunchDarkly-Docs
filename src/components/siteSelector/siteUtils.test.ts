jest.mock('@reach/router', () => {
  const actual = jest.requireActual('@reach/router')
  return {
    ...actual,
    globalHistory: { location: { search: '', hash: '#mock-anchor' } },
  }
})

import { getUrlSiteAware } from './siteUtils'

describe('site selector', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('generate federal query string', () => {
    const result = getUrlSiteAware('', 'federal')
    expect(result).toEqual('?site=federal')
  })

  test('generate general query string', () => {
    const result = getUrlSiteAware('', 'general')
    expect(result).toEqual('')
  })

  test('generate query string with hash', () => {
    const result = getUrlSiteAware('', 'federal', true)
    expect(result).toEqual('?site=federal#mock-anchor')
  })

  test('append site param to path', () => {
    const result = getUrlSiteAware('https://docs.launchdarkly.com/home', 'federal')
    expect(result).toEqual('https://docs.launchdarkly.com/home?site=federal')
  })
})

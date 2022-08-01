import { SiteType } from '../types/siteType'

const siteAwareSubdomains = ['app', 'clientsdk', 'clientstream', 'events', 'sdk', 'stream'] as const

type SubdomainMap = {
  federal: {
    [key in typeof siteAwareSubdomains[number]]?: {
      searchValue: RegExp
      replaceValue: string
    }
  }
  launchDarkly: {
    [key in typeof siteAwareSubdomains[number]]?: {
      searchValue: RegExp
      replaceValue: string
    }
  }
}
const map: SubdomainMap = { federal: {}, launchDarkly: {} }
const initializeUrlMapping = () => {
  siteAwareSubdomains.forEach(subdomain => {
    map.federal[subdomain] = {
      searchValue: new RegExp(`${subdomain}\\.launchdarkly\\.com`, 'gi'),
      replaceValue: `${subdomain}.launchdarkly.us`,
    }
    map.launchDarkly[subdomain] = {
      searchValue: new RegExp(`${subdomain}\\.launchdarkly\\.us`, 'gi'),
      replaceValue: `${subdomain}.launchdarkly.com`,
    }
  })
}
initializeUrlMapping()

export const makeSiteAware = (content: string, site: SiteType) => {
  let result = content

  siteAwareSubdomains.forEach(subdomain => {
    const { searchValue, replaceValue } = map[site][subdomain]
    result = result.replace(searchValue, replaceValue)
  })

  return result
}

import { globalHistory } from '@reach/router'
import qs from 'qs'

import { SiteType } from '../types/siteType'

const siteAwareSubdomains = ['app', 'clientsdk', 'clientstream', 'events', 'sdk', 'stream'] as const

type SubdomainMap = {
  federal: {
    [key in typeof siteAwareSubdomains[number]]?: {
      searchValue: string
      searchRegExp: RegExp
      replaceValue: string
    }
  }
  launchDarkly: {
    [key in typeof siteAwareSubdomains[number]]?: {
      searchValue: string
      searchRegExp: RegExp
      replaceValue: string
    }
  }
}
const map: SubdomainMap = { federal: {}, launchDarkly: {} }
const initializeUrlMapping = () => {
  siteAwareSubdomains.forEach(subdomain => {
    map.federal[subdomain] = {
      searchValue: `${subdomain}.launchdarkly.com`,
      searchRegExp: new RegExp(`${subdomain}\\.launchdarkly\\.com`, 'gi'),
      replaceValue: `${subdomain}.launchdarkly.us`,
    }
    map.launchDarkly[subdomain] = {
      searchValue: `${subdomain}.launchdarkly.us`,
      searchRegExp: new RegExp(`${subdomain}\\.launchdarkly\\.us`, 'gi'),
      replaceValue: `${subdomain}.launchdarkly.com`,
    }
  })
}
initializeUrlMapping()

export const setSubdomain = (content: string, site: SiteType, enableSiteSelection: boolean) => {
  if (!enableSiteSelection) {
    return content
  }

  let result = content

  siteAwareSubdomains.forEach(subdomain => {
    const { searchValue, searchRegExp, replaceValue } = map[site][subdomain]

    if (content.includes(searchValue)) {
      result = result.replace(searchRegExp, replaceValue)
    }
  })

  return result
}

/**
 * Given a path, appends the site query parameter to it if federal is selected.
 * If launchDarkly is selected, the site query parameter will not be appended.
 * @param path Append site selection to this path
 * @param siteValue Either federal or launchDarkly. Defaults to undefined meaning
 * launchDarkly
 * @param appendHash If true the hash following the path will be kept. Otherwise
 * remove the hash from the returned string. The use case for removing the hash
 * is valid for urls on the left navigation tree where hashes from a page
 * should be removed when navigating to another through the left navigation
 * menu
 */
export const addRemoveSiteParam = (path = '', siteValue: string = undefined, appendHash = false) => {
  const {
    location: { search, hash },
  } = globalHistory
  const qsObject = qs.parse(search, { ignoreQueryPrefix: true })

  // undefined means launchDarkly
  qsObject.site = siteValue === 'federal' ? 'federal' : undefined
  return `${path}${qs.stringify(qsObject, { addQueryPrefix: true })}${appendHash ? hash : ''}`
}

// returns federal or undefined. The latter means launchDarkly
export const getSiteFromHref = () => {
  const qsObject = qs.parse(globalHistory.location.search, { ignoreQueryPrefix: true })
  return qsObject.site as string
}

export const isValidSite = (site: string) => {
  return ['launchDarkly', 'federal'].includes(site)
}

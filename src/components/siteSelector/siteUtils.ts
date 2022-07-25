import { globalHistory } from '@reach/router'
import qs from 'qs'

/**
 * Given a path, appends the site query parameter to it if federal is selected.
 * If launchdarkly is selected, the site query parameter will not be appended.
 * @param path Append site selection to this path
 * @param siteValue Either federal or launchdarkly
 * @param appendHash If true the hash following the path will be kept. Otherwise
 * remove the hash from the returned string. The use case for removing the hash
 * is valid for urls on the left navigation tree where hashes from a page
 * should be removed when navigating to another through the left navigation
 * menu.
 */
export const getUrlSiteAware = (path = '', siteValue: string = undefined, appendHash = false) => {
  const {
    location: { search, hash },
  } = globalHistory
  const qsObject = qs.parse(search, { ignoreQueryPrefix: true })
  qsObject.site = siteValue === 'federal' ? 'federal' : undefined
  return `${path}${qs.stringify(qsObject, { addQueryPrefix: true })}${appendHash ? hash : ''}`
}

import aa from 'search-insights'
import { TrackJS } from 'trackjs'

import { initDataDogLogging } from './src/utils/browserMetricsUtils'
import { addRemoveSiteParam, getSiteFromHref } from './src/utils/siteAwareUtils'
import { initUAParser } from './src/utils/userAgent'

export const onClientEntry = () => {
  const activeEnv = process.env.GATSBY_ACTIVE_ENV

  if (typeof activeEnv === 'undefined') {
    return
  }

  const isProd = activeEnv === 'production'
  const isStaging = activeEnv === 'staging'
  const isDev = activeEnv === 'development'
  const siteLocalStorage = localStorage.getItem('site')

  // HACK: this is a migration step for old ls values that shouldn't
  // be an issue on prod and can be removed over time.
  if (siteLocalStorage === '"launchdarkly"') {
    localStorage.removeItem('site')
  }

  if (isProd || (isDev && process.env.RUN_DATADOG_LOCALLY === 'true')) {
    initDataDogLogging()
  }

  if (isProd || isStaging) {
    TrackJS.install({
      token: process.env.GATSBY_TRACKJS_TOKEN,
      application: isProd ? 'docs-production' : 'docs-staging',
    })
  }

  if (isStaging) {
    TrackJS.configure({ version: process.env.PR_NUMBER })
  }

  initUAParser()

  // Algolia search insights
  window.aa = aa
  const appId = process.env.GATSBY_ALGOLIA_APP_ID
  const apiKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
  aa('init', { appId, apiKey, useCookie: true })

  const currentSiteHref = getSiteFromHref()
  if (siteLocalStorage === '"federal"' && currentSiteHref !== 'federal') {
    const to = addRemoveSiteParam(currentSiteHref, 'federal', true)
    location.replace(to)
  }
}

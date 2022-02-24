import aa, { InsightsClient } from 'search-insights'
import { TrackJS } from 'trackjs'
import { initDataDogLogging } from './src/utils/browserMetricsUtils'

declare global {
  interface Window {
    aa: InsightsClient
  }
}

export const onClientEntry = () => {
  const activeEnv = process.env.GATSBY_ACTIVE_ENV

  if (typeof activeEnv === 'undefined') {
    return
  }

  const isProd = activeEnv === 'production'
  const isStaging = activeEnv === 'staging'
  const isDev = activeEnv === 'development'

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

  // Algolia search insights
  window.aa = aa
  const appId = process.env.GATSBY_ALGOLIA_APP_ID
  const apiKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
  aa('init', { appId, apiKey, useCookie: true })
}

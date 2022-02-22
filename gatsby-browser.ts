import { TrackJS } from 'trackjs'
import { initDataDogLogging } from './src/utils/browserMetricsUtils'

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
}

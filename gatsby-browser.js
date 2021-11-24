const { TrackJS } = require('trackjs')
const { initDataDogLogging } = require('./src/utils/browserMetricsUtils')

exports.onClientEntry = () => {
  const activeEnv = process.env.GATSBY_ACTIVE_ENV
  const isProd = activeEnv === 'production'
  const isStaging = activeEnv === 'staging'
  const isDev = activeEnv === 'development'

  if (typeof activeEnv !== 'undefined') {
    if (isProd || (isDev && process.env.RUN_DATADOG_LOCALLY === 'true')) {
      initDataDogLogging()
    }
    if (isProd || isStaging) {
      TrackJS.install({
        token: process.env.GATSBY_TRACKJS_TOKEN,
        application: isProd ? 'docs-production' : 'docs-staging',
      })

      if (isStaging) {
        TrackJS.configure({ version: process.env.PR_NUMBER })
      }
    }
  }
}

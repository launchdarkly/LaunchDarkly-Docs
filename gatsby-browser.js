const { TrackJS } = require('trackjs')
const { initDataDogLogging } = require('./src/utils/browserMetricsUtils')

exports.onClientEntry = () => {
  const activeEnv = process.env.GATSBY_ACTIVE_ENV

  if (typeof activeEnv !== 'undefined') {
    if (activeEnv === 'production' || (activeEnv === 'development' && process.env.RUN_DATADOG_LOCALLY === 'true')) {
      initDataDogLogging()
    }
    if (activeEnv === 'production' || activeEnv === 'staging') {
      TrackJS.install({
        token: process.env.GATSBY_TRACKJS_TOKEN,
        application: activeEnv === 'production' ? 'docs-production' : 'docs-staging',
      })
    }
  }
}

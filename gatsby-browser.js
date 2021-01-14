const { TrackJS } = require('trackjs')
const { initDatadogRum } = require('./src/utils/browserMetricsUtils')

exports.onClientEntry = () => {
  const activeEnv = process.env.GATSBY_ACTIVE_ENV

  // only track production and staging
  if (typeof activeEnv !== 'undefined') {
    if (activeEnv === 'development' && process.env.RUN_DATADOG_RUM_LOCALLY === 'true') {
      initDatadogRum()
    }
    if (activeEnv === 'production' || activeEnv === 'staging') {
      initDatadogRum()
      TrackJS.install({
        token: process.env.GATSBY_TRACKJS_TOKEN,
        application: activeEnv === 'production' ? 'docs-production' : 'docs-staging',
      })
    }
  }
}

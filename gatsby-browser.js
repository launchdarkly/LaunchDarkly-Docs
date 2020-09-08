const { TrackJS } = require('trackjs')

exports.onClientEntry = () => {
  const activeEnv = process.env.GATSBY_ACTIVE_ENV

  // only track production and staging
  if (typeof activeEnv !== 'undefined' && activeEnv !== 'development') {
    TrackJS.install({
      token: process.env.GATSBY_TRACKJS_TOKEN,
      application: activeEnv === 'production' ? 'docs-production' : 'docs-staging',
    })
  }
}

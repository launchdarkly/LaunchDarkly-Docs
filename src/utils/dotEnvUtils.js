/* eslint-disable @typescript-eslint/no-var-requires */
// This is intentionally left as js because it is consumed by algolia.js which in turn is consumed by
// gatsby-config.js.
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({
  path: `.env.${activeEnv}`,
})

module.exports = { activeEnv }

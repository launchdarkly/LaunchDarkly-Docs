/* eslint-disable @typescript-eslint/no-var-requires */
// must use commonJS here because of the algolia plugin in gatsby-config.js

const ld = require('launchdarkly-node-server-sdk')
const defaultConfig = require('./defaultConfig').defaultConfig

const CONFIG_FLAG_KEY = 'docs-pages-config'

const options = {
  baseUri: 'https://sdk.ld.catamorphic.com',
  streamUri: 'https://stream.ld.catamorphic.com',
  eventsUri: 'https://events.ld.catamorphic.com',
  logger: ld.basicLogger({
    level: 'none',
  }),
}

const context = {
  kind: 'github',
  key: 'github',
}

const getFlaggedPagesConfig = async () => {
  let disabledPaths = defaultConfig.disabled_paths

  const isPathDisabled = path => disabledPaths.includes(path)

  if (!process.env.LAUNCHDARKLY_SDK_KEY) {
    console.info('No LaunchDarkly SDK key found, using default config')
    return { isPathDisabled }
  }

  const client = ld.init(process.env.LAUNCHDARKLY_SDK_KEY, options)
  try {
    await client.waitForInitialization()
    const config = await client.variation(CONFIG_FLAG_KEY, context, defaultConfig)

    console.info('Flagged pages config', config)

    if (config.disabled_paths) {
      disabledPaths = config.disabled_paths
    }
    client.close()
  } catch (err) {
    console.error('Error getting LaunchDarkly flagged pages config', err)
  }

  return { isPathDisabled }
}

module.exports = { getFlaggedPagesConfig }

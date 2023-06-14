/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true,
  videoCompression: 1,

  // `macbook-16` viewport: https://docs.cypress.io/api/commands/viewport#Arguments
  viewportHeight: 960,
  viewportWidth: 1536,

  // This is not considered sensative and Cypress recommends checking it in
  // https://docs.cypress.io/guides/dashboard/projects#Identification
  projectId: 'vhorzj',

  e2e: {
    baseUrl: 'https://docs-stg.launchdarkly.com/3087',
  },
})

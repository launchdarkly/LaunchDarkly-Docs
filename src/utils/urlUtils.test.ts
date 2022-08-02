import { makeSiteAware } from './siteAwareUtils'

const launchDarklyContent = `
      app.launchdarkly.com
      clientsdk.launchdarkly.com
      clientstream.launchdarkly.com
      events.launchdarkly.com
      sdk.launchdarkly.com
      stream.launchdarkly.com
      app.launchdarkly.com
    `

const federalContent = `
      app.launchdarkly.us
      clientsdk.launchdarkly.us
      clientstream.launchdarkly.us
      events.launchdarkly.us
      sdk.launchdarkly.us
      stream.launchdarkly.us
      app.launchdarkly.us
    `

describe('makeSiteAware', () => {
  it('replaces all launchDarkly urls to federal', () => {
    expect(makeSiteAware(launchDarklyContent, 'federal')).toEqual(federalContent)
  })

  it('replaces all federal urls to launchDarkly', () => {
    expect(makeSiteAware(federalContent, 'launchDarkly')).toEqual(launchDarklyContent)
  })
})

import { datadogRum } from '@datadog/browser-rum'

export const initDatadogRum = () => {
  datadogRum.init({
    applicationId: process.env.GATSBY_DATADOG_RUM_APPLICATION_ID,
    clientToken: process.env.GATSBY_DATADOG_RUM_CLIENT_TOKEN,
    env: process.env.GATSBY_ACTIVE_ENV,
    site: 'datadoghq.com',
    service: 'Docs',
    sampleRate: 100,
    trackInteractions: true,
  })
}

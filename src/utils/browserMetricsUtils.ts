import { datadogRum } from '@datadog/browser-rum-slim'
import { datadogLogs } from '@datadog/browser-logs'
import { getLCP, Metric } from 'web-vitals'

const LCP_SLO_TARGET = 4000

const initDatadogRum = () => {
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

const sendLCPToDatadog = (metric: Metric) => {
  const sloLogger = datadogLogs.getLogger('sloLogger')
  const withinSlo = metric.value <= LCP_SLO_TARGET
  const logMessage = {
    custom: {
      measures: {
        ['largest_contentful_paint']: metric.value,
        ['largest_contentful_paint_within_slo']: withinSlo,
      },
    },
  }
  sloLogger.info('LCP recorded from docs', logMessage)
}

const logLCP = () => {
  datadogLogs.init({
    clientToken: process.env.GATSBY_DATADOG_CLIENT_TOKEN,
    site: 'datadoghq.com',
    env: process.env.GATSBY_ACTIVE_ENV,
  })
  datadogLogs.addLoggerGlobalContext('service', 'docs')
  datadogLogs.createLogger('sloLogger')
  getLCP(metric => sendLCPToDatadog(metric))
}

export const initDataDogLogging = () => {
  initDatadogRum()
  logLCP()
}

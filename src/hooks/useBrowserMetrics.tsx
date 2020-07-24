import { useEffect } from 'react'
import { Datacenter, datadogLogs } from '@datadog/browser-logs'
import { getLCP, Metric } from 'web-vitals'
import { useFlags } from 'gatsby-plugin-launchdarkly'

type MetricThresholdsConfig = {
  LCP: number
  FID: number
  CLS: number
  FCP: number
  TTFB: number
}

function getMeasureName(metricName: Metric['name']) {
  return {
    LCP: 'largest_contentful_paint',
    FID: 'first_input_delay',
    CLS: 'cumulative_layout_shift',
    FCP: 'first_contentful_paint',
    TTFB: 'time_to_first_byte',
  }[metricName]
}

type DatadogLogMessageContext = {
  custom: {
    measures: {
      [key: string]: string | number | boolean
    }
  }
}

function getLogMessageContext(metric: Metric): DatadogLogMessageContext {
  return {
    custom: {
      measures: {
        [getMeasureName(metric.name)]: metric.value,
      },
    },
  }
}

function sendCustomMeasureLogsToDatadog(metric: Metric, thresholdsConfig: MetricThresholdsConfig) {
  const sloLogger = datadogLogs.getLogger('sloLogger')
  const metricName = metric.name
  const logMessageContext = getLogMessageContext(metric)

  if (metricName in thresholdsConfig) {
    const sloKey = `${getMeasureName(metricName)}_within_slo`
    const withinSLO = metric.value <= thresholdsConfig[metricName]
    logMessageContext.custom.measures[sloKey] = withinSLO
  }

  sloLogger.info(`${metricName} recorded`, logMessageContext)
}

function initDatadogLogs(thresholdsConfig: MetricThresholdsConfig) {
  datadogLogs.init({
    clientToken: process.env.DATADOG_CLIENT_TOKEN,
    datacenter: Datacenter.US,
    service: 'docs',
    env: process.env.GATSBY_ACTIVE_ENV,
    forwardErrorsToLogs: true,
  })

  datadogLogs.createLogger('sloLogger')

  getLCP(metric => sendCustomMeasureLogsToDatadog(metric, thresholdsConfig))
}

export function useBrowserMetrics() {
  const { enableDatagogLogging, performanceMetricsThresholds } = useFlags()

  useEffect(() => {
    if (!enableDatagogLogging) {
      return
    }

    initDatadogLogs(performanceMetricsThresholds)
  }, [enableDatagogLogging, performanceMetricsThresholds])
}

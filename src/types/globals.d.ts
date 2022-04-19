import { InsightsClient } from 'search-insights'

declare global {
  interface Window {
    aa: InsightsClient
    analytics: SegmentAnalytics.AnalyticsJS

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: any
  }
}

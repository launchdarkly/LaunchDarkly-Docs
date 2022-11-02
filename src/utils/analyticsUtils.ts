import { SearchState } from 'react-instantsearch-core'
import debounce from 'lodash.debounce'

import getUserAgentResults from './userAgent'

// Track custom events and sends them to segment.io e.g. track('Link to API docs clicked')

/**
 * Track an event using Segment. "Docs" is prepended to all event names to align with the naming conventions outlined
 * here: https://launchdarkly.atlassian.net/wiki/spaces/PROD/pages/150700347/User+Analytics+Event+Instrumentation+and+Naming+Conventions
 *
 * @param eventName The description of the event
 * @param properties optional event properties
 */
export const track = (eventName: string, properties?: Record<string, unknown>) => {
  const genericProperties = {
    path: window.location.pathname,
    host: window.location.host,
    url: window.location.href,
    title: document.title,
  }
  window?.analytics?.track?.(`Docs ${eventName}`, { ...genericProperties, ...properties })
}

/**
 * // Track site selection with gtm and segment.io
 * For a list of built-in gtag events see:
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 *
 * @param site the site selected by the user.
 */
export const trackSiteSelection = (site: 'federal' | 'launchDarkly') => {
  track('Site Selection Changed', { site })
  window?.gtag?.('event', 'select_content', { content_type: site })
}

// Sends search events directly to gtm without segment.io
// GOTCHA: this is private! Use the debounced export instead.
const _trackSearch = (searchState: SearchState) => {
  // Follow the gtags api for search related events:
  // https://developers.google.com/tag-platform/gtagjs/reference#event
  window?.gtag?.('event', 'search', { search_term: searchState.query })
}

// Debounce 500ms using lodash to prevent each search keystroke spamming gtm
export const trackSearch = debounce(_trackSearch, 500)

export function getAlgoliaAnalyticsTags() {
  if (typeof window === 'undefined') {
    return []
  }

  const { device, browser, os } = getUserAgentResults()

  // Sometimes device type and vendor maybe empty, so we filter to remove them
  const tags = [device.type, device.vendor, os.name, browser.name].filter(t => t)
  return tags
}

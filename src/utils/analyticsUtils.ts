import { SearchState } from 'react-instantsearch-core'
import debounce from 'lodash.debounce'

import getUserAgentResults from './userAgent'

// Track custom events and sends them to segment.io e.g. track('Link to API docs clicked')
export const track = (event: string) => window?.analytics?.track?.(event)

// Track site selection with gtm without segment.io
// For a list of built-in gtag events see:
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackSiteSelection = (site: string) => {
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

import debounce from 'lodash.debounce'
import { SearchState } from 'react-instantsearch-core'

// Track custom events and sends them to segment.io e.g. track('Link to API docs clicked')
export const track = (event: string) => window?.analytics?.track?.(event)

// Sends search events directly to gtm without segment.io.
// GOTCHA: this is private! Use the debounced export instead.
const _trackSearch = (searchState: SearchState) => {
  // Follow the gtags api for search related events:
  // https://developers.google.com/tag-platform/gtagjs/reference#event
  window?.gtag?.('event', 'search', { search_term: searchState.query })
}

// Debounce 500ms using lodash to prevent each search keystroke spamming gtm
export const trackSearch = debounce(_trackSearch, 500)

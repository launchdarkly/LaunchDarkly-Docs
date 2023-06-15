import type { GatsbyBrowser } from 'gatsby'
import aa from 'search-insights'
import { TrackJS } from 'trackjs'

import LayoutContainer from './src/layouts/layoutContainer'
import { PageContext } from './src/types/pageContext'
import { initDataDogLogging } from './src/utils/browserMetricsUtils'
import { getTargetYOffset, scrollToYPosition } from './src/utils/scrollUtils'
import { addRemoveSiteParam, getSiteFromHref } from './src/utils/siteAwareUtils'
import { initUAParser } from './src/utils/userAgent'

export const onClientEntry = () => {
  const activeEnv = process.env.GATSBY_ACTIVE_ENV

  if (typeof activeEnv === 'undefined') {
    return
  }

  const isProd = activeEnv === 'production'
  const isStaging = activeEnv === 'staging'
  const isDev = activeEnv === 'development'
  let siteLocalStorage = localStorage.getItem('site')

  // HACK: this is a migration step for old ls values that shouldn't
  // be an issue on prod and can be removed over time.
  if (siteLocalStorage !== JSON.stringify('launchDarkly') && siteLocalStorage !== JSON.stringify('federal')) {
    localStorage.removeItem('site')
    siteLocalStorage = null
  }

  if (isProd || (isDev && process.env.RUN_DATADOG_LOCALLY === 'true')) {
    initDataDogLogging()
  }

  if (isProd || isStaging) {
    TrackJS.install({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      token: process.env.GATSBY_TRACKJS_TOKEN!,
      application: isProd ? 'docs-production' : 'docs-staging',
    })
  }

  if (isStaging) {
    TrackJS.configure({ version: process.env.GATSBY_BUCKET_PREFIX })
  }

  initUAParser()

  // Algolia search insights
  window.aa = aa
  const appId = process.env.GATSBY_ALGOLIA_APP_ID
  const apiKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
  aa('init', { appId, apiKey, useCookie: true })

  const currentSiteHref = getSiteFromHref()

  // query param exists
  if (currentSiteHref) {
    const currentSiteHrefJson = JSON.stringify(currentSiteHref)
    // sync qs and ls values if they are not in sync
    // Use qs value as source of truth
    if (currentSiteHrefJson !== siteLocalStorage) {
      localStorage.setItem('site', currentSiteHrefJson)
    }
  } else {
    // no query param
    if (!siteLocalStorage) {
      localStorage.setItem('site', JSON.stringify('launchDarkly'))
    } else {
      // append site=federal to qs and redirect to that
      if (JSON.parse(siteLocalStorage) === 'federal') {
        const to = addRemoveSiteParam(location.pathname, 'federal', true)
        location.replace(to)
      }
      // else no qs means launchDarkly by default
      // ls should already be launchDarkly so we do nothing here
    }
  }
}

export const wrapPageElement: GatsbyBrowser<unknown, PageContext>['wrapPageElement'] = ({ element, props }) => {
  return <LayoutContainer pageContext={props.pageContext}>{element}</LayoutContainer>
}

export const shouldUpdateScroll: GatsbyBrowser['shouldUpdateScroll'] = ({ routerProps: { location } }) => {
  // gatsby with reach router has a known scrolling issue where it doesn't work.
  // this fixes that problem.
  if (location.hash) {
    const offset = getTargetYOffset(location.hash)
    if (offset !== 0) {
      scrollToYPosition(offset)
      return [0, offset]
    }
  }

  return false
}

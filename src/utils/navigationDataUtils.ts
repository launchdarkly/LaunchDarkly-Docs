import { globalHistory } from '@reach/router'
import { SideNavItem } from '../components/sideNav/types'

type Topic = {
  path: string
  allItems: string[]
}

export const stripTrailingSlash = (s: string) => s.replace(/\/$/, '')

export const findRootTopic = (topics: Topic[], navigationData: Array<SideNavItem>, pathPrefix: string) => {
  let currentPath = stripTrailingSlash(globalHistory.location.pathname)

  if (pathPrefix) {
    currentPath = currentPath.replace(pathPrefix, '')
  }

  const topic = topics.find((t: Topic) => !!t.allItems.find(a => a === currentPath))
  if (topic) {
    return navigationData.find(n => n.path === topic.path)
  }
}

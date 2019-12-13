import { globalHistory } from '@reach/router'
import { SideNavItem } from '../components/sideNav/types'

export const containsPath = (item: SideNavItem) => {
  const { path, items } = item
  if (path === globalHistory.location.pathname) {
    return true
  } else {
    for (let i = 0; i < items?.length ?? -1; i++) {
      if (containsPath(items[i])) {
        return true
      }
    }
  }
  return false
}

export const findCurrentCategory = (navigationData: Array<SideNavItem>) => {
  return navigationData.find((rootItem: SideNavItem) => containsPath(rootItem))
}

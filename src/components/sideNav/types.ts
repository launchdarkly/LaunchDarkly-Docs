import { IconName } from '../icon'

export interface SideNavItem {
  group?: string
  label: string
  shortLabel?: string
  path: string
  svg?: IconName | string
  flagKey?: string
  items?: Array<SideNavItem>
}

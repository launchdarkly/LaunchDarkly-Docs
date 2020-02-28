export interface SideNavItem {
  label: string
  path: string
  svg?: string
  flagKey?: string
  items: Array<SideNavItem>
}

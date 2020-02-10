export interface SideNavItem {
  label: string
  path: string
  svg?: string
  items: Array<SideNavItem>
}

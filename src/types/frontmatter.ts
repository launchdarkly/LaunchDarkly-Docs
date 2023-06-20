import { SiteFrontmatter } from './siteType'

export type Frontmatter = {
  path: string
  isInternal: boolean
  description: string
  title: string
  site?: SiteFrontmatter
  siteAlertTitle?: string
  isLandingPage?: boolean
}

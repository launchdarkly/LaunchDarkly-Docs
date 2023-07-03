import { CustomTOCItem } from '../components/tableOfContents'

import { Frontmatter } from './frontmatter'
import { SiteMetadata } from './siteMetadata'

export type PageContext = {
  frontmatter: Frontmatter
  id: string
  isLandingPage: boolean
  lastModifiedTime: string
  modifiedDate: string
  timeToRead: number
  toc: Array<CustomTOCItem>
  fileAbsolutePath: string
  siteMetadata: SiteMetadata
}

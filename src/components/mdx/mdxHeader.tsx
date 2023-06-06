import { Fragment, FunctionComponent } from 'react'
import { Themed } from '@theme-ui/mdx'
import { Flex } from 'theme-ui'

import { SiteFrontmatter } from '../../types/siteType'
import { useIsFederal } from '../../utils/siteAwareUtils'
import Link from '../link'

import Breadcrumbs from './breadcrumbs'
import Callout, { CalloutDescription, CalloutTitle } from './callout'
import EditOnGithubLink from './editOnGithubLink'
import Metadata from './metadata'

type MdxHeaderProps = {
  fileAbsolutePath: string
  title: string
  timeToRead: number
  lastModifiedDateFormatted: string
  isLandingPage: boolean
  site: SiteFrontmatter
  siteAlertTitle?: string
}

const MdxHeader: FunctionComponent<React.PropsWithChildren<MdxHeaderProps>> = ({
  fileAbsolutePath,
  title,
  timeToRead,
  lastModifiedDateFormatted,
  isLandingPage,
  site,
  siteAlertTitle,
}) => {
  const isFederal = useIsFederal()

  return (
    <Fragment>
      {!isLandingPage && (
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Breadcrumbs />
          <EditOnGithubLink fileAbsolutePath={fileAbsolutePath} />
        </Flex>
      )}
      <Themed.h1>{title}</Themed.h1>
      {!isLandingPage && <Metadata timeToRead={timeToRead} lastModifiedDateFormatted={lastModifiedDateFormatted} />}
      {isFederal && site === 'launchDarklyOnly' && (
        <Callout intent="alert">
          <CalloutTitle>{siteAlertTitle ?? `${title} is not available in federal environments`}</CalloutTitle>
          <CalloutDescription>
            <br />
            To learn more, read <Link to="/home/advanced/federal">LaunchDarkly in federal environments</Link>.
          </CalloutDescription>
        </Callout>
      )}
    </Fragment>
  )
}

export default MdxHeader

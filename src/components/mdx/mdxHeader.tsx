/** @jsx jsx */
import { Fragment, FunctionComponent } from 'react'
import { Flex, jsx, Themed } from 'theme-ui'

import { SiteFrontmatter } from '../../types/siteType'
import Link from '../link'
import useSite from '../siteSelector/useSite'

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

const MdxHeader: FunctionComponent<MdxHeaderProps> = ({
  fileAbsolutePath,
  title,
  timeToRead,
  lastModifiedDateFormatted,
  isLandingPage,
  site,
  siteAlertTitle,
}) => {
  const [selectedSite] = useSite()

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
      {selectedSite === 'federal' && site === 'launchDarklyOnly' && (
        <Callout intent="alert">
          <CalloutTitle>{siteAlertTitle ?? `${title} is not FedRAMP compliant`}</CalloutTitle>
          <CalloutDescription>
            <br />
            To learn more, read{' '}
            <Link to="/home/advanced/federal#understanding-which-features-have-minimal-support-or-are-unsupported">
              LaunchDarkly in federal environments
            </Link>
            .
          </CalloutDescription>
        </Callout>
      )}
    </Fragment>
  )
}

export default MdxHeader

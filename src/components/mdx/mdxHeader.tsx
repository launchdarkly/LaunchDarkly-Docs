/** @jsx jsx */
import { Fragment, FunctionComponent } from 'react'
import { Flex, jsx, Themed } from 'theme-ui'

import Breadcrumbs from './breadcrumbs'
import EditOnGithubLink from './editOnGithubLink'
import Metadata from './metadata'

type MdxHeaderProps = {
  fileAbsolutePath: string
  title: string
  timeToRead: number
  lastModifiedDateFormatted: string
  isLandingPage: boolean
}

const MdxHeader: FunctionComponent<MdxHeaderProps> = ({
  fileAbsolutePath,
  title,
  timeToRead,
  lastModifiedDateFormatted,
  isLandingPage,
}) => {
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
    </Fragment>
  )
}

export default MdxHeader

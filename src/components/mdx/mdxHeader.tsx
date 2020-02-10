/** @jsx jsx */
import { jsx, Styled, Flex } from 'theme-ui'
import { Fragment, FunctionComponent } from 'react'
import Breadcrumbs from './breadcrumbs'
import Metadata from './metadata'
import EditOnGithubLink from './editOnGithubLink'

type MdxHeaderProps = {
  fileAbsolutePath: string
  title: string
  timeToRead: number
  lastModifiedDateFormatted: string
}

const MdxHeader: FunctionComponent<MdxHeaderProps> = ({
  fileAbsolutePath,
  title,
  timeToRead,
  lastModifiedDateFormatted,
}) => {
  return (
    <Fragment>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Breadcrumbs />
        <EditOnGithubLink fileAbsolutePath={fileAbsolutePath} />
      </Flex>
      <Styled.h1>{title}</Styled.h1>
      <Metadata timeToRead={timeToRead} lastModifiedDateFormatted={lastModifiedDateFormatted} />
    </Fragment>
  )
}

export default MdxHeader

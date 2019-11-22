/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { FunctionComponent } from 'react'
import pluralize from 'pluralize'

interface FrontmatterProps {
  timeToRead: number
  lastModifiedDateFormatted: string
}
const Frontmatter: FunctionComponent<FrontmatterProps> = ({ timeToRead, lastModifiedDateFormatted }) => {
  return (
    <div
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'grayMed',
        pb: 2,
        mb: 4,
      }}
    >
      <Styled.h5>
        Est Read Time: {timeToRead} {pluralize('minute', timeToRead)}
      </Styled.h5>
      <Styled.h5>Last edited: {lastModifiedDateFormatted}</Styled.h5>
    </div>
  )
}

export default Frontmatter

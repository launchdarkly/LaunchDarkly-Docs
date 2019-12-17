/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { FunctionComponent } from 'react'
import pluralize from 'pluralize'

interface MdxMetadataProps {
  timeToRead: number
  lastModifiedDateFormatted: string
}
const MdxMetadata: FunctionComponent<MdxMetadataProps> = ({ timeToRead, lastModifiedDateFormatted }) => {
  return (
    <div
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 6,
      }}
    >
      <Styled.h5>
        Est. Read Time: {timeToRead} {pluralize('minute', timeToRead)}
      </Styled.h5>
      <Styled.h5>Last edited: {lastModifiedDateFormatted}</Styled.h5>
    </div>
  )
}

export default MdxMetadata

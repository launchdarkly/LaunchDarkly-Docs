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
        mb: 7,
      }}
    >
      <Styled.h5>
        Read time: {timeToRead} {pluralize('minute', timeToRead)}
      </Styled.h5>
      <Styled.h5>Last edited: {lastModifiedDateFormatted}</Styled.h5>
    </div>
  )
}

export default MdxMetadata

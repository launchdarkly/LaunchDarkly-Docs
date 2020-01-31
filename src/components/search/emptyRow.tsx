/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { FunctionComponent } from 'react'

interface EmptyRowProps {
  query: string
}
const EmptyRow: FunctionComponent<EmptyRowProps> = ({ query }) => {
  return (
    <Box p={6} sx={{ color: 'grayBase', fontSize: 5, overflowWrap: 'break-word' }}>
      No results for <span sx={{ color: 'grayBlack', lineHeight: 'medium' }}>&quot;{query}&quot;</span>
    </Box>
  )
}

export default EmptyRow

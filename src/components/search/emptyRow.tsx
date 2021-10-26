/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { FunctionComponent } from 'react'

interface EmptyRowProps {
  query: string
}
const EmptyRow: FunctionComponent<EmptyRowProps> = ({ query }) => {
  return (
    <Box p={6} color="text" sx={{ fontSize: 5, overflowWrap: 'break-word' }}>
      No results for{' '}
      <span color="grayscaleBlack200" sx={{ lineHeight: 'medium' }}>
        &quot;{query}&quot;
      </span>
    </Box>
  )
}

export default EmptyRow

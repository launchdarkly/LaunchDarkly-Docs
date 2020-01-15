/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Box } from '@theme-ui/components'
import { FunctionComponent } from 'react'
import pluralize from 'pluralize'

interface ResultCountProps {
  count: number
}

const ResultCount: FunctionComponent<ResultCountProps> = ({ count }) => {
  const { theme } = useThemeUI()
  return (
    <Box
      m={4}
      p={2}
      sx={{
        display: 'inline-block',
        borderBottom: `0.1rem solid ${theme.colors.primarySafe}`,
        textAlign: 'center',
        color: 'grayBlack',
      }}
    >
      {pluralize('Result', count)} ({count})
    </Box>
  )
}

export default ResultCount

import { FunctionComponent } from 'react'
import pluralize from 'pluralize'
import { Box } from 'theme-ui'

import useGitGatsbyTheme from '../../hooks/useGitGatsbyTheme'

interface ResultCountProps {
  count: number
}

const ResultCount: FunctionComponent<React.PropsWithChildren<ResultCountProps>> = ({ count }) => {
  const { theme } = useGitGatsbyTheme()
  return (
    <Box
      mx={5}
      my={4}
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

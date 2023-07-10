import { FC, Fragment, ReactElement } from 'react'
import { Box, Card, Flex } from 'theme-ui'

import Icon from '../icon'

const LearnMoreSdk: FC<React.PropsWithChildren<unknown>> = ({ children }): ReactElement => {
  return (
    <Card variant="learnMoreSdk">
      <Flex>
        <Box>
          <Fragment>{children}</Fragment>
        </Box>
        <Icon name="database-export" variant="learnMoreSdk" sx={{ marginTop: 1, marginLeft: 'auto' }} />
      </Flex>
    </Card>
  )
}

export default LearnMoreSdk

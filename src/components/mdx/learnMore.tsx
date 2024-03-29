import { FC, Fragment, ReactElement } from 'react'
import { Box, Card, Flex } from 'theme-ui'

import Icon from '../icon'

const LearnMore: FC<React.PropsWithChildren<unknown>> = ({ children }): ReactElement => {
  return (
    <Card variant="learnMore">
      <Flex>
        <Box>
          <Fragment>{children}</Fragment>
        </Box>
        <Icon name="openapi-logo" variant="learnMore" sx={{ marginTop: 1, marginLeft: 'auto' }} />
      </Flex>
    </Card>
  )
}

export default LearnMore

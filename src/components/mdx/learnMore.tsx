/** @jsx jsx */
import { FC, Fragment, ReactElement } from 'react'
import { Box, Card, Flex, jsx } from 'theme-ui'

import Icon from '../icon'

const LearnMore: FC = ({ children }): ReactElement => {
  return (
    <Card variant="learnMore">
      <Flex>
        <Box>
          <Fragment>{children}</Fragment>
        </Box>
        <Icon name="lightbulb-on-outline" variant="learnMore" sx={{ marginTop: 1, marginLeft: 'auto' }} />
      </Flex>
    </Card>
  )
}

export default LearnMore

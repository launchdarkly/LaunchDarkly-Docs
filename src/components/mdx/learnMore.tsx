/** @jsx jsx */
import { jsx, Card, Flex, Box } from 'theme-ui'
import { Fragment, FC, ReactElement } from 'react'
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

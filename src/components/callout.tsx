/** @jsx jsx */
import { jsx, Flex, Box } from 'theme-ui'
import { Card } from '@theme-ui/components'
import { ReactNode } from 'react'

import { Intent } from './intent'
import Icon from './icon'

export type CalloutProps = {
  intent: Intent
  children: ReactNode
}

export default function Callout({ intent, children }: CalloutProps) {
  return (
    <Card variant={intent}>
      <Flex>
        <Box>{children}</Box>

        <Icon name="information" variant="info" />
      </Flex>
    </Card>
  )
}

/** @jsx jsx */
import { jsx, Flex, Box } from 'theme-ui'
import { Card } from '@theme-ui/components'
import { ReactNode } from 'react'

import { Intent } from './intent'
import LinkVariant from './icons/linkVariant'

export type InfoProps = {
  intent: Intent
  children: ReactNode
}

export function Info({ intent, children }: InfoProps) {
  return (
    <Card variant={intent}>
      <Flex>
        <Box>{children}</Box>

        <Box>
          <LinkVariant sx={{ variant: 'icons.info' }} />
        </Box>
      </Flex>
    </Card>
  )
}

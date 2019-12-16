/** @jsx jsx */
import { jsx, Flex, Box } from 'theme-ui'
import { Card, Text } from '@theme-ui/components'
import { PropsWithChildren } from 'react'

import { Intent } from './intent'
import Icon, { IconName } from './icon'

const iconNames: { [key in Intent]: IconName } = {
  info: 'information',
  warning: 'remove-circle',
  alert: 'alert-rhombus',
  primary: 'checkbox-marked-circle',
}

function Title({ children }: PropsWithChildren<{}>) {
  return children && <Text sx={{ fontSize: 4, lineHeight: 'body', marginBottom: 4 }}>{children}</Text>
}

function Description({ children }: PropsWithChildren<{}>) {
  return <Text sx={{ fontSize: 3, lineHeight: 'small' }}>{children}</Text>
}

export type CalloutProps = {
  intent?: Intent
}

export default function Callout({ intent = 'info', children }: PropsWithChildren<CalloutProps>) {
  return (
    <Card variant={intent}>
      <Flex>
        <Box>{children}</Box>
        <Icon name={iconNames[intent]} variant={`callout.${intent}`} sx={{ marginTop: 1, marginLeft: 'auto' }} />
      </Flex>
    </Card>
  )
}

Callout.Title = Title
Callout.Description = Description

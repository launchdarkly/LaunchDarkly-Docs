/** @jsx jsx */
import { jsx, Card, Text, Flex, Box, ThemeUIStyleObject } from 'theme-ui'
import { PropsWithChildren } from 'react'

import { Intent } from '../intent'
import Icon, { IconName } from '../icon'

const iconNames: { [key in Intent]: IconName } = {
  info: 'information',
  warning: 'remove-circle',
  alert: 'alert-rhombus',
  primary: 'checkbox-marked-circle',
}

export type CalloutProps = {
  intent?: Intent
}

export function CalloutTitle({ children }: PropsWithChildren<{}>) {
  return (
    children && (
      <Text mb={3} mr={6} sx={{ fontSize: 4, lineHeight: 'regular' }}>
        {children}
      </Text>
    )
  )
}

const descriptionStyles: ThemeUIStyleObject = { fontSize: 3, lineHeight: 'spaced', mb: 1, overflowWrap: 'break-word' }
export function CalloutDescription({ children }: PropsWithChildren<{}>) {
  return <Text sx={{ ...descriptionStyles, '& p': { ...descriptionStyles } }}>{children}</Text>
}

export default function Callout({ intent = 'info', children }: PropsWithChildren<CalloutProps>) {
  return (
    <Card variant={intent}>
      <Flex>
        <Box>{children}</Box>
        <Icon name={iconNames[intent]} variant={`callout.${intent}`} mt={1} mr={1} ml="auto" />
      </Flex>
    </Card>
  )
}

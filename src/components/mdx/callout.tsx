/** @jsx jsx */
import { FC, PropsWithChildren } from 'react'
import { Box, Card, Flex, jsx, Text, ThemeUIStyleObject } from 'theme-ui'

import { SiteType } from '../../types/siteType'
import { errorOnInvalidSite } from '../../utils/siteAwareUtils'
import Icon, { IconName } from '../icon'
import { Intent } from '../intent'
import useSite from '../siteSelector/useSite'

const iconNames: { [key in Intent]: IconName } = {
  info: 'information',
  warning: 'remove-circle',
  alert: 'alert-rhombus',
  primary: 'checkbox-marked-circle',
}

export type CalloutProps = {
  intent?: Intent
  site?: SiteType
}

export const CalloutTitle: FC<React.PropsWithChildren<unknown>> = ({ children }) =>
  children && (
    <Text mb={3} mr={6} sx={{ fontSize: 4, lineHeight: 'regular' }}>
      {children}
    </Text>
  )

const descriptionStyles: ThemeUIStyleObject = { fontSize: 3, lineHeight: 'spaced', mb: 1, overflowWrap: 'break-word' }
export const CalloutDescription: FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <Text sx={{ ...descriptionStyles, '& p': { ...descriptionStyles } }}>{children}</Text>
)

export default function Callout({ intent = 'info', site, children }: PropsWithChildren<CalloutProps>) {
  errorOnInvalidSite(site)
  const [selectedSite] = useSite()

  if (!site || site === selectedSite) {
    return (
      <Card variant={intent}>
        <Flex>
          <Box>{children}</Box>
          <Icon name={iconNames[intent]} variant={`callout.${intent}`} mt={1} mr={1} ml="auto" />
        </Flex>
      </Card>
    )
  }

  return null
}

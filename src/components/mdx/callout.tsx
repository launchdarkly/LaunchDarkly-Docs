import { FC, PropsWithChildren } from 'react'
import { Box, Card, Flex, Text, ThemeUIStyleObject } from 'theme-ui'

import useGitGatsbyTheme from '../../hooks/useGitGatsbyTheme'
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
export const CalloutDescription: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const { theme } = useGitGatsbyTheme()

  return (
    <Text
      sx={{
        ...descriptionStyles,
        '& p': { ...descriptionStyles },
        ul: theme.styles.ul,
        li: theme.styles.li,
        a: theme.styles.a,
      }}
    >
      {children}
    </Text>
  )
}

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

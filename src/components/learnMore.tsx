/** @jsx jsx */
import { jsx, Flex, Box } from 'theme-ui'
import { Fragment, isValidElement, Children, PropsWithChildren } from 'react'
import { Card, Text } from '@theme-ui/components'
import Icon from './icon'
import Link from './link'

function Title({ children }: PropsWithChildren<{}>) {
  return children && <Text sx={{ fontSize: 4, lineHeight: 'body', marginBottom: 4 }}>{children}</Text>
}

export default function LearnMore({ children }: PropsWithChildren<{}>) {
  const title = Children.toArray(children).find(child => isValidElement(child) && child.type === Title)
  const links = Children.toArray(children).filter(child => isValidElement(child) && child.type === Link)
  const defaultTitle = 'See also:'

  return (
    <Card variant="learnMore">
      <Flex>
        <Box>
          {links.length === 1 ? (
            <Fragment>
              {defaultTitle} {links}
            </Fragment>
          ) : (
            <Fragment>
              <div>{title || defaultTitle}</div>
              {links.map((link, i) => (
                <div key={i}>{link}</div>
              ))}
            </Fragment>
          )}
        </Box>
        <Icon name="lightbulb-on-outline" variant="learnMore" sx={{ marginTop: 1, marginLeft: 'auto' }} />
      </Flex>
    </Card>
  )
}

LearnMore.Title = Title
LearnMore.Link = Link

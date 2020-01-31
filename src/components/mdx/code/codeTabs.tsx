/** @jsx jsx */
import { jsx, Box, Card, Flex, Button } from 'theme-ui'
import { useState, Children, PropsWithChildren } from 'react'

/**
 * https://github.com/facebook/docusaurus/blob/master/packages/docusaurus-theme-classic/src/theme/Tabs/index.js
 */

type TabProps = {
  defaultValue?: string
  values: { value: string; label: string }[]
}

export function CodeTabs(props: PropsWithChildren<TabProps>) {
  const { children, defaultValue, values } = props
  const [selectedValue, setSelectedValue] = useState(defaultValue ? defaultValue : values[0].value)

  return (
    <Card variant="code">
      <Flex sx={{ flexDirection: 'column' }}>
        <Box sx={{ marginBottom: 4 }}>
          {values.map(({ value, label }: { value: string; label: string }) => (
            <Button
              aria-label="label"
              variant={`code.${selectedValue === value ? 'languageActive' : 'language'}`}
              key={value}
              onClick={() => setSelectedValue(value)}
            >
              {label}
            </Button>
          ))}
        </Box>
        {
          Children.toArray(children).filter(
            (child: { props: { value: string } }) => child.props.value === selectedValue,
          )[0]
        }
      </Flex>
    </Card>
  )
}

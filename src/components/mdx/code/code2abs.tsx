/** @jsx jsx */
import { Children, PropsWithChildren, useState } from 'react'
import { Box, Button, Card, Flex, jsx } from 'theme-ui'

import { CodeTabItem2, TabsItemProps2 } from './code2abItem'

export function CodeTabs2({ children }: PropsWithChildren<TabsItemProps2>) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const validChildren = Children.toArray(children).filter((child: { props: { mdxType?: string } }) => {
    return child.props.mdxType === CodeTabItem2.name
  })
  const selectedChild = validChildren.find((_child, index) => {
    return index === selectedIndex
  })
  return (
    <Card variant="code">
      <Flex sx={{ flexDirection: 'column' }}>
        <Box sx={{ marginBottom: 4 }}>
          {validChildren.map((child: { props: { languageKey: string; label: string } }, index) => {
            const { label } = child.props
            return (
              <Button
                aria-label="label"
                variant={`code.${index === selectedIndex ? 'languageActive' : 'language'}`}
                key={index}
                onClick={() => setSelectedIndex(index)}
                title={label}
              >
                <div
                  sx={{
                    maxWidth: '200px',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  {label}
                </div>
              </Button>
            )
          })}
        </Box>
        {selectedChild}
      </Flex>
    </Card>
  )
}

/** @jsx jsx */
import { Children, ReactNode, useState } from 'react'
import { Box, Button, Card, Flex, jsx } from 'theme-ui'

import { CodeTabItem2, TabsItemProps2 } from './code2abItem'

type CodeTabProps = {
  children: ReactNode
}

export function CodeTabs2({ children }: CodeTabProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const validChildren = Children.toArray(children).filter((child: { props: { mdxType?: string } }) => {
    // TODO: update the following line when the components are renamed.
    return child.props.mdxType === 'CodeTabItem2'
  })
  const selectedChild = validChildren.find((_child, index) => {
    return index === selectedIndex
  })
  validChildren.forEach((codeTabItem: { props: TabsItemProps2 }, index) => {
    throwErrorIfLabelMissing(codeTabItem, index)
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

function throwErrorIfLabelMissing(codeTabItem: { props: TabsItemProps2 }, index: number) {
  if (!codeTabItem.props.label) {
    throw new Error(`Error: ${CodeTabItem2.name} is missing a label, tab ${index + 1}`)
  }
}

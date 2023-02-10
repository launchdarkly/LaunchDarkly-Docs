/** @jsx jsx */
import { Children, ReactNode, useState } from 'react'
import { Box, Button, Card, Flex, jsx } from 'theme-ui'

import { CSTab, CSTabProps } from './csTab'

type CodeSampleProps = {
  children: ReactNode
}

export function CodeSample({ children }: CodeSampleProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const validChildren = Children.toArray(children).filter((child: { props: { mdxType?: string } }) => {
    return child.props.mdxType === 'CSTab'
  })
  const selectedChild = validChildren.find((_child, index) => {
    return index === selectedIndex
  })
  validChildren.forEach((CSTabItem: { props: CSTabProps }, index) => {
    throwErrorIfLabelMissing(CSTabItem, index)
  })
  return (
    <Card variant="code">
      <Flex sx={{ flexDirection: 'column' }}>
        <Box sx={{ marginBottom: 4 }}>
          {validChildren.map((child: { props: { label: string } }, index) => {
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

function throwErrorIfLabelMissing(CSTabItem: { props: CSTabProps }, index: number) {
  if (!CSTabItem.props.label) {
    throw new Error(`Error: ${CSTab.name} is missing a label, tab ${index + 1}`)
  }
}

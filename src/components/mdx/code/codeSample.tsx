/** @jsx jsx */
import { Children, ReactNode, useState } from 'react'
import { Box, Button, Card, Flex, jsx } from 'theme-ui'

import { CSTab, CSTabProps } from './csTab'

type CodeSampleProps = {
  children: ReactNode
}

export function CodeSample({ children }: CodeSampleProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  if (!children) {
    throw new Error(`Error: There is a ${CodeSample.name} that is missing a child component. Add a CSTab.`)
  } else {
    const validChildren = Children.toArray(children).filter((child: JSX.Element) => {
      return child.type.displayName === 'CSTab'
    })
    const selectedChild = validChildren.find((_child, index: number) => {
      return index === selectedIndex
    })

    validChildren.forEach((CSTabItem: JSX.Element, index: number) => {
      throwErrorIfLabelMissing(CSTabItem, index)
    })
    return (
      <Card variant="code">
        <Flex sx={{ flexDirection: 'column' }}>
          <Box sx={{ marginBottom: 4 }}>
            {validChildren.map((child: JSX.Element, index: number) => {
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
}

function throwErrorIfLabelMissing(CSTabItem: { props: CSTabProps }, index: number) {
  if (!CSTabItem.props.label) {
    throw new Error(`Error: ${CSTab.name} is missing a label, tab ${index + 1}`)
  }
}

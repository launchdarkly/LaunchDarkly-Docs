/** @jsx jsx */
import { jsx, Styled, IntrinsicSxElements } from 'theme-ui'
import React from 'react'
import SvgAnchor from '../icons/anchor'

// This module defines custom heading components to be used in place
// of the default HTML elements that Markdown compiles to.

type HeadingTag = keyof Pick<IntrinsicSxElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

type HeadingProps = { id: string }

function createHeading(tag: HeadingTag) {
  const Heading: React.FunctionComponent<HeadingProps> = props => {
    const Tag = Styled[tag]

    return (
      <Tag
        {...props}
        css={{
          position: 'relative',
          '& > a': {
            visibility: 'hidden',
          },
          ':hover > a': {
            visibility: 'visible',
          },
        }}
      >
        <a
          href={`#${props.id}`}
          sx={{
            paddingRight: 1,
            marginLeft: -5,
            float: 'left',
          }}
        >
          <SvgAnchor sx={{ size: 1, fill: 'gray' }} />
        </a>
        {props.children}
      </Tag>
    )
  }

  return Heading
}

export const H1 = createHeading('h1')

export const H2 = createHeading('h2')

export const H3 = createHeading('h3')

export const H4 = createHeading('h4')

export const H5 = createHeading('h5')

export const H6 = createHeading('h6')

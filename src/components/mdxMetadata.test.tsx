import React from 'react'
import { render } from '@testing-library/react'
import MdxMetadata from './mdxMetadata'

describe('mdx metadata', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<MdxMetadata timeToRead={10} lastModifiedDateFormatted="Nov 12 1999" />)
    expect(asFragment()).toMatchSnapshot()
  })
})

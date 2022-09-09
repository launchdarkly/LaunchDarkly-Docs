import React from 'react'
import { render } from '@testing-library/react'

import Metadata from './metadata'

describe('mdx metadata', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Metadata timeToRead={10} lastModifiedDateFormatted="Nov 12 1999" />)
    expect(asFragment()).toMatchSnapshot()
  })
})

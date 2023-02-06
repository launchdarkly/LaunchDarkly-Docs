import React from 'react'
import { render, screen } from '@testing-library/react'

import { CSTab } from './csTab'

describe('CodeSample', () => {
  it('render CSTab child component', () => {
    const label = 'foo'
    render(<CSTab label={label}>console.log(Hello World)</CSTab>)
    expect(screen.getByText('console.log(Hello World)')).toBeVisible
  })
})

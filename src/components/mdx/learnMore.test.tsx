import React from 'react'
import { render } from '@testing-library/react'

import LearnMore from './learnMore'

describe('learn more', () => {
  test('renders correctly with a single link', () => {
    const { asFragment } = render(
      <LearnMore>
        Learn more: <a href="/foobar">Foobar</a>
      </LearnMore>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with multiple links', () => {
    const { asFragment } = render(
      <LearnMore>
        <a href="/foobar">Foobar</a>
        <a href="/foobar">Foobar</a>
        <a href="/foobar">Foobar</a>
      </LearnMore>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

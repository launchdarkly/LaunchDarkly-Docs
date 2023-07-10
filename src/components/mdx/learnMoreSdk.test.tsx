import React from 'react'
import { render } from '@testing-library/react'

import LearnMoreSdk from './learnMoreSdk'

describe('learn more sdk', () => {
  test('renders correctly with a single link', () => {
    const { asFragment } = render(
      <LearnMoreSdk>
        Learn more: <a href="/foobar">Foobar</a>
      </LearnMoreSdk>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with multiple links', () => {
    const { asFragment } = render(
      <LearnMoreSdk>
        <a href="/foobar">Foobar</a>
        <a href="/foobar">Foobar</a>
        <a href="/foobar">Foobar</a>
      </LearnMoreSdk>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

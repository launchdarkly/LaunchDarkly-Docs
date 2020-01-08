import React from 'react'
import { render } from '@testing-library/react'
import LearnMore, { LearnMoreLink } from './learnMore'

describe('learn more', () => {
  test('renders correctly with a single link', () => {
    const { asFragment } = render(
      <LearnMore>
        <LearnMoreLink to="/foobar">Foobar</LearnMoreLink>
      </LearnMore>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with multiple links', () => {
    const { asFragment } = render(
      <LearnMore>
        <LearnMoreLink to="/foobar">a</LearnMoreLink>
        <LearnMoreLink to="/foobar">b</LearnMoreLink>
        <LearnMoreLink to="/foobar">c</LearnMoreLink>
      </LearnMore>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import LearnMore from './learnMore'

describe('learn more', () => {
  test('renders correctly with a single link', () => {
    const { asFragment } = render(
      <LearnMore>
        <LearnMore.Link to="/foobar">Foobar</LearnMore.Link>
      </LearnMore>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with multiple links', () => {
    const { asFragment } = render(
      <LearnMore>
        <LearnMore.Link to="/foobar">a</LearnMore.Link>
        <LearnMore.Link to="/foobar">b</LearnMore.Link>
        <LearnMore.Link to="/foobar">c</LearnMore.Link>
      </LearnMore>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

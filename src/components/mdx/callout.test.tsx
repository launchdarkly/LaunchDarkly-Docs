import React from 'react'
import { render } from '@testing-library/react'
import Callout from './callout'

describe('callout', () => {
  test('renders', () => {
    const { asFragment } = render(
      <Callout intent="primary">
        <Callout.Title>Adding users to LaunchDarkly</Callout.Title>
        <Callout.Description>
          You do not have to send users to LaunchDarkly in advance. <a href="">Check out this page</a>. You can target
          them with feature flags have LaunchDarkly accounts of their own. Users appear in the dashboard automatically
          after they encounter feature flags.
        </Callout.Description>
      </Callout>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

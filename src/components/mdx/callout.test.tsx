jest.mock('../../hooks/useGitGatsbyTheme', () => () => {
  const theme = jest.requireActual('../../gatsby-plugin-theme-ui')
  return { theme: theme.default }
})

import React from 'react'
import { render } from '@testing-library/react'

import Callout, { CalloutDescription, CalloutTitle } from './callout'

describe('callout', () => {
  test('renders', () => {
    const { asFragment } = render(
      <Callout intent="primary">
        <CalloutTitle>Adding contexts to LaunchDarkly</CalloutTitle>
        <CalloutDescription>
          You do not have to send contexts to LaunchDarkly in advance. <a href="example.com">Check out this page</a>.
          You can target them with feature flags have LaunchDarkly accounts of their own. Contexts appear in the
          dashboard automatically after they encounter feature flags.
        </CalloutDescription>
      </Callout>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

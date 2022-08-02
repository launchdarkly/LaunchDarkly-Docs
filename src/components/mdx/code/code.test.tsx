jest.mock('./codeSnippet', () => ({
  CodeSnippet: jest.fn(),
}))
jest.mock('../../siteSelector/useSite', () => ({ __esModule: true, default: jest.fn() }))

import React from 'react'
import { render } from '@testing-library/react'
import { Code } from './code'
import { CodeSnippet } from './codeSnippet'
import useSite from '../../siteSelector/useSite'

const mockUseSite = useSite as jest.Mock
const mockSetSite = jest.fn()
const mockCodeSnippet = CodeSnippet as jest.Mock

describe('code', () => {
  beforeEach(() => {
    mockUseSite.mockImplementation(() => ['launchDarkly', mockSetSite])
    mockCodeSnippet.mockImplementation(() => 'CodeSnippetComponent')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders site aware <code> component', () => {
    mockUseSite.mockImplementation(() => ['federal', mockSetSite])
    const { asFragment } = render(<Code>app.launchdarkly.com</Code>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <code>
          app.launchdarkly.us
        </code>
      </DocumentFragment>
`)
  })

  it('renders CodeSnippet for string children', () => {
    const { getByText } = render(<Code className="testClass">test</Code>)
    expect(getByText('CodeSnippetComponent')).toBeInTheDocument()
  })
})

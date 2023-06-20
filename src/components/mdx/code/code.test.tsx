jest.mock('./codeSnippet', () => ({
  CodeSnippet: jest.fn(),
}))
jest.mock('../../siteSelector/useSite', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('gatsby-plugin-launchdarkly', () => ({
  useFlags: jest.fn(),
}))

import React from 'react'
import { render } from '@testing-library/react'
import { useFlags } from 'gatsby-plugin-launchdarkly'

import useSite from '../../siteSelector/useSite'

import { Code } from './code'
import { CodeSnippet } from './codeSnippet'

const mockUseSite = useSite as jest.Mock
const mockUseFlags = useFlags as jest.Mock
const mockSetSite = jest.fn()
const mockCodeSnippet = CodeSnippet as jest.Mock

describe('code', () => {
  beforeEach(() => {
    mockUseFlags.mockReturnValue({ enableSiteSelection: true })
    mockUseSite.mockImplementation(() => ['launchDarkly', mockSetSite])
    mockCodeSnippet.mockImplementation(({ children }: { children: string }) => <>CodeSnippetComponent: {children}</>)
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

  it('renders site aware <CodeSnippet> component', () => {
    mockUseSite.mockImplementation(() => ['federal', mockSetSite])

    const { asFragment } = render(<Code className="test">app.launchdarkly.com</Code>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <code>
          app.launchdarkly.us
        </code>
      </DocumentFragment>
    `)
  })

  it('renders non-string children as is', () => {
    const { asFragment } = render(
      <Code>
        <div>test data</div>
      </Code>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          test data
        </div>
      </DocumentFragment>
    `)
  })
})

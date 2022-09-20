jest.mock('gatsby', () => {
  const actual = jest.requireActual('gatsby')
  return {
    ...actual,
    navigate: jest.fn(),
  }
})
jest.mock('../../utils/siteAwareUtils', () => ({ __esModule: true, addRemoveSiteParam: jest.fn() }))
jest.mock('./useSite', () => ({ __esModule: true, default: jest.fn() }))

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { navigate } from 'gatsby'

import { addRemoveSiteParam } from '../../utils/siteAwareUtils'

import SiteSelector from './siteSelector'
import useSite from './useSite'

const mockUseSite = useSite as jest.Mock
const mockSetSite = jest.fn()
const mockNavigate = navigate as jest.Mock
const mockGetUrlSiteAware = addRemoveSiteParam as jest.Mock

describe('site selector', () => {
  let siteSelector: HTMLElement

  beforeEach(() => {
    mockUseSite.mockImplementation(() => ['launchDarkly', mockSetSite])
    mockGetUrlSiteAware.mockImplementation(() => 'mockUrl')
    render(<SiteSelector />)

    siteSelector = screen.getByTestId('dropdown-label')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('renders correctly with launchDarkly as default', () => {
    expect(siteSelector.textContent).toBe('LaunchDarkly docs')
  })

  test('renders launchDarkly and federal options', () => {
    fireEvent.click(siteSelector)

    const [launchDarklyDocs, federalDocs] = screen.getAllByTestId('option')
    expect(launchDarklyDocs).toHaveTextContent('LaunchDarkly docs')
    expect(federalDocs).toHaveTextContent('Federal docs')
  })

  test('url update on site change', () => {
    fireEvent.click(siteSelector)
    const [, federalDocs] = screen.getAllByTestId('option')

    fireEvent.click(federalDocs)

    expect(mockSetSite).toHaveBeenCalledWith('federal')
    expect(mockGetUrlSiteAware).toHaveBeenCalledWith('', 'federal', true)
    expect(mockNavigate).toHaveBeenCalledWith('mockUrl', { replace: true })
  })

  test('check appears beside selected item', () => {
    fireEvent.click(siteSelector)

    const [launchDarklyDocs] = screen.getAllByTestId('option')
    const check = screen.getByText('Icon: check', { exact: false })
    expect(launchDarklyDocs).toContainElement(check)
  })
})

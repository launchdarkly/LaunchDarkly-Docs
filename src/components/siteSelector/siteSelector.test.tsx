jest.mock('../../utils/siteAwareUtils', () => ({ __esModule: true, addRemoveSiteParam: jest.fn() }))
jest.mock('./useSite', () => ({ __esModule: true, default: jest.fn() }))

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { addRemoveSiteParam } from '../../utils/siteAwareUtils'

import SiteSelector from './siteSelector'
import useSite from './useSite'

const mockUseSite = useSite as jest.Mock
const mockSetSite = jest.fn()
const mockGetUrlSiteAware = addRemoveSiteParam as jest.Mock
const mockNavigate = jest.fn()

// jest was having an issue mocking 'navigate' from 'gatsby',
// maybe because it's re-exported from @reach/router?
// to overcome this, the function is now passed to the component as a prop
// so we can create a mock function here.
const createComponent = () => <SiteSelector navigateFn={mockNavigate} />
const getSiteSelector = () => screen.getByTestId('dropdown-label')

describe('site selector', () => {
  beforeEach(() => {
    mockUseSite.mockImplementation(() => ['launchDarkly', mockSetSite])
    mockGetUrlSiteAware.mockImplementation(() => 'mockUrl')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('renders correctly with launchDarkly as default', () => {
    render(createComponent())
    expect(getSiteSelector()).toHaveTextContent('LaunchDarkly docs')
  })

  test('renders launchDarkly and federal options', () => {
    render(createComponent())

    fireEvent.click(getSiteSelector())

    const [launchDarklyDocs, federalDocs] = screen.getAllByTestId('option')
    expect(launchDarklyDocs).toHaveTextContent('LaunchDarkly docs')
    expect(federalDocs).toHaveTextContent('Federal docs')
  })

  test('url update on site change', () => {
    render(createComponent())

    fireEvent.click(getSiteSelector())
    const [, federalDocs] = screen.getAllByTestId('option')

    fireEvent.click(federalDocs)

    expect(mockSetSite).toHaveBeenCalledWith('federal')
    expect(mockGetUrlSiteAware).toHaveBeenCalledWith('', 'federal', true)
    expect(mockNavigate).toHaveBeenCalledWith('mockUrl', { replace: true })
  })

  test('check appears beside selected item', () => {
    render(createComponent())

    fireEvent.click(getSiteSelector())

    const [launchDarklyDocs] = screen.getAllByTestId('option')
    const check = screen.getByText('Icon: check', { exact: false })
    expect(launchDarklyDocs).toContainElement(check)
  })
})

jest.mock('./userAgent', () => ({
  __esModule: true,
  default: jest.fn(),
}))

import getUserAgentResults from './userAgent'
import { getAlgoliaAnalyticsTags } from './analyticsUtils'

const mockUAResult = {
  device: {
    vendor: 'Apple',
    model: 'iPhone',
    type: 'mobile',
  },
  browser: {
    name: 'Firefox',
    version: '15.0a2',
    major: '15',
  },
  os: {
    name: 'Mac OS',
    version: '10.6.8',
  },
  ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36',
  engine: {
    name: 'Gecko',
    version: '2.0b9pre',
  },
  cpu: { architecture: 'arm' },
}
const mockGetUserAgentResults = getUserAgentResults as jest.Mock

describe('getAlgoliaAnalyticsTags', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetUserAgentResults.mockReturnValue(mockUAResult)
  })

  test('complete set of device, os and browser tags are computed', () => {
    const tags = getAlgoliaAnalyticsTags()
    expect(tags).toEqual(['mobile', 'Apple', 'Mac OS', 'Firefox'])
  })

  test('empty entries are removed', () => {
    const deviceUnknown = { ...mockUAResult }
    deviceUnknown.device = { vendor: undefined, model: undefined, type: undefined }
    mockGetUserAgentResults.mockReturnValue(deviceUnknown)

    const tags = getAlgoliaAnalyticsTags()
    expect(tags).toEqual(['Mac OS', 'Firefox'])
  })
})

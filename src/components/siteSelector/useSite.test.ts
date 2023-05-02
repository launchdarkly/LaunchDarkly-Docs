jest.mock('use-local-storage-state', () => ({ __esModule: true, default: jest.fn() }))

import { renderHook } from '@testing-library/react'
import useLocalStorageState from 'use-local-storage-state'

import useSite from './useSite'

const mockUseLocalStorageState = useLocalStorageState as jest.Mock

describe('useSite', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('useLocalStorageState is invoked correctly', () => {
    renderHook(useSite)
    expect(mockUseLocalStorageState).toHaveBeenCalledWith('site', { defaultValue: 'launchDarkly' })
  })
})

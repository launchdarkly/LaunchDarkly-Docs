import useLocalStorageState from 'use-local-storage-state'
import { SiteType } from './types'

const useSite = () => {
  return useLocalStorageState<SiteType>('site', {
    defaultValue: 'launchDarkly',
  })
}

export default useSite

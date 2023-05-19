import camelcase from 'camelcase'
import { LDFlagSet } from 'launchdarkly-js-client-sdk'

export const flagPredicate = <T>(flagKey: string, defaultValue: T): ((flags: LDFlagSet) => T) => {
  return (flags: LDFlagSet) => {
    const camelKey = camelcase(flagKey)
    const flagValue = flags[camelKey]

    if (typeof flagValue === 'undefined') {
      return defaultValue
    }

    return flagValue as T
  }
}

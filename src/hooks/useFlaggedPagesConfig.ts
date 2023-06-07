import { useFlags } from 'gatsby-plugin-launchdarkly'

import { defaultConfig } from '../utils/flaggedPages/defaultConfig'

export const useFlaggedPagesConfig = () => {
  const flags = useFlags()
  const disabledPaths: string[] = flags.docsPagesConfig?.disabled_paths ?? defaultConfig.disabled_paths

  const isPathDisabled = (path: string) => {
    return disabledPaths.includes(path)
  }
  return { isPathDisabled }
}

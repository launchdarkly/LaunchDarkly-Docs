import { useFlags } from 'gatsby-plugin-launchdarkly'

import { DEFAULT_CONFIG } from '../utils/flaggedPages'

export const useFlaggedPagesConfig = () => {
  const flags = useFlags()
  const disabledPaths: string[] = flags.docsPagesConfig?.disabled_paths ?? DEFAULT_CONFIG.disabled_paths

  const isPathDisabled = (path: string) => {
    return disabledPaths.includes(path)
  }
  return { isPathDisabled }
}

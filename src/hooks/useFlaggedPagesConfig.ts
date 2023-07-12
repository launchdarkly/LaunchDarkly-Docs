import { useFlags } from 'gatsby-plugin-launchdarkly'

import { DEFAULT_CONFIG } from '../utils/flaggedPages'

type isPathDisabledOptions = {
  isHashPath?: boolean
}

export const useFlaggedPagesConfig = () => {
  const flags = useFlags()
  const disabledPaths: string[] = flags.docsPagesConfig?.disabled_paths ?? DEFAULT_CONFIG.disabled_paths

  const isPathDisabled = (path: string, options: isPathDisabledOptions = { isHashPath: false }) => {
    const { isHashPath } = options

    if (isHashPath) {
      return disabledPaths.some(p => p.endsWith(path))
    }

    return disabledPaths.includes(path)
  }
  return { isPathDisabled }
}

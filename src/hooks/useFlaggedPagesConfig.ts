import { useFlags } from 'gatsby-plugin-launchdarkly'

type config = {
  disabled_paths: string[]
}

const defaultConfig: config = {
  disabled_paths: [],
}

export const useFlaggedPagesConfig = () => {
  const flags = useFlags()
  const disabledPaths: string[] = flags.docsPagesConfig?.disabled_paths ?? defaultConfig.disabled_paths

  const isPathDisabled = (path: string) => {
    return disabledPaths.includes(path)
  }
  return { isPathDisabled }
}

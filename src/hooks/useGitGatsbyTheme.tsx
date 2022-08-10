import { ThemeUIContextValue, useThemeUI } from 'theme-ui'

import { GitGatsbyTheme } from '../gatsby-plugin-theme-ui'

interface GitGatsbyThemeContext extends ThemeUIContextValue {
  theme: GitGatsbyTheme
}

export default useThemeUI as () => GitGatsbyThemeContext

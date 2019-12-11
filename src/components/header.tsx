/** @jsx jsx */
import { jsx } from 'theme-ui'
import SideMenu from './sideMenu/sideMenu'
import SvgLaunchDarklyLogo from './icons/launchDarklyLogo'

const Header = () => {
  return (
    <header sx={{ gridArea: 'header', bg: 'secondaryDark', color: 'white' }}>
      <div sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
        <span sx={{ pl: 4, display: ['block', 'none'] }}>
          <SideMenu />
        </span>
        <SvgLaunchDarklyLogo sx={{ fill: 'white', pl: 2, width: ['2.2rem', '2.3rem', '2.5rem'] }} />
        <input
          type="text"
          placeholder="Search documentation"
          sx={{
            pl: 2,
            mx: 2,
            border: 0,
            borderRadius: 1,
            width: '100%',
            height: 3,
            fontSize: 4,
            '::placeholder': { fontSize: 4 },
          }}
        />
      </div>
    </header>
  )
}

export default Header

/** @jsx jsx */
import { jsx } from 'theme-ui'
import Icon from './icon'
import Hamburger from './sideNav/hamburger'
import TopNav from './topNav'

const Header = () => {
  return (
    <header sx={{ gridArea: 'header', bg: 'secondaryDark', color: 'white' }}>
      <div sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <span sx={{ pl: 4, display: ['block', 'none'] }}>
          <Hamburger />
        </span>
        <span sx={{ display: 'flex', alignItems: 'center', ml: [null, 1, 2] }}>
          <Icon name="launchdarkly-logo" variant="header" sx={{ width: ['2.2rem', '2.3rem', '2.5rem'] }} />
          <Icon
            name="launchdarkly-word"
            variant="header"
            sx={{ pl: [null, null, 2], height: [null, 2, 3], display: ['none', 'block'] }}
          />
          <span sx={{ pl: [null, 1, 2], fontSize: [null, 1, 2], display: ['none', 'none', 'block'] }}>DOCS</span>
        </span>
        <TopNav />
        <input
          type="text"
          placeholder="Search documentation"
          sx={{
            pl: 2,
            mr: 2,
            border: 0,
            borderRadius: 1,
            width: ['100%', '17%', '20%'],
            height: 4,
            fontSize: 4,
            '::placeholder': { fontSize: [4, 3, 4] },
          }}
        />
      </div>
    </header>
  )
}

export default Header

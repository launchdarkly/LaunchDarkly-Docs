/** @jsx jsx */
import { jsx } from 'theme-ui'
import Icon from './icon'
import Hamburger from './sideNav/hamburger'
import TopNav from './topNav'

const Header = () => {
  return (
    <header sx={{ gridArea: 'header', bg: 'secondaryDark', color: 'white' }}>
      <div sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <span sx={{ display: 'flex', alignItems: 'center', ml: [4, 4, 5] }}>
          <Icon name="launchdarkly-logo" variant="header" sx={{ height: [null, 2, 4], mr: [2, 3] }} />
          <Icon name="launchdarkly-word" variant="header" sx={{ height: [null, 2, 3], display: ['none', 'block'] }} />
          <span sx={{ pl: [null, 1, 2], fontSize: [null, 1, 2], display: ['none', 'none', 'block'] }}>DOCS</span>
        </span>
        <TopNav />
        <div sx={{ display: 'flex', alignItems: 'center', width: ['100%', '16rem', '32rem'], mr: [2, 4] }}>
          <Icon name="search" variant="search" sx={{ display: ['none', 'none', 'block'] }} />
          <input
            type="text"
            placeholder="Search"
            sx={{
              pl: 2,
              border: 0,
              borderRadius: 1,
              height: 4,
              fontSize: 4,
              width: '100%',
              '::placeholder': { fontSize: [4, 3, 4] },
            }}
          />
        </div>
        <span sx={{ display: ['block', 'none'], mr: [4, null] }}>
          <Hamburger />
        </span>
      </div>
    </header>
  )
}

export default Header

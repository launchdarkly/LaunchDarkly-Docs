/** @jsx jsx */
import { jsx } from 'theme-ui'
import Icon from './icon'
import Hamburger from './sideNav/hamburger'
import TopNav from './topNav'

const Header = () => {
  return (
    <header sx={{ gridArea: 'header', bg: 'secondaryDark', color: 'white' }}>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: ['100%', '12rem auto', '22rem 48rem auto'],
          minHeight: '100%',
          gridTemplateAreas: [
            `
            'mobile'
            `,
            `
            'brand nav'
            `,
            `
            'brand nav nav'
            `,
          ],
        }}
      >
        <span sx={{ gridArea: 'brand', display: ['none', 'flex'], alignItems: 'center', ml: [4, 4, 5] }}>
          <Icon name="launchdarkly-logo" variant="header" sx={{ height: [null, 2, 4], mr: [2, 3] }} />
          <Icon name="launchdarkly-word" variant="header" sx={{ height: [null, 2, 3], display: ['none', 'block'] }} />
          <span sx={{ pl: [null, 1, 2], fontSize: [null, 1, 2], display: ['none', 'none', 'block'] }}>DOCS</span>
        </span>
        <span
          sx={{
            gridArea: ['mobile', 'nav'],
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Icon name="launchdarkly-logo" variant="header" sx={{ height: 3, mx: 4, display: ['block', 'none'] }} />
          <span sx={{ ml: [0, 7, 9] }}>
            <TopNav />
          </span>
          <div sx={{ display: 'flex', alignItems: 'center', width: ['100%', '16rem', '32rem'], mx: [0, 4] }}>
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
          <span sx={{ display: ['block', 'none'], mx: 4 }}>
            <Hamburger />
          </span>
        </span>
      </div>
    </header>
  )
}

export default Header

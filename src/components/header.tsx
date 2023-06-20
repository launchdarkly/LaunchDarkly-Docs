import { navigate } from 'gatsby'

import { useIsFederal } from '../utils/siteAwareUtils'

import SearchRoot from './search/searchRoot'
import Hamburger from './sideNav/hamburger'
import SiteSelector from './siteSelector/siteSelector'
import Icon from './icon'
import Link from './link'
import TopNav from './topNav'

const Header = () => {
  const isFederal = useIsFederal()

  return (
    <header
      sx={{
        bg: 'accent',
        color: 'grayscaleWhite',
        height: '4.5rem',
        width: '100%',
        position: 'fixed',
        top: '0',
        zIndex: 10,
      }}
    >
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: ['100%', '18rem auto', '18rem 48rem auto'],
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
        <span sx={{ gridArea: 'brand', display: ['none', 'flex'], alignItems: 'center', ml: [4, 6] }}>
          <Link
            to="/"
            aria-label="Go to the LaunchDarkly documentation homepage"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Icon name="header-logo" variant="header" />
            {isFederal && <Icon name="federal-tag" variant="header" sx={{ height: [null, '1.2rem'], ml: 3 }} />}
          </Link>
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
          <Link to="/" sx={{ mx: 4, display: ['flex', 'none'], flexDirection: 'column', alignItems: 'center' }}>
            <Icon name="ozmo" variant="header" sx={{ height: 4, width: '1.4rem' }} />
            {isFederal && <Icon name="federal-tag" variant="header" sx={{ height: '1.2rem' }} />}
          </Link>
          <span sx={{ ml: [0, 9, '4.5rem'], height: '100%', display: 'flex', alignItems: 'center' }}>
            <TopNav />
          </span>
          <div
            sx={{
              gridArea: ['nav'],
              display: 'flex',
              alignItems: 'right',
              width: ['100%', '100%', '35%'],
              mx: [0, 4],
              ml: [0, 0, 4],
            }}
          >
            <span
              sx={{
                display: ['none', 'flex'],
              }}
            >
              <SiteSelector navigateFn={navigate} />
            </span>
            <SearchRoot />
          </div>
          <span sx={{ display: ['flex', 'none'], mx: 4 }}>
            <Hamburger />
          </span>
        </span>
      </div>
    </header>
  )
}

export default Header

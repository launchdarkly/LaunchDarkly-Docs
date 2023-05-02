/** @jsx jsx */
import { FunctionComponent } from 'react'
import { jsx } from 'theme-ui'

import useGitGatsbyTheme from '../../../hooks/useGitGatsbyTheme'
import Icon, { IconName } from '../../icon'
import Link from '../../link'
import { SideNavItem } from '../../sideNav/types'
type SdkLinkProps = {
  navItem: SideNavItem
}

const SdkLink: FunctionComponent<React.PropsWithChildren<SdkLinkProps>> = ({ navItem }) => {
  const { theme } = useGitGatsbyTheme()
  const { label, shortLabel, path, svg } = navItem
  const display = shortLabel ?? label.split(' ')[0]
  const svgIconName = svg ?? (display.toLowerCase() as IconName)
  return (
    <Link
      to={path}
      p="2"
      sx={{
        '&:hover': { bg: 'muted', '& svg': { fill: 'primary' } },
        textDecoration: 'none',
        p: { color: theme.colors.primarySafe },
      }}
    >
      <Icon name={svgIconName} height="2rem" fill="text" />
      <p sx={{ mt: 3 }}>{display}</p>
    </Link>
  )
}

type SdkLinksProps = {
  sideNavItems: Array<SideNavItem>
  heading: string
}
const SdkLinks: FunctionComponent<React.PropsWithChildren<SdkLinksProps>> = ({ heading, sideNavItems }) => {
  const numAcross = sideNavItems.length < 6 ? sideNavItems.length : 5
  return (
    <li>
      <h4 sx={{ fontSize: 4, lineHeight: 'medium', mb: 2 }}>{heading}</h4>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(3, 1fr)', `repeat(${numAcross}, 1fr)`],
          rowGap: 3,
          fontSize: 4,
          color: 'primary',
          textAlign: 'center',
        }}
      >
        {sideNavItems.map((navItem: SideNavItem) => (
          <SdkLink key={navItem.path} navItem={navItem} />
        ))}
      </div>
    </li>
  )
}

export default SdkLinks

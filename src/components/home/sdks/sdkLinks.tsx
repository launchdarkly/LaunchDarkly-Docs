/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FunctionComponent } from 'react'
import { SideNavItem } from '../../sideNav/types'
import Icon, { IconName } from '../../icon'
import Link from '../../link'

type SdkLinkProps = {
  navItem: SideNavItem
}

const SdkLink: FunctionComponent<SdkLinkProps> = ({ navItem }) => {
  const { label, shortLabel, path, svg } = navItem
  const display = shortLabel ?? label.split(' ')[0]
  const svgIconName = svg ?? (display.toLowerCase() as IconName)
  return (
    <Link
      to={path}
      p="2"
      sx={{ '&:hover': { bg: 'grayLight', '& svg': { fill: 'primarySafe' } }, textDecoration: 'none' }}
    >
      <Icon name={svgIconName} height="2rem" fill="grayDark" />
      <p sx={{ mt: 3 }}>{display}</p>
    </Link>
  )
}

type SdkLinksProps = {
  sideNavItems: Array<SideNavItem>
  heading: string
}
const SdkLinks: FunctionComponent<SdkLinksProps> = ({ heading, sideNavItems }) => {
  return (
    <li>
      <h4 sx={{ fontSize: 4, lineHeight: 'medium', mb: 2 }}>{heading}</h4>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(5, 1fr)'],
          rowGap: 3,
          fontSize: 4,
          color: '#646F7A',
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

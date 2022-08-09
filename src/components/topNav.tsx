/** @jsx jsx */
import { LinkGetProps } from '@reach/router'
import { graphql, useStaticQuery } from 'gatsby'
import { useFlags } from 'gatsby-plugin-launchdarkly'
import { jsx } from 'theme-ui'

import useGitGatsbyTheme from '../hooks/useGitGatsbyTheme'
import isExternalLink from '../utils/isExternalLink'

import { SideNavItem } from './sideNav/types'
import Icon, { IconName } from './icon'
import Link from './link'

const variant = 'links.topNav'

const TopNav = () => {
  const { theme } = useGitGatsbyTheme()
  const flags = useFlags()
  const {
    allNavigationDataJson: { nodes: navigationData },
  } = useStaticQuery(graphql`
    query {
      allNavigationDataJson {
        nodes {
          label
          path
          svg
          flagKey
        }
      }
    }
  `)

  const setActiveLinkStyles = ({ isCurrent, isPartiallyCurrent, href, location: { pathname } }: LinkGetProps) => {
    const hrefWithoutParams = href.split('?')[0]
    if (isCurrent || isPartiallyCurrent || pathname.startsWith(hrefWithoutParams)) {
      return { style: theme.links.topNav[':active'] }
    }
    return null
  }

  return (
    <ul
      sx={{
        fontSize: [null, 3],
        fontWeight: 'bold',
        display: ['none', 'flex'],
        justifyContent: 'space-between',
        alignItems: 'center',
        width: [null, 'auto', 'auto'],
        whiteSpace: 'nowrap',
        height: '100%',
      }}
    >
      {navigationData.map((rootItem: SideNavItem) => {
        const { label, path, flagKey, svg } = rootItem
        const showItem = flagKey ? flags[flagKey] : true
        return showItem ? (
          <li key={label} sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
            {isExternalLink(path) ? (
              <Link href={path} variant={variant} sx={{ display: 'flex' }} target="_blank" rel="noopener noreferrer">
                {label}
                {svg && <Icon name={svg as IconName} height="1rem" fill="grayscaleWhite" ml={1} />}
              </Link>
            ) : (
              <Link to={path} sx={{ variant }} getProps={setActiveLinkStyles} partiallyActive>
                {label}
              </Link>
            )}
          </li>
        ) : null
      })}
    </ul>
  )
}

export default TopNav

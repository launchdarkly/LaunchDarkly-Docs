/** @jsx jsx */
import { jsx, Link as ThemUILink } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import { useFlags } from 'gatsby-plugin-launchdarkly'
import { SideNavItem } from './sideNav/types'
import isExternalLink from '../utils/isExternalLink'
import Icon, { IconName } from './icon'

const variant = 'links.topNav'

const TopNav = () => {
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
              <ThemUILink
                href={path}
                variant={variant}
                sx={{ display: 'flex' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
                {svg && <Icon name={svg as IconName} height="1rem" fill="grayscaleWhite" ml={1} />}
              </ThemUILink>
            ) : (
              <GatsbyLink
                to={path}
                sx={{ variant }}
                partiallyActive={true}
                activeStyle={{
                  opacity: 1,
                  borderStyle: 'solid',
                  borderColor: 'primary',
                  borderWidth: '0 0 3px 0',
                  height: '100%',
                }}
              >
                {label}
              </GatsbyLink>
            )}
          </li>
        ) : null
      })}
    </ul>
  )
}

export default TopNav

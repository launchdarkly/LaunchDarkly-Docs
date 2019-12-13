/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { SideMenuItem } from './sideMenu/sideMenu'

const TopNav = () => {
  const { theme } = useThemeUI()
  const {
    allNavigationDataJson: { nodes: navigationData },
  } = useStaticQuery(graphql`
    query {
      allNavigationDataJson {
        nodes {
          label
          path
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
        width: [null, 'auto', 'auto'],
        pl: [null, 2, 8],
      }}
    >
      {navigationData.map((rootItem: SideMenuItem, index: number) => {
        return (
          <li key={`${rootItem.label}-${index}`} sx={{ display: 'inline', pl: [null, 3, 5] }}>
            <Link
              to={rootItem.path}
              partiallyActive={true}
              activeStyle={{ color: theme.colors.primarySafe }}
              sx={{ color: 'grayMed', textDecoration: 'none' }}
            >
              {rootItem.label.toUpperCase()}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default TopNav

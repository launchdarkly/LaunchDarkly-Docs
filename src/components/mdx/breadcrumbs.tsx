/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { globalHistory } from '@reach/router'
import { SideNavItem } from '../sideNav/types'
import EditButton from './editButton'

const GITHUB_ROOT_URL = 'https://github.com/launchdarkly/git-gatsby/blob/master/src/content/topics'

const Breadcrumbs = () => {
  const {
    allNavigationDataJson: { nodes: navigationData },
  } = useStaticQuery(graphql`
    query {
      allNavigationDataJson {
        nodes {
          items {
            label
            path
            items {
              path
              label
            }
          }
          label
          path
        }
      }
    }
  `)
  const findAndFlatten = (item: SideNavItem): Array<SideNavItem> => {
    const { label, path, items } = item

    if (path === globalHistory.location.pathname) {
      return [{ label, path, items: [] }]
    } else {
      for (let i = 0; i < items?.length ?? -1; i++) {
        const r = findAndFlatten(items[i])
        if (r.length > 0) {
          r.unshift({ label, path, items: [] as Array<SideNavItem> })
          return r
        }
      }
    }
    return []
  }
  const findAndFlattenWrapper = (): Array<SideNavItem> => {
    for (let i = 0; i < navigationData.length; i++) {
      const result = findAndFlatten(navigationData[i])
      // Don't render any breadcrumbs if there's only 1 crumb
      if (result.length > 1) {
        return result
      }
    }
    return []
  }
  const breadcrumbItems = findAndFlattenWrapper()

  let githubUrl = GITHUB_ROOT_URL
  if (breadcrumbItems.length > 0) {
    const lastBreadcrumb = breadcrumbItems[breadcrumbItems.length - 1]
    githubUrl = `${githubUrl}${lastBreadcrumb.path}.mdx`
  }

  return (
    <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Styled.h4 sx={{ mb: [3, 4], fontSize: 3 }}>
        {breadcrumbItems.map(({ label, path }, index) => {
          const lastItem = index === breadcrumbItems.length - 1
          return lastItem ? (
            <span key={label} sx={{ color: 'graySafe' }}>
              {label}
            </span>
          ) : (
            <Link
              key={label}
              to={path}
              sx={{
                textDecoration: 'none',
                color: 'grayBase',
                ':hover': {
                  color: 'primarySafe',
                },
              }}
            >
              {`${label} / `}
            </Link>
          )
        })}
      </Styled.h4>
      <EditButton path={githubUrl} />
    </div>
  )
}
export default Breadcrumbs

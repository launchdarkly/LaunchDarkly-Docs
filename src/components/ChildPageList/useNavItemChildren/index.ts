import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query NagivationTree {
    allNavigationDataJson {
      edges {
        node {
          path
          label
          items {
            path
            label
            items {
              path
              label
              items {
                path
                label
              }
            }
          }
        }
      }
    }
  }
`

export interface NavItem {
  label: string
  path: string
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[]
}

interface QueryResult {
  allNavigationDataJson: {
    edges: { node: NavItemWithChildren }[]
  }
}

const toNavItem = ({ label, path }: NavItemWithChildren): NavItem => ({ label, path })

const findChildren = (path: string, items: NavItemWithChildren[]): NavItem[] => {
  for (const item of items) {
    if (item.path === path) {
      return item.items?.map(toNavItem) || []
    }
    const children = findChildren(path, item.items || [])
    if (children.length) {
      return children
    }
  }

  return []
}

const useNavItemChildren = (path: string): NavItem[] => {
  const data: QueryResult = useStaticQuery(query)
  const items = data.allNavigationDataJson.edges.map(({ node }) => node)
  const children = findChildren(path, items)

  if (!children.length) {
    throw new Error(`Navigation path not found ${path}, or it has no children`)
  }

  return children
}

export default useNavItemChildren

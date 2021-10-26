/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { globalHistory } from '@reach/router'
import TreeNode from './treeNode'
import { findRootTopic } from '../../utils/navigationDataUtils'

const DesktopSideNav = () => {
  const {
    site: { pathPrefix },
    allNavigationData: { nodes: navigationData },
    rootTopics: { nodes: topics },
  } = useStaticQuery(graphql`
    query {
      site {
        pathPrefix
      }

      allNavigationData: allNavigationDataJson {
        nodes {
          items {
            label
            path
            svg
            flagKey
            group
            items {
              path
              label
              flagKey
              items {
                label
                path
                flagKey
              }
            }
          }
          label
          path
        }
      }

      rootTopics: allRootTopicsJson {
        nodes {
          path
          allItems
        }
      }
    }
  `)

  const currentNode = findRootTopic(topics, navigationData, pathPrefix)
  if (!currentNode) {
    if (typeof window !== 'undefined') {
      console.error(`Can't find root topic! pathPrefix: ${pathPrefix}`)
    }
    return null
  }
  return (
    <nav
      sx={{
        gridArea: 'sideNav',
        bg: theme => theme.colors.grayscaleGray100,
        display: ['none', 'block'],
        pt: 4,
      }}
    >
      <TreeNode
        currentPath={
          pathPrefix !== '' ? globalHistory.location.pathname.replace(pathPrefix, '') : globalHistory.location.pathname
        }
        nodes={currentNode.items}
      />
    </nav>
  )
}

export default DesktopSideNav

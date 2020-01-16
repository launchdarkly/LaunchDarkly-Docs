/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
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
            items {
              path
              label
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
    console.error(`Can't find root topic! pathPrefix: ${pathPrefix}`)
    return null
  }
  return (
    <nav
      sx={{
        gridArea: 'sideNav',
        bg: 'grayLight',
        display: ['none', 'block'],
        borderRight: '1px solid',
        borderColor: 'grayMed',
        pt: 4,
      }}
    >
      <TreeNode nodes={currentNode.items} />
    </nav>
  )
}

export default DesktopSideNav

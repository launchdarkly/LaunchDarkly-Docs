/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import TreeNode from './treeNode'
import { findRootTopic } from '../../utils/navigationDataUtils'

const DesktopSideNav = () => {
  const {
    allData: { nodes: navigationData },
    rootTopics: { nodes: topics },
  } = useStaticQuery(graphql`
    query {
      allData: allNavigationDataJson {
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

  const currentNode = findRootTopic(topics, navigationData)
  if (!currentNode) {
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

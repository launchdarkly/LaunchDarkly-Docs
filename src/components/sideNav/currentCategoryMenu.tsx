/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import TreeNode from './treeNode'
import { findCurrentCategory } from '../../utils/navigationDataUtils'

const CurrentCategoryMenu = () => {
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
  const currentNode = findCurrentCategory(navigationData)
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

export default CurrentCategoryMenu

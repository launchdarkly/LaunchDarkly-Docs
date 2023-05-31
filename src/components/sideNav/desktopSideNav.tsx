// /** @jsx jsx */
import { Suspense } from 'react'
import { globalHistory } from '@reach/router'
import { graphql, useStaticQuery } from 'gatsby'
import { jsx } from 'theme-ui'

import { findRootTopic } from '../../utils/navigationDataUtils'

import TreeNode from './treeNode'

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
  if (!currentNode && typeof window !== 'undefined') {
    console.error(`Can't find root topic! pathPrefix: ${pathPrefix}`)
  }

  return (
    <Suspense fallback={null}>
      {currentNode && (
        <nav
          sx={{
            bg: theme => theme.colors.grayscaleGray100,
            display: ['none', 'block'],
            top: '4.5rem',
            bottom: 0,
            position: 'fixed',
            overflow: 'auto',
            pt: 4,
            width: '19rem',
          }}
        >
          <TreeNode
            currentPath={
              pathPrefix !== ''
                ? globalHistory.location.pathname.replace(pathPrefix, '')
                : globalHistory.location.pathname
            }
            nodes={currentNode.items}
          />
        </nav>
      )}
    </Suspense>
  )
}

export default DesktopSideNav

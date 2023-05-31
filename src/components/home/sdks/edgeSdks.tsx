// /** @jsx jsx */
import { graphql, useStaticQuery } from 'gatsby'
import { jsx } from 'theme-ui'

import { SideNavItem } from '../../sideNav/types'

import SdkLinks from './sdkLinks'

const EdgeSdks = () => {
  const {
    allNavigationDataJson: { nodes: navigationDataArray },
  } = useStaticQuery(graphql`
    query {
      allNavigationDataJson(filter: { items: { elemMatch: { items: { elemMatch: { path: { glob: "/sdk/**" } } } } } }) {
        nodes {
          items {
            items {
              path
              label
              shortLabel
              svg
            }
          }
        }
      }
    }
  `)
  const sdkNavItems = navigationDataArray[0].items
  const edgeSdks = sdkNavItems.find((i: SideNavItem) =>
    i.items.some((ii: SideNavItem) => ii.path.startsWith('/sdk/edge')),
  ).items

  return (
    <div
      sx={{
        border: '1px solid',
        borderColor: 'grayMed',
        backgroundColor: 'grayWash',
        borderRadius: '4px',
        px: 0,
        py: 5,
        pb: 6,
        maxWidth: '60rem',
      }}
    >
      <ul>
        <SdkLinks heading="" sideNavItems={edgeSdks} />
      </ul>
    </div>
  )
}

export default EdgeSdks

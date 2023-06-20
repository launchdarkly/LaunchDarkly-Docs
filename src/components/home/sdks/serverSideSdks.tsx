import { graphql, useStaticQuery } from 'gatsby'

import { SideNavItem } from '../../sideNav/types'

import SdkLinks from './sdkLinks'

const ServerSideSdks = () => {
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
  const serverSideSdks = sdkNavItems.find((i: SideNavItem) =>
    i.items.some((ii: SideNavItem) => ii.path.startsWith('/sdk/server-side')),
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
        <SdkLinks heading="" sideNavItems={serverSideSdks} />
      </ul>
    </div>
  )
}

export default ServerSideSdks

/** @jsx jsx */
import { graphql, useStaticQuery } from 'gatsby'
import { jsx } from 'theme-ui'

import Link from '../../link'
import { SideNavItem } from '../../sideNav/types'

import SdkLinks from './sdkLinks'

export const ExploreSdks = () => {
  return (
    <section sx={{ pt: 6 }}>
      <h2 sx={{ fontSize: 6, lineHeight: 'medium', mb: 4 }}>Explore our SDKs</h2>
      <h3 sx={{ mb: 6, fontSize: 5 }}>
        Everyone who uses LaunchDarkly in their code must use one of our SDKs. Learn your SDK requirements in{' '}
        <Link to="/sdk" sx={{ textDecoration: 'none' }}>
          Getting started with SDKs.
        </Link>
      </h3>
      <AllSdks />
      <h4 sx={{ fontSize: 4, lineHeight: 'medium', pt: 3 }}>
        Want to get involved?{' '}
        <Link to="https://github.com/launchdarkly/LaunchDarkly-Docs" sx={{ textDecoration: 'none' }}>
          Our docs are on GitHub.
        </Link>
      </h4>
    </section>
  )
}

export const AllSdks = () => {
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
  const clientSdkItems = sdkNavItems.find((i: SideNavItem) =>
    i.items.some((ii: SideNavItem) => ii.path.startsWith('/sdk/client-side')),
  ).items
  const serverSdkItems = sdkNavItems.find((i: SideNavItem) =>
    i.items.some((ii: SideNavItem) => ii.path.startsWith('/sdk/server-side')),
  ).items

  return (
    <div
      sx={{
        border: '1px solid',
        borderColor: 'grayMed',
        backgroundColor: 'grayWash',
        borderRadius: '4px',
        px: 5,
        py: 5,
        pb: 6,
        maxWidth: '60rem',
      }}
    >
      <ul sx={{ 'li:last-child': { mt: 6 } }}>
        <SdkLinks heading="CLIENT-SIDE / MOBILE SDKS" sideNavItems={clientSdkItems} />
        <SdkLinks heading="SERVER-SIDE SDKS" sideNavItems={serverSdkItems} />
      </ul>
    </div>
  )
}

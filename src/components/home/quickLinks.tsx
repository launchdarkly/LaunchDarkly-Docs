/** @jsx jsx */
import { FunctionComponent } from 'react'
import { jsx } from 'theme-ui'

import Icon, { IconName } from '../icon'
import Link from '../link'
import { SideNavItem } from '../sideNav/types'

type QuickLinkType = {
  iconName: IconName
  heading: string
  blurp: string
  navItems: Array<SideNavItem>
}
const QuickLink: FunctionComponent<QuickLinkType> = ({ iconName, heading, blurp, navItems }) => {
  return (
    <li sx={{ display: 'flex', mb: 6, '&:last-child': { mb: 0 } }}>
      <Icon
        name={iconName}
        height="2rem"
        fill="primarySafe"
        sx={{
          p: 1,
          backgroundColor: 'grayLight',
          border: '1px solid',
          borderColor: 'grayMed',
          borderRadius: '2px',
          mr: 4,
        }}
      />
      <div>
        <h2 sx={{ fontSize: 6, lineHeight: 'medium', mb: 2 }}>{heading}</h2>
        <h3 sx={{ fontSize: 5, mb: 2 }}>{blurp}</h3>
        <ul sx={{ listStyle: 'disc', listStylePosition: 'inside' }}>
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} sx={{ textDecoration: 'none' }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

const QuickLinks = () => (
  <section sx={{ borderBottom: '1px solid', borderColor: 'grayMed', pb: 6, fontSize: 4 }}>
    <ul>
      <QuickLink
        iconName="compass"
        heading="Your first flag"
        blurp="New to LaunchDarkly? Get started in minutes."
        navItems={[
          { path: '/home/getting-started', label: 'Getting started' },
          { path: '/home/getting-started/your-account', label: 'Joining an account' },
          { path: '/home/getting-started/setting-up', label: 'Setting up an SDK' },
          { path: '/home/getting-started/feature-flags', label: 'Your first feature flag' },
        ]}
      />
      <QuickLink
        iconName="swap-horiz"
        heading="Accelerate"
        blurp="Measure and improve your team's deployment and release metrics."
        navItems={[
          { path: '/home/accelerate', label: 'About Accelerate' },
          { path: '/home/accelerate/get-started-accelerate', label: 'Getting started' },
          { path: '/home/accelerate/accelerate-metrics', label: 'Accelerate dashboard metrics' },
        ]}
      />
      <QuickLink
        iconName="chart-areaspline"
        heading="Experimentation"
        blurp="Test frontend and backend changes in real time, on real users."
        navItems={[
          { path: '/home/creating-experiments', label: 'Creating experiments' },
          { path: '/home/analyzing-experiments', label: 'Analyzing experiments' },
        ]}
      />
    </ul>
  </section>
)

export default QuickLinks

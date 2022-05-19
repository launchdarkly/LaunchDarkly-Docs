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
        iconName="chart-areaspline"
        heading="Experimentation"
        blurp="Test frontend and backend changes in real time, on real users."
        navItems={[
          { path: '/home/experimentation/create', label: 'Creating experiments' },
          { path: '/home/experimentation/analyzing', label: 'Analyzing experiments' },
        ]}
      />
      <QuickLink
        iconName="puzzle-variation"
        heading="Connect to your toolchain"
        blurp="Make LaunchDarkly a seamless part of your workflow."
        navItems={[
          { path: '/integrations/webhooks', label: 'Webhooks' },
          { path: '/integrations/code-references', label: 'Code references' },
          { path: '/integrations/data-export', label: 'Data Export' },
        ]}
      />
    </ul>
  </section>
)

export default QuickLinks

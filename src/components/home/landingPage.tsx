import Link from '../link'

import { ExploreSdks } from './sdks/exploreSdks'
import QuickLinks from './quickLinks'

const LandingPage = () => (
  <div sx={{ lineHeight: 'spaced' }}>
    <section sx={{ pb: 6 }}>
      <h4 sx={{ fontSize: 5, maxWidth: '60rem' }}>
        This is the documentation site for the LaunchDarkly platform, SDKs, integrations, and more. Get help on our{' '}
        <Link to="https://support.launchdarkly.com/hc/en-us" sx={{ textDecoration: 'none' }}>
          Support page
        </Link>
        . Or if you learn better by doing,{' '}
        <Link to="https://launchdarkly.com/start-trial/" sx={{ textDecoration: 'none' }}>
          start a trial.
        </Link>
      </h4>
    </section>
    <QuickLinks />
    <ExploreSdks />
  </div>
)

export default LandingPage

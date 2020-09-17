/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from '../link'
import ExploreSdks from './sdks/exploreSdks'
import QuickLinks from './quickLinks'

const LandingPage = () => (
  <div sx={{ lineHeight: 'spaced' }}>
    <section sx={{ pb: 6 }}>
      <h4 sx={{ fontSize: 5, maxWidth: '60rem' }}>
        Learn how LaunchDarkly empowers all teams to deliver and control their software. Prefer to learn by doing?{' '}
        <Link to="https://launchdarkly.com/start-trial/" sx={{ textDecoration: 'none' }}>
          Start a trial.
        </Link>
      </h4>
    </section>
    <QuickLinks />
    <ExploreSdks />
  </div>
)

export default LandingPage

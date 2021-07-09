/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'
import SystemLayout from './systemLayout'
import Link from '../components/link'

const NotFoundPage = () => (
  <SystemLayout title="404 | Page not found" description="Page not found">
    <Themed.h1>Looks like you&apos;ve veered off course.</Themed.h1>
    <Themed.p>
      The page you&apos;re looking for doesn&apos;t exist. The{' '}
      <Link to="/" sx={{ color: 'primarySafe', textDecoration: 'none' }}>
        LaunchDarkly docs homepage
      </Link>{' '}
      might help you get back on track.
    </Themed.p>
  </SystemLayout>
)

export default NotFoundPage

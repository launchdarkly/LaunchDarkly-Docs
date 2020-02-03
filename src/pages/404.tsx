/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import SystemLayout from './systemLayout'
import Link from '../components/link'

const NotFoundPage = () => (
  <SystemLayout title="404 | Page not found" description="Page not found">
    <Styled.h1>Looks like you&apos;ve veered off course.</Styled.h1>
    <Styled.p>
      The page you&apos;re looking for doesn&apos;t exist. The{' '}
      <Link to="/" sx={{ color: 'primarySafe', textDecoration: 'none' }}>
        LaunchDarkly docs homepage
      </Link>{' '}
      might help you get back on track.
    </Styled.p>
  </SystemLayout>
)

export default NotFoundPage

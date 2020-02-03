/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Helmet } from 'react-helmet'
import { Fragment, FunctionComponent } from 'react'
import Reset from '../components/resetStyles'
import Header from '../components/header'

const rootGridStyles = {
  color: 'grayBlack',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: ['100%', '18rem auto', '18rem 48rem auto'],
  gridTemplateRows: '4.5rem auto',
  gridTemplateAreas: [
    `
            'header'
            'main'
            'footer'
            `,
    `
            'header header'
            'sideNav main'
            'sideNav footer'
            `,
    `
            'header header header'
            'sideNav main aside'
            'sideNav footer footer'
            `,
  ],
}

type SystemLayoutProps = {
  title: string
  description: string
}

const SystemLayout: FunctionComponent<SystemLayoutProps> = ({ title, description, children }) => {
  return (
    <Fragment>
      <Reset />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div sx={rootGridStyles}>
        <Header />
        <main sx={{ gridArea: 'main', px: [5, 7, 8], pt: '2.75rem' }}>{children}</main>
        <footer sx={{ gridArea: 'footer', height: '7rem' }}></footer>
      </div>
    </Fragment>
  )
}

export default SystemLayout

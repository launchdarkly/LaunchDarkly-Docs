/** @jsx jsx */
import { Fragment, FunctionComponent } from 'react'
import { jsx } from 'theme-ui'

import Header from '../components/header'
import Reset from '../components/resetStyles'

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

export const Head = ({ title, description }: SystemLayoutProps) => (
  <Fragment>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Fragment>
)

const SystemLayout: FunctionComponent<React.PropsWithChildren<SystemLayoutProps>> = ({ children }) => {
  return (
    <Fragment>
      <Reset />
      <div sx={rootGridStyles}>
        <Header />
        <main sx={{ gridArea: 'main', px: [5, 7, 8], pt: '2.75rem' }}>{children}</main>
        <footer sx={{ gridArea: 'footer', height: '7rem' }}></footer>
      </div>
    </Fragment>
  )
}

export default SystemLayout

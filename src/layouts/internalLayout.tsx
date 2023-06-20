import { Fragment, FunctionComponent, PropsWithChildren, ReactNode } from 'react'

import Reset from '../components/resetStyles'

interface LayoutProps {
  children: ReactNode
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({ children }) => {
  return (
    <Fragment>
      <Reset />
      <main sx={{ width: '40rem', margin: '0 auto', my: 6 }}>{children}</main>
    </Fragment>
  )
}

export default Layout

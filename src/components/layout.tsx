/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { FunctionComponent } from 'react'
import Reset from './resetStyles'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Reset />
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '100%',
          gridTemplateRows: ['3rem auto', null, '3.3rem auto'],
          gridTemplateAreas: `
          'header'
          'main'
        `,
        }}
      >
        <header sx={{ gridArea: 'header', bg: 'grayDark', color: 'white' }}>
          <div sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
            <img sx={{ pl: 4, width: ['35%', '12rem', '13rem'] }} src="https://75oio.csb.app/logo.svg" alt="logo" />
            <span sx={{ pl: 2 }}>DOCS</span>
          </div>
        </header>
        <main sx={{ gridArea: 'main' }}>{children}</main>
      </div>
    </div>
  )
}

export default Layout

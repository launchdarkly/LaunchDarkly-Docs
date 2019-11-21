/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FunctionComponent } from 'react'
import { Styled } from 'theme-ui'

const App: FunctionComponent = () => {
  return (
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
      <header sx={{ bg: 'grayDark', py: 4, gridArea: 'header', color: 'white' }}>
        <div sx={{ display: 'flex', flexDirection: 'row' }}>
          <img sx={{ pl: 5, width: ['30%', '10rem', '12rem'] }} src="https://75oio.csb.app/logo.svg" alt="logo" />
          <span sx={{ pl: 2 }}>DOCS</span>
        </div>
      </header>
      <main sx={{ gridArea: 'main' }}>
        <Styled.p>
          Welcome to LaunchDarkly! We&apos;re excited to partner with you as you use feature flags to make high-impact
          changes with minimal risk and maximum control. It only takes a few minutes to get started with LaunchDarkly
          and control your first feature flag.
        </Styled.p>
      </main>
    </div>
  )
}

export default App

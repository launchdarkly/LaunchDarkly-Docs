/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Reset from './resetStyles'

interface LayoutProps {
  data: {
    mdx: {
      body: string
      frontmatter: {
        author: string
      }
    }
  }
}
const Layout: FunctionComponent<LayoutProps> = ({
  data: {
    mdx: {
      body,
      frontmatter: { author },
    },
  },
}) => {
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
        <main sx={{ gridArea: 'main' }}>
          <MDXRenderer author={author}>{body}</MDXRenderer>
        </main>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query Query($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        author
      }
    }
  }
`

export default Layout

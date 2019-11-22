/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
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
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: ['1rem auto', null, '18rem 48rem auto'],
          gridTemplateRows: ['3rem auto', null, '4rem auto'],
          gridTemplateAreas: `
          'header header header'
          'sidenav main aside'
        `,
        }}
      >
        <header sx={{ gridArea: 'header', bg: 'grayDark', color: 'white' }}>
          <div sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
            <img sx={{ pl: 4, width: ['35%', '12rem', '13rem'] }} src="https://75oio.csb.app/logo.svg" alt="logo" />
            <span sx={{ pl: 2 }}>DOCS</span>
          </div>
        </header>
        <nav sx={{ gridArea: 'sidenav', bg: 'grayLight', px: 5, py: 6 }}>
          <a href="" sx={{variant: 'text.label'}}>Quickstart</a>
          <a href="" sx={{variant: 'text.label'}}>Managing Flags</a>
          <a href="" sx={{variant: 'text.label'}}>Managing Users</a>
          <a href="" sx={{variant: 'text.label'}}>Account Security</a>
          <a href="" sx={{variant: 'text.label'}}>Metrics and Insights</a>
          <a href="" sx={{variant: 'text.label'}}>Experimentation</a>
        </nav>
        <main sx={{ gridArea: 'main', px: [4, 6, 7], pt: 6}}>
          <Styled.h4>Documentation / Breadcrumb </Styled.h4>
          <MDXRenderer author={author}>{body}</MDXRenderer>
        </main>
        <aside sx={{gridArea: 'aside', pt: 6}}>TOC</aside>
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

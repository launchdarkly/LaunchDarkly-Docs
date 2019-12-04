/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from '@theme-ui/components'
import { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Reset from './resetStyles'
import Breadcrumbs, { BreadcrumbItem } from './breadcrumbs'
import { H1, H2, H3, H4, H5, H6 } from './mdx/heading'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
}

interface LayoutProps {
  data: {
    mdx: {
      body: string
      timeToRead: number
      fields: {
        lastModifiedTime: string
      }
      frontmatter: {
        breadcrumbs: Array<BreadcrumbItem>
      }
    }
  }
}
const Layout: FunctionComponent<LayoutProps> = ({
  data: {
    mdx: {
      body,
      timeToRead,
      fields: { lastModifiedTime },
      frontmatter: { breadcrumbs },
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
          gridTemplateColumns: ['100%', '12rem 40rem auto', '18rem 48rem auto'],
          gridTemplateRows: ['3rem auto', null, '4rem auto'],
          gridTemplateAreas: [
            `
            'header'
            'main'
            `,
            `
            'header header header'
            'sideMenu main aside'
            `,
          ],
        }}
      >
        <header sx={{ gridArea: 'header', bg: 'secondaryDark', color: 'white' }}>
          <div sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
            <img sx={{ pl: 4, width: ['35%', '12rem', '13rem'] }} src="https://75oio.csb.app/logo.svg" alt="logo" />
            <span sx={{ pl: 2 }}>DOCS</span>
          </div>
        </header>
        <nav sx={{ gridArea: 'sideMenu', bg: 'grayLight', px: 5, py: 6, display: ['none', 'block'] }}>
          <Link href="" variant="text.label">
            Quickstart
          </Link>
          <Link href="" variant="text.label">
            Managing Flags
          </Link>
          <Link href="" variant="text.label">
            Managing Users
          </Link>
          <Link href="" variant="text.label">
            Account Security
          </Link>
          <Link href="" variant="text.label">
            Metrics and Insights
          </Link>
          <Link href="" variant="text.label">
            Experimentation
          </Link>
        </nav>
        <main sx={{ gridArea: 'main', px: [4, 6, 7], pt: 6 }}>
          <Breadcrumbs items={breadcrumbs} />
          <MDXProvider components={components}>
            <MDXRenderer timeToRead={timeToRead} lastModifiedDateFormatted={lastModifiedTime}>
              {body}
            </MDXRenderer>
          </MDXProvider>
        </main>
        <aside sx={{ gridArea: 'aside', pt: 6, display: ['none', 'block'] }}>TOC</aside>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query Query($id: String) {
    mdx(id: { eq: $id }) {
      body
      timeToRead
      fields {
        lastModifiedTime(formatString: "MMM d, YYYY")
      }
      frontmatter {
        breadcrumbs {
          label
          path
        }
      }
    }
  }
`

export default Layout

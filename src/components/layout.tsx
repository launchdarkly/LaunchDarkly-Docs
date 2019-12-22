/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'

import { Fragment, FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Reset from './resetStyles'
import Breadcrumbs from './mdx/breadcrumbs'
import { TableOfContents, TOC } from './tableOfContents'
import Header from './header'
import { H1, H2, H3, H4, H5, H6 } from './mdx/heading'
import CurrentCategoryMenu from './sideNav/currentCategoryMenu'
import { ReadmeBlock } from './readme'
import { CodeBlock, CodeSnippetProvider, CodeViewer } from './mdx/code'
import Metadata from './mdx/metadata'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  ReadmeBlock,
  pre: function Pre({ children }: React.HTMLProps<HTMLPreElement>) {
    return <Fragment>{children}</Fragment>
  },
  code: CodeBlock,
  CodeViewer,
  Card,
  Metadata,
}

interface LayoutProps {
  data: {
    mdx: {
      body: string
      toc: TOC
      timeToRead: number
      fields: {
        lastModifiedTime: string
        isImported: boolean
      }
    }
  }
}

const Layout: FunctionComponent<LayoutProps> = ({
  data: {
    mdx: {
      body,
      toc,
      timeToRead,
      fields: { lastModifiedTime, isImported },
    },
  },
}) => {
  return (
    <Fragment>
      <Reset />
      <div
        sx={{
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: ['100%', '12rem auto', '22rem 48rem auto'],
          gridTemplateRows: theme => [`${theme.sizes[5]} auto`, null, '4.5rem auto'],
          gridTemplateAreas: [
            `
            'header'
            'main'
            `,
            `
            'header header'
            'sideNav main'
            `,
            `
            'header header header'
            'sideNav main aside'
            `,
          ],
        }}
      >
        <Header />
        <CurrentCategoryMenu />
        <main sx={{ gridArea: 'main', px: [4, 7, 9], pt: 6 }}>
          <Breadcrumbs />
          <CodeSnippetProvider>
            <MDXProvider components={components}>
              <MDXRenderer timeToRead={timeToRead} lastModifiedDateFormatted={lastModifiedTime}>
                {body}
              </MDXRenderer>
            </MDXProvider>
          </CodeSnippetProvider>
        </main>
        <aside sx={{ gridArea: 'aside', pt: 6, display: ['none', 'none', 'block'], width: '18rem' }}>
          {!isImported && <TableOfContents toc={toc} sx={{ position: 'sticky', top: 5 }} />}
        </aside>
      </div>
    </Fragment>
  )
}

export const pageQuery = graphql`
  query Query($id: String) {
    mdx(id: { eq: $id }) {
      body
      toc: tableOfContents(maxDepth: 2)
      timeToRead
      fields {
        lastModifiedTime(formatString: "MMM d, YYYY")
        isImported
      }
    }
  }
`

export default Layout

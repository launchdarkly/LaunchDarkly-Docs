/** @jsx jsx */
import { jsx, Card } from 'theme-ui'
import { Helmet } from 'react-helmet'
import { Fragment, FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { useFlags } from 'gatsby-plugin-launchdarkly'
import Reset from './resetStyles'
import MdxHeader from './mdx/mdxHeader'
import { TableOfContents, TOC } from './tableOfContents'
import Header from './header'
import { H1, H2, H3, H4, H5, H6 } from './mdx/heading'
import Figure from './mdx/figure'
import Pre from './mdx/pre'
import DesktopSideNav from './sideNav/desktopSideNav'
import { CodeTabs, CodeTabItem, Code } from './mdx/code'
import Feature from './mdx/feature'
import Metadata from './mdx/metadata'
import Table, { TableHeader, TableHeadCell, TableBody, TableRow, TableCell } from './mdx/table'
import LearnMore, { LearnMoreTitle, LearnMoreLink } from './mdx/learnMore'
import Callout, { CalloutTitle, CalloutDescription } from './mdx/callout'
import Link from './link'
import Icon from './icon'
import Homepage from './home/landingPage'
import { AllSdks } from './home/sdks/exploreSdks'
import ClientSideSdks from './home/sdks/clientSideSdks'
import ServerSideSdks from './home/sdks/serverSideSdks'
import ReactSdks from './home/sdks/reactSdks'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: Link,
  figure: Figure,
  Card,
  Metadata,
  Table,
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Callout,
  CalloutTitle,
  CalloutDescription,
  LearnMore,
  LearnMoreTitle,
  LearnMoreLink,
  Link,
  CodeTabs,
  CodeTabItem,
  Homepage,
  AllSdks,
  ClientSideSdks,
  ServerSideSdks,
  ReactSdks,
  Icon,
  code: Code,
  pre: Pre,
  Feature,
}

const rootGridStyles = {
  letterSpacing: '0.0125rem',
  color: 'grayBlack',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: ['100%', '19rem auto', '19rem 48rem auto'],
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

interface LayoutProps {
  data: {
    mdx: {
      body: string
      toc: TOC
      timeToRead: number
      fields: {
        isLandingPage: boolean
        lastModifiedTime: string
      }
      frontmatter: {
        title: string
        description: string
      }
      fileAbsolutePath: string
    }
  }
}

const Layout: FunctionComponent<LayoutProps> = ({
  data: {
    mdx: {
      body,
      toc,
      timeToRead,
      fields: { isLandingPage, lastModifiedTime },
      frontmatter: { title, description },
      fileAbsolutePath,
    },
  },
}) => {
  const { enableUserWayAccessibilityWidget } = useFlags()

  return (
    <Fragment>
      <Reset />
      <Helmet
        defer={false}
        htmlAttributes={{ lang: 'en' }}
        title={title}
        meta={[{ name: 'description', content: description }]}
      >
        {enableUserWayAccessibilityWidget && (
          <script defer>
            {
              '(function(d){var s = d.createElement("script");s.setAttribute("data-account", "8Vh97O4fZ4");s.setAttribute("src", "https://cdn.userway.org/widget.js");(d.body || d.head).appendChild(s);})(document)'
            }
          </script>
        )}
      </Helmet>
      <div sx={rootGridStyles}>
        <Header />
        <DesktopSideNav />
        <main sx={{ gridArea: 'main', px: [5, 7, 8], pt: '2.75rem' }}>
          <MdxHeader
            fileAbsolutePath={fileAbsolutePath}
            title={title}
            timeToRead={timeToRead}
            lastModifiedDateFormatted={lastModifiedTime}
            isLandingPage={isLandingPage}
          />
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </main>
        {!isLandingPage && (
          <aside sx={{ gridArea: 'aside', pt: 4, display: ['none', 'none', 'block'], width: '18rem' }}>
            <TableOfContents toc={toc} sx={{ position: 'sticky', top: 2 }} />
          </aside>
        )}
        <footer sx={{ gridArea: 'footer', height: '7rem' }}></footer>
      </div>
    </Fragment>
  )
}

export const pageQuery = graphql`
  query Query($id: String) {
    mdx(id: { eq: $id }, frontmatter: { published: { eq: true } }) {
      body
      frontmatter {
        title
      }
      toc: tableOfContents(maxDepth: 2)
      timeToRead
      fields {
        isLandingPage
        lastModifiedTime(formatString: "MMM DD, YYYY")
      }
      frontmatter {
        title
        description
      }
      fileAbsolutePath
    }
  }
`

export default Layout

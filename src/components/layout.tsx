/** @jsx jsx */
import { jsx, Card, ThemeProvider } from 'theme-ui'
import { Helmet } from 'react-helmet'
import { FunctionComponent } from 'react'
import { graphql, withPrefix } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { useFlags } from 'gatsby-plugin-launchdarkly'
import pluralize from 'pluralize'
import Reset from './resetStyles'
import MdxHeader from './mdx/mdxHeader'
import { TableOfContents, TOC } from './tableOfContents'
import Header from './header'
import { H1, H2, H3, H4, H5, H6 } from './mdx/heading'
import Figure, { FigCaption } from './mdx/figure'
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
import ChildPageList from './ChildPageList'
import { SdksEndOfLife, RelayEndOfLife } from './endOfLife'
import Details from './mdx/details'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: Link,
  figure: Figure,
  figcaption: FigCaption,
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
  SdksEndOfLife,
  RelayEndOfLife,
  Icon,
  code: Code,
  pre: Pre,
  ChildPageList,
  Feature,
  Details,
}

const theme = {}

const rootGridStyles = {
  letterSpacing: '0.0125rem',
  color: 'text',
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
    site: {
      siteMetadata: {
        title: string
        siteUrl: string
      }
    }
    mdx: {
      body: string
      toc: TOC
      timeToRead: number
      fields: {
        isLandingPage: boolean
        lastModifiedTime: string
        modifiedDate: string
      }
      frontmatter: {
        title: string
        description: string
        path: string
      }
      fileAbsolutePath: string
    }
  }
}

const Layout: FunctionComponent<LayoutProps> = ({
  data: {
    site: {
      siteMetadata: { title: siteTitle, siteUrl },
    },
    mdx: {
      body,
      toc,
      timeToRead,
      fields: { isLandingPage, lastModifiedTime, modifiedDate },
      frontmatter: { title, description, path },
      fileAbsolutePath,
    },
  },
}) => {
  const { enableUserWayAccessibilityWidget } = useFlags()
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <Helmet
        defer={false}
        htmlAttributes={{ lang: 'en' }}
        title={title}
        meta={[
          { name: 'description', content: description },
          // Open Graph
          { name: 'og:site_name', content: siteTitle },
          { name: 'og:url', content: `${siteUrl}${withPrefix(path)}` },
          { name: 'og:title', content: title },
          { name: 'og:description', content: description },
          { name: 'og:type', content: 'article' },
          { name: 'article:modified_time', content: lastModifiedTime },
          // Twitter
          { name: 'twitter:domain', content: `${siteUrl.replace('https://', '').replace('http://', '')}` },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
          { name: 'twitter:label1', content: 'Read time' },
          { name: 'twitter:data1', content: `${timeToRead} ${pluralize('minute', timeToRead)} ` },
          { name: 'twitter:label2', content: 'Last edited' },
          { name: 'twitter:data2', content: `${modifiedDate}` },
        ]}
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
            lastModifiedDateFormatted={modifiedDate}
            isLandingPage={isLandingPage}
          />
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </main>
        {!isLandingPage && (
          <aside sx={{ gridArea: 'aside', pt: 4, display: ['none', 'none', 'block'], width: '18rem' }}>
            <TableOfContents toc={toc} />
          </aside>
        )}
        <footer sx={{ gridArea: 'footer', height: '7rem' }}></footer>
      </div>
    </ThemeProvider>
  )
}

export const pageQuery = graphql`
  query Query($id: String) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(id: { eq: $id }, frontmatter: { published: { eq: true } }) {
      body
      toc: tableOfContents(maxDepth: 2)
      timeToRead
      fields {
        isLandingPage
        lastModifiedTime(formatString: "MMM DD, YYYY")
        modifiedDate: lastModifiedTime(formatString: "MMM DD, YYYY")
      }
      frontmatter {
        title
        description
        path
      }
      fileAbsolutePath
    }
  }
`

export default Layout

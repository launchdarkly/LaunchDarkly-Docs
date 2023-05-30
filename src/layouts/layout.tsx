/** @jsx jsx */
import { Fragment, FunctionComponent } from 'react'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import { withPrefix } from 'gatsby'
import { useFlags } from 'gatsby-plugin-launchdarkly'
import pluralize from 'pluralize'
import { Card, jsx, ThemeProvider } from 'theme-ui'

import ChildPageList from '../components/ChildPageList'
import { RelayEndOfLife, SdksEndOfLife } from '../components/endOfLife'
import Header from '../components/header'
import Homepage from '../components/home/landingPage'
import AllIntegrations from '../components/home/sdks/allIntegrations'
import ClientSideSdks from '../components/home/sdks/clientSideSdks'
import EdgeSdks from '../components/home/sdks/edgeSdks'
import { AllSdks } from '../components/home/sdks/exploreSdks'
import ReactSdks from '../components/home/sdks/reactSdks'
import ServerSideSdks from '../components/home/sdks/serverSideSdks'
import Icon from '../components/icon'
import Link from '../components/link'
import Callout, { CalloutDescription, CalloutTitle } from '../components/mdx/callout'
import { Code, CodeSample, CSTab } from '../components/mdx/code'
import Details from '../components/mdx/details'
import Feature from '../components/mdx/feature'
import Figure, { FigCaption } from '../components/mdx/figure'
import { H1, H2, H3, H4, H5, H6 } from '../components/mdx/heading'
import LearnMore from '../components/mdx/learnMore'
import MdxHeader from '../components/mdx/mdxHeader'
import Metadata from '../components/mdx/metadata'
import Pre from '../components/mdx/pre'
import { Span } from '../components/mdx/span'
import Table, { TableBody, TableCell, TableHeadCell, TableHeader, TableRow } from '../components/mdx/table'
import Reset from '../components/resetStyles'
import DesktopSideNav from '../components/sideNav/desktopSideNav'
import { TableOfContents } from '../components/tableOfContents'
import { PageContext } from '../types/pageContext'

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
  Link,
  CodeSample,
  CSTab,
  Homepage,
  AllSdks,
  ClientSideSdks,
  ServerSideSdks,
  EdgeSdks,
  ReactSdks,
  SdksEndOfLife,
  RelayEndOfLife,
  Icon,
  code: Code,
  pre: Pre,
  ChildPageList,
  Feature,
  Details,
  AllIntegrations,
  span: Span,
}

const theme = {}

const rootStyles = {
  letterSpacing: '0.0125rem',
  color: 'text',
}

interface LayoutProps {
  pageContext: PageContext
}

export const Head: FunctionComponent<React.PropsWithChildren<LayoutProps>> = ({ pageContext }) => {
  const { enableUserWayAccessibilityWidget } = useFlags()

  const {
    siteMetadata: { title: siteTitle, siteUrl },
    timeToRead,
    lastModifiedTime,
    modifiedDate,
    frontmatter: { title, description, path },
  } = pageContext

  return (
    <Fragment>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Open Graph */}
      <meta name="og:site_name" content={siteTitle} />
      <meta name="og:url" content={`${siteUrl}${withPrefix(path)}`} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="article" />
      <meta name="article:modified_time" content={lastModifiedTime} />
      {/* Twitter */}
      <meta name="twitter:domain" content={`${siteUrl.replace('https://', '').replace('http://', '')}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:label1" content="Read time" />
      <meta name="twitter:data1" content={`${timeToRead} ${pluralize('minute', timeToRead)} `} />
      <meta name="twitter:label2" content="Last edited" />
      <meta name="twitter:data2" content={modifiedDate} />
      {/* Zendesk for support team */}
      <meta name="zd-site-verification" content="692vywu6ikflunpvddz3ko" />

      {enableUserWayAccessibilityWidget && (
        <script defer>
          {
            '(function(d){var s = d.createElement("script");s.setAttribute("data-account", "8Vh97O4fZ4");s.setAttribute("src", "https://cdn.userway.org/widget.js");(d.body || d.head).appendChild(s);})(document)'
          }
        </script>
      )}
    </Fragment>
  )
}

const Layout: FunctionComponent<React.PropsWithChildren<LayoutProps>> = ({ pageContext, children }) => {
  const componentsWithStyles = useThemedStylesWithMdx(useMDXComponents(components))
  const {
    toc,
    timeToRead,
    isLandingPage,
    modifiedDate,
    fileAbsolutePath,
    frontmatter: { title, site, siteAlertTitle },
  } = pageContext

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <div sx={rootStyles}>
        <Header />
        <main
          sx={{
            height: 'calc(100vh - 4.5rem)',
            position: 'relative',
            top: '4.5rem',
          }}
        >
          <DesktopSideNav />
          <article
            sx={{
              px: '3.5rem',
              pt: '2.75rem',
              position: 'relative',
              height: '100%',
              maxWidth: theme => [null, null, theme.breakpoints[1]],
              ml: [0, '19rem'],
              mr: [0, 0, '18rem'],
              'h2,h3,h4': {
                scrollMarginTop: '5.5rem',
              },
            }}
          >
            <MdxHeader
              fileAbsolutePath={fileAbsolutePath}
              title={title}
              timeToRead={timeToRead}
              lastModifiedDateFormatted={modifiedDate}
              isLandingPage={isLandingPage}
              site={site}
              siteAlertTitle={siteAlertTitle}
            />
            <MDXProvider components={componentsWithStyles}>{children}</MDXProvider>
            <footer sx={{ height: '7rem' }}></footer>
          </article>
          {!isLandingPage && <TableOfContents toc={toc} />}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default Layout

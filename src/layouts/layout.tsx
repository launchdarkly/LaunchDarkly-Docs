// /** @jsx jsx */
import { Fragment, FunctionComponent, PropsWithChildren } from 'react'
import { jsx } from 'theme-ui'

import Header from '../components/header'
import MdxHeader from '../components/mdx/mdxHeader'
import Reset from '../components/resetStyles'
import DesktopSideNav from '../components/sideNav/desktopSideNav'
import { TableOfContents } from '../components/tableOfContents'
import { PageContext } from '../types/pageContext'

interface LayoutProps {
  pageContext: PageContext
}

const rootStyles = {
  letterSpacing: '0.0125rem',
  color: 'text',
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({ pageContext, children }) => {
  const {
    toc,
    timeToRead,
    isLandingPage,
    modifiedDate,
    fileAbsolutePath,
    frontmatter: { title, site, siteAlertTitle },
  } = pageContext
  return (
    <Fragment>
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
            {children}
            <footer sx={{ height: '7rem' }}></footer>
          </article>
          {!isLandingPage && <TableOfContents toc={toc} />}
        </main>
      </div>
    </Fragment>
  )
}

export default Layout

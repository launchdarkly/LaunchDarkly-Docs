// /** @jsx jsx */
import React, { Fragment, FunctionComponent, PropsWithChildren, ReactNode } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { withPrefix } from 'gatsby'
import { useFlags } from 'gatsby-plugin-launchdarkly'
import pluralize from 'pluralize'

import { useThemedMdxComponents } from '../hooks/useThemedMdxComponents'
import { PageContext } from '../types/pageContext'

type HeadProps = {
  pageContext: PageContext
}

export const Head: FunctionComponent<PropsWithChildren<HeadProps>> = ({ pageContext }) => {
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

type PageProps = {
  children: ReactNode
  pageContext: PageContext
}

const MdxPage = ({ children }: PageProps) => {
  const { componentsWithStyles } = useThemedMdxComponents()
  return <MDXProvider components={componentsWithStyles}>{children}</MDXProvider>
}

export default MdxPage

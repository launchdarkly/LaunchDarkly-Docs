/** @jsx jsx */
import { jsx, Link as ThemeUILink, LinkProps } from 'theme-ui'
import { FunctionComponent, RefAttributes, PropsWithoutRef } from 'react'
import { Link as GatsbyLink, useStaticQuery, graphql, GatsbyLinkProps } from 'gatsby'
import { OutboundLink, OutboundLinkProps } from 'gatsby-plugin-google-gtag'
import isExternalLink from '../utils/isExternalLink'

type ForwardRef<T, P> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
type CombinedLinkProps = Omit<LinkProps & GatsbyLinkProps<unknown>, 'defaultValue' | 'aria-relevant'>
const ThemedGatsbyLink: ForwardRef<HTMLAnchorElement, CombinedLinkProps> = ThemeUILink
type ExternalLinkProps = LinkProps & OutboundLinkProps
const ThemedExternalLink: ForwardRef<HTMLAnchorElement, ExternalLinkProps> = ThemeUILink

const Link: FunctionComponent<CombinedLinkProps> = ({ to, href, ...props }) => {
  const {
    site: { pathPrefix },
  } = useStaticQuery(graphql`
    query {
      site {
        pathPrefix
      }
    }
  `)

  let url = to ?? href
  const isExternal = isExternalLink(url)
  const isMailTo = url.startsWith('mailto:')
  const isSection = url.startsWith('#')
  const isImage = url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.svg')

  if (isSection) {
    return <ThemeUILink href={url} {...props} />
  }

  if (isExternal || isMailTo || isImage) {
    return <ThemedExternalLink as={OutboundLink} href={url} {...props} target="_blank" rel="noopener noreferrer" />
  }

  // if path prefix is set, remove it because Gatsby Link adds it too
  if (pathPrefix !== '' && pathPrefix !== '/') {
    url = url.replace(pathPrefix, '')
  }

  return <ThemedGatsbyLink as={GatsbyLink} to={url} {...props} />
}

export default Link

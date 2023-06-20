import { ForwardRefExoticComponent, FunctionComponent, PropsWithoutRef, RefAttributes } from 'react'
import { GatsbyLinkProps, graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import { OutboundLink, OutboundLinkProps } from 'gatsby-plugin-google-gtag'
import { useFlags } from 'gatsby-plugin-launchdarkly'
import { Link as ThemeUILink, LinkProps } from 'theme-ui'

import isExternalLink from '../utils/isExternalLink'
import { addRemoveSiteParam, setSubdomain } from '../utils/siteAwareUtils'

import useSite from './siteSelector/useSite'

type ForwardRef<T, P> = ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
type CombinedLinkProps = Omit<LinkProps & GatsbyLinkProps<unknown>, 'to' | 'defaultValue' | 'aria-relevant'> & {
  to?: string
}
const ThemedGatsbyLink: ForwardRef<HTMLAnchorElement, CombinedLinkProps> = ThemeUILink
type ExternalLinkProps = LinkProps & OutboundLinkProps
const ThemedExternalLink: ForwardRef<HTMLAnchorElement, ExternalLinkProps> = ThemeUILink

const Link: FunctionComponent<React.PropsWithChildren<CombinedLinkProps>> = ({ to, href, ...props }) => {
  const [site] = useSite()
  const { enableSiteSelection } = useFlags()
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
    const { children, ...restProps } = props

    return (
      <ThemedExternalLink
        as={OutboundLink}
        href={setSubdomain(url, site, enableSiteSelection)}
        {...restProps}
        target="_blank"
        rel="noopener noreferrer"
      >
        {typeof children === 'string' ? setSubdomain(children, site, enableSiteSelection) : children}
      </ThemedExternalLink>
    )
  }

  // if path prefix is set, remove it because Gatsby Link adds it too
  if (pathPrefix !== '' && pathPrefix !== '/') {
    url = url.replace(pathPrefix, '')
  }

  // internal links
  return <ThemedGatsbyLink as={GatsbyLink} to={addRemoveSiteParam(url, site)} {...props} />
}

export default Link

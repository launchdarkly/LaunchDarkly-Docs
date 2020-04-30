/** @jsx jsx */
import { jsx, Link as ThemeUILink, LinkProps } from 'theme-ui'
import { FunctionComponent, RefAttributes, PropsWithoutRef } from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import isExternalLink from '../utils/isExternalLink'

type ForwardRef<T, P> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
const ThemedGatsbyLink: ForwardRef<HTMLAnchorElement, LinkProps & GatsbyLinkProps<{}>> = ThemeUILink

const Link: FunctionComponent<LinkProps & GatsbyLinkProps<{}>> = ({ to, href, ...props }) => {
  const url = to ?? href
  const isExternal = isExternalLink(url)
  const isMailTo = url.startsWith('mailto:')
  const isSection = url.startsWith('#')
  const isImage = url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.svg')

  if (isSection) {
    return <ThemeUILink href={url} {...props} />
  }

  if (isExternal || isMailTo || isImage) {
    return <ThemeUILink href={url} {...props} target="_blank" rel="noopener noreferrer" />
  }

  return <ThemedGatsbyLink as={GatsbyLink} to={url} {...props} />
}

export default Link

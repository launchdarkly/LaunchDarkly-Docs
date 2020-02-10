/** @jsx jsx */
import { jsx, Link as ThemeUILink, LinkProps } from 'theme-ui'
import { FunctionComponent, RefAttributes, PropsWithoutRef } from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import isExternalLink from '../utils/isExternalLink'

type ForwardRef<T, P> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
const ThemedGatsbyLink: ForwardRef<HTMLAnchorElement, LinkProps & GatsbyLinkProps<{}>> = ThemeUILink

const Link: FunctionComponent<LinkProps & GatsbyLinkProps<{}>> = ({ to, ...props }) => {
  const isExternal = isExternalLink(to)
  if (isExternal) {
    return <ThemeUILink href={to} {...props} target="_blank" rel="noopener noreferrer" />
  }

  return <ThemedGatsbyLink as={GatsbyLink} to={to} {...props} />
}

export default Link

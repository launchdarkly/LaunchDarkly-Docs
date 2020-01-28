/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FunctionComponent, RefAttributes, PropsWithoutRef } from 'react'
import { Link as ThemeUILink, LinkProps } from '@theme-ui/components'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'

type ForwardRef<T, P> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
const ThemedGatsbyLink: ForwardRef<HTMLAnchorElement, LinkProps & GatsbyLinkProps<{}>> = ThemeUILink

const Link: FunctionComponent<LinkProps & GatsbyLinkProps<{}>> = ({ to, children, className, variant }) => {
  const isInternalLink = to.startsWith('/')
  if (isInternalLink) {
    return (
      <ThemedGatsbyLink as={GatsbyLink} to={to} className={className} variant={variant}>
        {children}
      </ThemedGatsbyLink>
    )
  }

  return (
    <ThemeUILink href={to} className={className} target="_blank" rel="noopener noreferrer" variant={variant}>
      {children}
    </ThemeUILink>
  )
}

export default Link

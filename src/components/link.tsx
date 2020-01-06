/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FunctionComponent, RefAttributes, PropsWithoutRef } from 'react'
import { Link as ThemeUILink, LinkProps } from '@theme-ui/components'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'

type ForwardRef<T, P> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
const ThemedGatsbyLink: ForwardRef<HTMLAnchorElement, LinkProps & GatsbyLinkProps<{}>> = ThemeUILink

const Link: FunctionComponent<GatsbyLinkProps<{}>> = ({ to, children }) => {
  return (
    <ThemedGatsbyLink as={GatsbyLink} to={to}>
      {children}
    </ThemedGatsbyLink>
  )
}

export default Link

/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { SxComponent } from '@theme-ui/components'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'

export type LinkProps = {
  to: string
  children: string
}

const StyledGatsbyLink = Styled.a as SxComponent<GatsbyLinkProps<{}>>

export default function Link({ to, children }: LinkProps) {
  return (
    <StyledGatsbyLink as={GatsbyLink} to={to}>
      {children}
    </StyledGatsbyLink>
  )
}

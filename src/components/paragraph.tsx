/* eslint-disable @typescript-eslint/no-explicit-any */
import { Children, DetailedHTMLProps, FC, isValidElement, LinkHTMLAttributes, ReactElement } from 'react'

type LinkProps = DetailedHTMLProps<LinkHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

/*
 * MDX wraps all links when defined in mdx with markdown in a paragraph tag.
 * Paragraph tags have their own styles associated with them.
 * This component checks if the child is a link, and if so, returns the link without
 * the wrapped paragraph tag so that the styles don't conflict.
 */
export const Paragraph = ({ children, ...rest }: any) => {
  const isOneChild = Children.count(children) === 1

  const isMdxLinkTag = (displayName: string) => displayName === "MdxComponents('a')"
  const isTypeAComponent = (type: any) => typeof type === 'function'

  const defaultParagraphTag = <p {...rest}>{children}</p>

  if (isOneChild) {
    const child = Children.toArray(children)[0] as ReactElement<LinkProps>
    const type = child.type

    if (isValidElement(child) && child.props.href && isTypeAComponent(type) && isMdxLinkTag((type as FC).displayName)) {
      return children
    }
  }

  return defaultParagraphTag
}

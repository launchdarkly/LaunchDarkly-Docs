import React, { ReactNode } from 'react'
import { CodeSnippet } from './codeSnippet'
import useSite from '../../siteSelector/useSite'
import { makeSiteAware } from '../../../utils/siteAwareUtils'

type CodeProps = {
  className?: string
  children?: string | ReactNode
}

export function Code(props: CodeProps) {
  const [site] = useSite()
  const { children, className } = props

  if (!children) {
    console.warn(
      'Nothing was passed in a <code></code> block. This is usually a bug. Search the project for it and fix it.',
    )
    return null
  }

  if (typeof children === 'string') {
    if (!className) {
      const content = makeSiteAware(children, site)
      return <code>{content}</code>
    }

    return (
      <CodeSnippet className={className} {...props}>
        {children}
      </CodeSnippet>
    )
  }

  return <>{children}</>
}

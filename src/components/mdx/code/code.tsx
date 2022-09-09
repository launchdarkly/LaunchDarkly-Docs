import React, { ReactNode } from 'react'
import { useFlags } from 'gatsby-plugin-launchdarkly'

import { setSubdomain } from '../../../utils/siteAwareUtils'
import useSite from '../../siteSelector/useSite'

import { CodeSnippet } from './codeSnippet'

type CodeProps = {
  className?: string
  children?: string | ReactNode
}

export function Code(props: CodeProps) {
  const [site] = useSite()
  const { enableSiteSelection } = useFlags()
  const { children, className } = props

  if (!children) {
    console.warn(
      'Nothing was passed in a <code></code> block. This is usually a bug. Search the project for it and fix it.',
    )
    return null
  }

  if (typeof children === 'string') {
    const content = setSubdomain(children, site, enableSiteSelection)

    if (!className) {
      return <code>{content}</code>
    }

    return (
      <CodeSnippet className={className} {...props}>
        {content}
      </CodeSnippet>
    )
  }

  return <>{children}</>
}

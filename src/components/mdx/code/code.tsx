import * as React from 'react'
import { CodeSnippet, CodeSnippetProps } from './codeSnippet'

export function Code(props: CodeSnippetProps) {
  const { children, className } = props

  if (!children) {
    console.warn(
      'Nothing was passed in a <code></code> block. This is usually a bug. Search the project for it and fix it.',
    )
    return null
  }

  if (!className) {
    return <code>{children}</code>
  }

  if (typeof children === 'string') {
    return (
      <CodeSnippet className={className} {...props}>
        {children}
      </CodeSnippet>
    )
  }

  return children
}

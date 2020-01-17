import * as React from 'react'
import { CodeSnippet, CodeSnippetProps } from './codeSnippet'

export function Code(props: CodeSnippetProps) {
  const { children } = props

  if (typeof children === 'string') {
    return <CodeSnippet {...props}>{children}</CodeSnippet>
  }
  return children
}

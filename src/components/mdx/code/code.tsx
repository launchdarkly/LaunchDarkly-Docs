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

  /*
    A code block specified like this has a "language-<language> attribute on the className in addition to
    it's children ending in a new line:
    props.children = 'yarn add -D jest-launchdarkly-mock\n'
    ```javascript
    yarn add -D jest-launchdarkly-mock
    ```

    A code block specified without a language attribute only has the new line:
    props.children = 'I am a code block without a language\n'
    ```
    I am a code block without a language
    ```
  */
  const isCodeBlock = className?.includes('language-') || (typeof children === 'string' && children.endsWith('\n'))

  if (!children) {
    console.warn(
      'Nothing was passed in a <code></code> block. This is usually a bug. Search the project for it and fix it.',
    )
    return null
  }

  if (typeof children === 'string') {
    const content = setSubdomain(children, site, enableSiteSelection)

    if (isCodeBlock) {
      return (
        <CodeSnippet className={className} {...props}>
          {content}
        </CodeSnippet>
      )
    }

    return <code>{content}</code>
  }

  return <>{children}</>
}

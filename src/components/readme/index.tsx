/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FunctionComponent } from 'react'
// eslint-disable-next-line import/no-unresolved
import MDX from '@mdx-js/runtime'

import Callout, { CalloutTitle, CalloutDescription } from '../mdx/callout'
import { Intent } from '../intent'

export type ReadmeBlockProps = {
  type: 'api-header' | 'callout' | 'code' | 'parameters' | 'image'
  content: { [key: string]: string }
}

export const ReadmeBlock: FunctionComponent<ReadmeBlockProps> = ({ type, content }: ReadmeBlockProps) => {
  switch (type) {
    case 'callout':
      return <ReadmeCallout intent={content.type as Intent} title={content.title} body={content.body} />
    default:
      return <pre sx={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(content, null, 2)}</pre>
  }
}

type ReadmeCalloutProps = {
  intent: Intent
  title?: string
  body: string
}

export function ReadmeCallout({ intent, title, body }: ReadmeCalloutProps) {
  return (
    <Callout intent={intent}>
      <CalloutTitle>{title}</CalloutTitle>
      <CalloutDescription>
        <MDX>{body}</MDX>
      </CalloutDescription>
    </Callout>
  )
}

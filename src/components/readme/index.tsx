/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FunctionComponent } from 'react'
import MDX from '@mdx-js/runtime'

import { Info } from '../Info'
import { Intent } from '../intent'

export type ReadmeBlockProps = {
  type: 'api-header' | 'callout' | 'code' | 'parameters' | 'image'
  content: { [key: string]: string }
}

export const ReadmeBlock: FunctionComponent<ReadmeBlockProps> = ({ type, content }: ReadmeBlockProps) => {
  switch (type) {
    case 'callout':
      return <ReadmeCallout intent={content.type as Intent} body={content.body} />
    default:
      return <pre sx={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(content, null, 2)}</pre>
  }
}

type ReadmeCalloutProps = {
  intent: Intent
  body: string
}

export function ReadmeCallout({ intent, body }: ReadmeCalloutProps) {
  return (
    <Info intent={intent}>
      <MDX>{body}</MDX>
    </Info>
  )
}

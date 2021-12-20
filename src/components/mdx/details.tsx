/** @jsx jsx */
import { PropsWithChildren } from 'react'
import { jsx, ThemeUIStyleObject } from 'theme-ui'

type DetailsProps = {
  open: boolean
  summary: string
}

export default function Details({ open = false, summary, children }: PropsWithChildren<DetailsProps>) {
  const detailsStyles: ThemeUIStyleObject = { fontSize: 3, lineHeight: 'spaced', border: '1px solid #aaa' }
  const summaryStyles: ThemeUIStyleObject = { cursor: 'pointer' }
  return (
    <details open={open} sx={{ ...detailsStyles }}>
      <summary sx={{ ...summaryStyles }}>{summary}</summary>
      {children}
    </details>
  )
}

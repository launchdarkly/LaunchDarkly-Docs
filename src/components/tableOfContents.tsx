import { Themed } from '@theme-ui/mdx'
import { Link } from 'theme-ui'

import { useFlaggedPagesConfig } from '../hooks/useFlaggedPagesConfig'

type TOCItem = {
  url: string
  title: string
  items: TOCItem[]
}

export type TOC = {
  items: TOCItem[]
}

export type TableOfContentsProps = {
  toc: Array<CustomTOCItem>
}

export type CustomTOCItem = {
  value: string
  hash: string
  depth: number
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const { isPathDisabled } = useFlaggedPagesConfig()

  if (!toc) {
    console.warn("There's no heading to render for toc")
    return null
  }

  const renderTocItem = (item: CustomTOCItem) => {
    const { hash: url, value: title } = item

    if (isPathDisabled(url, { isHashPath: true })) {
      return null
    }

    return (
      <li
        key={url}
        sx={{
          lineHeight: 'small',
          borderBottomStyle: 'dotted',
          borderBottomWidth: 1,
          borderColor: 'grayMed',
          px: 2,
          py: 2,
        }}
      >
        <Link
          href={url}
          sx={{
            fontSize: '3',
            color: 'graySafe',
            textDecoration: 'none',
            ':visited': {
              color: 'graySafe',
            },
            ':hover': {
              textDecoration: 'none',
              color: 'primarySafe',
            },
          }}
        >
          {title}
        </Link>
      </li>
    )
  }
  return (
    <aside
      sx={{ pt: 4, display: ['none', 'none', 'block'], position: 'fixed', right: 0, top: '4.5rem', width: '18rem' }}
    >
      <Themed.h5
        sx={{
          borderBottomStyle: 'dotted',
          borderBottomWidth: 1,
          borderColor: 'grayMed',
          px: 2,
          py: 2,
          pt: '2rem',
          color: 'grayBlack',
        }}
      >
        On this page
      </Themed.h5>
      <ul>{toc.map(tocItem => renderTocItem(tocItem))}</ul>
    </aside>
  )
}

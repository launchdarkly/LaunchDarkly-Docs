/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from '@theme-ui/components'

type TOCItem = {
  url: string
  title: string
  items: TOCItem[]
}

export type TOC = {
  items: TOCItem[]
}

export type TableOfContentsProps = {
  toc: TOC
}

export function TableOfContents({ toc, ...props }: TableOfContentsProps) {
  const tocItems = toc.items

  if (!tocItems) {
    console.warn("There's no heading to render for toc")
    return null
  }

  return (
    <div {...props}>
      <Styled.h5
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
      </Styled.h5>
      <ul>
        {tocItems.map(({ url, title }) => (
          <li
            key={url}
            sx={{
              lineHeight: 1.25,
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
        ))}
      </ul>
    </div>
  )
}

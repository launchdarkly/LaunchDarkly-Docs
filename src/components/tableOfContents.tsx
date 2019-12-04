/** @jsx jsx */
import { jsx } from 'theme-ui'
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
  const children = toc.items[0].items

  return (
    <div {...props}>
      <h3
        sx={{
          fontSize: 2,
          fontWeight: 'heading',
          lineHeight: 'fixed',
          textTransform: 'uppercase',
          color: 'graySafe',
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          borderColor: 'grayMed',
          padding: 3,
        }}
      >
        On this page
      </h3>
      <ul>
        {children.map(({ url, title }) => (
          <li
            key={url}
            sx={{
              lineHeight: 'fixed',
              borderBottomStyle: 'solid',
              borderBottomWidth: 1,
              borderColor: 'grayMed',
              padding: 3,
            }}
          >
            <Link
              href={url}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                ':hover': {
                  textDecoration: 'underline',
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

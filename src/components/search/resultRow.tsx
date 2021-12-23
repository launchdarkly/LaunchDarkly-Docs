/** @jsx jsx */
import { jsx, Theme, Box, Flex } from 'theme-ui'
import { FunctionComponent, MouseEvent } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Hit } from 'react-instantsearch-core'
import { Highlight, Snippet } from 'react-instantsearch-dom'

interface ResultRowProps {
  hit: Hit
  onClick(path: string): void
}

const markStyles = {
  '& mark': {
    backgroundColor: (theme: Theme) => theme.colors.muted,
    borderBottom: (theme: Theme) => `0.1rem solid ${theme.colors.grayBase}`,
  },
}
const ResultRow: FunctionComponent<ResultRowProps> = ({ hit, onClick }) => {
  const { path, displayCategory, _highlightResult } = hit
  // At the moment, query will only be used for page text,
  // not categories or title
  const terms = _highlightResult.excerpt.matchedWords.join('+')
  const [mainPath, hash] = path.split('#')
  const query = terms ? `?q=${terms}` : ''
  const addHash = hash ? `#${hash}` : ''
  const queryPath = `${mainPath}/${query}${addHash}`
  const onClickWrapper = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick(queryPath)
  }
  return (
    <GatsbyLink to={queryPath} sx={{ textDecoration: 'none' }} onClick={onClickWrapper}>
      <Flex px={5} py={3} sx={{ flexDirection: 'column', '&:hover': { bg: 'grayLight' } }}>
        <Highlight hit={hit} attribute="title" tagName="mark" sx={{ color: 'primarySafe', ...markStyles }} />
        <Box pt={2} sx={{ color: 'graySafe', fontSize: 2, fontWeight: 'bold' }}>
          {displayCategory.toUpperCase()}
        </Box>
        <Snippet
          hit={hit}
          attribute="excerpt"
          tagName="mark"
          sx={{
            lineHeight: 'small',
            color: 'grayBlack',
            pt: 2,
            fontSize: 3,
            ...markStyles,
          }}
        />
      </Flex>
    </GatsbyLink>
  )
}

export default ResultRow

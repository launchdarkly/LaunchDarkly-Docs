// /** @jsx jsx */
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { SearchResults, SearchState } from 'react-instantsearch-core'
import { connectStateResults } from 'react-instantsearch-dom'
import { navigate } from '@reach/router'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { withPrefix } from 'gatsby'
import { jsx } from 'theme-ui'

import EmptyRow from './emptyRow'
import ResultCount from './resultCount'
import ResultRow from './resultRow'

interface ResultsProps {
  searchState: SearchState
  searchResults: SearchResults
}
const Results: FunctionComponent<React.PropsWithChildren<ResultsProps>> = ({ searchState, searchResults }) => {
  const { query } = searchState
  const hasQuery = !!query
  const hasResults = searchResults && searchResults.nbHits !== 0
  const [show, setShow] = useState(false)
  const rootDiv = useRef<HTMLDivElement>()

  useEffect(() => {
    if (show) {
      disableBodyScroll(rootDiv.current)
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [show])

  useEffect(() => {
    setShow(hasQuery || hasResults)
  }, [hasQuery, hasResults])

  const onClickRow = (path: string) => {
    setShow(false)
    navigate(withPrefix(path))
  }

  return (
    <div
      ref={rootDiv}
      sx={{
        display: show ? 'block' : 'none',
        bg: 'grayWash',
        position: 'fixed',
        top: '4.5rem',
        right: 0,
        width: ['100%', '28rem'],
        height: '100%',
        zIndex: 20,
        overflow: 'scroll',
        pb: 10,
        borderLeftWidth: ['0', '1px'],
        borderLeftStyle: 'solid',
        borderColor: 'grayMed',
      }}
    >
      {!hasResults && <EmptyRow query={query} />}
      {hasResults && <ResultCount count={searchResults.nbHits} />}
      {hasResults &&
        searchResults.hits.map((hit, index) => {
          const props = {
            onClick: onClickRow,
            position: index + 1,
          }
          hit.__queryID = searchResults.queryID
          return <ResultRow key={hit.objectID} hit={hit} {...props} />
        })}
    </div>
  )
}

export default connectStateResults(Results)

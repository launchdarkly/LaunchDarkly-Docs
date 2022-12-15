/** @jsx jsx */
import { Fragment, FunctionComponent, useEffect,useRef } from 'react'
import { Configure, connectSearchBox, InstantSearch } from 'react-instantsearch-dom'
import { jsx } from 'theme-ui'

import { getAlgoliaAnalyticsTags, trackSearch } from '../../utils/analyticsUtils'
import { algoliaIndex } from '../../utils/envUtils'
import { getQueryParams } from '../../utils/queryUtils'
import Icon from '../icon'

import Results from './results'
import searchClient from './searchClient'

type SearchInputProps = {
  currentRefinement: string
  refine(input: string): void
}

const SearchInput: FunctionComponent<SearchInputProps> = ({ currentRefinement, refine }) => {
  const inputRef = useRef(null)
  const onClearSearch = () => {
    inputRef.current.value = ''
    refine('')
  }

  useEffect(() => {
    const q = getQueryParams(window.location, 'iq')
    inputRef.current.value = q
    refine(q)
  }, [])

  return (
    <Fragment>
      <div
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'white',
          border: 0,
          borderRadius: 1,
          height: 4,
          width: '100%',
        }}
      >
        <Icon name="search" variant="search" sx={{ fill: 'graySafe' }} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={event => refine(event.currentTarget.value)}
          sx={{
            border: 0,
            width: '100%',
            outline: 'none',
            fontSize: 4,
            '::placeholder': { fontSize: [4, 3, 4] },
          }}
          value={currentRefinement}
        />
        {inputRef.current?.value && (
          <Icon name="window-close" variant="close" onClick={onClearSearch} sx={{ cursor: 'pointer' }} />
        )}
      </div>
    </Fragment>
  )
}
const ConnectedSearchInput = connectSearchBox(SearchInput)

const Root = () => (
  <InstantSearch indexName={algoliaIndex} searchClient={searchClient} onSearchStateChange={trackSearch}>
    <Configure clickAnalytics analyticsTags={getAlgoliaAnalyticsTags()} />
    <ConnectedSearchInput />
    <Results />
  </InstantSearch>
)

export default Root

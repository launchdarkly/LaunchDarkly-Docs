/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, FunctionComponent, useRef } from 'react'
import { InstantSearch, connectSearchBox } from 'react-instantsearch-dom'
import searchClient from './searchClient'
import Results from './results'
import { algoliaIndex } from '../../utils/envUtils'
import Icon from '../icon'

type SearchInputProps = {
  refine(input: string): void
}

const SearchInput: FunctionComponent<SearchInputProps> = ({ refine, ...rest }) => {
  const inputRef = useRef(null)
  const onClearSearch = () => {
    inputRef.current.value = ''
    refine('')
  }

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
            width: '85%',
            outline: 'none',
            fontSize: 4,
            '::placeholder': { fontSize: [4, 3, 4] },
          }}
          {...rest}
        />
        <Icon name="window-close" variant="close" onClick={onClearSearch} sx={{ cursor: 'pointer' }} />
      </div>
    </Fragment>
  )
}
const ConnectedSearchInput = connectSearchBox(SearchInput)

const Root = () => (
  <InstantSearch indexName={algoliaIndex} searchClient={searchClient}>
    <ConnectedSearchInput />
    <Results />
  </InstantSearch>
)

export default Root

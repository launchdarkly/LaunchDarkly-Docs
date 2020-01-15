/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, FunctionComponent } from 'react'
import { InstantSearch, connectSearchBox } from 'react-instantsearch-dom'
import searchClient from './searchClient'
import Results from './results'
import { algoliaIndex } from '../../utils/envUtils'
import Icon from '../icon'

type SearchInputProps = {
  refine(input: string): void
}

const SearchInput: FunctionComponent<SearchInputProps> = ({ refine, ...rest }) => (
  <Fragment>
    <Icon name="search" variant="search" sx={{ display: ['none', 'none', 'block'] }} />
    <input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={event => refine(event.currentTarget.value)}
      {...rest}
      sx={{
        pl: 2,
        border: 0,
        borderRadius: 1,
        height: 4,
        fontSize: 4,
        width: '100%',
        '::placeholder': { fontSize: [4, 3, 4] },
      }}
    />
  </Fragment>
)
const ConnectedSearchInput = connectSearchBox(SearchInput)

const Root = () => (
  <InstantSearch indexName={algoliaIndex} searchClient={searchClient}>
    <ConnectedSearchInput />
    <Results />
  </InstantSearch>
)

export default Root

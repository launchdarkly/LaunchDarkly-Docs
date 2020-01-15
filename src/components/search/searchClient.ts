import algoliasearch from 'algoliasearch/lite'
import { Hit } from 'react-instantsearch-core'
import { QueryParameters } from 'algoliasearch'

interface AlgoliaSearchRequest {
  indexName: string
  query: string
  params: QueryParameters
}
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY)

const searchClient = {
  search(requests: AlgoliaSearchRequest[]) {
    // Don't search if query is empty
    // https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-requests/react/
    if (requests.every(({ params: { query } }) => !query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [] as Hit[],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      })
    }

    return algoliaClient.search(requests)
  },
}

export default searchClient

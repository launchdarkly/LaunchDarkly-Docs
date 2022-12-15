const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
const algoliaIndexPrefix = process.env.GATSBY_ALGOLIA_INDEX || 'DELETE'
let algoliaIndex = `${algoliaIndexPrefix}_${activeEnv}`

// This is an arbitrary number which we can adjust in time. Algolia allows
// up to 1000 indices, but to keep things manageable, we'll start with 100.
const MAX_INDEX_COUNT = 100
const bucketPrefix = process.env.GATSBY_BUCKET_PREFIX
if (bucketPrefix) {
  const bucketPrefixSanitized = isNaN(bucketPrefix) ? bucketPrefix : parseInt(bucketPrefix) % MAX_INDEX_COUNT
  algoliaIndex = `${algoliaIndex}_${bucketPrefixSanitized}`
}

// Force index name for dev to avoid accidentally overwriting prod
if (activeEnv == 'development') {
  algoliaIndex = 'Docs_development'
}

module.exports = { activeEnv, algoliaIndex }

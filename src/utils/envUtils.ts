export const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
const algoliaIndexPrefix = process.env.GATSBY_ALGOLIA_INDEX || 'DELETE'
export const algoliaIndex = `${algoliaIndexPrefix}_${activeEnv}`

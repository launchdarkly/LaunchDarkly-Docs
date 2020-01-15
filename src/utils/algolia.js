/* eslint-disable @typescript-eslint/no-var-requires */
// This is intentionally left as js because it is consumed by gatsby-config.js.
// This file selects data from graphql and flattens the results. These results are
// then used to create algolia indices.
// https://www.gatsbyjs.org/docs/adding-search-with-algolia/#configuring-the-algolia-plugin
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
require('dotenv').config({
  path: `.env.${activeEnv}`,
})
const algoliaIndexPrefix = process.env.ALGOLIA_INDEX || 'DELETE'
const algoliaIndex = `${algoliaIndexPrefix}_${activeEnv}`
console.log(`Using environment config: '${activeEnv}', indexing to: ${algoliaIndex}`)

const pageQuery = `{
  mdx: allMdx(filter: {fileAbsolutePath: {regex: "/src/content/topics/"}}) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          path
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
  
  topics: allSecondLevelTopicsJson {
    nodes {
      label
      path
      allItems
    }
  }
}`

const flatten = (mdx, topics) => {
  return mdx.map(({ node: { frontmatter, ...rest } }) => {
    // add second level category to index
    const { path } = frontmatter
    const secondLevelTopic = topics.find(t => !!t.allItems.find(i => i === path))

    return {
      ...frontmatter,
      ...rest,
      secondLevelTopic: secondLevelTopic ? secondLevelTopic.label : 'Unlabelled',
    }
  })
}

const settings = { attributesToSnippet: ['excerpt:40'] }
const queries = [
  {
    query: pageQuery,
    transformer: ({ data: { mdx, topics } }) => flatten(mdx.edges, topics.nodes),
    indexName: algoliaIndex,
    settings,
  },
]

module.exports = { queries, algoliaIndex }

/* eslint-disable @typescript-eslint/no-var-requires */
// This is intentionally left as js because it is consumed by gatsby-config.js.
// This file selects data from graphql and flattens the results. These results are
// then used to create algolia indices.
// https://www.gatsbyjs.org/docs/adding-search-with-algolia/#configuring-the-algolia-plugin
const { activeEnv } = require('./dotEnvUtils')
const algoliaIndex = `Pages_${activeEnv}`

const pageQuery = `{
  allMdx(filter: {fileAbsolutePath: {regex: "/src/content/topics/"}}) {
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
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: ['excerpt:20'] }
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.allMdx.edges),
    indexName: algoliaIndex,
    settings,
  },
]

module.exports = { queries, algoliaIndex }

/* eslint-disable @typescript-eslint/no-var-requires */
// This is intentionally left as js because it is consumed by gatsby-config.js.
// This file selects data from graphql and flattens the results. These results are
// then used to create algolia indices.
// https://www.gatsbyjs.org/docs/adding-search-with-algolia/#configuring-the-algolia-plugin
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
require('dotenv').config({
  path: `.env.${activeEnv}`,
})
const algoliaIndexPrefix = process.env.GATSBY_ALGOLIA_INDEX || 'DELETE'
const algoliaIndex = `${algoliaIndexPrefix}_${activeEnv}`
console.log(`Using environment config: '${activeEnv}', indexing to: ${algoliaIndex}`)

const pageQuery = `{
  mdx: allMdx(filter: {fileAbsolutePath: {regex: "/src/content/topics/"}}) {
    nodes {
      id
      fileAbsolutePath
      frontmatter {
        title
        path
        description
        published
      }
      excerpt(pruneLength: 5000)
    }
  }
  
  rootTopics: allRootTopicsJson {
    nodes {
      path
      label
      allItems
    }
  }
  
  secondLevelTopics: allSecondLevelTopicsJson {
    nodes {
      label
      path
      allItems
    }
  }
}`

// Intentionally exclude root topics from search. These are compared against absolute file paths.
const excludedPages = ['/integrations/index.mdx', '/sdk/index.mdx', '/components.mdx']

const flatten = (mdx, rootTopics, secondLevelTopics) => {
  const result = []
  mdx.forEach(({ id, fileAbsolutePath, frontmatter, excerpt }) => {
    const included = frontmatter.published && !excludedPages.find(p => fileAbsolutePath.includes(p))

    if (included) {
      const { title, path, description } = frontmatter
      const displayCategory = secondLevelTopics.find(t => !!t.allItems.find(i => i === path))
      let displayCategoryLabel

      if (!displayCategory) {
        displayCategoryLabel = 'Unlabelled'
        console.error(`Can't find a category for ${path}`)
      } else {
        // display the root topic for second level topics to avoid
        // showing duplicate title/category in search results
        if (path === displayCategory.path) {
          const { label } = rootTopics.find(r => !!r.allItems.find(i => i === path))
          displayCategoryLabel = label
        } else {
          displayCategoryLabel = displayCategory.label
        }
      }
      result.push({
        objectID: id,
        title,
        path,
        description,
        excerpt,
        displayCategory: displayCategoryLabel,
      })
    } else {
      console.log(`Excluding ${fileAbsolutePath}`)
    }
  })

  return result
}

const settings = { attributesToSnippet: ['excerpt:40'] }
const queries = [
  {
    query: pageQuery,
    transformer: ({ data: { mdx, rootTopics, secondLevelTopics } }) =>
      flatten(mdx.nodes, rootTopics.nodes, secondLevelTopics.nodes),
    indexName: algoliaIndex,
    settings,
  },
]

module.exports = { queries, algoliaIndex }

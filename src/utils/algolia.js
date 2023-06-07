/* eslint-disable @typescript-eslint/no-var-requires */
// This is intentionally left as js because it is consumed by gatsby-config.js.
// This file selects data from graphql and flattens the results. These results are
// then used to create algolia indices:
// https://www.gatsbyjs.org/docs/adding-search-with-algolia/#configuring-the-algolia-plugin

const { activeEnv, algoliaIndex } = require('./envUtils')
const { getFlaggedPagesConfig } = require('./flaggedPages/ld-server')

require('dotenv').config({
  path: `.env.${activeEnv}`,
})
console.log(`Using environment config: '${activeEnv}', indexing to: ${algoliaIndex}`)

// https://github.com/algolia/gatsby-plugin-algolia#partial-updates
// internal.contentDigest is required
const pageQuery = `{
  mdx: allMdx(filter: {fileAbsolutePath: {regex: "/src/content/topics/"}}) {
    nodes {
      id
      fileAbsolutePath
      frontmatter {
        tags
        title
        path
        description
        published
      }
      excerpt(pruneLength: 30000)
      tableOfContents(maxDepth: 2)
      fields {
        lastModifiedTime
      }
      internal {
        contentDigest
      }
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
const excludedPages = [
  '/home/index.mdx',
  '/integrations/index.mdx',
  '/sdk/index.mdx',
  '/guides/index.mdx',
  '/components.mdx',
  '/flags-in-docs',
]
const excludedHeadings = [
  'getting started',
  'overview',
  'prerequisites',
  'concepts',
  'conclusion',
  'troubleshooting',
  'related content',
]

const flatten = async (mdx, rootTopics, secondLevelTopics) => {
  const { isPathDisabled } = await getFlaggedPagesConfig()

  const result = []
  mdx.forEach(({ id, fileAbsolutePath, frontmatter, excerpt, tableOfContents, fields }) => {
    const included =
      frontmatter.published &&
      !excludedPages.find(p => fileAbsolutePath.includes(p)) &&
      !isPathDisabled(frontmatter.path)

    if (included) {
      const { tags, title, path, description } = frontmatter
      const modified = fields.lastModifiedTime
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

      // page index
      result.push({
        objectID: id,
        tags,
        title,
        path,
        description,
        excerpt,
        displayCategory: displayCategoryLabel,
        titleType: 'h1',
        modified,
      })

      if (tableOfContents.items) {
        tableOfContents.items.forEach(({ url: anchor, title: heading }) => {
          const include = anchor && heading && !excludedHeadings.find(h => heading.toLowerCase() === h)
          if (include) {
            // create an index for each heading
            result.push({
              objectID: `${id}_${anchor}`,
              tags,
              title: heading,
              path: `${path}${anchor}`,
              description,
              excerpt,
              displayCategory: displayCategoryLabel,
              titleType: 'h2',
              modified,
            })
          }
        })
      }
    } else {
      console.log(`Excluding ${fileAbsolutePath}`)
    }
  })

  return result
}

const settings = {
  searchableAttributes: ['tags', 'title', 'description', 'excerpt'],
  attributesToSnippet: ['excerpt:40'],
  customRanking: ['asc(titleType)'],
  attributeForDistinct: 'description',
  distinct: true,
  queryLanguages: ['en'],
  ignorePlurals: true,
  attributesForFaceting: ['searchable(tags)'],
}
const queries = [
  {
    query: pageQuery,
    transformer: async ({ data: { mdx, rootTopics, secondLevelTopics } }) =>
      await flatten(mdx.nodes, rootTopics.nodes, secondLevelTopics.nodes),
    indexName: algoliaIndex,
    settings,
  },
]

module.exports = { queries, algoliaIndex }

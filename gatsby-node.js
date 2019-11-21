/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#generate-slugs
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: 'slug',
      node,
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: `${value}`,
    })
  }
}

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#create-pages-from-sourced-mdx-files
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const mdxFiles = result.data.allMdx.edges
  mdxFiles.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/components/layout.tsx'),
      context: { id: node.id },
    })
  })
}

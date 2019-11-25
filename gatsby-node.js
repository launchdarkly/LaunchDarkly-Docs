/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#generate-slugs
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const { mtime: lastModifiedTime } = getNode(node.parent)
    createNodeField({
      name: 'lastModifiedTime',
      node,
      value: lastModifiedTime,
    })
  }
}

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#create-pages-from-sourced-mdx-files
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createRedirect, createPage } = actions

  createRedirect({
    fromPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/quickstart',
  })

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              path
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
  mdxFiles.forEach(({ node: { id, frontmatter } }) => {
    createPage({
      path: frontmatter.path,
      component: path.resolve('./src/components/layout.tsx'),
      context: { id },
    })
  })
}

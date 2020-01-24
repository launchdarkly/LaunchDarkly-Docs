/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const slug = require('slug')
const createRedirects = require('./createRedirects')

// This generates URL-safe slugs.
slug.defaults.mode = 'rfc3986'

// The remark-mdx package references the node fs package which does not exist
// on the browser so it fails during the gatsby build. This is required to
// polyfill the fs package.
// https://github.com/gatsbyjs/gatsby/issues/564
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
    },
  })
}

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#generate-slugs
exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  loadNodeContent,
  getNode,
  reporter,
}) => {
  const { createNode, createNodeField } = actions

  if (node.sourceInstanceName === 'readme' && node.internal.type === 'File') {
    let content = await loadNodeContent(node)

    content = content
      .replace(/\[block:([a-zA-Z-]+)\]/g, '<ReadmeBlock type="$1" content={')
      .replace(/\[\/block\]/g, '} />\n')

    try {
      const readmeNode = {
        parent: node.id,
        id: createNodeId(`${node.id} >>> Readme`),
        relativePath: node.relativePath,

        internal: {
          type: 'ReadmeMarkdown',
          mediaType: 'text/markdown',
          content,
        },
      }

      readmeNode.internal.contentDigest = createContentDigest(readmeNode)
      readmeNode.fileAbsolutePath = node.absolutePath

      createNode(readmeNode)

      return readmeNode
    } catch (err) {
      reporter.panicOnBuild(
        `Error processing Markdown ${node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`}:\n
      ${err.message}`,
      )

      return {}
    }
  }

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)
    const { mtime: lastModifiedTime } = parent

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

  createRedirects(createRedirect)

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              path
              isInternal
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
    const { id, frontmatter } = node

    createPage({
      path: frontmatter.path,
      component: frontmatter.isInternal
        ? path.resolve('./src/components/internalLayout.tsx')
        : path.resolve('./src/components/layout.tsx'),
      context: { id },
    })
  })
}

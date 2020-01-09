/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const slug = require('slug')

// This generates URL-safe slugs.
slug.defaults.mode = 'rfc3986'

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

    let isImported = false

    if (parent && parent.internal && parent.internal.type === 'ReadmeMarkdown') {
      createNodeField({
        name: 'slug',
        node,
        value: `/${slug(path.basename(parent.fileAbsolutePath, '.md'))}`,
      })

      isImported = true
    }

    createNodeField({
      name: 'isImported',
      node,
      value: isImported,
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
    toPath: '/home/quickstart/getting-started',
  })

  createRedirect({
    fromPath: '/home',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/home/quickstart/getting-started',
  })

  createRedirect({
    fromPath: '/getting-started',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/home/quickstart/getting-started',
  })

  createRedirect({
    fromPath: '/integrations',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/integrations/introduction',
  })

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
    const { id, fields, frontmatter } = node

    createPage({
      path: frontmatter.path || `/readme${fields.slug}`,
      component: frontmatter.isInternal
        ? path.resolve('./src/components/internalLayout.tsx')
        : path.resolve('./src/components/layout.tsx'),
      context: { id },
    })
  })
}

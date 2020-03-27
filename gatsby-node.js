/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')
const path = require('path')
const slug = require('slug')
const legacyRedirectRules = require('./legacyRedirectRules')

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

exports.onCreateNode = async ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    // Ripped from: https://angelos.dev/2019/09/add-support-for-modification-times-in-gatsby/
    const lastModifiedTime = execSync(`git log -1 --pretty=format:%aI ${node.fileAbsolutePath}`).toString()

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

  legacyRedirectRules.forEach(({ fromPath, toPath }) => {
    createRedirect({
      fromPath,
      toPath,
      isPermanent: true,
      redirectInBrowser: true,
    })
    if (fromPath.startsWith('/docs')) {
      createRedirect({
        fromPath: '/v2.0' + fromPath,
        toPath,
        isPermanent: true,
        redirectInBrowser: true,
      })
    }
  })

  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { published: { eq: true } } }) {
        nodes {
          id
          frontmatter {
            path
            isInternal
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const mdxFiles = result.data.allMdx.nodes
  mdxFiles.forEach(({ id, frontmatter }) => {
    createPage({
      path: frontmatter.path,
      component: frontmatter.isInternal
        ? path.resolve('./src/components/internalLayout.tsx')
        : path.resolve('./src/components/layout.tsx'),
      context: { id },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type NavigationDataJson implements Node {
      flagKey: String
    }
    type NavigationDataJsonItems {
      flagKey: String
    }
    type NavigationDataJsonItemsItems {
      flagKey: String
    }
    type NavigationDataJsonItemsItemsItems {
      flagKey: String
    }
  `
  createTypes(typeDefs)
}

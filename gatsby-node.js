const { execSync } = require('child_process')
const path = require('path')
const slug = require('slug')
const readingTime = require('reading-time')
const redirectRules = require('./redirectRules')
const getFinalDestination = require('./getFinalDestination')
const isDev = process.env.GATSBY_ACTIVE_ENV === 'development'

// This generates URL-safe slugs.
slug.defaults.mode = 'rfc3986'

const getLastModifiedFromGitLog = absolutePath => {
  return execSync(`git log -1 --pretty=format:%aI ${absolutePath}`).toString()
}

exports.onCreateNode = async ({ node, actions }) => {
  const { createNodeField } = actions
  const {
    internal: { type, contentFilePath },
  } = node
  if (contentFilePath && type === 'Mdx') {
    const repoPrefix = 'ld-docs-private/src/'
    const fileRelativePath = contentFilePath.substring(contentFilePath.indexOf(repoPrefix) + repoPrefix.length)

    let lastModifiedTime
    if (isDev) {
      // for local dev use local git commits to speed up the build
      lastModifiedTime = getLastModifiedFromGitLog(contentFilePath)
    } else {
      const gitCommits = JSON.parse(
        execSync(`
      gh api -XGET \\
        -H "Accept: application/vnd.github.v3+json" \\
        /repos/launchdarkly/ld-docs-private/commits \\
        -F path=src/${fileRelativePath}`),
      )

      // the first commit is most recent one. Fallback to git log.
      lastModifiedTime = gitCommits[0]?.commit?.author?.date ?? getLastModifiedFromGitLog(contentFilePath)

      // if lastModified is still empty then use today's date
      if (!lastModifiedTime || lastModifiedTime === '') {
        lastModifiedTime = new Date().toISOString()
      }
      console.log(`${fileRelativePath} last modified ${lastModifiedTime}`)
    }

    createNodeField({
      name: 'lastModifiedTime',
      node,
      value: lastModifiedTime,
    })

    createNodeField({
      name: 'isLandingPage',
      node,
      value: !!node.frontmatter.isLandingPage,
    })

    createNodeField({
      name: 'fileAbsolutePath',
      node,
      value: contentFilePath,
    })

    createNodeField({
      node,
      name: 'timeToRead',
      value: readingTime(node.body),
    })
  }
}

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#create-pages-from-sourced-mdx-files
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createRedirect, createPage } = actions

  const redirectMap = redirectRules.reduce((map, r) => ({ ...map, [r.fromPath]: r.toPath }), {})

  redirectRules.forEach(({ fromPath }) => {
    console.log(`Attempting to create redirect from: ${fromPath}`)
    createRedirect({
      fromPath,
      toPath: getFinalDestination(redirectMap, fromPath),
      isPermanent: true,
      redirectInBrowser: true,
    })
    if (fromPath.startsWith('/docs')) {
      createRedirect({
        fromPath: '/v2.0' + fromPath,
        toPath: getFinalDestination(redirectMap, fromPath),
        isPermanent: true,
        redirectInBrowser: true,
      })
    }
  })

  // https://github.com/algolia/gatsby-plugin-algolia#partial-updates
  // internal.contentDigest is required
  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { published: { eq: true } } }) {
        nodes {
          id
          frontmatter {
            path
            isInternal
          }
          internal {
            contentFilePath
            contentDigest
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const mdxFiles = result.data.allMdx.nodes
  mdxFiles.forEach(({ internal, id, frontmatter }) => {
    createPage({
      path: frontmatter.path,
      component: frontmatter.isInternal
        ? `${path.resolve('./src/components/internalLayout.tsx')}?__contentFilePath=${internal.contentFilePath}`
        : `${path.resolve('./src/components/layout.tsx')}?__contentFilePath=${internal.contentFilePath}`,
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
    type Mdx implements Node {
     fileAbsolutePath: String @proxy(from: "fields.fileAbsolutePath")
     timeToRead: Float @proxy(from: "fields.timeToRead.minutes")
    }
  `
  createTypes(typeDefs)
}

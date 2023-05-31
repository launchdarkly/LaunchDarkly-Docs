import { execSync } from 'child_process'
import type { GatsbyNode } from 'gatsby'
import path from 'path'
import readingTime from 'reading-time'
import slug from 'slug'

import { MdxNode } from './src/types/mdxNode'
import { SiteMetadata } from './src/types/siteMetadata'
import getFinalDestination from './getFinalDestination'
import redirectRules from './redirectRules'

const isDev = process.env.GATSBY_ACTIVE_ENV === 'development'

// This generates URL-safe slugs.
slug.defaults.mode = 'rfc3986'

const MdxPage = path.resolve('./src/layouts/mdxPage.tsx')

const getLastModifiedFromGitLog = (absolutePath: string) => {
  return execSync(`git log -1 --pretty=format:%aI ${absolutePath}`).toString()
}

export const onCreateNode: GatsbyNode<MdxNode>['onCreateNode'] = async ({ node, actions }) => {
  const { createNodeField } = actions

  const {
    internal: { type, contentFilePath },
  } = node

  if (type === 'Mdx' && contentFilePath) {
    const repoPrefix = 'ld-docs-private/src/'
    const fileRelativePath = contentFilePath.substring(contentFilePath.indexOf(repoPrefix) + repoPrefix.length)

    let lastModifiedTime
    if (isDev) {
      lastModifiedTime = getLastModifiedFromGitLog(contentFilePath)
    } else {
      const gitCommits = JSON.parse(
        execSync(`
      gh api -XGET \\
        -H "Accept: application/vnd.github.v3+json" \\
        /repos/launchdarkly/ld-docs-private/commits \\
        -F path=src/${fileRelativePath}`).toString(),
      )

      // the first commit is most recent one. Fallback to git log.
      lastModifiedTime = gitCommits[0]?.commit?.author?.date ?? getLastModifiedFromGitLog(contentFilePath)

      // if lastModified is still empty then use today's date
      if (!lastModifiedTime || lastModifiedTime === '') {
        lastModifiedTime = new Date().toISOString()
      }
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
      value: Math.ceil(readingTime(node.body, { wordsPerMinute: 240 }).minutes),
    })
  }
}

type PageQuery = {
  allMdx: {
    nodes: MdxNode[]
  }
}

type SiteQuery = {
  site: {
    siteMetadata: SiteMetadata
  }
}
export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
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

  const siteResult = await graphql<SiteQuery>(`
    query {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `)

  const { siteMetadata } = siteResult.data.site

  // https://github.com/algolia/gatsby-plugin-algolia#partial-updates
  // internal.contentDigest is required
  // Querying for pageData during createPages because
  // mdx seems to have an issue with running out of memory
  // when using page queries
  const result = await graphql<PageQuery>(`
    {
      allMdx(filter: { frontmatter: { published: { eq: true } } }) {
        nodes {
          id
          toc: tableOfContents(maxDepth: 2)
          frontmatter {
            path
            isInternal
            description
            title
            site
            siteAlertTitle
          }
          internal {
            contentFilePath
            contentDigest
          }
          fileAbsolutePath
          timeToRead
          lastModifiedTime
          isLandingPage
          modifiedDate
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const mdxFiles = result.data.allMdx.nodes
  mdxFiles.forEach(
    ({
      id,
      frontmatter,
      internal,
      toc,
      fileAbsolutePath,
      timeToRead,
      lastModifiedTime,
      isLandingPage,
      modifiedDate,
    }) => {
      createPage({
        path: frontmatter.path,
        // have to use the param here with page component to properly generate the html head
        component: frontmatter.isInternal
          ? internal.contentFilePath
          : `${MdxPage}?__contentFilePath=${internal.contentFilePath}`,
        context: {
          id,
          toc,
          fileAbsolutePath,
          lastModifiedTime,
          modifiedDate,
          isLandingPage,
          timeToRead,
          siteMetadata,
        },
      })
    },
  )
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions }) => {
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
      timeToRead: Int @proxy(from: "fields.timeToRead")
      isLandingPage: Boolean @proxy(from: "fields.isLandingPage")
      lastModifiedTime: Date @proxy(from: "fields.lastModifiedTime")
      modifiedDate: Date @proxy(from: "fields.lastModifiedTime") @dateformat(formatString: "DD-MM-YYYY")
    }
  `
  createTypes(typeDefs)
}

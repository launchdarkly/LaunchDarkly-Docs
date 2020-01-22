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
    fromPath: '/docs/',
    isPermanent: true,
    redirectInBrowser: true,
    Path: '/home/getting-started',
  })

  createRedirect({
    fromPath: '/docs/home',
    isPermanent: true,
    redirectInBrowser: true,
    Path: '/home/getting-started',
  })

  createRedirect({
    fromPath: '/docs/getting-started',
    isPermanent: true,
    redirectInBrowser: true,
    Path: '/home/getting-started',
  })

  createRedirect({
    fromPath: '/docs/integrations',
    isPermanent: true,
    redirectInBrowser: true,
    Path: '/integrations/index',
  })

  createRedirect({
    fromPath: '/docs/new-members',
    Path: '/home/account-security/your-team/',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/creating-a-feature-flag',
    Path: '/home/getting-started/feature-flags/',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/flags-index',
    Path: '/home/managing-flags/index',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/the-dashboard',
    Path: '/home/managing-flags/dashboard',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/the-kill-switch',
    Path: '/home/managing-flags/dashboard',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/compare-and-copy-flag-settings',
    Path: '/home/managing-flags/flag-compare-copy',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/managing-variations',
    Path: '/home/managing-flags/flag-variations',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/flag-archive-delete',
    Path: '/home/managing-flags/flag-archive-delete',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/projects',
    Path: '/home/managing-flags/projects',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/environments',
    Path: '/home/managing-flags/environments',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/targeting-users',
    Path: '/home/managing-flags/targeting-users',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/bulk-user-targeting',
    Path: '/home/managing-flags/bulk-user-targeting',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/other-flag-settings',
    Path: '/home/managing-flags/flag-settings',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/prerequisites',
    Path: '/home/managing-flags/prerequisites',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/the-audit-log',
    Path: '/home/managing-flags/audit-log-history',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/debugger',
    Path: '/home/managing-flags/debugger',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/users-index',
    Path: '/home/managing-users/',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/the-user-dashboard',
    Path: '/home/managing-users/users-dashboard',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/private-user-attributes',
    Path: '/home/managing-users/user-attributes',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/segmenting-users',
    Path: '/home/managing-users/user-segments',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/anonymous-users',
    Path: '/home/managing-users/anonymous-users',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/security-index',
    Path: '/home/account-security/',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/teams',
    Path: '/home/account-security/your-team/',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/custom-roles',
    Path: '/home/account-security/custom-roles/',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/configuring-custom-roles',
    Path: '/home/account-security/custom-roles/configure',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/resources-in-custom-roles',
    Path: '/home/account-security/custom-roles/resources',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/tags-in-custom-roles',
    Path: '/home/account-security/custom-roles/tags',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/actions-in-custom-roles',
    Path: '/home/account-security/custom-roles/actions',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/policies-in-custom-roles',
    Path: '/home/account-security/custom-roles/policies',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/example-policies',
    Path: '/home/account-security/custom-roles/example-policies',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/configuring-private-projects-with-custom-roles',
    Path: '/home/account-security/custom-roles/private-projects',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/multi-factor-authentication',
    Path: '/home/account-security/mfa',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/api-access-tokens',
    Path: '/home/account-security/api-access-tokens',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/managing-sessions',
    Path: '/home/account-security/managing-sessions',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/single-sign-on',
    Path: '/home/account-security/sso',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/okta',
    Path: '/home/account-security/sso/okta',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/onelogin',
    Path: '/home/account-security/sso/onelogin',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/google-apps',
    Path: '/home/account-security/sso/google-apps',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/adfs',
    Path: '/home/account-security/sso/adfs',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/azure',
    Path: '/home/account-security/sso/azure',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/insights-index',
    Path: '/home/metrics-insights/',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/usage-metrics',
    Path: '/home/metrics-insights/usage-metrics',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/flag-insights',
    Path: '/home/metrics-insights/flag-insights',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-index',
    Path: '/home/experimentation/',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation',
    Path: '/home/experimentation/introduction',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-create',
    Path: '/home/experimentation/create',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-manage',
    Path: '/home/experimentation/managing',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-lifecycle',
    Path: '/home/experimentation/managing/lifecycle',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-interpret',
    Path: '/home/experimentation/managing/interpreting',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-targeting',
    Path: '/home/experimentation/managing/populations',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/integrations-index',
    Path: '/integrations/',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/visual-studio-team-services-extension',
    Path: '/integrations/azure-devops',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/bitbucket-pipelines',
    Path: '/integrations/bitbucket-pipelines',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/datadog',
    Path: '/integrations/datadog',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/jira',
    Path: '/integrations/jira',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/newrelic',
    Path: '/integrations/newrelic',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/authorizing-oauth-applications',
    Path: '/integrations/oauth',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/slack-app',
    Path: '/integrations/slack',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/slack-app-account-management',
    Path: '/integrations/slack/setting-up',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/managing-flags-with-the-slack-app',
    Path: '/integrations/slack/managing',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/slack-app-in-slack-channels',
    Path: '/integrations/slack/notifications',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/turning-targeting-on-off',
    Path: '/integrations/slack/toggle',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/slack',
    Path: '/integrations/slack/webhooks',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/terraform',
    Path: '/integrations/terraform',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/visual-studio-code',
    Path: '/integrations/vscode',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/webhooks',
    Path: '/integrations/webhooks',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/git-code-references',
    Path: '/integrations/git-code-references',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/bitbucket-pipes-coderefs',
    Path: '/integrations/git-code-references/bitbucket-pipes',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/circleci-orbs',
    Path: '/integrations/git-code-references/circleci-orbs',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/github-actions',
    Path: '/integrations/git-code-references/github-actions',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/gitlab-ci',
    Path: '/integrations/git-code-references/gitlab-ci',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/custom-configuration-via-cli',
    Path: '/integrations/git-code-references/custom-config-cli',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/data-export',
    Path: '/integrations/data-export',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/google-cloud-pubsub',
    Path: '/integrations/data-export/google-pubsub',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/kinesis-destination',
    Path: '/integrations/data-export/kinesis',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/mparticle-destination',
    Path: '/integrations/data-export/mparticle',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/segment-destination',
    Path: '/integrations/data-export/segment',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/data-export-schema-reference',
    Path: '/integrations/data-export/schema-reference',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/custom-properties',
    Path: '/home/advanced/custom-properties',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/public-ip-list',
    Path: '/home/advanced/public-ip-list',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/the-relay-proxy',
    Path: '/home/advanced/relay-proxy',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/using-the-relay-proxy',
    Path: '/home/advanced/relay-proxy/using',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/monitoring-relay-proxy',
    Path: '/home/advanced/relay-proxy/monitoring',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/getting-started-with-launchdarkly-sdks',
    Path: '/sdk/concepts/getting-started',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/client-side-and-server-side',
    Path: '/sdk/concepts/client-vs-server',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/sdk-versioning-policy',
    Path: '/sdk/concepts/versioning',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/sdk-contributors-guide',
    Path: '/sdk/concepts/contributors-guide',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/flag-evaluation-rules',
    Path: '/sdk/concepts/flag-evaluation-rules',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/dotnet-sdk-reference',
    Path: '/sdk/server-side/dotnet',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/c-server-sdk-reference',
    Path: '/sdk/server-side/c-c--',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/go-sdk-reference',
    Path: '/sdk/server-side/go',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/haskell-server-sdk-reference',
    Path: '/sdk/server-side/haskell',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/java-sdk-reference',
    Path: '/sdk/server-side/java',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/node-sdk-reference',
    Path: '/sdk/server-side/node',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/php-sdk-reference',
    Path: '/sdk/server-side/php',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/python-sdk-reference',
    Path: '/sdk/server-side/python',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/ruby-sdk-reference',
    Path: '/sdk/server-side/ruby/',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/android-sdk-reference',
    Path: '/sdk/client-side/android',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/c-sdk-reference',
    Path: '/sdk/client-side/c-c--',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/electron-sdk-reference',
    Path: '/sdk/client-side/electron',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/ios-objc-sdk-reference',
    Path: '/sdk/client-side/ios-objective-c',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/ios-sdk-reference',
    Path: '/sdk/client-side/ios-swift',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/js-sdk-reference',
    Path: '/sdk/client-side/',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/default-variations-shown-before-page-is-completely-loaded',
    Path: '/sdk/client-side/javascript/default-variations',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/js-sdk-requirements-and-polyfills',
    Path: '/sdk/client-side/javascript/requirements-polyfills',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/node-client-sdk-reference',
    Path: '/sdk/client-side/node-js',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/react-sdk-reference',
    Path: '/sdk/client-side/react',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/react-native-sdk-reference',
    Path: '/sdk/client-side/react-native',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/roku-sdk-reference',
    Path: '/sdk/client-side/roku',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/xamarin-sdk-reference',
    Path: '/sdk/client-side/xamarin',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/evaluation-reasons',
    Path: '/home/reference/flag-evaluations',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/reading-flags-from-a-file',
    Path: '/home/reference/flags-from-files',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/using-a-persistent-feature-store',
    Path: '/home/reference/feature-store',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/running-ab-tests',
    Path: '/home/experimentation',
    isPermanent: true,
    redirectInBrowser: true,
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

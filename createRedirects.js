const createRedirects = createRedirect => {
  createRedirect({
    fromPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/home/getting-started',
  })

  createRedirect({
    fromPath: '/home',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/home/getting-started',
  })

  createRedirect({
    fromPath: '/docs',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/home/getting-started',
  })

  createRedirect({
    fromPath: '/docs/home',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/home/getting-started',
  })

  createRedirect({
    fromPath: '/docs/getting-started',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/home/getting-started',
  })

  createRedirect({
    fromPath: '/docs/integrations',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/integrations',
  })

  createRedirect({
    fromPath: '/docs/new-members',
    toPath: '/home/account-security/managing-your-team',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/creating-a-feature-flag',
    toPath: '/home/getting-started/feature-flags',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/flags-index',
    toPath: '/home/managing-flags',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/the-dashboard',
    toPath: '/home/managing-flags/dashboard',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/the-kill-switch',
    toPath: '/home/managing-flags/dashboard',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/compare-and-copy-flag-settings',
    toPath: '/home/managing-flags/flag-compare-copy',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/managing-variations',
    toPath: '/home/managing-flags/flag-variations',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/flag-archive-delete',
    toPath: '/home/managing-flags/flag-archive-delete',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/projects',
    toPath: '/home/managing-flags/projects',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/environments',
    toPath: '/home/managing-flags/environments',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/targeting-users',
    toPath: '/home/managing-flags/targeting-users',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/bulk-user-targeting',
    toPath: '/home/managing-flags/bulk-user-targeting',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/other-flag-settings',
    toPath: '/home/managing-flags/flag-settings',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/prerequisites',
    toPath: '/home/managing-flags/flag-prerequisites',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/the-audit-log',
    toPath: '/home/managing-flags/audit-log-history',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/debugger',
    toPath: '/home/managing-flags/debugger',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/users-index',
    toPath: '/home/managing-users',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/the-user-dashboard',
    toPath: '/home/managing-users/users-dashboard',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/private-user-attributes',
    toPath: '/home/managing-users/user-attributes',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/segmenting-users',
    toPath: '/home/managing-users/user-segments',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/anonymous-users',
    toPath: '/home/managing-users/anonymous-users',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/security-index',
    toPath: '/home/account-security',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/teams',
    toPath: '/home/account-security/managing-your-team',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/custom-roles',
    toPath: '/home/account-security/custom-roles',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/configuring-custom-roles',
    toPath: '/home/account-security/custom-roles/configure',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/resources-in-custom-roles',
    toPath: '/home/account-security/custom-roles/resources',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/tags-in-custom-roles',
    toPath: '/home/account-security/custom-roles/tags',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/actions-in-custom-roles',
    toPath: '/home/account-security/custom-roles/actions',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/policies-in-custom-roles',
    toPath: '/home/account-security/custom-roles/policies',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/example-policies',
    toPath: '/home/account-security/custom-roles/example-policies',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/configuring-private-projects-with-custom-roles',
    toPath: '/home/account-security/custom-roles/private-projects',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/multi-factor-authentication',
    toPath: '/home/account-security/mfa',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/api-access-tokens',
    toPath: '/home/account-security/api-access-tokens',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/managing-sessions',
    toPath: '/home/account-security/managing-sessions',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/single-sign-on',
    toPath: '/home/account-security/sso',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/okta',
    toPath: '/home/account-security/sso/okta',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/onelogin',
    toPath: '/home/account-security/sso/onelogin',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/google-apps',
    toPath: '/home/account-security/sso/google-apps',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/adfs',
    toPath: '/home/account-security/sso/adfs',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/azure',
    toPath: '/home/account-security/sso/azure',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/insights-index',
    toPath: '/home/metrics-insights',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/usage-metrics',
    toPath: '/home/metrics-insights/usage-metrics',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/flag-insights',
    toPath: '/home/metrics-insights/flag-insights',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/running-ab-tests',
    toPath: '/home/experimentation',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-index',
    toPath: '/home/experimentation',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation',
    toPath: '/home/experimentation/',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-create',
    toPath: '/home/experimentation/create',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-manage',
    toPath: '/home/experimentation/managing',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-lifecycle',
    toPath: '/home/experimentation/managing/lifecycle',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-interpret',
    toPath: '/home/experimentation/managing/interpreting',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/experimentation-targeting',
    toPath: '/home/experimentation/managing/populations',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/integrations-index',
    toPath: '/integrations',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/visual-studio-team-services-extension',
    toPath: '/integrations/azure-devops',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/bitbucket-pipelines',
    toPath: '/integrations/bitbucket-pipelines',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/datadog',
    toPath: '/integrations/datadog',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/jira',
    toPath: '/integrations/jira',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/newrelic',
    toPath: '/integrations/newrelic',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/authorizing-oauth-applications',
    toPath: '/integrations/oauth',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/slack-app',
    toPath: '/integrations/slack',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/slack-app-account-management',
    toPath: '/integrations/slack/setting-up',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/managing-flags-with-the-slack-app',
    toPath: '/integrations/slack/managing',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/slack-app-in-slack-channels',
    toPath: '/integrations/slack/notifications',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/turning-targeting-on-off',
    toPath: '/integrations/slack/toggle',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/slack',
    toPath: '/integrations/slack/webhooks',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/terraform',
    toPath: '/integrations/terraform',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/visual-studio-code',
    toPath: '/integrations/vscode',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/webhooks',
    toPath: '/integrations/webhooks',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/git-code-references',
    toPath: '/integrations/git-code-references',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/bitbucket-pipes-coderefs',
    toPath: '/integrations/git-code-references/bitbucket-pipes',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/circleci-orbs',
    toPath: '/integrations/git-code-references/circleci-orbs',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/github-actions',
    toPath: '/integrations/git-code-references/github-actions',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/gitlab-ci',
    toPath: '/integrations/git-code-references/gitlab-ci',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/custom-configuration-via-cli',
    toPath: '/integrations/git-code-references/custom-config',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/data-export',
    toPath: '/integrations/data-export',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/google-cloud-pubsub',
    toPath: '/integrations/data-export/google-pubsub',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/kinesis-destination',
    toPath: '/integrations/data-export/kinesis',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/mparticle-destination',
    toPath: '/integrations/data-export/mparticle',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/segment-destination',
    toPath: '/integrations/data-export/segment',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/data-export-schema-reference',
    toPath: '/integrations/data-export/schema-reference',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/custom-properties',
    toPath: '/home/advanced/custom-properties',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/public-ip-list',
    toPath: '/home/advanced/public-ip-list',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/the-relay-proxy',
    toPath: '/home/advanced/relay-proxy',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/using-the-relay-proxy',
    toPath: '/home/advanced/relay-proxy/using',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/monitoring-relay-proxy',
    toPath: '/home/advanced/relay-proxy/monitoring',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/evaluation-reasons',
    toPath: '/home/advanced/flag-evaluations',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/reading-flags-from-a-file',
    toPath: '/home/advanced/flags-from-files',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/using-a-persistent-feature-store',
    toPath: '/home/advanced/feature-store',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/getting-started-with-launchdarkly-sdks',
    toPath: '/sdk/',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/client-side-and-server-side',
    toPath: '/sdk/concepts/client-side-server-side',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/sdk-versioning-policy',
    toPath: '/sdk/concepts/versioning',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/sdk-contributors-guide',
    toPath: '/sdk/concepts/contributors-guide',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/flag-evaluation-rules',
    toPath: '/sdk/concepts/flag-evaluation-rules',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/dotnet-sdk-reference',
    toPath: '/sdk/server-side/dotnet',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/c-server-sdk-reference',
    toPath: '/sdk/server-side/c-c--',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/go-sdk-reference',
    toPath: '/sdk/server-side/go',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/haskell-server-sdk-reference',
    toPath: '/sdk/server-side/haskell',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/java-sdk-reference',
    toPath: '/sdk/server-side/java',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/node-sdk-reference',
    toPath: '/sdk/server-side/node',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/php-sdk-reference',
    toPath: '/sdk/server-side/php',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/python-sdk-reference',
    toPath: '/sdk/server-side/python',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/ruby-sdk-reference',
    toPath: '/sdk/server-side/ruby',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/android-sdk-reference',
    toPath: '/sdk/client-side/android',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/c-sdk-reference',
    toPath: '/sdk/client-side/c-c--',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/electron-sdk-reference',
    toPath: '/sdk/client-side/electron',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/docs/ios-objc-sdk-reference',
    toPath: '/sdk/client-side/ios-objective-c',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/ios-sdk-reference',
    toPath: '/sdk/client-side/ios-swift',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/js-sdk-reference',
    toPath: '/sdk/client-side',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/default-variations-shown-before-page-is-completely-loaded',
    toPath: '/sdk/client-side/javascript/default-variations',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/js-sdk-requirements-and-polyfills',
    toPath: '/sdk/client-side/javascript/requirements-polyfills',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/node-client-sdk-reference',
    toPath: '/sdk/client-side/node-js',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/react-sdk-reference',
    toPath: '/sdk/client-side/react',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/react-native-sdk-reference',
    toPath: '/sdk/client-side/react-native',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/roku-sdk-reference',
    toPath: '/sdk/client-side/roku',
    isPermanent: true,
    redirectInBrowser: true,
  })
  createRedirect({
    fromPath: '/docs/xamarin-sdk-reference',
    toPath: '/sdk/client-side/xamarin',
    isPermanent: true,
    redirectInBrowser: true,
  })
}

module.exports = createRedirects

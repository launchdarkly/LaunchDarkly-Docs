module.exports = [
  // Redirects within the git-gatsby docs site

  // Redirects from guide rearchitecture project, q2 2022
  {
    fromPath: '/guides/best-practices/migrating-solutions',
    toPath: '/guides/account/migrating-solutions',
  },
  {
    fromPath: '/guides/tutorials/merge-accounts',
    toPath: '/guides/account/merge-accounts',
  },
  {
    fromPath: '/guides/best-practices/user-data',
    toPath: '/guides/account/user-data',
  },
  {
    fromPath: 'guides/best-practices/teams',
    toPath: '/guides/teams-roles/teams',
  },
  {
    fromPath: '/guides/best-practices/custom-roles',
    toPath: '/guides/teams-roles/custom-roles',
  },
  {
    fromPath: '/guides/tutorials/no-access',
    toPath: '/guides/teams-roles/no-access',
  },
  {
    fromPath: '/guides/tutorials/sdk-flag',
    toPath: '/guides/flags/sdk-flag',
  },
  {
    fromPath: '/guides/tutorials/rules-and-targeting',
    toPath: '/guides/flags/rules-and-targeting',
  },
  {
    fromPath: '/guides/best-practices/creating-flags',
    toPath: '/guides/flags/creating-flags',
  },
  {
    fromPath: '/guides/best-practices/flag-hierarchy',
    toPath: '/guides/flags/flag-hierarchy',
  },
  {
    fromPath: '/guides/best-practices/improving-code',
    toPath: '/guides/flags/improving-code',
  },
  {
    fromPath: '/guides/best-practices/technical-debt',
    toPath: '/guides/flags/technical-debt',
  },
  {
    fromPath: '/guides/best-practices/testing-code',
    toPath: '/guides/flags/testing-code',
  },
  {
    fromPath: '/guides/best-practices/entitlements',
    toPath: '/guides/flags/entitlements',
  },
  {
    fromPath: '/guides/platform-specific/triggers-dynatrace',
    toPath: '/guides/integrations/triggers-dynatrace',
  },
  {
    fromPath: '/guides/platform-specific/static-sites',
    toPath: '/guides/flags/static-sites',
  },
  {
    fromPath: '/guides/platform-specific/cloudflare-workers',
    toPath: '/guides/infrastructure/cloudflare-workers',
  },
  {
    fromPath: '/guides/best-practices/integrations',
    toPath: '/guides/integrations/using-integrations',
  },
  {
    fromPath: '/guides/best-practices/integrations-use-cases',
    toPath: '/guides/integrations/integrations-use-cases',
  },
  {
    fromPath: '/guides/best-practices/deployment-strategies',
    toPath: '/guides/infrastructure/deployment-strategies',
  },
  {
    fromPath: '/guides/best-practices/infrastructure-migration',
    toPath: '/guides/infrastructure/infrastructure-migration',
  },
  {
    fromPath: '/guides/best-practices/serverless',
    toPath: '/guides/infrastructure/serverless',
  },
  {
    fromPath: '/guides/platform-specific/aws-lambda',
    toPath: '/guides/infrastructure/aws-lambda',
  },
  {
    fromPath: '/guides/platform-specific/nextjs',
    toPath: '/guides/infrastructure/nextjs',
  },
  {
    fromPath: '/guides/platform-specific/svelte',
    toPath: '/guides/infrastructure/svelte',
  },
  {
    fromPath: '/guides/platform-specific/unit-tests',
    toPath: '/guides/infrastructure/unit-tests',
  },
  {
    fromPath: '/guides/platform-specific/mobile',
    toPath: '/guides/sdk/mobile',
  },
  {
    fromPath: '/guides/tutorials/unsupported-sdk',
    toPath: '/guides/sdk/unsupported-sdk',
  },
  {
    fromPath: '/guides/platform-specific/haproxy',
    toPath: '/guides/sdk/haproxy',
  },
  {
    fromPath: '/guides/platform-specific/nginx',
    toPath: '/guides/sdk/nginx',
  },
  {
    fromPath: '/guides/tutorials/rest-api',
    toPath: '/guides/api/rest-api',
  },
  {
    fromPath: '/guides/best-practices/sdk-wrappers',
    toPath: '/guides/sdk/sdk-wrappers',
  },
  {
    fromPath: 'guides/tutorials/experimentation',
    toPath: '/guides/experimentation/experimentation',
  },
  {
    fromPath: '/guides/best-practices/bayesian',
    toPath: '/guides/experimentation/bayesian',
  },
  // Redirects within docs site
  {
    fromPath: '/home/experimentation/',
    toPath: '/home/about-experimentation',
  },
  {
    fromPath: '/home/creating-experiments/allocation#prerequisites',
    toPath: '/home/about-experimentation#prerequisites',
  },
  {
    fromPath: '/home/experimentation/creating-metrics',
    toPath: '/home/creating-experiments/metrics',
  },
  {
    fromPath: '/guides/tutorials/first-flag',
    toPath: '/guides/tutorials/sdk-flag',
  },
  {
    fromPath: '/sdk/concepts/flags-from-files',
    toPath: '/sdk/features/flags-from-files',
  },
  {
    fromPath: '/home/advanced/api-access-tokens',
    toPath: '/home/account-security/api-access-tokens',
  },
  {
    fromPath: '/integrations/triggers',
    toPath: '/home/feature-workflows/triggers',
  },
  {
    fromPath: '/integrations/webhooks',
    toPath: '/home/connecting/webhooks',
  },
  {
    fromPath: '/home/advanced/relay-proxy/automatic-configuration',
    toPath: '/home/advanced/relay-proxy-enterprise/automatic-configuration',
  },
  {
    fromPath: '/home/advanced/relay-proxy/offline',
    toPath: '/home/advanced/relay-proxy-enterprise/offline',
  },
  {
    fromPath: '/home/managing-flags',
    toPath: '/home/flags',
  },
  {
    fromPath: '/home/managing-flags/dashboard',
    toPath: '/home/organize/dashboard',
  },
  {
    fromPath: '/home/managing-flags/flag-toggle',
    toPath: '/home/getting-started/toggle',
  },
  {
    fromPath: '/home/managing-flags/flag-compare-copy',
    toPath: '/home/code/flag-compare-copy',
  },
  {
    fromPath: '/home/managing-flags/flag-variations',
    toPath: '/home/flags/variations',
  },
  {
    fromPath: '/home/managing-flags/flag-archive-delete',
    toPath: '/home/code/flag-archive',
  },
  {
    fromPath: '/home/managing-flags/feature-workflows',
    toPath: '/home/feature-workflows',
  },
  {
    fromPath: '/home/managing-flags/feature-workflows/approvals',
    toPath: '/home/feature-workflows/approvals',
  },
  {
    fromPath: '/home/managing-flags/feature-workflows/environment-approvals',
    toPath: '/home/feature-workflows/environment-approvals',
  },
  {
    fromPath: '/home/managing-flags/feature-workflows/scheduled-changes',
    toPath: '/home/feature-workflows/scheduled-changes',
  },
  {
    fromPath: '/home/managing-flags/projects',
    toPath: '/home/organize/projects',
  },
  {
    fromPath: '/home/managing-flags/environments',
    toPath: '/home/organize/environments',
  },
  {
    fromPath: '/home/managing-flags/targeting-users',
    toPath: '/home/flags/targeting-users',
  },
  {
    fromPath: '/home/managing-flags/bulk-user-targeting',
    toPath: '/home/flags/bulk-targeting',
  },
  {
    fromPath: '/home/managing-flags/flag-settings',
    toPath: '/home/flags/settings',
  },
  {
    fromPath: '/home/managing-flags/flag-prerequisites',
    toPath: '/home/flags/prerequisites',
  },
  {
    fromPath: '/home/managing-flags/audit-log-history',
    toPath: '/home/flags/audit-log-history',
  },
  {
    fromPath: '/home/managing-flags/debugger',
    toPath: '/home/flags/debugger',
  },
  {
    fromPath: '/home/managing-users',
    toPath: '/home/users',
  },
  {
    fromPath: '/home/managing-users/users-dashboard',
    toPath: '/home/users/users-dashboard',
  },
  {
    fromPath: '/home/managing-users/user-attributes',
    toPath: '/home/users/attributes',
  },
  {
    fromPath: '/home/managing-users/anonymous-users',
    toPath: '/home/users/anonymous-users',
  },
  {
    fromPath: '/home/managing-users/synced-segments',
    toPath: '/home/users/synced-segments',
  },
  {
    fromPath: '/home/account-security/managing-your-team',
    toPath: '/home/team/managing',
  },
  {
    fromPath: '/home/account-security/account-owners',
    toPath: '/home/team/account-owners',
  },
  {
    fromPath: '/home/account-security/custom-roles',
    toPath: '/home/team/custom-roles',
  },
  {
    fromPath: '/home/account-security/custom-roles/concepts',
    toPath: '/home/team/role-concepts',
  },
  {
    fromPath: '/home/account-security/custom-roles/create',
    toPath: '/home/team/role-create',
  },
  {
    fromPath: '/home/account-security/custom-roles/actions',
    toPath: '/home/team/role-actions',
  },
  {
    fromPath: '/home/account-security/custom-roles/resources',
    toPath: '/home/team/role-resources',
  },
  {
    fromPath: '/home/account-security/custom-roles/policies',
    toPath: '/home/team/role-policies',
  },
  {
    fromPath: '/home/account-security/custom-roles/tags',
    toPath: '/home/team/role-tags',
  },
  {
    fromPath: '/home/account-security/custom-roles/example-policies',
    toPath: '/home/team/example-policies',
  },
  {
    fromPath: '/home/account-security/custom-roles/private-projects',
    toPath: '/home/organize/private-projects',
  },
  {
    fromPath: '/home/account-security/managing-sessions',
    toPath: '/home/account-security/sessions',
  },
  {
    fromPath: '/home/account-security/sso/okta',
    toPath: '/home/account-security/okta',
  },
  {
    fromPath: '/home/account-security/sso/onelogin',
    toPath: '/home/account-security/onelogin',
  },
  {
    fromPath: '/home/account-security/sso/google-apps',
    toPath: '/home/account-security/google',
  },
  {
    fromPath: '/home/account-security/sso/adfs',
    toPath: '/home/account-security/adfs',
  },
  {
    fromPath: '/home/account-security/sso/azure',
    toPath: '/home/account-security/azure',
  },
  {
    fromPath: '/home/metrics-and-insights',
    toPath: '/home/billing',
  },
  {
    fromPath: '/home/metrics-insights/flag-insights',
    toPath: '/home/flags/insights',
  },
  {
    fromPath: '/home/experimentation/managing/lifecycle',
    toPath: '/home/analyzing-experiments/managing',
  },
  {
    fromPath: '/home/experimentation/managing/interpreting',
    toPath: '/home/analyzing-experiments',
  },
  {
    fromPath: '/home/experimentation/managing/populations',
    toPath: '/home/creating-experiments/allocation',
  },
  {
    fromPath: '/home/experimentation/managing/segment',
    toPath: '/home/creating-experiments/segment',
  },
  {
    fromPath: '/home/advanced/relay-proxy',
    toPath: '/home/relay-proxy',
  },
  {
    fromPath: '/home/advanced/relay-proxy/deploying',
    toPath: '/home/relay-proxy/deploying',
  },
  {
    fromPath: '/home/advanced/relay-proxy/using',
    toPath: '/home/relay-proxy/using',
  },
  {
    fromPath: '/home/advanced/relay-proxy/monitoring',
    toPath: '/home/relay-proxy/monitoring',
  },
  {
    fromPath: '/home/advanced/relay-proxy/performance',
    toPath: '/home/relay-proxy/performance',
  },
  {
    fromPath: '/home/advanced/relay-proxy-enterprise',
    toPath: '/home/relay-proxy/enterprise',
  },
  {
    fromPath: '/home/advanced/relay-proxy-enterprise/automatic-configuration',
    toPath: '/home/relay-proxy/automatic-configuration',
  },
  {
    fromPath: '/home/advanced/relay-proxy-enterprise/offline',
    toPath: '/home/relay-proxy/offline',
  },
  {
    fromPath: '/home/advanced/custom-properties',
    toPath: '/home/connecting/custom-properties',
  },
  {
    fromPath: '/integrations/oauth',
    toPath: '/home/connecting/oauth',
  },
  {
    fromPath: '/integrations/data-export/',
    toPath: '/home/data-export',
  },
  {
    fromPath: '/integrations/data-export/event-hub',
    toPath: '/home/data-export/event-hub',
  },
  {
    fromPath: '/integrations/data-export/google-pubsub',
    toPath: '/home/data-export/google-pubsub',
  },
  {
    fromPath: '/integrations/data-export',
    toPath: '/home/data-export',
  },
  {
    fromPath: '/integrations/data-export/kinesis',
    toPath: '/home/data-export/kinesis',
  },
  {
    fromPath: '/integrations/data-export/mparticle/mparticle-schema-reference',
    toPath: '/home/data-export/mparticle-schema-reference',
  },
  {
    fromPath: '/integrations/data-export/mparticle',
    toPath: '/home/data-export/mparticle',
  },
  {
    fromPath: '/integrations/data-export/schema-reference',
    toPath: '/home/data-export/schema-reference',
  },
  {
    fromPath: '/integrations/segment/segment-schema-reference',
    toPath: '/home/data-export/segment-schema-reference',
  },
  {
    fromPath: '/integrations/data-export/segment',
    toPath: '/home/data-export/segment',
  },
  {
    fromPath: '/integrations/code-references',
    toPath: '/home/code/code-references',
  },
  {
    fromPath: '/integrations/code-references/gitlab-ci',
    toPath: '/home/code/gitlab',
  },
  {
    fromPath: '/integrations/code-references/github-actions',
    toPath: '/home/code/github-actions',
  },
  {
    fromPath: '/integrations/code-references/custom-config',
    toPath: '/home/code/custom-config',
  },
  {
    fromPath: '/integrations/code-references/circleci-orbs',
    toPath: '/home/code/circleci',
  },
  {
    fromPath: '/integrations/code-references/bitbucket-pipes',
    toPath: '/home/code/bitbucket',
  },

  // Redirects from renaming "teams" category to "members"
  {
    fromPath: '/home/team/role-actions',
    toPath: '/home/members/role-actions',
  },
  {
    fromPath: '/home/team/role-policies',
    toPath: '/home/members/role-policies',
  },
  {
    fromPath: '/home/team/role-tags',
    toPath: '/home/members/role-tags',
  },
  {
    fromPath: '/home/team/role-resources',
    toPath: '/home/members/role-resources',
  },
  {
    fromPath: '/home/team/example-policies',
    toPath: '/home/members/example-policies',
  },
  {
    fromPath: '/home/team/role-create',
    toPath: '/home/members/role-create',
  },
  {
    fromPath: '/home/team/role-concepts',
    toPath: '/home/members/role-concepts',
  },
  {
    fromPath: '/home/team/custom-roles',
    toPath: '/home/members/custom-roles',
  },
  {
    fromPath: '/home/team/account-owners',
    toPath: '/home/members/account-owners',
  },
  {
    fromPath: '/home/team/built-in-roles',
    toPath: '/home/members/built-in-roles',
  },
  {
    fromPath: '/home/team/managing',
    toPath: '/home/members/managing',
  },
  {
    fromPath: '/home/team/',
    toPath: '/home/members',
  },
  {
    fromPath: '/home/getting-started/your-team',
    toPath: '/home/getting-started/your-account',
  },

  // Redirects from the readme-hosted docs site
  {
    fromPath: '/',
    toPath: '/home',
  },
  {
    fromPath: '/docs',
    toPath: '/home/getting-started',
  },
  {
    fromPath: '/docs/home',
    toPath: '/home/getting-started',
  },
  {
    fromPath: '/docs/getting-started',
    toPath: '/home/getting-started',
  },
  {
    fromPath: '/docs/integrations',
    toPath: '/integrations',
  },
  {
    fromPath: '/docs/new-members',
    toPath: '/home/account-security/managing-your-team',
  },
  {
    fromPath: '/docs/creating-a-feature-flag',
    toPath: '/home/getting-started/feature-flags',
  },
  {
    fromPath: '/docs/managing-a-feature-flag',
    toPath: '/home/flags',
  },
  {
    fromPath: '/docs/flags-index',
    toPath: '/home/managing-flags',
  },
  {
    fromPath: '/docs/the-dashboard',
    toPath: '/home/managing-flags/dashboard',
  },
  {
    fromPath: '/docs/the-kill-switch',
    toPath: '/home/managing-flags/dashboard',
  },
  {
    fromPath: '/docs/compare-and-copy-flag-settings',
    toPath: '/home/managing-flags/flag-compare-copy',
  },
  {
    fromPath: '/docs/managing-variations',
    toPath: '/home/managing-flags/flag-variations',
  },
  {
    fromPath: '/docs/flag-archive-delete',
    toPath: '/home/code/flag-archive',
  },
  {
    fromPath: '/docs/projects',
    toPath: '/home/managing-flags/projects',
  },
  {
    fromPath: '/docs/environments',
    toPath: '/home/managing-flags/environments',
  },
  {
    fromPath: '/docs/targeting-users',
    toPath: '/home/managing-flags/targeting-users',
  },
  {
    fromPath: '/docs/bulk-user-targeting',
    toPath: '/home/managing-flags/bulk-user-targeting',
  },
  {
    fromPath: '/docs/other-flag-settings',
    toPath: '/home/managing-flags/flag-settings',
  },
  {
    fromPath: '/docs/prerequisites',
    toPath: '/home/managing-flags/flag-prerequisites',
  },
  {
    fromPath: '/docs/the-audit-log',
    toPath: '/home/managing-flags/audit-log-history',
  },
  {
    fromPath: '/docs/debugger',
    toPath: '/home/managing-flags/debugger',
  },
  {
    fromPath: '/docs/users-index',
    toPath: '/home/managing-users',
  },
  {
    fromPath: '/docs/the-user-dashboard',
    toPath: '/home/managing-users/users-dashboard',
  },
  {
    fromPath: '/docs/private-user-attributes',
    toPath: '/home/managing-users/user-attributes',
  },
  {
    fromPath: '/docs/segmenting-users',
    toPath: '/home/users/segments',
  },
  {
    fromPath: '/home/managing-users/user-segments',
    toPath: '/home/users/segments',
  },
  {
    fromPath: '/docs/anonymous-users',
    toPath: '/home/users/anonymous-users',
  },
  {
    fromPath: '/docs/security-index',
    toPath: '/home/account-security',
  },
  {
    fromPath: '/docs/teams',
    toPath: '/home/account-security/managing-your-team',
  },
  {
    fromPath: '/docs/custom-roles',
    toPath: '/home/account-security/custom-roles',
  },
  {
    fromPath: '/docs/configuring-custom-roles',
    toPath: '/home/account-security/custom-roles/create',
  },
  {
    fromPath: '/docs/resources-in-custom-roles',
    toPath: '/home/account-security/custom-roles/resources',
  },
  {
    fromPath: '/docs/tags-in-custom-roles',
    toPath: '/home/account-security/custom-roles/tags',
  },
  {
    fromPath: '/docs/actions-in-custom-roles',
    toPath: '/home/account-security/custom-roles/actions',
  },
  {
    fromPath: '/docs/policies-in-custom-roles',
    toPath: '/home/account-security/custom-roles/policies',
  },
  {
    fromPath: '/docs/example-policies',
    toPath: '/home/account-security/custom-roles/example-policies',
  },
  {
    fromPath: '/docs/configuring-private-projects-with-custom-roles',
    toPath: '/home/account-security/custom-roles/private-projects',
  },
  {
    fromPath: '/docs/multi-factor-authentication',
    toPath: '/home/account-security/mfa',
  },
  {
    fromPath: '/docs/api-access-tokens',
    toPath: '/home/account-security/api-access-tokens',
  },
  {
    fromPath: '/docs/managing-sessions',
    toPath: '/home/account-security/managing-sessions',
  },
  {
    fromPath: '/docs/single-sign-on',
    toPath: '/home/account-security/sso',
  },
  {
    fromPath: '/docs/okta',
    toPath: '/home/account-security/sso/okta',
  },
  {
    fromPath: '/docs/onelogin',
    toPath: '/home/account-security/sso/onelogin',
  },
  {
    fromPath: '/docs/google-apps',
    toPath: '/home/account-security/sso/google-apps',
  },
  {
    fromPath: '/docs/adfs',
    toPath: '/home/account-security/sso/adfs',
  },
  {
    fromPath: '/docs/azure',
    toPath: '/home/account-security/sso/azure',
  },
  {
    fromPath: '/docs/insights-index',
    toPath: '/home/flags/insights',
  },
  {
    fromPath: '/docs/usage-metrics',
    toPath: '/home/billing/usage-metrics',
  },
  {
    fromPath: '/docs/flag-insights',
    toPath: '/home/metrics-insights/flag-insights',
  },
  {
    fromPath: '/docs/running-ab-tests',
    toPath: '/home/about-experimentation',
  },
  {
    fromPath: '/docs/running-an-ab-test',
    toPath: '/home/about-experimentation',
  },
  {
    fromPath: '/docs/experimentation-index',
    toPath: '/home/about-experimentation',
  },
  {
    fromPath: '/docs/experimentation',
    toPath: '/home/about-experimentation',
  },
  {
    fromPath: '/docs/experimentation-create',
    toPath: '/home/creating-experiments',
  },
  {
    fromPath: '/docs/experimentation-manage',
    toPath: '/home/analyzing-experiments/managing',
  },
  {
    fromPath: '/docs/experimentation-lifecycle',
    toPath: '/home/analyzing-experiments/managing',
  },
  {
    fromPath: '/docs/experimentation-interpret',
    toPath: '/home/analyzing-experiments',
  },
  {
    fromPath: '/docs/experimentation-targeting',
    toPath: '/home/creating-experiments/allocation',
  },
  {
    fromPath: '/docs/integrations-index',
    toPath: '/integrations',
  },
  {
    fromPath: '/docs/visual-studio-team-services-extension',
    toPath: '/integrations/azure-devops',
  },
  {
    fromPath: '/docs/bitbucket-pipelines',
    toPath: '/integrations/bitbucket-pipelines',
  },
  {
    fromPath: '/docs/datadog',
    toPath: '/integrations/datadog',
  },
  {
    fromPath: '/docs/jira',
    toPath: '/integrations/jira',
  },
  {
    fromPath: '/docs/microsoft-teams',
    toPath: '/integrations/microsoft-teams',
  },
  {
    fromPath: '/docs/newrelic',
    toPath: '/integrations/new-relic',
  },
  {
    fromPath: '/docs/authorizing-oauth-applications',
    toPath: '/integrations/oauth',
  },
  {
    fromPath: '/docs/slack-app',
    toPath: '/integrations/slack',
  },
  {
    fromPath: '/docs/slack-app-account-management',
    toPath: '/integrations/slack/setting-up',
  },
  {
    fromPath: '/docs/managing-flags-with-the-slack-app',
    toPath: '/integrations/slack/managing',
  },
  {
    fromPath: '/docs/slack-app-in-slack-channels',
    toPath: '/integrations/slack/notifications',
  },
  {
    fromPath: '/docs/turning-targeting-on-off',
    toPath: '/integrations/slack/toggle',
  },
  {
    fromPath: '/docs/slack',
    toPath: '/integrations/slack/webhooks',
  },
  {
    fromPath: '/docs/terraform',
    toPath: '/integrations/terraform',
  },
  {
    fromPath: '/docs/visual-studio-code',
    toPath: '/integrations/vscode',
  },
  {
    fromPath: '/docs/webhooks',
    toPath: '/home/connecting/webhooks',
  },
  {
    fromPath: '/integrations/git-code-references',
    toPath: '/integrations/code-references',
  },
  {
    fromPath: '/docs/git-code-references',
    toPath: '/integrations/code-references',
  },
  {
    fromPath: '/docs/bitbucket-pipes-coderefs',
    toPath: '/integrations/code-references/bitbucket-pipes',
  },
  {
    fromPath: '/docs/circleci-orbs',
    toPath: '/integrations/code-references/circleci-orbs',
  },
  {
    fromPath: '/docs/github-actions',
    toPath: '/integrations/code-references/github-actions',
  },
  {
    fromPath: '/docs/gitlab-ci',
    toPath: '/integrations/code-references/gitlab-ci',
  },
  {
    fromPath: '/docs/custom-configuration-via-cli',
    toPath: '/integrations/code-references/custom-config',
  },
  {
    fromPath: '/docs/data-export',
    toPath: '/integrations/data-export',
  },
  {
    fromPath: '/docs/google-cloud-pubsub',
    toPath: '/integrations/data-export/google-pubsub',
  },
  {
    fromPath: '/docs/kinesis-destination',
    toPath: '/integrations/data-export/kinesis',
  },
  {
    fromPath: '/docs/mparticle-destination',
    toPath: '/integrations/data-export/mparticle',
  },
  {
    fromPath: '/docs/segment-destination',
    toPath: '/integrations/data-export/segment',
  },
  {
    fromPath: '/docs/data-export-schema-reference',
    toPath: '/integrations/data-export/schema-reference',
  },
  {
    fromPath: '/integrations/gatsby',
    toPath: '/sdk/client-side/react/gatsby',
  },
  {
    fromPath: '/docs/custom-properties',
    toPath: '/home/advanced/custom-properties',
  },
  {
    fromPath: '/docs/public-ip-list',
    toPath: '/home/advanced/public-ip-list',
  },
  {
    fromPath: '/docs/the-relay-proxy',
    toPath: '/home/advanced/relay-proxy',
  },
  {
    fromPath: '/docs/using-the-relay-proxy',
    toPath: '/home/advanced/relay-proxy/using',
  },
  {
    fromPath: '/docs/monitoring-relay-proxy',
    toPath: '/home/advanced/relay-proxy/monitoring',
  },
  {
    fromPath: '/docs/evaluation-reasons',
    toPath: '/sdk/concepts/evaluation-reasons',
  },
  {
    fromPath: '/docs/reading-flags-from-a-file',
    toPath: '/sdk/concepts/flags-from-files',
  },
  {
    fromPath: '/docs/using-a-persistent-feature-store',
    toPath: '/sdk/concepts/feature-store',
  },
  {
    fromPath: '/home/advanced/flag-evaluations',
    toPath: '/sdk/concepts/evaluation-reasons',
  },
  {
    fromPath: '/sdk-concepts/flag-evaluations',
    toPath: '/sdk/concepts/evaluation-reasons',
  },
  {
    fromPath: '/home/advanced/flags-from-files',
    toPath: '/sdk/concepts/flags-from-files',
  },
  {
    fromPath: '/home/advanced/feature-store',
    toPath: '/sdk/concepts/data-stores',
  },
  {
    fromPath: '/docs/getting-started-with-launchdarkly-sdks',
    toPath: '/sdk',
  },
  {
    fromPath: '/docs/sdk-setup',
    toPath: '/sdk',
  },
  {
    fromPath: '/docs/client-side-and-server-side',
    toPath: '/sdk/concepts/client-side-server-side',
  },
  {
    fromPath: '/docs/sdk-versioning-policy',
    toPath: '/sdk/concepts/versioning',
  },
  {
    fromPath: '/docs/sdk-contributors-guide',
    toPath: '/sdk/concepts/contributors-guide',
  },
  {
    fromPath: '/docs/flag-evaluation-rules',
    toPath: '/sdk/concepts/flag-evaluation-rules',
  },
  {
    fromPath: '/docs/dotnet-sdk-reference',
    toPath: '/sdk/server-side/dotnet',
  },
  {
    fromPath: '/docs/c-server-sdk-reference',
    toPath: '/sdk/server-side/c-c--',
  },
  {
    fromPath: '/docs/erlang-sdk-reference',
    toPath: '/sdk/server-side/erlang',
  },
  {
    fromPath: '/docs/go-sdk-reference',
    toPath: '/sdk/server-side/go',
  },
  {
    fromPath: '/docs/haskell-server-sdk-reference',
    toPath: '/sdk/server-side/haskell',
  },
  {
    fromPath: '/docs/java-sdk-reference',
    toPath: '/sdk/server-side/java',
  },
  {
    fromPath: '/docs/node-sdk-reference',
    toPath: '/sdk/server-side/node-js',
  },
  {
    fromPath: '/docs/php-sdk-reference',
    toPath: '/sdk/server-side/php',
  },
  {
    fromPath: '/docs/python-sdk-reference',
    toPath: '/sdk/server-side/python',
  },
  {
    fromPath: '/docs/ruby-sdk-reference',
    toPath: '/sdk/server-side/ruby',
  },
  {
    fromPath: '/docs/android-sdk-reference',
    toPath: '/sdk/client-side/android',
  },
  {
    fromPath: '/docs/c-sdk-reference',
    toPath: '/sdk/client-side/c-c--',
  },
  {
    fromPath: '/docs/electron-sdk-reference',
    toPath: '/sdk/client-side/electron',
  },
  {
    fromPath: '/docs/ios-objc-sdk-reference',
    toPath: '/sdk/client-side/ios',
  },
  {
    fromPath: '/sdk/client-side/ios-objective-c',
    toPath: '/sdk/client-side/ios',
  },
  {
    fromPath: '/docs/ios-sdk-reference',
    toPath: '/sdk/client-side/ios',
  },
  {
    fromPath: '/sdk/client-side/ios-swift',
    toPath: '/sdk/client-side/ios',
  },
  {
    fromPath: '/docs/js-sdk-reference',
    toPath: '/sdk/client-side/javascript',
  },
  {
    fromPath: '/docs/default-variations-shown-before-page-is-completely-loaded',
    toPath: '/sdk/client-side/javascript/default-variations',
  },
  {
    fromPath: '/docs/js-sdk-requirements-and-polyfills',
    toPath: '/sdk/client-side/javascript/requirements-polyfills',
  },
  {
    fromPath: '/docs/node-client-sdk-reference',
    toPath: '/sdk/client-side/node-js',
  },
  {
    fromPath: '/docs/react-sdk-reference',
    toPath: '/sdk/client-side/react',
  },
  {
    fromPath: '/docs/react-native-sdk-reference',
    toPath: '/sdk/client-side/react/react-native',
  },
  {
    fromPath: '/sdk/client-side/react-native',
    toPath: '/sdk/client-side/react/react-native',
  },
  {
    fromPath: '/sdk/client-side/xamarin',
    toPath: '/sdk/client-side/dotnet',
  },
  {
    fromPath: '/docs/roku-sdk-reference',
    toPath: '/sdk/client-side/roku',
  },
  {
    fromPath: '/docs/xamarin-sdk-reference',
    toPath: '/sdk/client-side/dotnet',
  },
  {
    fromPath: '/sdk/server-side/lua/nginx',
    toPath: '/guides/platform-specific/nginx',
  },
  {
    fromPath: '/sdk/concepts/feature-store',
    toPath: '/sdk/concepts/data-stores',
  },
  {
    fromPath: '/sdk/concepts/feature-store/consul',
    toPath: '/sdk/features/storing-data/consul',
  },
  {
    fromPath: '/sdk/concepts/feature-store/redis',
    toPath: '/sdk/features/storing-data/redis',
  },
  {
    fromPath: '/sdk/concepts/feature-store/dynamodb',
    toPath: '/sdk/features/storing-data/dynamodb',
  },
  {
    fromPath: '/sdk/features/database-integrations',
    toPath: '/sdk/features/storing-data',
  },
  {
    fromPath: '/sdk/features/variation',
    toPath: '/sdk/features/evaluating',
  },
  {
    fromPath: '/sdk/features/variationdetail',
    toPath: '/sdk/features/evaluation-reasons',
  },
  {
    fromPath: '/sdk/features/track',
    toPath: '/sdk/features/events',
  },
  {
    fromPath: '/sdk/server-side/lua/haproxy',
    toPath: '/guides/platform-specific/haproxy',
  },
  {
    fromPath: '/guides/tutorials/nginx',
    toPath: '/guides/platform-specific/nginx',
  },
  {
    fromPath: '/guides/best-practices/terraform',
    toPath: '/guides/platform-specific/terraform',
  },
  {
    fromPath: '/guides/best-practices/using-feature-flags-on-static-sites',
    toPath: '/guides/platform-specific/static-sites',
  },
  {
    fromPath: '/home/experimentation/populations',
    toPath: '/home/creating-experiments/allocation',
  },
  {
    fromPath: '/home/code/flag-overview',
    toPath: '/home/code/flag-compare-copy',
  },
  {
    fromPath: '/home/organize/flag-compare-copy',
    toPath: '/home/code/flag-compare-copy',
  },
  {
    fromPath: '/sdk/client-side/javascript/default-variations',
    toPath: '/sdk/client-side/javascript/default-values',
  },
  {
    fromPath: '/home/experimentation/interpreting',
    toPath: '/home/analyzing-experiments',
  },
  {
    fromPath: '/guides/best-practices/experimentation',
    toPath: '/home/creating-experiments',
  },
  {
    fromPath: '/home/experimentation/lifecycle',
    toPath: '/home/analyzing-experiments/managing',
  },
  {
    fromPath: '/home/experimentation',
    toPath: '/home/about-experimentation',
  },
  {
    fromPath: '/home/experimentation/events',
    toPath: '/home/about-experimentation/events',
  },
  {
    fromPath: '/home/experimentation/analyzing',
    toPath: '/home/analyzing-experiments',
  },
  {
    fromPath: '/home/experimentation/managing',
    toPath: '/home/analyzing-experiments/managing',
  },
  {
    fromPath: '/home/experimentation/create',
    toPath: '/home/creating-experiments',
  },
  {
    fromPath: '/home/experimentation/allocation',
    toPath: '/home/creating-experiments/allocation',
  },
  {
    fromPath: '/home/experimentation/segment',
    toPath: '/home/creating-experiments/segment',
  },
  {
    fromPath: '/home/experimentation/metrics',
    toPath: '/home/creating-experiments/metrics',
  },
  {
    fromPath: '/home/experimentation/metrics/click',
    toPath: '/home/creating-experiments/metrics/click',
  },
  {
    fromPath: '/home/experimentation/metrics/custom-conversion',
    toPath: '/home/creating-experiments/metrics/custom-conversion',
  },
  {
    fromPath: '/home/experimentation/metrics/custom-numeric',
    toPath: '/home/creating-experiments/metrics/custom-numeric',
  },
  {
    fromPath: '/home/experimentation/metrics/page-view',
    toPath: '/home/creating-experiments/metrics/page-view',
  },
]

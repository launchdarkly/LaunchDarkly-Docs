module.exports = [
  // Redirects for Accelerate
  {
    fromPath: '/accelerate-eap/home/about-accelerate/',
    toPath: '/home/accelerate',
  },
  // Redirects for users-to-contexts
  {
    fromPath: '/home/flags/debugger/',
    toPath: '/home/flags/live-events',
  },
  {
    fromPath: '/home/flags/targeting-users/',
    toPath: '/home/flags/targeting',
  },
  {
    fromPath: '/home/managing-flags/targeting-users/',
    toPath: '/home/flags/targeting',
  },
  {
    fromPath: '/home/users/',
    toPath: '/home/contexts',
  },
  {
    fromPath: '/home/users/users-list/',
    toPath: '/home/contexts/contexts-list',
  },
  {
    fromPath: '/home/users/users-dashboard/',
    toPath: '/home/contexts/contexts-list',
  },
  {
    fromPath: '/home/managing-users/users-dashboard/',
    toPath: '/home/contexts/contexts-list',
  },
  {
    fromPath: '/home/users/attributes/',
    toPath: '/home/contexts/attributes',
  },
  {
    fromPath: '/home/users/user-attributes/',
    toPath: '/home/contexts/attributes',
  },
  {
    fromPath: '/home/managing-users/user-attributes/',
    toPath: '/home/contexts/attributes',
  },
  {
    fromPath: '/home/users/built-in-attributes/',
    toPath: '/home/contexts/built-in-attributes',
  },
  {
    fromPath: '/home/users/custom-attributes/',
    toPath: '/home/contexts/custom-attributes',
  },
  {
    fromPath: '/home/users/segments/',
    toPath: '/home/contexts/segments',
  },
  {
    fromPath: '/home/users/user-segments/',
    toPath: '/home/contexts/segments',
  },
  {
    fromPath: '/home/users/standard-segments/',
    toPath: '/home/contexts/standard-segments',
  },
  {
    fromPath: '/home/users/big-segments/',
    toPath: '/home/contexts/big-segments',
  },
  {
    fromPath: '/home/users/bulk-edit-segments/',
    toPath: '/home/contexts/bulk-edit-segments',
  },
  {
    fromPath: '/home/users/synced-segments/',
    toPath: '/home/contexts/synced-segments',
  },
  {
    fromPath: '/home/managing-users/synced-segments/',
    toPath: '/home/contexts/synced-segments',
  },
  {
    fromPath: '/sdk/features/user-config/',
    toPath: '/sdk/features/user-context-config',
  },
  {
    fromPath: '/home/users/anonymous-users/',
    toPath: '/home/contexts/anonymous-contexts',
  },
  {
    fromPath: '/home/managing-users/anonymous-users/',
    toPath: '/home/contexts/anonymous-contexts',
  },
  // Redirects for Experimentation IA restructure
  {
    fromPath: '/home/experimentation/',
    toPath: '/home/about-experimentation',
  },
  {
    fromPath: '/home/experimentation/events/',
    toPath: '/home/about-experimentation/events',
  },
  {
    fromPath: '/home/experimentation/create/',
    toPath: '/home/creating-experiments',
  },
  {
    fromPath: '/home/experimentation/managing/populations/',
    toPath: '/home/creating-experiments/allocation',
  },
  {
    fromPath: '/home/experimentation/populations/',
    toPath: '/home/creating-experiments/allocation',
  },
  {
    fromPath: '/home/experimentation/allocation/',
    toPath: '/home/creating-experiments/allocation',
  },
  {
    fromPath: '/home/experimentation/managing/segment/',
    toPath: '/home/creating-experiments/segment',
  },
  {
    fromPath: '/home/experimentation/creating-metrics/',
    toPath: '/home/creating-experiments/metrics',
  },
  {
    fromPath: '/home/experimentation/metrics/',
    toPath: '/home/creating-experiments/metrics',
  },
  {
    fromPath: '/home/about-experimentation/import-metric-events/',
    toPath: '/home/creating-experiments/import-metric-events',
  },
  {
    fromPath: '/home/experimentation/segment/',
    toPath: '/home/creating-experiments/segment',
  },
  {
    fromPath: '/home/experimentation/metrics/click/',
    toPath: '/home/creating-experiments/metrics/click',
  },
  {
    fromPath: '/home/experimentation/metrics/custom-conversion/',
    toPath: '/home/creating-experiments/metrics/custom-conversion',
  },
  {
    fromPath: '/home/experimentation/metrics/custom-numeric/',
    toPath: '/home/creating-experiments/metrics/custom-numeric',
  },
  {
    fromPath: '/home/experimentation/metrics/page-view/',
    toPath: '/home/creating-experiments/metrics/page-view',
  },
  {
    fromPath: '/home/experimentation/managing/interpreting/',
    toPath: '/home/analyzing-experiments',
  },
  {
    fromPath: '/home/experimentation/analyzing/',
    toPath: '/home/analyzing-experiments',
  },
  {
    fromPath: '/home/experimentation/interpreting/',
    toPath: '/home/analyzing-experiments/results',
  },
  {
    fromPath: '/home/experimentation/managing/lifecycle/',
    toPath: '/home/analyzing-experiments/managing',
  },
  {
    fromPath: '/home/experimentation/lifecycle/',
    toPath: '/home/analyzing-experiments/managing',
  },
  {
    fromPath: '/home/experimentation/managing/',
    toPath: '/home/analyzing-experiments/managing',
  },
  // Removal of metrics section
  {
    fromPath: '/home/metrics-and-insights/',
    toPath: '/home/billing',
  },
  {
    fromPath: '/home/metrics-insights/flag-insights/',
    toPath: '/home/flags/insights',
  },
  // Redirects in SDK section
  {
    fromPath: '/sdk/concepts/flags-from-files/',
    toPath: '/sdk/features/flags-from-files',
  },
  {
    fromPath: '/sdk/client-side/ios-objective-c/',
    toPath: '/sdk/client-side/ios',
  },
  {
    fromPath: '/sdk/client-side/ios-swift/',
    toPath: '/sdk/client-side/ios',
  },
  {
    fromPath: '/sdk/client-side/react-native/',
    toPath: '/sdk/client-side/react/react-native',
  },
  {
    fromPath: '/sdk/client-side/xamarin/',
    toPath: '/sdk/client-side/dotnet',
  },
  {
    fromPath: '/sdk/server-side/lua/nginx/',
    toPath: '/guides/platform-specific/nginx',
  },
  {
    fromPath: '/sdk/concepts/feature-store/',
    toPath: '/sdk/concepts/data-stores',
  },
  {
    fromPath: '/sdk/concepts/feature-store/consul/',
    toPath: '/sdk/features/storing-data/consul',
  },
  {
    fromPath: '/sdk/concepts/feature-store/redis/',
    toPath: '/sdk/features/storing-data/redis',
  },
  {
    fromPath: '/sdk/concepts/feature-store/dynamodb/',
    toPath: '/sdk/features/storing-data/dynamodb',
  },
  {
    fromPath: '/sdk/features/database-integrations/',
    toPath: '/sdk/features/storing-data',
  },
  {
    fromPath: '/sdk/features/variation/',
    toPath: '/sdk/features/evaluating',
  },
  {
    fromPath: '/sdk/features/variationdetail/',
    toPath: '/sdk/features/evaluation-reasons',
  },
  {
    fromPath: '/sdk-concepts/flag-evaluations/',
    toPath: '/sdk/concepts/evaluation-reasons',
  },
  {
    fromPath: '/sdk/features/track/',
    toPath: '/sdk/features/events',
  },
  {
    fromPath: '/sdk/server-side/lua/haproxy/',
    toPath: '/guides/platform-specific/haproxy',
  },
  {
    fromPath: '/sdk/client-side/javascript/default-variations/',
    toPath: '/sdk/client-side/javascript/default-values',
  },
  // Redirects from removing the Advanced section
  {
    fromPath: '/home/advanced/api-access-tokens/',
    toPath: '/home/account-security/api-access-tokens',
  },
  {
    fromPath: '/home/advanced/custom-properties/',
    toPath: '/home/connecting/custom-properties',
  },
  {
    fromPath: '/home/advanced/flag-evaluations/',
    toPath: '/sdk/concepts/evaluation-reasons',
  },
  {
    fromPath: '/home/advanced/flags-from-files/',
    toPath: '/sdk/features/flags-from-files',
  },
  {
    fromPath: '/home/advanced/feature-store/',
    toPath: '/sdk/concepts/data-stores',
  },
  // Redirects from Advanced to new Relay Proxy section
  {
    fromPath: '/home/advanced/relay-proxy/',
    toPath: '/home/relay-proxy',
  },
  {
    fromPath: '/home/advanced/relay-proxy/automatic-configuration/',
    toPath: '/home/relay-proxy/automatic-configuration',
  },
  {
    fromPath: '/home/advanced/relay-proxy-enterprise/automatic-configuration/',
    toPath: '/home/relay-proxy/automatic-configuration',
  },
  {
    fromPath: '/home/advanced/relay-proxy/offline/',
    toPath: '/home/relay-proxy/offline',
  },
  {
    fromPath: '/home/advanced/relay-proxy-enterprise/offline/',
    toPath: '/home/relay-proxy/offline',
  },
  {
    fromPath: '/home/advanced/relay-proxy/deploying/',
    toPath: '/home/relay-proxy/deploying',
  },
  {
    fromPath: '/home/advanced/relay-proxy/using/',
    toPath: '/home/relay-proxy/using',
  },
  {
    fromPath: '/home/advanced/relay-proxy/monitoring',
    toPath: '/home/relay-proxy/monitoring',
  },
  {
    fromPath: '/home/advanced/relay-proxy/performance/',
    toPath: '/home/relay-proxy/performance',
  },
  {
    fromPath: '/home/advanced/relay-proxy-enterprise/',
    toPath: '/home/relay-proxy/enterprise',
  },
  // Redirects from integrations section
  {
    fromPath: '/integrations/triggers/',
    toPath: '/home/feature-workflows/triggers',
  },
  {
    fromPath: '/integrations/webhooks/',
    toPath: '/home/connecting/webhooks',
  },
  {
    fromPath: '/integrations/oauth/',
    toPath: '/home/connecting/oauth',
  },
  {
    fromPath: '/integrations/slack/managing-approvals/',
    toPath: '/integrations/slack/approvals',
  },
  {
    fromPath: '/integrations/gatsby/',
    toPath: '/sdk/client-side/react/gatsby',
  },
  {
    fromPath: '/integrations/dynatrace-cloud-automation/',
    toPath: '/integrations/dynatrace',
  },
  // Redirects to new Data Export section
  {
    fromPath: '/integrations/data-export/',
    toPath: '/home/data-export',
  },
  {
    fromPath: '/integrations/data-export/event-hub/',
    toPath: '/home/data-export/event-hub',
  },
  {
    fromPath: '/integrations/data-export/google-pubsub/',
    toPath: '/home/data-export/google-pubsub',
  },
  {
    fromPath: '/integrations/data-export/kinesis/',
    toPath: '/home/data-export/kinesis',
  },
  {
    fromPath: '/integrations/data-export/mparticle/mparticle-schema-reference/',
    toPath: '/home/data-export/mparticle-schema-reference/',
  },
  {
    fromPath: '/integrations/data-export/mparticle/',
    toPath: '/home/data-export/mparticle',
  },
  {
    fromPath: '/integrations/data-export/schema-reference/',
    toPath: '/home/data-export/schema-reference',
  },
  {
    fromPath: '/integrations/segment/segment-schema-reference/',
    toPath: '/home/data-export/segment-schema-reference',
  },
  {
    fromPath: '/integrations/data-export/segment/',
    toPath: '/home/data-export/segment',
  },
  // Redirects to new Code references section
  {
    fromPath: '/integrations/code-references/',
    toPath: '/home/code/code-references',
  },
  {
    fromPath: '/integrations/code-references/gitlab-ci/',
    toPath: '/home/code/gitlab',
  },
  {
    fromPath: '/integrations/code-references/github-actions/',
    toPath: '/home/code/github-actions',
  },
  {
    fromPath: '/integrations/code-references/custom-config/',
    toPath: '/home/code/custom-config',
  },
  {
    fromPath: '/integrations/code-references/circleci-orbs/',
    toPath: '/home/code/circleci',
  },
  {
    fromPath: '/integrations/code-references/bitbucket-pipes/',
    toPath: '/home/code/bitbucket',
  },
  {
    fromPath: '/integrations/git-code-references/',
    toPath: '/home/code/code-references',
  },
  {
    fromPath: '/home/organize/flag-compare-copy/',
    toPath: '/home/code/flag-compare-copy',
  },
  {
    fromPath: '/home/code/flag-overview/',
    toPath: '/home/code/flag-compare-copy',
  },
  // Redirects from removing the managing section
  {
    fromPath: '/home/managing-flags/',
    toPath: '/home/flags',
  },
  {
    fromPath: '/home/managing-flags/dashboard/',
    toPath: '/home/organize/flags-list',
  },
  {
    fromPath: '/home/managing-flags/flag-toggle/',
    toPath: '/home/getting-started/toggle',
  },
  {
    fromPath: '/home/managing-flags/flag-compare-copy/',
    toPath: '/home/code/flag-compare-copy',
  },
  {
    fromPath: '/home/managing-flags/flag-variations/',
    toPath: '/home/flags/variations',
  },
  {
    fromPath: '/home/managing-flags/flag-archive-delete/',
    toPath: '/home/code/flag-archive',
  },
  {
    fromPath: '/home/managing-flags/feature-workflows/',
    toPath: '/home/feature-workflows',
  },
  {
    fromPath: '/home/managing-flags/feature-workflows/approvals/',
    toPath: '/home/feature-workflows/approvals',
  },
  {
    fromPath: '/home/managing-flags/feature-workflows/environment-approvals/',
    toPath: '/home/feature-workflows/environment-approvals',
  },
  {
    fromPath: '/home/managing-flags/feature-workflows/scheduled-changes/',
    toPath: '/home/feature-workflows/scheduled-changes',
  },
  {
    fromPath: '/home/managing-flags/projects/',
    toPath: '/home/organize/projects',
  },
  {
    fromPath: '/home/managing-flags/environments/',
    toPath: '/home/organize/environments',
  },
  {
    fromPath: '/home/managing-flags/bulk-user-targeting/',
    toPath: '/home/flags/bulk-targeting',
  },
  {
    fromPath: '/home/managing-flags/flag-settings/',
    toPath: '/home/flags/settings',
  },
  {
    fromPath: '/home/managing-flags/flag-prerequisites/',
    toPath: '/home/flags/prerequisites',
  },
  {
    fromPath: '/home/managing-flags/audit-log-history/',
    toPath: '/home/flags/audit-log-history',
  },
  {
    fromPath: '/home/managing-flags/debugger/',
    toPath: '/home/flags/live-events',
  },
  {
    fromPath: '/home/managing-users/',
    toPath: '/home/contexts',
  },
  // Redirects from renaming "teams" category to "members"
  {
    fromPath: '/home/team/role-actions/',
    toPath: '/home/members/role-actions',
  },
  {
    fromPath: '/home/team/role-policies/',
    toPath: '/home/members/role-policies',
  },
  {
    fromPath: '/home/team/role-tags/',
    toPath: '/home/members/role-tags',
  },
  {
    fromPath: '/home/team/role-resources/',
    toPath: '/home/members/role-resources',
  },
  {
    fromPath: '/home/team/example-policies/',
    toPath: '/home/members/example-policies',
  },
  {
    fromPath: '/home/team/role-create/',
    toPath: '/home/members/role-create',
  },
  {
    fromPath: '/home/team/role-concepts/',
    toPath: '/home/members/role-concepts',
  },
  {
    fromPath: '/home/team/custom-roles/',
    toPath: '/home/members/custom-roles',
  },
  {
    fromPath: '/home/team/account-owners/',
    toPath: '/home/members/account-owners',
  },
  {
    fromPath: '/home/team/built-in-roles/',
    toPath: '/home/members/built-in-roles',
  },
  {
    fromPath: '/home/team/managing/',
    toPath: '/home/members/managing',
  },
  {
    fromPath: '/home/team/',
    toPath: '/home/members',
  },
  {
    fromPath: '/home/team/managing/',
    toPath: '/home/members',
  },
  {
    fromPath: '/home/getting-started/your-team/',
    toPath: '/home/getting-started/your-account',
  },
  // Reorg of account security
  {
    fromPath: '/home/account-security/managing-your-team/',
    toPath: '/home/members',
  },
  {
    fromPath: '/home/account-security/account-owners/',
    toPath: '/home/members/account-owners',
  },
  {
    fromPath: '/home/account-security/custom-roles/',
    toPath: '/home/members/custom-roles',
  },
  {
    fromPath: '/home/account-security/custom-roles/concepts/',
    toPath: '/home/members/role-concepts',
  },
  {
    fromPath: '/home/account-security/custom-roles/create/',
    toPath: '/home/members/role-create',
  },
  {
    fromPath: '/home/account-security/custom-roles/actions/',
    toPath: '/home/members/role-actions',
  },
  {
    fromPath: '/home/account-security/custom-roles/resources/',
    toPath: '/home/members/role-resources',
  },
  {
    fromPath: '/home/account-security/custom-roles/policies/',
    toPath: '/home/members/role-policies',
  },
  {
    fromPath: '/home/account-security/custom-roles/tags/',
    toPath: '/home/members/role-tags',
  },
  {
    fromPath: '/home/account-security/custom-roles/example-policies/',
    toPath: '/home/members/example-policies',
  },
  {
    fromPath: '/home/account-security/custom-roles/private-projects/',
    toPath: '/home/organize/private-projects',
  },
  {
    fromPath: '/home/account-security/managing-sessions/',
    toPath: '/home/account-security/sessions',
  },
  {
    fromPath: '/home/account-security/sso/okta/',
    toPath: '/home/account-security/okta',
  },
  {
    fromPath: '/home/account-security/sso/onelogin/',
    toPath: '/home/account-security/onelogin',
  },
  {
    fromPath: '/home/account-security/sso/google-apps/',
    toPath: '/home/account-security/google',
  },
  {
    fromPath: '/home/account-security/sso/adfs/',
    toPath: '/home/account-security/adfs',
  },
  {
    fromPath: '/home/account-security/sso/azure/',
    toPath: '/home/account-security/azure',
  },
  // Redirects from guide rearchitecture project, q2 2022
  {
    fromPath: '/guides/infrastructure/unit-tests/',
    toPath: '/guides/sdk/unit-tests',
  },
  {
    fromPath: '/guides/platform-specific/unit-tests/',
    toPath: '/guides/sdk/unit-tests',
  },
  {
    fromPath: '/guides/flags/sdk-flag/',
    toPath: '/guides/flags',
  },
  {
    fromPath: '/guides/experimentation/experimentation/',
    toPath: '/guides/experimentation',
  },
  {
    fromPath: '/guides/flags/rules-and-targeting/',
    toPath: '/guides/flags',
  },
  {
    fromPath: '/guides/flags/sdk-flag/',
    toPath: '/guides/flags',
  },
  {
    fromPath: '/guides/experimentation/experimentation/',
    toPath: '/guides/experimentation',
  },
  {
    fromPath: '/guides/tutorials/first-flag/',
    toPath: '/guides/flags',
  },
  {
    fromPath: '/guides/best-practices/migrating-solutions/',
    toPath: '/guides/account/migrating-solutions',
  },
  {
    fromPath: '/guides/tutorials/merge-accounts/',
    toPath: '/guides/account/merge-accounts',
  },
  {
    fromPath: '/guides/best-practices/user-data/',
    toPath: '/guides/account/user-data',
  },
  {
    fromPath: 'guides/best-practices/teams/',
    toPath: '/guides/teams-roles/teams',
  },
  {
    fromPath: '/guides/best-practices/custom-roles/',
    toPath: '/guides/teams-roles/custom-roles',
  },
  {
    fromPath: '/guides/tutorials/no-access/',
    toPath: '/guides/teams-roles/no-access',
  },
  {
    fromPath: '/guides/tutorials/sdk-flag/',
    toPath: '/guides/flags/sdk-flag',
  },
  {
    fromPath: '/guides/tutorials/rules-and-targeting/',
    toPath: '/guides/flags/rules-and-targeting',
  },
  {
    fromPath: '/guides/best-practices/creating-flags/',
    toPath: '/guides/flags/creating-flags',
  },
  {
    fromPath: '/guides/best-practices/flag-hierarchy/',
    toPath: '/guides/flags/flag-hierarchy',
  },
  {
    fromPath: '/guides/best-practices/improving-code/',
    toPath: '/guides/flags/improving-code',
  },
  {
    fromPath: '/guides/best-practices/technical-debt/',
    toPath: '/guides/flags/technical-debt',
  },
  {
    fromPath: '/guides/best-practices/testing-code/',
    toPath: '/guides/flags/testing-code',
  },
  {
    fromPath: '/guides/best-practices/entitlements/',
    toPath: '/guides/flags/entitlements',
  },
  {
    fromPath: '/guides/platform-specific/triggers-dynatrace/',
    toPath: '/guides/integrations/triggers-dynatrace',
  },
  {
    fromPath: '/guides/platform-specific/static-sites/',
    toPath: '/guides/flags/static-sites',
  },
  {
    fromPath: '/guides/platform-specific/cloudflare-workers/',
    toPath: '/guides/infrastructure/cloudflare-workers',
  },
  {
    fromPath: '/guides/best-practices/integrations/',
    toPath: '/guides/integrations/using-integrations',
  },
  {
    fromPath: '/guides/best-practices/integrations-use-cases/',
    toPath: '/guides/integrations/integrations-use-cases',
  },
  {
    fromPath: '/guides/best-practices/deployment-strategies/',
    toPath: '/guides/infrastructure/deployment-strategies',
  },
  {
    fromPath: '/guides/best-practices/infrastructure-migration/',
    toPath: '/guides/infrastructure/infrastructure-migration',
  },
  {
    fromPath: '/guides/best-practices/serverless/',
    toPath: '/guides/infrastructure/serverless',
  },
  {
    fromPath: '/guides/platform-specific/aws-lambda/',
    toPath: '/guides/infrastructure/aws-lambda',
  },
  {
    fromPath: '/guides/platform-specific/nextjs/',
    toPath: '/guides/infrastructure/nextjs',
  },
  {
    fromPath: '/guides/platform-specific/svelte/',
    toPath: '/guides/infrastructure/svelte',
  },
  {
    fromPath: '/guides/platform-specific/mobile/',
    toPath: '/guides/sdk/mobile',
  },
  {
    fromPath: '/guides/tutorials/unsupported-sdk/',
    toPath: '/guides/sdk/unsupported-sdk',
  },
  {
    fromPath: '/guides/platform-specific/haproxy/',
    toPath: '/guides/sdk/haproxy',
  },
  {
    fromPath: '/guides/platform-specific/nginx/',
    toPath: '/guides/sdk/nginx',
  },
  {
    fromPath: '/guides/tutorials/rest-api/',
    toPath: '/guides/api/rest-api',
  },
  {
    fromPath: '/guides/best-practices/sdk-wrappers/',
    toPath: '/guides/sdk/sdk-wrappers',
  },
  {
    fromPath: 'guides/tutorials/experimentation/',
    toPath: '/guides/experimentation/experimentation',
  },
  {
    fromPath: '/guides/best-practices/bayesian/',
    toPath: '/guides/experimentation/bayesian',
  },
  {
    fromPath: '/guides/tutorials/nginx/',
    toPath: '/guides/platform-specific/nginx',
  },
  {
    fromPath: '/guides/best-practices/terraform/',
    toPath: '/guides/platform-specific/terraform',
  },
  {
    fromPath: '/guides/best-practices/using-feature-flags-on-static-sites/',
    toPath: '/guides/platform-specific/static-sites',
  },
  {
    fromPath: '/guides/best-practices/experimentation/',
    toPath: '/home/creating-experiments',
  },
  // Redirect from the readme-hosted docs site
  {
    fromPath: '/',
    toPath: '/home',
  },
]

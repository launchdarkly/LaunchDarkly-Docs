export default {
  allNavigationDataJson: {
    edges: [
      {
        node: {
          label: 'Integrations',
          path: '/integrations',
          items: [
            {
              path: '/integrations/collaboration',
              items: [
                {
                  path: '/integrations/microsoft-teams',
                  label: 'Microsoft Teams',
                },
                {
                  path: '/integrations/slack',
                  label: 'Slack',
                },
              ],
              label: 'Collaboration tools',
            },
            {
              path: '/integrations/ide',
              items: [
                {
                  path: '/integrations/intellij',
                  label: 'IntelliJ IDEA',
                },
                {
                  path: '/integrations/vscode',
                  label: 'Visual Studio Code',
                },
              ],
              label: 'IDE connectors',
            },
          ],
        },
      },
      {
        node: {
          path: '/home',
          label: '/home',
          items: [
            {
              path: '/home/code',
              label: 'Flags in your codebase',
              items: [
                {
                  path: '/home/code/flag-status',
                  label: 'Flag statuses',
                  items: null,
                },
                {
                  path: '/home/code/code-references',
                  label: 'Code references',
                  items: [
                    {
                      path: '/home/code/bitbucket',
                      label: 'Bitbucket Pipes',
                    },
                    {
                      path: '/home/code/circleci',
                      label: 'CircleCI Orbs',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
}

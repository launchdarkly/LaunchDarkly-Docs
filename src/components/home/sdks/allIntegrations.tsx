/** @jsx jsx */
import { jsx } from 'theme-ui'

import { SideNavItem } from '../../sideNav/types'

import SdkLinks from './sdkLinks'

const AllIntegrations = () => {
  const intItems: SideNavItem[] = [
    {
      label: 'ADFS',
      shortLabel: 'ADFS',
      path: '/home/account-security/adfs',
      svg: 'integrations/adfs',
    },
    {
      label: 'Amazon Kinesis',
      shortLabel: 'Amazon Kinesis',
      path: '/home/data-export/kinesis',
      svg: 'integrations/amazonkinesis',
    },
    {
      label: 'Amplitude',
      shortLabel: 'Amplitude',
      path: '/home/users/synced-segments',
      svg: 'integrations/amplitude',
    },
    {
      label: 'Ansible Collection',
      shortLabel: 'Ansible Collection',
      path: '/integrations/ansible',
      svg: 'integrations/ansible',
    },
    {
      label: 'App Dynamics',
      shortLabel: 'App Dynamics',
      path: '/integrations/appdynamics',
      svg: 'integrations/appdynamics',
    },
    {
      label: 'AWS CloudTrail Lake',
      shortLabel: 'AWS CloudTrail Lake',
      path: '/integrations/cloudtrail',
      svg: 'integrations/aws-cloudtrail',
    },
    {
      label: 'AWS CloudWatch RUM',
      shortLabel: 'AWS CloudWatch RUM',
      path: '/integrations/aws-cloudwatch-rum',
      svg: 'integrations/aws-cloudwatch',
    },
    {
      label: 'Azure DevOps',
      shortLabel: 'Azure DevOps',
      path: '/integrations/azure-devops',
      svg: 'integrations/azure',
    },
    {
      label: 'Azure Active Directory',
      shortLabel: 'Azure Active Directory',
      path: '/home/account-security/azure',
      svg: 'integrations/azure-active',
    },
    {
      label: 'Azure Event Hubs',
      shortLabel: 'Azure Event Hubs',
      path: '/home/data-export/event-hub',
      svg: 'integrations/azure-event',
    },
    {
      label: 'Bitbucket Pipelines',
      shortLabel: 'Bitbucket Pipelines',
      path: '/integrations/bitbucket-pipelines',
      svg: 'integrations/bitbucket',
    },
    {
      label: 'Bitbucket code references',
      shortLabel: 'Bitbucket code references',
      path: '/home/code/bitbucket',
      svg: 'integrations/bitbucket',
    },
    {
      label: 'Circle CI code references',
      shortLabel: 'Circle CI code references',
      path: '/home/code/circleci',
      svg: 'integrations/circleci',
    },
    {
      label: 'Census',
      shortLabel: 'Census',
      path: '/integrations/census',
      svg: 'integrations/census',
    },
    {
      label: 'Cloudflare',
      shortLabel: 'Cloudflare',
      path: '/integrations/cloudflare',
    },
    {
      label: 'CloudQuery',
      shortLabel: 'CloudQuery',
      path: '/integrations/cloudquery',
      svg: 'integrations/cloudquery',
    },
    {
      label: 'Compass',
      shortLabel: 'Compass',
      path: '/integrations/compass',
      svg: 'integrations/compass-logo',
    },
    {
      label: 'Confluence',
      shortLabel: 'Confluence',
      path: '/integrations/confluence',
      svg: 'integrations/confluence',
    },
    {
      label: 'Datadog',
      shortLabel: 'Datadog',
      path: '/integrations/datadog',
      svg: 'integrations/datadog',
    },
    {
      label: 'Dynatrace',
      shortLabel: 'Dynatrace',
      path: '/integrations/dynatrace',
      svg: 'integrations/dynatrace',
    },
    {
      label: 'Elastic (ELK) Stack',
      shortLabel: 'Elastic (ELK) Stack',
      path: '/integrations/elastic-stack',
      svg: 'integrations/elastic',
    },
    {
      label: 'GitHub code references',
      shortLabel: 'GitHub code references',
      path: '/home/code/github-actions',
      svg: 'integrations/github',
    },
    {
      label: 'GitLab code references',
      shortLabel: 'GitLab code references',
      path: '/home/code/gitlab',
      svg: 'integrations/gitlab',
    },
    {
      label: 'Google Cloud Pub/Sub',
      shortLabel: 'Google Cloud Pub/Sub',
      path: '/home/data-export/google-pubsub',
      svg: 'integrations/googlecloudpubsub',
    },
    {
      label: 'Google Apps',
      shortLabel: 'Google Apps',
      path: '/home/account-security/google',
      svg: 'integrations/google',
    },
    {
      label: 'Grafana',
      shortLabel: 'Grafana',
      path: '/integrations/grafana',
      svg: 'integrations/grafana',
    },
    {
      label: 'Heap',
      shortLabel: 'Heap',
      path: '/integrations/heap',
      svg: 'integrations/heap',
    },
    {
      label: 'Honeycomb',
      shortLabel: 'Honeycomb',
      path: '/integrations/honeycomb',
      svg: 'integrations/honeycomb',
    },
    {
      label: 'IntelliJ IDEA',
      shortLabel: 'IntelliJ IDEA',
      path: '/integrations/intellij',
      svg: 'integrations/intellij',
    },
    {
      label: 'Jira Cloud',
      shortLabel: 'Jira Cloud',
      path: '/integrations/jira',
      svg: 'integrations/jira',
    },
    {
      label: 'LogDNA',
      shortLabel: 'LogDNA',
      path: '/integrations/logdna',
      svg: 'integrations/logdna',
    },
    {
      label: 'Microsoft Teams',
      shortLabel: 'Microsoft Teams',
      path: '/integrations/microsoft-teams',
      svg: 'integrations/msteams',
    },
    {
      label: 'mParticle',
      shortLabel: 'mParticle',
      path: '/home/data-export/mparticle',
      svg: 'integrations/mparticle',
    },
    {
      label: 'ngrok',
      shortLabel: 'ngrok',
      path: '/integrations/ngrok',
      svg: 'integrations/ngrok',
    },
    {
      label: 'New Relic One',
      shortLabel: 'New Relic One',
      path: '/integrations/new-relic',
      svg: 'integrations/newrelic',
    },
    {
      label: 'Okta',
      shortLabel: 'Okta',
      path: '/home/account-security/okta',
      svg: 'integrations/okta',
    },
    {
      label: 'Okteto',
      shortLabel: 'Okteto',
      path: '/integrations/okteto',
      svg: 'integrations/okteto',
    },
    {
      label: 'OneLogin',
      shortLabel: 'OneLogin',
      path: '/home/account-security/onelogin',
      svg: 'integrations/onelogin',
    },
    {
      label: 'Pendo',
      shortLabel: 'Pendo',
      path: '/integrations/pendo',
      svg: 'integrations/pendo',
    },
    {
      label: 'Release',
      shortLabel: 'Release',
      path: '/integrations/release',
      svg: 'integrations/release',
    },
    {
      label: 'Segment',
      shortLabel: 'Segment',
      path: '/home/data-export/segment',
      svg: 'integrations/segment',
    },
    {
      label: 'ServiceNow',
      shortLabel: 'ServiceNow',
      path: '/integrations/servicenow',
      svg: 'integrations/servicenow',
    },
    {
      label: 'SignalFx',
      shortLabel: 'SignalFx',
      path: '/integrations/signalfx',
      svg: 'integrations/signalfx',
    },
    {
      label: 'Slack',
      shortLabel: 'Slack',
      path: '/integrations/slack',
      svg: 'integrations/slack',
    },
    {
      label: 'Sleuth',
      shortLabel: 'Sleuth',
      path: '/integrations/sleuth',
      svg: 'integrations/sleuth',
    },
    {
      label: 'Snowplow',
      shortLabel: 'Snowplow',
      path: '/integrations/snowplow',
      svg: 'integrations/snowplow',
    },
    {
      label: 'Splunk',
      shortLabel: 'Splunk',
      path: '/integrations/splunk',
      svg: 'integrations/splunk',
    },
    {
      label: 'Terraform',
      shortLabel: 'Terraform',
      path: '/integrations/terraform',
      svg: 'integrations/terraform',
    },
    {
      label: 'Tray',
      shortLabel: 'Tray',
      path: '/integrations/tray',
      svg: 'integrations/trayio',
    },
    {
      label: 'Trello',
      shortLabel: 'Trello',
      path: '/integrations/trello',
      svg: 'integrations/trello',
    },
    {
      label: 'Visual Studio Code',
      shortLabel: 'Visual Studio Code',
      path: '/integrations/vscode',
      svg: 'integrations/vscode',
    },
    {
      label: 'Webhooks',
      shortLabel: 'Webhooks',
      path: '/home/connecting/webhooks',
      svg: 'integrations/webhooks',
    },
    {
      label: 'Zapier',
      shortLabel: 'Zapier',
      path: '/integrations/zapier',
      svg: 'integrations/zapier',
    },
    {
      label: 'Zendesk',
      shortLabel: 'Zendesk',
      path: '/integrations/zendesk',
      svg: 'integrations/zendesk',
    },
  ]
  return (
    <ul
      sx={{
        border: '1px solid',
        borderColor: 'grayMed',
        backgroundColor: 'grayWash',
        borderRadius: '4px',
        px: 5,
        py: 5,
        pb: 6,
        maxWidth: '60rem',
      }}
    >
      <SdkLinks heading="" sideNavItems={intItems} />
    </ul>
  )
}

export default AllIntegrations

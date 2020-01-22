---
title: "Jira"
excerpt: ""
---
## Overview
This topic explains how LaunchDarkly's Jira app allows you to link your feature flags with your team's Jira issues. When a feature flag is turned on, off, or has its targeting rules update, its associated Jira issue pages display the flag's current status.

<Callout intent="info">
   <CalloutTitle>This integration is for Jira Cloud only</CalloutTitle>
   <CalloutDescription>The LaunchDarkly Jira integration is only for Jira Cloud product offerings. It does not work in Jira Server.
  </CalloutDescription>
</Callout>

## Prerequisites
To complete this procedure, you must have the following prerequisites:

* The LaunchDarkly for Jira app from the [Atlassian Marketplace](https://marketplace.atlassian.com/apps/1219142/launchdarkly-for-jira?hosting=cloud&tab=overview) in your Jira Cloud instance.
* A personal API access token with `writer` permissions. To learn more, read [Personal API access tokens](./api-access-tokens). 

You can also give the access token a custom role allowing it to control webhooks. In the custom role policy, **Allow** the Jira integration to access the `webhook/*` resources with the `createWebhook` and `deleteWebhook` actions. 

An example custom role configuration appears below:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/db198b3-Screen_Shot_2018-05-29_at_2.38.38_PM.png",
        "Screen Shot 2018-05-29 at 2.38.38 PM.png",
        621,
        782,
        "#f9faf9"
      ],
      "sizing": "80",
      "caption": "An access token's custom role configuration in the LaunchDarkly UI."
    }
  ]
}
[/block]

[block:api-header]
{}
[/block]
Now that you've created an access token, use it to configure the Jira integration for your LaunchDarkly account. 


1. Navigate to your Jira instance's app management page, and click the "Configuration" button for the LaunchDarkly app.
2. Set your API key. 
3. Select which environment the app will track for each of your LaunchDarkly projects. By default, the app will track your production environments.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a20edd1-Screen_Shot_2018-05-29_at_2.43.24_PM.png",
        "Screen Shot 2018-05-29 at 2.43.24 PM.png",
        625,
        630,
        "#f8f8f7"
      ],
      "sizing": "80"
    }
  ]
}
[/block]

<Callout intent="alert">
  <CalloutTitle>Environment selection</CalloutTitle>
   <CalloutDescription>If selected environments are reconfigured after issues have already been associated with flags, the existing connections display the environments they were historically connected to until the next time that flag is updated. 
New flag connections display the flag configuration for the updated environment.</CalloutDescription>
</Callout>
After you have set up the LaunchDarkly for Jira app is set up, a "Releases" panel appears when you view issues on the "Active sprints" board. 

If no flags are associated with an existing Jira issue, you can add one with a button. If you already have one or more flags associated with a Jira issue, the rollout status of each connected feature flag on each Jira issue appears.

Now that the Jira app is configured, you can connect feature flags to Jira issues.
<Callout intent="info">
  <CalloutTitle>Enable the release panel</CalloutTitle>
   <CalloutDescription>The Jira issue view, which contains the release panel, is a per-user setting. If it is off, the release panel does not appear. 
To learn more, read [Jira's documentation](https://confluence.atlassian.com/jiracorecloud/the-new-jira-issue-view-938040503.html).</CalloutDescription>
</Callout>

## Creating a new feature flag from a Jira issue
To create a new flag with Jira issues: 

1. Navigate to your Jira issue's feature flag panel.
2. Click **Add feature flag** select the **Create feature flag** option. The LaunchDarkly flag creation page opens.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5b6582a-Screen_Shot_2018-06-08_at_10.16.46_AM.png",
        "Screen Shot 2018-06-08 at 10.16.46 AM.png",
        334,
        130,
        "#f4f5f9"
      ],
      "caption": "The Create feature flag option."
    }
  ]
}
[/block]
3. In the feature flag creation page, the Jira issue is pre-populated.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3e0a232-Screen_Shot_2018-05-29_at_2.52.59_PM.png",
        "Screen Shot 2018-05-29 at 2.52.59 PM.png",
        776,
        884,
        "#fbfbfa"
      ],
      "sizing": "80",
      "caption": "The feature flag creation page."
    }
  ]
}
[/block]

## Connecting an existing feature flag to a Jira issue from LaunchDarkly
If you have already created a feature flag for your Jira issue, you can add a Jira issue to your existing flag by creating a [custom property](./custom-properties) for your flag.


1. Navigate to the flag's **Settings** page.
2. Name the custom property `Jira issues`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/70951cc-Screen_Shot_2018-05-29_at_2.55.54_PM.png",
        "Screen Shot 2018-05-29 at 2.55.54 PM.png",
        687,
        925,
        "#f6f7f7"
      ],
      "sizing": "80",
      "caption": "The flag's Settings page, configured with a `Jira issues` custom property."
    }
  ]
}
[/block]
3. Enter a list of Jira issue keys as the property value. You can list multiple issues if applicable.
4. Click **Save Changes**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/38209e6-Screen_Shot_2018-05-29_at_2.57.01_PM.png",
        "Screen Shot 2018-05-29 at 2.57.01 PM.png",
        639,
        403,
        "#f4f5f3"
      ],
      "sizing": "80",
      "caption": "The Jira issues custom properties field."
    }
  ]
}
[/block]

<Callout intent="alert">
<CalloutTitle>Adding issues to an existing flag</CalloutTitle>
   <CalloutDescription>Your Jira issue must exist before you associate it with your feature flag. If you accidentally added a Jira issue to your flag, delete the custom property, create your Jira issue, and try again.
  </CalloutDescription>
</Callout>
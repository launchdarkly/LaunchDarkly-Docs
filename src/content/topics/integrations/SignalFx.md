---
title: "SignalFx"
excerpt: ""
---
## Overview
[SignalFx](https://www.signalfx.com/) is an [application performance management (APM)](https://en.m.wikipedia.org/wiki/Application_performance_management) tool. It allows customers to monitor the operational health of their application and infrastructure.

SignalFx can detect and alert engineers when their applications are trending in an unstable direction. In doing so, these engineers will likely want to identify what changed and caused the application to become unstable. One potential cause could be the toggling of a feature flag. The LaunchDarkly SignalFx integration works to streamline this use case by exposing flag change data to SignalFx.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b9714c2-Dashboard_-_bwoskowlaunchdarkly.com_2019-12-13_09-40-34.png",
        "Dashboard - bwoskow@launchdarkly.com 2019-12-
1. 09-40-34.png",
        1795,
        863,
        "#dcdee0"
      ],
      "caption": "TODO: get a much better image"
    }
  ]
}
[/block]
With clear data markers representing feature flag changes, SignalFx users can more easily correlate their feature flag rollouts with changes in operational health.
## Initial configuration
Head to your LaunchDarkly integrations page to configure the SignalFx integration. You can find this by selecting the "Integrations" navigation item. Then, click "Add integration" on the SignalFx card.

There are two required fields:

* *SignalFx access token*: This token authenticates your LaunchDarkly account to send data to your SignalFx account. [Learn more](https://docs.signalfx.com/en/latest/admin-guide/tokens.html#working-with-access-tokens) about working with SignalFX access tokens.
* *SignalFx Realm*: The realm identifies the data center where your SignalFx account is hosted. You can look up your realm on your [SignalFx profile page](https://app.us1.signalfx.com/#/myprofile).

With this configuration in place, LaunchDarkly should now be sending flag change data to SignalFx.

Additionally, we recommend that you set a *Name* for your integration configuration so that you can refer back to it later. This is especially helpful in the case that you configure multiple SignalFx integrations.
## Advanced configuration
The *Policy* configuration field allows you to control which kinds of LaunchDarkly events are sent to SignalFx. The default policy value restricts to production environments:
[block:code]
{
  "codes": [
    {
      "code": "proj/*:env/production:flag/*",
      "language": "text",
      "name": ""
    }
  ]
}
[/block]
Reasons to override the default policy include wanting to restrict the integration to:

* a specific combination of LaunchDarkly projects/environments
* a specific action (or set of actions)

For example, setting the policy configuration to the following will restrict LaunchDarkly such that only changes from the `cool-project` project are sent to SignalFx:
[block:code]
{
  "codes": [
    {
      "code": "proj/cool-project:env/production:flag/*",
      "language": "text"
    }
  ]
}
[/block]
TODO link to generic policies doc describing this in more detail.
## Using the integration
Once your integration is configured, head to SignalFx and open one of your charts.


1. On the "Plot Editor" panel, click the "Add Metric Or Event" button.
2. Select `LaunchDarkly flag changed` in the text input selector.
3. (Optional) Add a filter if you wish to filter on a specific LaunchDarkly project or environment.
4. Click the "Save" button to save your chart changes.

Additionally, SignalFx's "Chart Options" tab offers the option of viewing LaunchDarkly events as small marks or lines. [Learn more](https://docs.signalfx.com/en/latest/charts/chart-options-tab.html#event-lines).

With your charts now configured, charts will become annotated with LaunchDarkly flag changes once the corresponding changes are made. Clicking on these annotations will provide additional details about the flag changes.

TODO insert another image here of having clicked on a flag change.
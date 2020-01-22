---
title: "Other flag settings"
excerpt: ""
---
## Overview
This topic explains how to make other changes to your feature flags in the flag's **Settings** tab.

A feature flag's Settings tab lets you change flag settings, including the name and description of the flag.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0eae4e7-project-flag-settings.png",
        "project-flag-settings.png",
        756,
        523,
        "#f6f6f5"
      ],
      "caption": "A flag's settings tab."
    }
  ]
}
[/block]
The fields in the Settings tab do the following things:
[block:parameters]
{
  "data": {
    "h-0": "Field name",
    "h-1": "Description",
    "0-0": "Maintainer",
    "0-1": "The flag maintainer is the team member who's primarily responsible for the flag. By default, the Maintainer is set to the member who created the flag, but you can assign any member of your team as the maintainer for a particular flag.",
    "1-1": "The feature flag's name. You can change it here.",
    "1-0": "Name",
    "3-0": "Tags",
    "3-1": "Tags are labels that help you categorize flags. They're especially helpful for managing flag permissions with custom roles. 
For example, you can tag flags with `marketing` flags or `devOps` tags, and then use these tags to determine who has read or write access for the flag. 
To learn more, read [Custom Roles](./custom-roles).",
    "2-0": "Description",
    "2-1": "The feature flag's description. You can change it here.",
    "4-0": "Make this flag available to the client-side SDK",
    "4-1": "You must make feature flags available to the client-side SDK before they can be used in variation calls on the front-end. If you request a feature flag that is not available, you'll receive the default value for that flag.
If you want flags marked as available to the client-side SDK by default, you can check the \"Make new flags available to the client-side (JavaScript) SDK by default\" in [Project settings](https://app.launchdarkly.com/settings/projects). Click the **Edit** button just above the project table to edit this project specific setting.
To learn more, read [JavaScript SDK Reference](./js-sdk-reference).",
    "5-0": "This is a permanent flag",
    "5-1": "You can mark flags permanent if they're intended to exist in your codebase long-term (e.g. a flag that's used to enable a site-wide maintenance mode). 
We will not prompt you to remove permanent flags, even if one variation has been rolled out to all of your users."
  },
  "cols": 2,
  "rows": 6
}
[/block]

<Callout intent="info">
  <Callout.Title>Flag keys can't be changed</Callout.Title>
   <Callout.Description>In addition to the descriptors, every flag has a unique key which you set during flag creation. The key cannot be edited after the flag is created.</Callout.Description>
</Callout>

## Sending detailed event information

<Callout intent="info">
  <Callout.Title>Detailed events require Data Export</Callout.Title>
   <Callout.Description>This setting is only visible to customers using Data Export.
Data Export is only available to customers on our enterprise plans. If you're interested in learning more about our enterprise plans, contact [sales@launchdarkly.com](mailto:sales@launchdarkly.com?Subject=Data%20Export).</Callout.Description>
</Callout>
Flag evaluation events are summarized by default to minimize data use.  

If you use Data Export, you can enable it to send detailed event data for a given flag. Unlike other flag settings on this page, you can adjust this setting for each environment in the project.

To learn more, read [Data Export](./data-export).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/eee85cb-env-flag-settings.png",
        "env-flag-settings.png",
        573,
        182,
        "#f0f1ec"
      ],
      "caption": "The \"Send detailed event information for this flag\" field."
    }
  ]
}
[/block]
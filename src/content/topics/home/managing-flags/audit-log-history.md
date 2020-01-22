---
title: "The audit log and history tabs"
excerpt: ""
---
## Overview
This topic explains how to use the audit log and history tabs to track changes made in LaunchDarkly.
## Using the audit log
The **Audit Log** is a running tally of changes made to feature flags in a given environment. Access it from the sidebar.

The audit log always shows changes to feature flags in one environment. To see the changes for other environments, use the environment switcher at the top of your sidebar.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/DtjRzLsHSv7TUuKB6G6g_Audit%20log.png",
        "Audit log.png",
        "1045",
        "525",
        "#434140",
        ""
      ]
    }
  ]
}
[/block]
Click the **Details** button to see more information about each change, including representations of the JSON patch operation for the change and a diff from the old and new JSON, if available.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/Xf7ssGbYRGK23KgPB8e5_Audit%20log%202.png",
        "Audit log 2.png",
        "1038",
        "567",
        "#999999",
        ""
      ]
    }
  ]
}
[/block]

## Using the history tabs
The UI also contains **History** tabs on the account and flag settings pages. These contain a record of the changes made in LaunchDarkly to those resources. 

You can filter the history tabs by timestamps or search terms. Only some of the properties in an entry are searchable. 

The following resources are searchable:
[block:parameters]
{
  "data": {
    "0-0": "Member",
    "h-1": "Searchable Properties",
    "h-0": "Resource Name",
    "1-0": "User",
    "2-0": "Webhooks",
    "3-0": "Environment, Role, Goal, Project, Flag, & Feature",
    "0-1": "- Display name\n- Full name\n- First name\n- Last name\n- Email",
    "1-1": "- Unique Key\n- Display name\n- Full name\n- First name\n- Last name\n- Email",
    "2-1": "- Action\n- Resource name",
    "3-1": "- Resource name"
  },
  "cols": 2,
  "rows": 4
}
[/block]
You can also build integrations on top of our audit log using the Audit Log REST API. To learn more, read [Audit log overview](http://apidocs.launchdarkly.com/docs/audit-log-overview).
<Callout intent="info">
  <Callout.Title>Additional integration options</Callout.Title>
   <Callout.Description>You can also receive audit log notifications by creating [webhooks](./webhooks), or setting up [Slack](./slack) or [HipChat](./hipchat) notifications.</Callout.Description>
</Callout>
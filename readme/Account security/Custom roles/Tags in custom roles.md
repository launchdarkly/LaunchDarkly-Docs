---
title: "Tags in custom roles"
excerpt: ""
---
[block:callout]
{
  "type": "info",
  "title": "This feature requires an enterprise plan",
  "body": "Custom roles are only available to customers on our enterprise plans. \n\nTo learn more about enterprise plans, contact [sales@launchdarkly.com](mailto:sales@launchdarkly.com?Subject=Custom%20roles).\n\n<span><a href=\"#sales-tags-c-role\" class=\"sales-tags-c-role\" >Chat with sales</a> </span>"
}
[/block]

[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how custom roles use tags.
[block:api-header]
{
  "title": "Understanding tags"
}
[/block]
Tags are simple strings that you can attach to any resource in LaunchDarkly. Tags are useful for grouping resources into a set that you can name in a resource specifier. For example, you can create a `dev` tag for your environments and use it in a policy to specify custom rules that only apply to development environments.

Tags are supported on the following resources: 
* projects
* environments
* segments
* flags

Other resources like metrics, webhooks and integrations do not support tags.
[block:api-header]
{
  "title": "Adding tags to resources"
}
[/block]
You can add tags to resources in LaunchDarkly with the UI or API.
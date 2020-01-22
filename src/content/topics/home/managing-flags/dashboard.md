---
title: "The dashboard"
excerpt: ""
---
## Overview
This topic explains how to use the dashboard, the core interface of LaunchDarkly platform. The dashboard shows your feature flags and gives you many options to create, modify, and manage them.
## Viewing feature flags
When you create a new feature flag, it appears on the dashboard in each of your environments. Similarly, deleting a feature flag removes it from all the environments in your project.

To learn more, read [Creating a feature flag](./creating-a-feature-flag).

Use the search bar to filter by flag name, tag, key, or description, or create a new feature flag by clicking **New**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/fdfc127-doc_create.jpg",
        "doc_create.jpg",
        2000,
        1125,
        "#0da55a"
      ],
      "caption": "The dashboard with the \"New\" button called out."
    }
  ]
}
[/block]

## Flag statuses
The flag status indicator lets you see when a flag is active or inactive. It's important to understand flag statuses so you know which flags are safe to remove from your code.

Every feature flag has a status that reflects the state of a flag in each environment. For example, if the flag is listed as "Active" in your Production environment, LaunchDarkly is currently receiving requests for that flag using your Production SDK key.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2dc6f60-doc_status.jpg",
        "doc_status.jpg",
        2000,
        1125,
        "#f7f7f7"
      ],
      "caption": ""
    }
  ]
}
[/block]
The various flag statuses are explained below:
[block:parameters]
{
  "data": {
    "h-0": "Status Type",
    "h-1": "Name",
    "h-2": "Definition",
    "1-0": "![Active Status](http://i.imgur.com/j3ADAHb.png?1)",
    "1-1": "Active",
    "1-2": "LaunchDarkly is receiving requests for this flag.",
    "2-0": "![Inactive Status](http://i.imgur.com/IvoIydt.png?1)",
    "2-1": "Inactive",
    "0-0": "![New Status](http://i.imgur.com/fd4IkYV.png?1)",
    "0-1": "New",
    "0-2": "This flag is new and has not been requested yet.",
    "2-2": "This flag has not been requested for 7 days.",
    "3-1": "Launched",
    "3-0": "![Launched Status](http://i.imgur.com/vSPuWcU.png?1)",
    "3-2": "All users have been receiving one variation of this flag for 7 days. 
You may be able to remove this flag from your code."
  },
  "cols": 3,
  "rows": 4
}
[/block]
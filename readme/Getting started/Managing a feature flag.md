---
title: "Managing a feature flag"
excerpt: ""
---
LaunchDarkly allows your team to manage the entire lifecycle of your feature flags, from creation to cleanup.  We make it easy for teams to manage feature flags and mitigate technical debt throughout the entire development process, from local to QA, staging, and production. 
[block:api-header]
{
  "type": "basic",
  "title": "Dashboard"
}
[/block]
You can access all of your feature flags on the Dashboard.  When you [create a feature flag](doc:creating-a-feature-flag), it will appear on the Dashboard across all of your [environments](http://docs.launchdarkly.com/docs/environments) within a single [Project](doc:projects).  This will allow you to set environment-specific targeting and rollout rules for each flag.  If you delete a flag, it will remove the flag across all of your environments. 

Moreover, you can find flags easily by using the search bar to filter by flag name, tag, key, or description.  
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
      "caption": ""
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Flag status"
}
[/block]
A cornerstone of effective feature flag management is the ability to know when a feature flag is active or safe to remove from your code.  LaunchDarkly makes this easy with flag statuses.

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
Here are the colors, names, and description of the flag statuses.
[block:parameters]
{
  "data": {
    "h-0": "Status Type",
    "h-1": "Name",
    "h-2": "Definition",
    "1-0": "![Active Status](http://i.imgur.com/j3ADAHb.png?1)",
    "1-1": "Active",
    "1-2": "LaunchDarkly is receiving requests for this flag",
    "2-0": "![Inactive Status](http://i.imgur.com/IvoIydt.png?1)",
    "2-1": "Inactive",
    "0-0": "![New Status](http://i.imgur.com/fd4IkYV.png?1)",
    "0-1": "New",
    "0-2": "This flag is new and has not been requested yet",
    "2-2": "This flag has not been requested for 7 days.",
    "3-1": "Full Rollout",
    "3-0": "![Full Rollout Status](http://i.imgur.com/vSPuWcU.png?1)",
    "3-2": "All users have been receiving one variation of this flag for 7 days.  You may be able to remove it from your code."
  },
  "cols": 3,
  "rows": 4
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Flag settings"
}
[/block]
LaunchDarkly provides rich ways for you to identify each feature flag, allowing both technical and non-technical users to locate and understand flags quickly. 

Every feature flag has four editable descriptors: name, description, tag(s), and maintainer.   You can modify these descriptors in the Settings tab of the feature flag. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ff10729-69c87ff05fda199ea72d02deab4b5f19.png",
        "69c87ff05fda199ea72d02deab4b5f19.png",
        1366,
        776,
        "#ebecea"
      ],
      "caption": ""
    }
  ]
}
[/block]
Here is a brief overview of the flag descriptors: 
  * Name 
    * A human-readable name given to each flag, like "Checkout Flow" or "Signup Page"
  * Description
    * A human-readable description that provides richer context for the flag's purpose, like "Manages the checkout flow for the product store."
  * Tags
    * One or more labels to help you categorize each flag.  This is especially helpful for managing flag permissions using [custom roles](doc:custom-roles).  For example, you can tag a flag as "Marketing" and "DevOps", and then use these tags to determine who has read or write access for the flag. 
  * Maintainer
    * This is the individual who is primarily responsible for the flag.  By default, the maintainer will be the individual who created the flag. You can assign any member of your team as the maintainer for a particular flag. 
[block:callout]
{
  "type": "info",
  "title": "Flag keys can't be changed",
  "body": "In addition to the descriptors, every flag has a unique key which you set during flag creation. The key cannot be edited after the flag is created."
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Targeting, rollouts, and the kill switch"
}
[/block]
Each feature flag has a set of [targeting and rollout rules](doc:targeting-users) for each environment.  This means that you can create a different set of rollout rules for QA and production, allowing you to test a feature in QA before beginning a production rollout.

You can manage all of your [user targeting](doc:targeting-users) by navigating to a feature flag via the dashboard or a direct URL.  You can also manage whether your targeting rules are on or off by toggling the flag's [kill switch](doc:the-kill-switch).

[block:api-header]
{
  "type": "basic",
  "title": "Editing Variations"
}
[/block]
The Variations tab lets you edit your feature flag's variations.

For boolean flags, you can edit each variation’s name and description. For multivariate flags, you can edit any variation’s value, name, and description. You can also add and delete variations for a multivariate flag.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/477213a-checkout_multi.png",
        "checkout_multi.png",
        975,
        673,
        "#f8f8f7"
      ]
    }
  ]
}
[/block]
When you add, edit, or delete a feature flag's variations, the change will impact all environments within the project.
[block:callout]
{
  "type": "info",
  "title": "Editing variations",
  "body": "After a feature flag has been created, you cannot change the type of its variations.  For example, a feature flag that returns numbers cannot be edited to return strings."
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Deleting variations",
  "body": "When you delete a variation, custom rules that return that variation will be deleted. If a custom rule has a percentage rollout, the rollout for that variation will be set to zero.\n\nFinally, if the default rule returns the deleted variation, it will be changed to return the off variation."
}
[/block]
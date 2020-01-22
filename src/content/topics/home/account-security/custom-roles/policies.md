---
title: "Policies in custom roles"
excerpt: ""
---
## Overview
This topic explains how policies work in custom roles. Policies combine resources and actions into a set of statements that define what users can or cannot do in LaunchDarkly. 
## Understanding policies
Policies are represented as JSON arrays. 

Each element in the array is a statement represented as a JSON object with three attributes:
[block:parameters]
{
  "data": {
    "0-0": "`effect`",
    "1-0": "`resources / notResources`",
    "2-0": "`actions / notActions`",
    "2-1": "A list of action specifiers defining the actions to which the statement applies or does not apply.",
    "1-1": "A list of resource specifiers defining the resources to which the statement applies or does not apply.",
    "0-1": "Either `allow` or `deny`. 
This attribute defines whether the statement allows or denies access to the named resources and actions.",
    "h-0": "Attribute name",
    "h-1": "Description"
  },
  "cols": 2,
  "rows": 3
}
[/block]

<Callout intent="info">
  <Callout.Title>Inverse resource and action sets</Callout.Title>
   <Callout.Description>If you would like to create a statement using `notActions` or `notResources`, you must do so in the advanced editor. 
To learn more about the advanced editor, read [Writing policies in the advanced editor](#writing-policies-in-the-advanced-editor).</Callout.Description>
</Callout>

Here's an example statement:
[block:code]
{
  "codes": [
    {
      "code": "  {\n    \"effect\": \"deny\",\n    \"resources\": [\n      \"proj/*:env/production:flag/*\"\n    ],\n    \"actions\": [\n      \"*\"\n    ]\n  }",
      "language": "json",
      "name": "Statement"
    }
  ]
}
[/block]
If the environment ID `production` represents the account's Production environment, this statement will deny the user from modifying any feature flags in production. You can also name an "inverse" set of resources by using `notResources` in a statement:
[block:code]
{
  "codes": [
    {
      "code": "  {\n    \"effect\": \"allow\",\n    \"notResources\": [\n      \"proj/*:env/production:flag/*\"\n    ],\n    \"actions\": [\n      \"*\"\n    ]\n  }",
      "language": "json",
      "name": "notResources statement"
    }
  ]
}
[/block]
This statement explicitly allows all actions to feature flags across all environments *except* the production environment.

## Policy Algorithm 

The algorithm for determining whether access is allowed or denied by a policy is as follows:

* If any statement in the policy explicitly denies access to a resource and action, access is denied
* If a statement in the policy explicitly allows access to a resource and action, and no statement denies access, access is allowed

This means that statement order does not matter.

Note that users can be members of multiple custom roles, and each custom role has its own policy. If any custom role allows access, then access is allowed. This means that adding roles to a user can only increase that user's access. 
## <a name="writing-policies-in-the-advanced-editor"></a>Writing policies in the Advanced Editor
The LaunchDarkly UI has a structured series of fields you can use to create policies. 

To learn more about creating policies with the UI, read [Configuring custom roles](./custom-roles).

If you want to write a policy by hand, however, you can use the Advanced Editor. 

To access the Advanced Editor:


1. Navigate to **Account Settings**.
2. Click into the **Roles** tab.
3. Click **New Role**. The "Create a role" screen appears.
4. Click **Advanced editor**. The Advanced Editor opens.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5795000-Screen_Shot_2017-04-26_at_4.31.56_PM.png",
        "Screen Shot 2017-04-26 at 4.31.56 PM.png",
        753,
        355,
        "#e7ebf0"
      ],
      "caption": "The Advanced Editor."
    }
  ]
}
[/block]

<Callout intent="alert">
  <Callout.Title>Note: Resources are case-sensitive</Callout.Title>
   <Callout.Description>When constructing your policy by hand with the advanced editor, make sure to use the resource key, which is case sensitive. If the Production environment of your default project has the key `production` then `proj/default:env/Production` will not work to allow actions to be taken in your default project's production environment.</Callout.Description>
</Callout>

## Finding resource IDs
You can find resource IDs with the resource finder, which can be accessed via the “resource finder” link in either the simple or advanced editor, or using the keyboard shortcut `⌘` + `.` (Mac) or `ctl` + `.` (Windows).  All of your environments, members, feature flags, metrics, and roles will be available.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/VwaJyRpGT8KAqeTqztMU_Account_settings_2016-01-26_17-00-22.jpg",
        "Account_settings_2016-01-26_17-00-22.jpg",
        "1006",
        "1096",
        "#2b6fba",
        ""
      ],
      "border": false,
      "sizing": "smart"
    }
  ]
}
[/block]
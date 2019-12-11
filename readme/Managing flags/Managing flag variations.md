---
title: "Managing flag variations"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how to use a flag's **Variations** tab to create and edit your feature flag's variations and outlines the different types of flag variations.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/432a5a7-Screen_Shot_2019-08-01_at_10_54_12_AM.png",
        "Screen_Shot_2019-08-01_at_10_54_12_AM.png",
        2218,
        1118,
        "#f9f9f9"
      ],
      "caption": "A feature flag's page with the **Variations** tab called out."
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Understanding flag types"
}
[/block]
LaunchDarkly supports different flag types. 

* **Boolean flags** have two settings: `true` or `false`. 
* **Multivariate flags** have multiple settings that let you define different variations. Those settings include strings, numbers, JSON objects, or JSON arrays.

To learn more about creating different types of flags, read [Creating a feature flag](doc:creating-a-feature-flag).
[block:api-header]
{
  "title": "Managing flag variations"
}
[/block]
In the Variations tab, you can add, edit, or delete variations of existing flags. 

Boolean flags never need variations, because they can only be set to `true` or `false`. Multivariate flags, however, can be configured in many ways to create custom experiences or reactions.

Here are the flag modifications you can do in the flag's Variations tab:
* **Boolean flags**: you can edit each variation’s name and description. 
* **Multivariate flags**: you can edit any variation’s value, name, and description. You can also add and delete variations for a multivariate flag.

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
      ],
      "caption": "The Variations tab with different flag variations displayed."
    }
  ]
}
[/block]
When you add, edit, or delete a feature flag's variations, the change impacts environments within the project.
[block:callout]
{
  "type": "info",
  "title": "Changing variation types",
  "body": "After a feature flag has been created, you cannot change the type of its variations.  For example, you can't edit a feature flag that returns numbers to make it return strings instead."
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Deleting variations",
  "body": "When you delete a variation, custom rules that return that variation are also deleted. If a custom rule has a percentage rollout, the rollout for that variation is set to zero.\n\nIf the default rule returns the deleted variation, it will be changed to return the `off` variation instead."
}
[/block]
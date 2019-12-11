---
title: "Flag variations"
excerpt: ""
---
* **Boolean** flags have two variations: `true` and `false`. These work best for feature flags that turn things on and off.  
 * **String** flags return results as strings.
 * **Numeric** flags return results as number values.
 * **JSON** flags return JSON objects or JSON arrays. JSON names require double quotes.  LaunchDarkly validates your input as JSON if it's formatted in double quotes.

The type of variation value is detected automatically based on your input, and cannot be changed after the flag has been created. You will always have the option to return strings. You will specify the value for each variation (ex. `one-click-checkout`) with the option to add a human-readable name and description.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/906f913-cd14712-docs_multi.jpg",
        "cd14712-docs_multi.jpg",
        1280,
        720,
        "#f0f4f5"
      ]
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/85eab9c-Screen_Shot_2019-07-11_at_1.21.41_PM.png",
        "Screen Shot 2019-07-11 at 1.21.41 PM.png",
        800,
        304,
        "#d6dce2"
      ]
    }
  ]
}
[/block]
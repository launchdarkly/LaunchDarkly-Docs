---
title: "Visual Studio Code"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how to use the LaunchDarkly VSCode extension to interact with feature flags from within VSCode.

With the extension, you'll get the ability to: 
* See a tooltip with feature flag details when you hover over a feature flag key in your source code
* Autocomplete feature flag keys
* Open feature flags in LaunchDarkly (Default keybinding: ctrl+alt+g/⌘+alt+g)
[block:api-header]
{
  "title": "Installing the VSCode extension"
}
[/block]
To install the VSCode extension, [visit the Visual Studio Marketplace](https://ld.click/LDVisualStudioExtension).
[block:api-header]
{
  "title": "Extension settings"
}
[/block]
You can configure the extension with the following settings:
[block:parameters]
{
  "data": {
    "h-0": "Setting",
    "h-1": "Description",
    "h-2": "Default Value",
    "0-0": "`launchdarkly.sdkKey`",
    "1-0": "`launchdarkly.accessToken`",
    "2-0": "`launchdarkly.project`",
    "3-0": "`launchdarkly.env`",
    "4-0": "`launchdarkly.baseUri`",
    "5-0": "`launchdarkly.streamUri`",
    "6-0": "`launchdarkly.enableHover`",
    "7-0": "`launchdarkly.enableAutocomplete`",
    "0-1": "Your LaunchDarkly SDK key. Required.",
    "1-1": "Your LaunchDarkly API access token. Required.",
    "2-1": "Your LaunchDarkly project key, should match the provided SDK key. Required.",
    "3-1": "Your LaunchDarkly environment key, should match the provided SDK key.",
    "4-1": "The LaunchDarkly base uri to be used. Optional.",
    "5-1": "The LaunchDarkly stream uri to be used. Optional.",
    "6-1": "Enables flag info to be displayed on hover of a valid flag key.",
    "7-1": "Enable flag key autocompletion.",
    "7-2": "`true`",
    "6-2": "`true`",
    "5-2": "https://stream.launchdarkly.com",
    "4-2": "https://app.launchdarkly.com",
    "3-2": "Production",
    "0-2": "Find in Account Settings",
    "1-2": "Find in Account Settings",
    "2-2": "Find in Account Settings"
  },
  "cols": 3,
  "rows": 8
}
[/block]
Here's an example setting configuration with quick suggestions enabled:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"launchdarkly.accessToken\": \"api-xxx\",\n  \"launchdarkly.sdkKey\": \"sdk-xxx\",\n  \"launchdarkly.project\": \"default\",\n  \"launchdarkly.env\": \"production\",\n  \"editor.quickSuggestions\": {\n    \"other\": true,\n    \"comments\": false,\n    \"strings\": true\n  },\n}",
      "language": "text"
    }
  ]
}
[/block]
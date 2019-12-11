---
title: "Azure DevOps (formerly VSTS)"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how to use Azure DevOps (formerly known as Visual Studio Team Services, or VSTS) integration to control feature flags.

The Azure DevOps integration lets you perform controlled rollouts to manage feature releases. With our integration, you can define a percentage rollout for your feature flags as part of a release task. 
[block:api-header]
{
  "title": "Prerequisites"
}
[/block]
To connect LaunchDarkly and Azure DevOps, you need the following things:

* A LaunchDarkly API access token with **at least** write-level access.

To learn more, read [Personal API access tokens](doc:api-access-tokens).
[block:callout]
{
  "type": "info",
  "body": "If you're using custom roles, you can create an access token with a role targeting environments and feature flags relevant to your Azure DevOps projects.\n\nTo learn more, read [Custom roles](doc:custom-roles).",
  "title": "The Azure DevOps integration supports custom roles"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Connecting to LaunchDarkly"
}
[/block]
The extension is available on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=launchdarkly.launchdarkly-extension). 

To set up the integration, you must add the LaunchDarkly service endpoint to your Azure DevOps project so the extension can connect to your LaunchDarkly account.

To set up the extension:
1. Navigate to your Azure DevOps project dashboard.
2. Navigate to **Settings** > **Services**.
3. Enter a **Connection name**.
4. Enter your LaunchDarkly API **Access token**.
5. Click **Save**.


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0c88dde-Endpoint_testinglaunchdarkly.com_-_Microsoft_Team_Foundation_Server_2017-01-04_16-48-06.jpg",
        "Endpoint_testinglaunchdarkly.com_-_Microsoft_Team_Foundation_Server_2017-01-04_16-48-06.jpg",
        1168,
        566,
        "#1e578c"
      ],
      "sizing": "80",
      "caption": "The Azure DevOps \"Add new LaunchDarkly Connection screen\"."
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Creating the rollout task"
}
[/block]
The next step is to add our rollout task to your release definitions. 

To find the rollout task:
1. Navigate to the **Add tasks** dialog in Azure DevOps.
2. Click into the **Deploy** tab.
3. Choose **LaunchDarkly Rollout**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/OV5NfkgmS8WOGOY7HdJa_LaunchDarkly_Extension_-_Visual_Studio_Team_Services_2016-03-23_16-13-03.jpg",
        "LaunchDarkly_Extension_-_Visual_Studio_Team_Services_2016-03-23_16-13-03.jpg",
        "1286",
        "142",
        "#294659",
        ""
      ],
      "sizing": "80",
      "caption": "The LaunchDarkly Rollout task in Azure DevOps."
    }
  ]
}
[/block]
4. Choose the **Account** to update. This menu contains the service endpoints you configured in [Connecting to LaunchDarkly](#section-connecting-to-launchdarkly).
5. Set a percentage **Rollout** to apply to your feature flags.
6. Choose the **Flag state**. This controls whether the flag is on or off on release.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f5dfd20-Release-1_-_Visual_Studio_Team_Services_2017-01-04_17-21-30.jpg",
        "Release-1_-_Visual_Studio_Team_Services_2017-01-04_17-21-30.jpg",
        1340,
        336,
        "#dddfe1"
      ],
      "caption": "The task rollout settings."
    }
  ]
}
[/block]
In this example, any feature flags associated with the release are set to be rolled out to 10% of your users in the LaunchDarkly environment you select.
[block:api-header]
{
  "title": "Configuring authentication"
}
[/block]
To ensure the task can access your work items, you must allow Azure DevOps to authenticate with LaunchDarkly. This process differs based on which version of the integration you are using. If you don't know which version of the integration you are using, you are probably using the v3 version.

### v3 of the Azure DevOps integration
To configure authentication, define some custom variables to pass between Azure DevOps and LaunchDarkly:
1. Navigate to the **Configuration** tab of the release page in Azure DevOps.
2. Enter the **launchdarkly-account-name**.
3. Enter the **launchdarkly-project-name**.
4. Enter the **launchdarkly-pat**. This is the personal API access token.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7dc7594-Release-2_-_Visual_Studio_Team_Services_2017-05-04_16-14-58.jpg",
        "Release-2_-_Visual_Studio_Team_Services_2017-05-04_16-14-58.jpg",
        812,
        232,
        "#e5e4e0"
      ],
      "caption": "The v3 variable configuration."
    }
  ]
}
[/block]
### Pre-v3 versions of the Azure DevOps integration
To configure authentication, define some custom variables to pass between Azure DevOps and LaunchDarkly:
1. Navigate to the **Configuration** tab of the release page in Azure DevOps.
2. Enter the **accountName**.
3. Enter the **alternatePassword**.
4. Enter the **alternateUsername**.
5. Enter the **projectName**.
[block:api-header]
{
  "type": "basic",
  "title": "Associating a feature flag with a release"
}
[/block]
View the feature flags associated with an item from the **Work items** page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c052923-LaunchDarkly_VSTS_Extension_Team_Iteration_1_-_Visual_Studio_Team_Services_2017-01-04_18-28-52.jpg",
        "LaunchDarkly_VSTS_Extension_Team_Iteration_1_-_Visual_Studio_Team_Services_2017-01-04_18-28-52.jpg",
        992,
        922,
        "#4d5459"
      ],
      "caption": "The LaunchDarkly work items page."
    }
  ]
}
[/block]
When you release to an environment, the rollout task updates any flag you linked with a work item.

This also updates the LaunchDarkly section on your release page. It shows all the feature flags affected by this release.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/594a5d5-Release-1_-_Visual_Studio_Team_Services_2017-01-04_18-27-50.jpg",
        "Release-1_-_Visual_Studio_Team_Services_2017-01-04_18-27-50.jpg",
        852,
        378,
        "#e1e0de"
      ],
      "sizing": "original",
      "border": false,
      "caption": "The LaunchDarkly section of the release page."
    }
  ]
}
[/block]
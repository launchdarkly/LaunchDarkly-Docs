---
title: "Creating a feature flag"
excerpt: ""
---
## Overview
This topic explains how to create feature flags in LaunchDarkly. You can also clone and modify an existing flag to create new ones.
<Callout intent="info">
  <CalloutTitle>You can always use the API instead</CalloutTitle>
   <CalloutDescription>You can also use the LaunchDarkly API to create and manage feature flags, as well as do many other tasks. LaunchDarkly is an API-first product, so everything you can do in the LaunchDarkly API is also available as an API endpoint.
To learn more, read our [REST API Documentation](./rest-api).
  </CalloutDescription>
</Callout>

## Creating a feature flag
You can create and modify feature flags from the dashboard. 

To learn more about the dashboard, read [The dashboard](./the-dashboard).

To create a feature flag:

1. Log into LaunchDarkly. The dashboard appears.
2. Click **New**.  The "Create a feature flag" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5ca9653-docs_create_flag.jpg",
        "docs_create_flag.jpg",
        2000,
        1125,
        "#f5f6f5"
      ],
      "caption": "The dashboard, with the New button called out."
    }
  ]
}
[/block]
3. Enter a unique, human-readable **Name**.
4. Enter a unique flag **Key**. You'll use this key to reference the flag in your code. A suggested key auto-populates from the name you enter, but you can customize it if you wish.
5. (Optional) Enter a **Description** of the flag. A brief, human-readable description helps your team members understand what the flag is for.
6. (Optional) Click into the **Tags** dropdown and choose one or more tags for your flag. 
<Callout intent="info">
  <CalloutTitle>Tags let you sort flags into groups</CalloutTitle>
   <CalloutDescription>Tags are useful for managing flag permissions using custom roles. For example, you can tag a flag as \"Marketing\" and \"DevOps\", and then use these tags to determine who has read or write access for the flag.
To learn more, read [Custom roles](./custom-roles).</CalloutDescription>
</Callout>
7. Choose an option in the **Flag variations** dropdown. To learn more, read [Flag variations](./flag-variations).
8. (Optional) Specify details for your **Variation**. To learn more, read [Flag variations](./flag-variations).
9. (Optional) Select the **This is a permanent flag** checkbox. If you choose this option, no one will be able to delete this flag after it is created.
10. (Optional) Select the **Make this flag available to client-side SDKs** checkbox. If you choose this option, the flag will be pushed out to client-side SDKs. 
<Callout intent="info">
  <CalloutTitle>Flags are not available on the client-side by default</CalloutTitle>
   <CalloutDescription>If you're using a client-side SDK, you must make each flag you wish to appear on the frontend available to the client. Making flags available on the client side may have security implications you should consider. 
To learn more, read [Client-side and server-side SDKs](./client-side-and-server-side).</CalloutDescription>
</Callout>
1
1. Click **Save Flag**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3fc0aa7-Screen_Shot_2019-07-11_at_12.52.34_PM.png",
        "Screen Shot 2019-07-
1. at 12.52.34 PM.png",
        795,
        882,
        "#fafbfb"
      ],
      "caption": "The Create a feature flag screen."
    }
  ]
}
[/block]
That's it! You just created a feature flag. You can see it in the dashboard.
## Configuring the same flag in different environments
When you create a feature flag, the flag is scoped to the project you created it from. All environments within a project have the same set of feature flags. 
<Callout intent="info">
  <CalloutTitle>Understanding flag scopes</CalloutTitle>
  <CalloutDescription>Flag scoping refers to the parts of LaunchDarkly where a flag is available or used. If a flag is scoped at the project level, it is available to all environments within the project, because projects contain environments.
To learn more about projects, read [Projects](./projects).\nTo learn more about environments, read [Environments](./environments)."
  </CalloutDescription>
</Callout>
  
Flag configuration settings are specific to each environment. The changes you make in one environment do not apply to the same flag in any other environment. If you want to, you can configure the same flag in a unique way for every environment you have. 

To configure a flag:

1. Navigate to the dashboard.
2. Click the **environment name** in the top left corner. The Switch environment menu appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c5856d1-Screen_Shot_2019-07-11_at_3.23.15_PM.png",
        "Screen Shot 2019-07-
1. at 3.23.
1. PM.png",
        707,
        545,
        "#ede6e7"
      ],
      "caption": "The Switch environment menu."
    }
  ]
}
[/block]
3. Search for the environment you wish to switch to and click on it, or choose it from the list. The dashboard for the new environment appears.
<Callout intent="info">
  <CalloutTitle>Look for the header change</CalloutTitle>
   <CalloutDescription>You know you're in a different environment because the name displayed in the top left corner changes when you select that environment from the list.</CalloutDescription>
</Callout>
4. Find the flag you wish to modify and make whatever changes you like.
## Cloning flags
You can also create new flags by cloning existing flags. Instead of creating an entirely new flag with complicated configuration, you can clone and modify an existing flag with similar configuration. 

When you clone a flag, LaunchDarkly makes a new flag and copies the original flag's targeting configuration for all environments, including whether the flag is toggled on or off.

To clone a flag:

1. Navigate to the dashboard.
2. Find the flag you wish to clone and click its name. The flag detail page opens.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/147fb79-Screen_Shot_2019-07-11_at_3.33.42_PM.png",
        "Screen Shot 2019-07-
1. at 3.33.42 PM.png",
        712,
        161,
        "#f4f4f5"
      ]
    }
  ]
}
[/block]
3. Click into the flag's **Settings** tab. The flag Settings menu opens.
4. Click **Clone This Flag**. The "Clone feature flag" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/96b3e38-Screen_Shot_2019-07-11_at_3.34.46_PM.png",
        "Screen Shot 2019-07-
1. at 3.34.46 PM.png",
        1012,
        176,
        "#f4f4f4"
      ]
    }
  ]
}
[/block]
5. Enter a unique, human-readable **Name**.
6. Enter a unique flag **Key**. You'll use this key to reference the flag in your code. A suggested key auto-populates from the name you enter, but you can customize it if you wish.
7. (Optional) Enter a **Description** of the flag. A brief, human-readable description helps your team members understand what the flag is for.
8. (Optional) Click into the **Tags** dropdown and choose one or more tags for your flag. 
<Callout intent="info">
  <CalloutTitle>Tags sort flags into groups</CalloutTitle>
   <CalloutDescription>Tags are useful for managing flag permissions using custom roles. For example, you can tag a flag as \"Marketing\" and \"DevOps\", and then use these tags to determine who has read or write access for the flag.
To learn more, read [Custom roles](./custom-roles).</CalloutDescription>
</Callout>
9. Click **Save Flag.** You are taken to the new flag's details page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/aecd49f-Screen_Shot_2019-07-11_at_3.35.46_PM.png",
        "Screen Shot 2019-07-
1. at 3.35.46 PM.png",
        449,
        612,
        "#f1f5f7"
      ]
    }
  ]
}
[/block]
The new flag also appears in the dashboard, where you can search for it or access it any time.
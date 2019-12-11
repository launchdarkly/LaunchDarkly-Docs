---
title: "Azure"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how to integrate LaunchDarkly with Microsoft Azure.

LaunchDarkly is included in Azure AD's App Gallery. Azure provides a LaunchDarkly application template that facilitates configuration.
[block:api-header]
{
  "title": "Integrating LaunchDarkly with Azure"
}
[/block]
To integrate LaunchDarkly with Azure:
1. Log in to Azure.
2. Navigate to your Enterprise applications.
3. Click **New application**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c01bf29-01add-app.png",
        "01add-app.png",
        1190,
        677,
        "#f6f5f7"
      ],
      "sizing": "full",
      "caption": "The \"New application\" option is called out in this image."
    }
  ]
}
[/block]
4. Search for the LaunchDarkly application. 
5. Once you've added it, follow the [Azure LaunchDarkly Application Tutorial](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-saas-launchdarkly-tutorial).
[block:callout]
{
  "type": "info",
  "body": "During configuration, we recommend using the identifier `user.mail` provided that every user has their email addresses attribute set. \n\nIf you haven't set attributes for every user, use the identifier `user.userprincipalname`.",
  "title": "Azure User Identifier Guidelines"
}
[/block]
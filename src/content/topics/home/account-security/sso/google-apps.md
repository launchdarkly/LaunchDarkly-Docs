---
title: "Google Apps"
excerpt: ""
---
## Overview

This topic explains how to configure Google Apps to support SSO in LaunchDarkly.

## Prerequisites

To configure SSO for LaunchDarkly with Google Apps, you must complete the following prerequisite:

* Configure SAML for authentication. For more information, read the [Google knowledge base](https://support.google.com/a/answer/6087519).

Use the table below to correctly configure Google fields for LaunchDarkly.
[block:parameters]
{
  "data": {
    "h-0": "Google field",
    "h-1": "LaunchDarkly settings",
    "0-0": "ACS URL",
    "0-1": "Use LaunchDarkly's Assertion Consumer Service URL value.",
    "1-0": "Entity ID",
    "1-1": "Use LaunchDarkly's Entity ID value.",
    "2-0": "Start URL",
    "2-1": "Use LaunchDarkly's Start URL value.",
    "3-0": "Signed Response",
    "3-1": "Check this box.",
    "4-0": "Name ID",
    "4-1": "Select 'Basic Information' and 'Primary Email'",
    "5-0": "Name ID Format",
    "5-1": "Select 'EMAIL'.",
    "6-0": "Attribute Mapping",
    "6-1": "Enter `role` as the 'application attribute', and select the [custom user attribute](https://support.google.com/a/answer/6208725?hl=en) that corresponds to the desired role."
  },
  "cols": 2,
  "rows": 7
}
[/block]

## Configuring SSO for LaunchDarkly with GSuite
Before you create the LaunchDarkly app in GSuite, you must create the LaunchDarkly specific fields for roles and custom roles. 

To configure these fields:

1. Log into GSuite.
2. Navigate to your user directory by clicking **Directory** and then **Users**.
3. Click the **Manage user attributes** icon. A popup screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0964f30-manageruserattr.png",
        "manageruserattr.png",
        986,
        499,
        "#e6ebf6"
      ],
      "sizing": "80",
      "caption": "The \"Manage user attributes\" icon."
    }
  ]
}
[/block]
4. Select **Add Custom Category**.
5. Name the custom category whatever you like. In the example below, we used **LaunchDarkly Attributes**. 
6. Add *`role` and `customR0les` fields.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/91f0ebb-ldattributes.png",
        "ldattributes.png",
        674,
        435,
        "#fbfbfb"
      ],
      "sizing": "80",
      "caption": "The \"LaunchDarkly Attributes\" screen."
    }
  ]
}
[/block]

<Callout intent="info">
  <Callout.Title>Allow multiple values for custom roles</Callout.Title> 
  <Callout.Description>Set the \"Multiple values\" field for `customRoles` to **Yes**. Some users may have more than one custom role, which requires multiple values.</Callout.Description>

</Callout>

## Adding LaunchDarkly as a Custom SAML Application
Next, you must add LaunchDarkly to your GSuite apps.

To add LaunchDarkly:

1. Navigate to **Apps** > **SAML Apps**. 
2. Click the plus button to **Add** an app.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2397f89-addsamlapp.png",
        "addsamlapp.png",
        793,
        896,
        "#f6f7f9"
      ],
      "sizing": "80",
      "caption": "The SAML apps menu with the \"Add\" button called out."
    }
  ]
}
[/block]
3. Select **Setup my own Custom App** to configure LaunchDarkly. The setup workflow initiates.
4. In step 2 of the workflow, enter the information from the setup workflow into LaunchDarkly's **Security** tab under **Edit SAML Configuration**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1100826-idpinfo.png",
        "idpinfo.png",
        632,
        603,
        "#f9f7f7"
      ],
      "sizing": "80",
      "caption": "The Google IdP information window."
    }
  ]
}
[/block]
5. In step 4 of the workflow, provide the **Assertion consumer service URL**, **entity ID **and **start URL** for your LaunchDarkly account. To find them, click **Edit your SAML configuration** on the LaunchDarkly **Security** tab.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/27d624f-ldaccountsettings.png",
        "ldaccountsettings.png",
        1452,
        1322,
        "#f5f5f5"
      ],
      "sizing": "80",
      "caption": "LaunchDarkly's SAML Configuration screen."
    }
  ]
}
[/block]
6. In step 3, enter the name of the app.
7. In step 4, enter LaunchDarkly’s service provider details as shown in the screenshot below.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9f1ff21-serviceproviderdetails.png",
        "serviceproviderdetails.png",
        823,
        467,
        "#f4f4f4"
      ],
      "sizing": "80",
      "caption": "LaunchDarkly's service provider details."
    }
  ]
}
[/block]
8. In step 5, map the LaunchDarkly attributes `firstName` and `lastName` to Google’s “Basic Information” fields of the same names. Map `role` and `customRole` to our LaunchDarkly attributes as shown below.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/53d1bd5-fullattrmapping.png",
        "fullattrmapping.png",
        715,
        411,
        "#f4f4f4"
      ],
      "sizing": "80",
      "caption": "The Attribute Mappings screen."
    }
  ]
}
[/block]

<Callout intent="alert">
  <Callout.Title>Names are case sensitive</Callout.Title>
   <Callout.Description>In the screenshot above, the names in the lefthand columns map to those present in LaunchDarkly. You must name them exactly as shown or configuration will fail.</Callout.Description>
</Callout>
You've successfully connected LaunchDarkly to GSuite.

## Assigning roles & custom roles via GSuite
Now that the application is configured, you can assign roles to users. 

To assign roles:

1. Log into GSuite.
2. Navigate to **Directory** > **Users**. 
3. Click on the user that you want to assign roles to and choose **Account** to bring up the user's account settings.
4. Click **Edit** beneath “Manage user attributes” to add the user’s role(s) to the corresponding attribute fields. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c35030a-updateuser.png",
        "updateuser.png",
        604,
        420,
        "#fcfcfc"
      ],
      "sizing": "80",
      "caption": "The \"Update User\" screen."
    }
  ]
}
[/block]
5. Click **Update User.** 

That’s it! The next time your user logs into LaunchDarkly through GSuite, their roles will update. If this is a brand new LaunchDarkly team member, an account will be created automatically with the roles you specified.
---
title: "Okta"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how Okta and LaunchDarkly work together to provide user management for your user base. Okta and LaunchDarkly communicate through the System for Cross-domain Identity Management (SCIM) API specification. SCIM is designed to make managing user identities in cloud-based applications and services easier.

A LaunchDarkly app is available in Okta. You can connect LaunchDarkly and Okta through the Okta UI, give Okta permissions to modify users in LaunchDarkly, and even integrate LaunchDarkly custom roles with Okta.
[block:api-header]
{
  "title": "Prerequisites"
}
[/block]
To use Okta with LaunchDarkly, you must complete the following prerequisites:

* Administrator privileges in LaunchDarkly
* Administrator privileges in Okta
* Follow Okta's documentation to [Enable Single Sign-On with SAML](
https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-LaunchDarkly.html)
* You must have access to the email addresses of the users you wish to configure
[block:api-header]
{
  "title": "Using Okta to manage LaunchDarkly users with SCIM"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "SCIM-based user provisioning is an enterprise feature",
  "body": "User provisioning with SCIM is only available to customers on our enterprise plans. If you're interested in learning more about our enterprise plans, contact [sales@launchdarkly.com](mailto:sales@launchdarkly.com?Subject=Data%20Export)."
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "I have more than one SCIM connection!",
  "body": "If you get an error during configuration that you cannot add an additional SCIM connection, go to the **Security** tab in LaunchDarkly's **Account Settings** and click **Disconnect SCIM.** \n\nThis allows you to connect Okta's SCIM-based protocols to LaunchDarkly."
}
[/block]
To get started, navigate to the Okta Administrator Dashboard to add an application and search for LaunchDarkly.

If you have not configured SAML SSO for LaunchDarkly in Okta, you must do that first. To learn more, read [How to configure SAML 2.0 for LaunchDarkly](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-LaunchDarkly.html) in Okta's documentation.

To authorize Okta to manage your LaunchDarkly users:
1. Log in to Okta as an administrator. 
2. Navigate to **Applications** and click **Add Application*.*
3. In the search bar, type "LaunchDarkly". The LaunchDarkly app appears in the search results.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/dbcec37-image__2_.png",
        "image__2_.png",
        860,
        275,
        "#c9dae9"
      ],
      "caption": "The **Add Application** screen with search results populating."
    }
  ]
}
[/block]
4. Click **Add**. The **General Settings** page for the LaunchDarkly app appears.
5. (Optional) Give the app a custom name by modifying the **Application Label**.
6. (Optional) Configure the **Application Visibility** checkboxes however you prefer.
7. Click **Done**. The LaunchDarkly Application page appears.

You just activated the LaunchDarkly app in Okta.
[block:api-header]
{
  "title": "Granting Okta permission to manage users in LaunchDarkly"
}
[/block]
This procedure tells you how to connect the LaunchDarkly app and Okta by using SCIM. This allows you to provision, manage, and deprovision LaunchDarkly users in Okta.

1. Navigate to the LaunchDarkly app in Okta.
2. Click the **Provisioning** tab. The Integration page opens. 
3. Click **Configure API Integration**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1bf65d6-image_3.png",
        "image (3).png",
        859,
        646,
        "#e2ebf2"
      ],
      "caption": "The Integration page."
    }
  ]
}
[/block]
4. Check the **Enable API Integration** checkbox and click **Save**. An authorization window appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/fee6221-image__4_.png",
        "image__4_.png",
        624,
        163,
        "#f6f6f7"
      ],
      "caption": "The **Authenticate with LaunchDarkly** button."
    }
  ]
}
[/block]
5. Click **Authenticate with LaunchDarkly**. A new browser window opens describing what permissions Okta requires to integrate with LaunchDarkly. Review the permissions and verify that you are comfortable granting them. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7f4d6fc-Screen_Shot_2019-09-11_at_2.33.17_PM.png",
        "Screen Shot 2019-09-11 at 2.33.17 PM.png",
        966,
        646,
        "#f4f7f6"
      ],
      "caption": "The Okta permissions window."
    }
  ]
}
[/block]
6. Click **Authorize**. You return to the Integration page.
7. Click **Save**. The To App page appears.
8. In the Provisioning to App section, click **Edit**. Fields on the screen become configurable. Set the following fields to **Enable**:
* Create Users
* Update User Attributes
* Deactivate Users
9. Click **Save**.

You just connected Okta to LaunchDarkly.
[block:api-header]
{
  "title": "Setting email addresses as the username"
}
[/block]
Next, you must configure Okta to recognize email addresses as the usernames for individual users.
[block:callout]
{
  "type": "info",
  "title": "How LaunchDarkly and Okta use email addresses",
  "body": "LaunchDarkly stores emails in lowercase, and does not differentiate between usernames and email addresses. You may use one email address with one LaunchDarkly account at a time. \n\nOkta uses email addresses as SCIM usernames. If you change a username or email address in Okta or LaunchDarkly after configuration, the corresponding value also changes.\n\nOnly use lowercase letters to configure email addresses. Email addresses including uppercase letters cause an error."
}
[/block]
1. Navigate to the LaunchDarkly app in Okta.
2. Click the **Sign On** tab. The Settings page opens. 
3. Use the dropdown to set the Application username format to **Email**. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9328d4a-Screen_Shot_2019-09-11_at_2.32.20_PM.png",
        "Screen Shot 2019-09-11 at 2.32.20 PM.png",
        1120,
        536,
        "#f2f3f4"
      ]
    }
  ]
}
[/block]
4. Click **Save**.

You have successfully connected Okta and LaunchDarkly
[block:api-header]
{
  "title": "Assigning custom roles in Okta"
}
[/block]
You can assign custom roles that you created in LaunchDarkly to users through the Okta UI. Follow the procedure below to learn how.
[block:callout]
{
  "type": "info",
  "body": "SCIM setup takes precedence over LaunchDarkly's configuration options. \n\nIf you begin to manage users and their role assignment in Okta, you must continue managing them in Okta for additional changes to take effect.",
  "title": "If you use Okta to manage users, you cannot change back to LaunchDarkly."
}
[/block]
Use Okta's Group Assignment feature to set up custom roles for a LaunchDarkly user or group. The roles you set up in Okta are passed to LaunchDarkly as user attributes. 

To learn more about user attributes, read [Setting user attributes](doc:private-user-attributes).
[block:callout]
{
  "type": "warning",
  "body": "If a user has multiple Okta groups representing different roles, they are assigned permissions for all of their roles. \n\nFor example, if a user is in both a Marketing role and a more permissive Engineering role, they can use the permissions granted by the Engineering role.",
  "title": "Users with multiple roles have permissions combining them"
}
[/block]
Follow this procedure to assign custom roles to groups:

1. Navigate to the LaunchDarkly application's **General Settings** page.
2. Navigate to the **Assignments** tab. 
3. In the **Assign** dropdown, choose **Assign to Groups**.  
[block:callout]
{
  "type": "info",
  "body": "You can also specify custom roles for individual users by performing this procedure after choosing **Assign to Users** in step 3.",
  "title": "Assigning custom roles to one user"
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7109ca5-image__8_.png",
        "image__8_.png",
        316,
        397,
        "#d3e1eb"
      ],
      "caption": "The **Assign** dropdown."
    }
  ]
}
[/block]
4. Find the groups you want to assign custom roles to and click **Assign**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0a6a5e7-Screen_Shot_2019-09-16_at_4.05.43_PM.png",
        "Screen Shot 2019-09-16 at 4.05.43 PM.png",
        562,
        418,
        "#e8eef2"
      ]
    }
  ]
}
[/block]
5. In the "LaunchDarkly Custom Roles" field, click **Add Another** to open a text box.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c1f6b62-Screen_Shot_2019-09-16_at_4.06.41_PM.png",
        "Screen Shot 2019-09-16 at 4.06.41 PM.png",
        542,
        417,
        "#e7edf1"
      ]
    }
  ]
}
[/block]
6. Enter the key for the custom role you wish to assign to this group. This connects one role to the selected group.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/befac18-Screen_Shot_2019-09-16_at_4.05.56_PM.png",
        "Screen Shot 2019-09-16 at 4.05.56 PM.png",
        560,
        531,
        "#e2eaf0"
      ]
    }
  ]
}
[/block]
7. Add more custom roles to this group by clicking **Add Another** and repeating step 6.
8. Click **Save and Go Back**
[block:api-header]
{
  "title": "Adding custom roles to new users"
}
[/block]
If you have custom roles already configured in Okta, you can set up custom roles in **Attribute Mapping** when you first set up a user in Okta:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/26900db-Screen_Shot_2019-09-11_at_2.31.31_PM.png",
        "Screen Shot 2019-09-11 at 2.31.31 PM.png",
        1116,
        1038,
        "#f9f9fa"
      ],
      "caption": "The Okta LaunchDarkly Attribute Mappings screen with custom roles available."
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Removing existing roles",
  "body": "SAML ignores empty fields if used in user roles or custom roles. \n\nIf you want to clear all existing roles for a user, enter an empty string \"\" into the field."
}
[/block]
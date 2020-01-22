---
title: "Personal API access tokens"
excerpt: ""
---
## Overview

This topic explains how to use personal API access tokens to authenticate with the [LaunchDarkly REST API](https://apidocs.launchdarkly.com), as well as constraints and suggestions for implementing them.

<Callout intent="info">
  <Callout.Title>Personal API access tokens are private</Callout.Title>
   <Callout.Description>Only you can see the tokens you create; other team members cannot see them. 
Administrators can delete your tokens, but cannot see their values.</Callout.Description>
</Callout>

## Scoping personal API access tokens

You can scope your personal API tokens to restrict the set of operations they can perform. For example, you can build an integration that only has read access to the REST API. 

The available scoping options are:

* **Built-in roles**: Gives a token the same permissions as a Reader, Writer, or Admin.
* **[Custom roles](./custom-roles)**: Gives a token the same permissions as one of your team's existing custom roles. This option is only available if your LaunchDarkly plan includes custom roles.
* **In-line custom roles**: Gives a token a custom set of permissions in-line, rather than specifying it as an existing custom role. This option is only available if your LaunchDarkly plan includes custom roles.

<Callout intent="warning">
  <Callout.Title>Never share a personal API access token</Callout.Title>
   <Callout.Description>Personal API access tokens are unique to the person who creates them. If you share your access token with others, they may be able to use it to impersonate you, or perform actions with it that could later be attributed to you erroneously.</Callout.Description>
</Callout>

## Understanding personal API access tokens' permissions

When you create a new token, it has the same permissions that you do. Your tokens can never do more than you can in LaunchDarkly.

<Callout intent="info">
 <Callout.Title>Personal API access tokens and the principle of least privilege</Callout.Title>
 <Callout.Description>As a best practice, we recommend giving your tokens the smallest scope required for your integration. 
For example, if your integration is not designed to modify your **Production** environment, use a custom role or inline policy to restrict access appropriately.</Callout.Description>
</Callout>

If your own permissions are ever reduced, tokens you have created have reduced scope as well. 

For example, if you are a Writer and create a Writer token, but then are downgraded to a Reader, your Writer token will behave like a Reader token.

## Creating personal API access tokens

You can create a personal API access token from the **Authorizations** tab on the **Account settings** page.

To create a personal access token:

1. Navigate to the **Account settings** page.
2. Click into the **Authorization** tab and find the **Access tokens** section.
3. Click **Token**. The **Create an access token** screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/44c7ab0-Screen_Shot_2019-07-22_at_2.38.42_PM.png",
        "Screen Shot 2019-07-22 at 2.38.42 PM.png",
        643,
        361,
        "#f9fafb"
      ],
      "caption": "The Create an access token screen."
    }
  ]
}
[/block]
4. Give your token a human-readable **Name**.
5. Assign a **Role** to the token by choosing one from the dropdown.
6. Click **Save Token**. The new token appears in the **Access tokens** page.

You can also manage existing tokens from the **Authorizations** tab. From that tab, you can change the scope of your tokens or delete them. 

If you delete a token, API calls made with that token will return `401 Unauthorized` status codes.
<Callout intent="alert">
  <Callout.Title>Rotate your tokens regularly</Callout.Title>
   <Callout.Description>As a best practice, we recommend rotating your tokens regularly to prevent tokens from becoming outdated, such as when team members leave.
If you remove a team member from your account, their personal API access tokens become invalid. We recommend updating integrations to use new access tokens before removing team members.</Callout.Description>
</Callout>

## Restricting who can create and manage personal API access tokens

By default, all team members can create access tokens limited to their existing permissions. Team members with `reader` level permissions can only create tokens with `reader` permissions, whereas admins and owners can create tokens with any permission level.

You can restrict team members from creating or managing access tokens with custom roles.

To learn more, read [Actions in custom roles](./actions-in-custom-roles).
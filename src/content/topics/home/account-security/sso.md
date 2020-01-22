---
title: "Enabling single sign-on"
excerpt: ""
---
## Overview
This topic explains what Single Sign-On (SSO) features are available in LaunchDarkly and how to configure your environment for SSO.
<Callout intent="info">
  <Callout.Title>Only available to enterprise customers</Callout.Title>
   <Callout.Description>Single sign-on and user provisioning are only available to customers on our enterprise plans. If you're interested in learning more about our enterprise plans, contact [sales@launchdarkly.com](mailto:sales@launchdarkly.com?Subject=Single+sign-on).
SSO allows your team to authenticate with LaunchDarkly using the same identity provider (IdP) you use for your other internal and external services. LaunchDarkly implements SSO via the SAML 2.0 protocol.</Callout.Description>
</Callout>

Administrators can use SSO with their IdP to manage access rights in LaunchDarkly. After SSO is enabled, administrators can also enable System for Cross-domain Identity Management (SCIM) provisioning through their IdP. 
## Setting up SSO in LaunchDarkly
If you're a LaunchDarkly administrator or account owner, you can configure LaunchDarkly to use your IdP for team member authentication. 


1. Log in to LaunchDarkly as an administrator or account owner.
2. Navigate to the [Security tab](https://app.launchdarkly.com/settings/security) on the Account Settings page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f83a328-Screenshot_2019-06-04_Account_settings4.png",
        "Screenshot_2019-06-04 Account settings(4).png",
        483,
        221,
        "#f2f2f2"
      ]
    }
  ]
}
[/block]
3. Click **Configure SAML**. The SAML configuration screen appears, pre-populated with information you need to set up LaunchDarkly as a SAML application with your identity provider.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ff1ae07-saml-config-sidebar.png",
        "saml-config-sidebar.png",
        859,
        730,
        "#323f53"
      ]
    }
  ]
}
[/block]
You cannot complete SAML configuration without configuration details from your IdP. 

## Configuring an External IdP

We've provided configuration guidance for some of the IdPs LaunchDarkly supports. 

The supported IdPs are:

* [Okta](./okta) 
* [OneLogin](./onelogin) 
* [Google Apps](./google-apps)  
* [ADFS](./adfs) 
* [Azure](./azure) 

We have also tested the following identity providers:

* PingIdentity
* Centrify
* SecureAuth
* DuoMobile

Specific configuration details vary between IdPs, but the basic process is the same regardless of which IdP you use.

To configure LaunchDarkly with an external IdP:

1. Create the SAML application in your IdP by following the IdP-specific instructions listed above.
2. Copy the SAML configuration metadata from the IdP into LaunchDarkly's [SAML configuration screen](https://app.launchdarkly.com/settings/security).
3. Click **Save.**

## User provisioning with SCIM

We also have a SCIM API available to allow for user provisioning from IdPs. 

We have pre-built integrations with the following providers:

* [Okta](./okta) 
* [OneLogin](./onelogin) 

You may also configure your provider manually with the following information:

* SCIM Base URI: `https://app.launchdarkly.com/trust/scim/v2`
* Authorization method: `oauth2`
* Authorization URI: `https://app.launchdarkly.com/trust/oauth/authorize`
* Access token URI: `https://app.launchdarkly.com/trust/oauth/token`
* Unique Identifier field for users: `userName`
If you go down this route, you will also need a client ID and client secret. Please contact us at [support@launchdarkly.com](mailto:support@launchdarkly.com?Subject=SCIM+OAuth+client+request) and we will generate these for you.

We support two custom attributes for SCIM users: `role` and `customRole`. For more information about these attributes, see [Custom Attributes](#custom-attributes).
## User provisioning with SSO
LaunchDarkly automatically creates accounts for new team members who sign in through your IdP. Every time a team member signs into LaunchDarkly, LaunchDarkly also updates the team member's profile with user attributes submitted by the IdP. 

You can configure your identity provider to send the following attributes when the team member is signing into LaunchDarkly. Each attribute is optional and can also be managed from LaunchDarkly. Attribute names should be specified using "basic" format.
<Callout intent="info">
 <Callout.Title>First-time users must sign into LaunchDarkly through your IdP
  <Callout.Description>New team members will not be able to sign in from LaunchDarkly's login screen until they have accessed LaunchDarkly through your IdP at least once.</Callout.Description>
</Callout>

## <a name="custom-attributes"></a>Custom attributes
These attributes are available for both SSO provisioning and SCIM provisioning. 
[block:parameters]
{
  "data": {
    "h-0": "Attribute name",
    "h-1": "Description",
    "0-0": "`role`",
    "0-1": "One of three built-in LaunchDarkly roles: \n* `reader`\n* `writer` \n* `admin` 
If unspecified, the default role is `reader`.",
    "1-0": "`customRole`",
    "1-1": "A list of keys for [custom roles](./custom-roles) to give to the team member. These replace the member's existing custom roles. 
If a member has any custom roles, they supersede the built-in role."
  },
  "cols": 2,
  "rows": 2
}
[/block]
SSO supports the following naming attributes:

* `firstName` 
* `lastName`

SCIM provisioning uses the standard naming attributes:

* `givenName` 
* `familyName`

## Test-drive Mode

When LaunchDarkly receives a valid SAML configuration, SSO enters test-drive mode. Test-drive mode lets you test the SSO integration before deploying the change to the rest of your team.

When SSO is in test-drive mode, you can test authentication through your IdP, but LaunchDarkly's login screen will continue to use regular password-based authentication. 

To use SSO in test-drive mode:

1. Log into LaunchDarkly as an administrator. 
2. Navigate to the Team Management screen.
3. Click **Simulate SSO**. This performs the same authentication request flow that occurs for LaunchDarkly-initiated SSO logins.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/946c1e1-Screenshot_2019-06-04_Account_settings3.png",
        "Screenshot_2019-06-04 Account settings(3).png",
        542,
        363,
        "#e6ecf0"
      ],
      "caption": "The test-drive enablement option."
    }
  ]
}
[/block]

## Enabling SSO

When you're satisfied with the SSO integration and are ready to enable it for all team members in LaunchDarkly, enable SSO by following the procedure below.

To enable SSO:

1. Log in to LaunchDarkly as an administrator or account owner.
2. Navigate to the [Security tab](https://app.launchdarkly.com/settings/security) on the Account Settings page.
3. Click **Enable SSO**. A confirmation screen appears.
4. Click **Enable**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f3c3778-Screenshot_2019-06-04_Account_settings2.png",
        "Screenshot_2019-06-04 Account settings(2).png",
        554,
        369,
        "#c0c0c2"
      ],
      "caption": "The enable SSO confirmation screen."
    }
  ]
}
[/block]
Once SSO is enabled, the LaunchDarkly login procedure defers to your identity provider for authentication. Users will no longer be able to log in with their existing LaunchDarkly password. 

Additionally, LaunchDarkly administrator and account owners will no longer be able to invite members to the team. The only way to add additional team members is to have them log in through your IdP.

## Disabling SSO

You can disable SSO at any time. When SSO is disabled, any existing members will still be able to sign into LaunchDarkly with their previous passwords, or reset their passwords.

Users that were provisioned through SSO will be required to reset their password in order to sign into LaunchDarkly.

To disable SSO:

1. Log in to LaunchDarkly as an administrator or account owner.
2. Navigate to the [Security tab](https://app.launchdarkly.com/settings/security) on the Account Settings page.
3. Click **Disable SSO**. A confirmation screen appears.
4. Click **Disable**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4feaefc-Screenshot_2019-06-04_Account_settings1.png",
        "Screenshot_2019-06-04 Account settings(1).png",
        543,
        292,
        "#d1d0d0"
      ],
      "caption": "The disable SSO confirmation screen."
    }
  ]
}
[/block]

## Enabling SCIM Provisioning

[block:callout]
{
  "type": "warning"
  <Callout.Title>SSO is required</Callout.Title>
   <Callout.Description>You must be a LaunchDarkly administrator and have SSO enabled to complete the following procedure."</Callout.Description>
</Callout>

If you have enabled SSO, you can enable SCIM provisioning as well. SCIM facilitates _user provisioning_, which means your IdP can use it to create update, and deactivate members in LaunchDarkly.

Initiate the workflow that links your IdP with SCIM from your IdP. The workflow will lead to an authorization screen where you can authorize your IdP to manage your users. 

You may only have one SCIM provider linked to your IdP at once. If you need to change providers, disconnect the original provider by following the workflow below and enable a different one through your IdP.

## Disconnecting SCIM

You can disconnect SCIM at any time.

To disconnect SCIM:

1. Log into LaunchDarkly as an administrator.
2. Navigate to the Team Management screen.
3. Click **Disconnect SCIM**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/fbb4698-Screenshot_2019-06-04_Account_settings.png",
        "Screenshot_2019-06-04 Account settings.png",
        385,
        115,
        "#f2f1f1"
      ],
      "caption": "The Disconnect SCIM option."
    }
  ]
}
[/block]
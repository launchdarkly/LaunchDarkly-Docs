---
title: "Your team and LaunchDarkly"
excerpt: ""
---
## Overview
This topic explains how to join LaunchDarkly as a new team member. 
<Callout intent="alert">
  <CalloutTitle>LaunchDarkly is for groups and teams</CalloutTitle>
  <CalloutDescription>You cannot sign up for LaunchDarkly as a user who is not associated with a company's team account. Instead, an admin or account owner from your team must send you an invitation email. 
If you want to sign up for LaunchDarkly as an individual, you can sign up for a [free 30-day trial](https://launchdarkly.com/start-trial/).</CalloutDescription>
</Callout>

## Bringing your team to LaunchDarkly
If you want to get your team started with LaunchDarkly, you have a few different options for how to add team members to your organization. 
* You can invite [individual team members](#adding-individual-team-members)
* You can import team members from your [identity provider (IdP)](#adding-members-from-an-identity-provider)
* Team members on a LaunchDarkly trial can [join from the trial](#joining-from-a-launchdarkly-trial)
<Callout intent="info">
  <CalloutTitle>LaunchDarkly supports SCIM</CalloutTitle>
  <CalloutDescription>LaunchDarkly supports the System for Cross-domain Identity Management (SCIM) API specification for certain identity providers. SCIM is designed to make managing user identities in cloud-based applications and services easier. 
To use SCIM with LaunchDarkly, you must be using one of the IdPs we support that uses SCIM, and you must be an Enterprise customer.
To learn more, read [Enabling single sign-on](./single-sign-on).</CalloutDescription>
</Callout>

## <a name="adding-individual-team-members"></a>Adding individual team members
If your team already has a LaunchDarkly account, a team member with invite privileges (typically an owner or admin) must send individual members email invitations to join the team.

After prospective members receive the invitation, they follow the sign up instructions to join your team's account.

## <a name="adding-members-from-an-identity-provider"></a>Adding members from an identity provider
LaunchDarkly supports multiple third-party IdPs. If your company uses an IdP to manage access with single sign-on, you must log into LaunchDarkly for the first time from the IdP. 

To learn more about IdP-driven user provisioning, read [Single sign-on](./single-sign-on).

If you're on a LaunchDarkly trial, you can use the same email address to join your team. 
<Callout intent="warning">
  <CalloutTitle>Invitations fail when your email address is in use by a trial account</CalloutTitle>
  <CalloutDescription>If your email address is associated with a trial account, you must de-associate it or delete the trial account before you can receive an invitation email from your team. 
Follow either procedure below to resolve that problem.</CalloutDescription>
</Callout>
Each email address is associated with one LaunchDarkly account, so if you used your preferred email address to sign up for a trial, you must de-associate it with the trial before you can join your team's LaunchDarkly account.

Here's how to convert your account from a trial to a team account:

1. Log in to your existing LaunchDarkly trial account.
2. Navigate to the **Account settings** page and click into the **Profile** tab.
3. Replace your email address in the "Email address" field with a different email address. 
4. Click **Update my info**.
5. You can now accept the invitation from your team owner using the email you used for the trial account.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/56e4c40-Screen_Shot_2019-06-26_at_2.29.29_PM.png",
        "Screen Shot 2019-06-26 at 2.29.29 PM.png",
        1228,
        634,
        "#d1d2d2"
      ],
      "caption": "The Profile tab with an email address filled in."
    }
  ]
}
[/block]
Alternatively, you can delete the trial account before you join your team. Deleting the trial account frees your email address so your team's account can use it.


1. Log in to your existing LaunchDarkly account.
2. Navigate to the **Account settings** page and click into the **Team** tab.
3. Scroll to the "Delete account" section.
4. Click **Delete account**.
5. You can now accept the invitation from your team owner using the email you used for the trial account.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1fe564d-Screen_Shot_2019-06-26_at_2.29.19_PM.png",
        "Screen Shot 2019-06-26 at 2.29.
1. PM.png",
        1218,
        730,
        "#f5f6f3"
      ],
      "caption": "The Delete Account section."
    }
  ]
}
[/block]

## <a name="understanding-launchdarklys-user-entity-types"></a>Understanding LaunchDarkly's user entity types
In LaunchDarkly, it is important to distinguish between **team members** and **users**.  
[block:parameters]
{
  "data": {
    "h-0": "Title",
    "h-1": "Definition",
    "0-0": "**Team members** or **members**",
    "0-1": "These are people who have been invited to join a LaunchDarkly account to create and manage feature flags. They can log into a company's LaunchDarkly account and view the dashboard.
They may be employees of a company that uses LaunchDarkly, people with an @your-company.com email address, or people or entities associated with your identity provider (IdP).
To learn more about team members, see [Managing teams](./teams).",
    "1-0": "**Users**",
    "1-1": "These are people or entities who trigger flag evaluations. This can cause them to appear in the Users dashboard in LaunchDarkly, but they cannot log into the team's LaunchDarkly account or see or modify their own or other user's data.
They may be customers of a team using LaunchDarkly, consumers of an app or website that uses feature flags, or other entities that can cause flag evaluations to occur.
To learn more about users, read [The user dashboard](./the-user-dashboard)."
  },
  "cols": 2,
  "rows": 2
}
[/block]
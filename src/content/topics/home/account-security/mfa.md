---
title: "Multi-factor authentication"
excerpt: ""
---
## Overview
This topic explains how to set up and use multi-factor authentication to improve the security of your LaunchDarkly account.
## Understanding multi-factor authentication
Multi-factor authentication (MFA) requires you to use a second verification step in addition to your password to log in to a service, app, or website. 

In LaunchDarkly, you can enable multi-factor authentication for your individual account, which requires you to enter a verification passcode from a free authenticator application you install on a mobile device.

Administrators can also require all newly invited team members on the team to enable multi-factor authentication when they first log in. 

We strongly recommend that all LaunchDarkly users enable MFA for their account, and that administrators enforce MFA for their entire team.
## Setting up MFA
Before you begin, you'll need to install a compatible authenticator application on your mobile device. We recommend [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en), but any TOTP authenticator application should work well. 

To enable MFA for your account: 


1. Navigate to your [User Profile](https://app.launchdarkly.com/settings/profile) page. 
2. Click **Enable MFA**. A dialog with a QR code appears on your screen.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9e991f7-mfa_enable.PNG",
        "mfa enable.PNG",
        866,
        352,
        "#fbfbfa"
      ],
      "caption": "The Enable MFA section of your user profile."
    }
  ]
}
[/block]
3. Launch the authenticator application on your mobile device and hold the camera up to your screen to scan the code. When the QR code scans, a six digit code appears on your mobile device.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/83b155a-mfa_qr.PNG",
        "mfa qr.PNG",
        805,
        543,
        "#d0da98"
      ],
      "caption": "The MFA QR Code."
    }
  ]
}
[/block]
4. Enter the six digit code from your authenticator application in the text box in LaunchDarkly. 
5. Click "Continue". A confirmation screen with recovery codes appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0b6a9f0-mfa_recovery.png",
        "mfa_recovery.png",
        896,
        821,
        "#e4e8d8"
      ],
      "caption": "The recovery codes for your account."
    }
  ]
}
[/block]
If you lose access to the mobile device with your MFA settings, you can use one of these recovery codes to access your account and reset your MFA settings.
<Callout intent="alert">
   <CalloutTitle>Do not lose your recovery codes</CalloutTitle>
   <CalloutDescription>**Store your recovery codes in a safe location other than your mobile device**. If you lose your recovery codes and cannot access your account, you must contact a LaunchDarkly administrator for help. They can send you a new recovery code.</CalloutDescription>
</Callout>
  

## Logging in with MFA
When MFA is enabled, you're required to enter a code from your authenticator app each time you log in to LaunchDarkly. 

The first step of the login flow doesn't change-- you must enter your email address and password. After your credentials are verified, an MFA login screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/fe16720-mfa_login.PNG",
        "mfa login.PNG",
        1253,
        423,
        "#c6cf89"
      ],
      "caption": "The MFA login screen."
    }
  ]
}
[/block]
Enter a valid passcode from your authenticator app within five minutes. If you don't do this quickly enough, you must re-enter your password and a new code.
## Using your recovery codes
If you've lost access to your device or your authenticator application, click the link on the MFA login screen to log in with one of your recovery codes.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/cea3591-recovery.PNG",
        "recovery.PNG",
        1280,
        548,
        "#dadec4"
      ],
      "caption": "The MFA recovery code screen."
    }
  ]
}
[/block]
When you use a recovery code, you'll be sent to your account profile page. When this happens, reset your MFA settings and generate new recovery codes immediately.

<Callout intent="alert">
  <CalloutTitle>Recovery codes are single-use</CalloutTitle>
   <CalloutDescription>Once you've logged in with a recovery code, reset your MFA settings immediately. You can only use recovery codes once, so every time you use one, you should generate new recovery codes and store them in a safe location as soon as possible.
If you've lost your device **and** do not have access to any of your recovery codes, contact an administrator for your team's LaunchDarkly account. Your administrator can send you an e-mail with a new recovery code.</CalloutDescription>
</Callout>

## Account administration for MFA

<Callout intent="info">
  <CalloutTitle>This is an Admin-only feature</CalloutTitle>
   <CalloutDescription>To follow the procedures in the next section, you must be a LaunchDarkly Admin or Owner.
If you're a LaunchDarkly administrator or account owner, you can require all newly invited team members to enable MFA.</CalloutDescription>
</Callout>

To do this, click the checkbox labeled **Require multi-factor authentication for new members**under **Multi-factor authentication** on your [Security](https://app.launchdarkly.com/settings#/security) page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/12d0ee0-Account_settings_2017-03-02_15-30-12.jpg",
        "Account_settings_2017-03-02_15-30-12.jpg",
        1220,
        434,
        "#fbfbfb"
      ],
      "caption": "The MFA section of the Security page."
    }
  ]
}
[/block]
When this setting is enabled, any new team members you invite must set up MFA for their account when they first log in. In addition, if this setting is enabled, team members cannot disable MFA for their account.

Admins can also see whether team members have MFA enabled on the [Team](https://app.launchdarkly.com/settings#/team) page. If a user does not have MFA enabled, admins can send an email requesting that the team member enable MFA.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3765d37-mfa_reminder.PNG",
        "mfa reminder.PNG",
        1280,
        720,
        "#6a6a69"
      ],
      "caption": "The team member edit screen."
    }
  ]
}
[/block]
Finally, if a team member with MFA enabled loses their device **and** no longer has access to their recovery code, administrators can send them an email with a new recovery code.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9287365-mfa_reset.PNG",
        "mfa reset.PNG",
        1280,
        720,
        "#6b6b69"
      ],
      "caption": "The **Send recovery code** button."
    }
  ]
}
[/block]
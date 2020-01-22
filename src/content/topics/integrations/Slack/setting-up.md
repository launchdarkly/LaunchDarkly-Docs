---
title: "Setting up Slack accounts and permissions"
excerpt: ""
---
## Overview
This topic explains how to set up the LaunchDarkly Slack app in your team's Slack instance.

## <a name="setting-up-the-slack-app"></a>Setting up the Slack app
When you call the LaunchDarkly Slack app for the first time, you will be prompted to associate it with your Slack account.

To sign into the LaunchDarkly Slack app:


1. Type `/launchdarkly account` in your Slack client's text bar and press **Enter**.
2. A message appears prompting you to connect your Slack account with LaunchDarkly.
3. Click **Connect with LaunchDarkly**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2cb0db4-Hello.png",
        "Hello.png",
        1216,
        254,
        "#f0f0f0"
      ],
      "caption": "Signing into the LaunchDarkly Slack App"
    }
  ]
}
[/block]
4. Review the permissions required and click **Authorize** to authorize the Slack app.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ce025b4-Hi.png",
        "Hi.png",
        834,
        775,
        "#f3f6f5"
      ],
      "caption": "The permissions authorization screen"
    }
  ]
}
[/block]
5. A confirmation screen appears in your browser and the Slack app's username appears in the **Apps** section of your Slack client.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d30cb58-success.png",
        "success.png",
        405,
        127,
        "#1f2531"
      ]
    }
  ]
}
[/block]
You can now use the LaunchDarkly Slack app!

## Understanding the Slack app's permissions
The Slack app requires you to grant permission for it to work in your Slack account. The list of permissions shown in the authorization screen is inclusive of everything the app can do, but not all users will be able to perform all actions using the app.

The things the Slack app can do are limited to what the user can do in LaunchDarkly. It never allows users to take actions beyond what their roles in LaunchDarkly allow. 

**The Slack app does not grant additional permissions to LaunchDarkly users.**

For example:

Cody is a LaunchDarkly user with the **reader** role. He authorizes the LaunchDarkly Slack app and uses it to see flag information and subscribe channels to notifications. He cannot toggle the flag on or off in LaunchDarkly using the Slack app, because readers are not allowed to perform that action.

Isha is a LaunchDarkly user with the **admin** role. She authorizes the LaunchDarkly Slack app and can use it to see flag information, subscribe channels to notifications, and toggle flags on and off, because those are all actions administrators are allowed to perform.

## Adding multiple accounts to the Slack app
You can associate multiple LaunchDarkly accounts to your Slack workspace. Individuals can connect their accounts manually by following the instructions in [Setting Up the Slack app](#setting-up-the-slack-app).

You will be able to interact with just one account at a time. You can check which account you are signed in to using `/launchdarkly account`. 

To add more accounts to the Slack app:


1. Type `/launchdarkly account` in your Slack client's text bar and press **Enter**.
2. The account management field appears.
3. Click **Add an account**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/47f1d7a-Screen_Shot_2019-08-15_at_4.22.31_PM.png",
        "Screen Shot 2019-08-
1. at 4.22.31 PM.png",
        1206,
        248,
        "#f3f3f3"
      ],
      "caption": ""
    }
  ]
}
[/block]
If you want to add another account, click the Add an Account button. You'll then follow the same process as your first account to authorize.

## Disconnecting an Account from the Slack App
When you click the drop down for an existing account, clicking logout will remove the account association with your Slack.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/378be72-Slack_-_LaunchDarkly_logout.jpg",
        "Slack_-_LaunchDarkly_logout.jpg",
        1470,
        332,
        "#f3f4f4"
      ]
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/24b365b-Screen_Shot_2019-06-11_at_11.25.31_AM.png",
        "Screen Shot 2019-06-
1. at 11.25.31 AM.png",
        614,
        87,
        "#eeefef"
      ]
    }
  ]
}
[/block]
If an account is no longer authorized, you can re-authorize the account by clicking on the name of the account.  When you click on the name, you will follow the Onboarding process again.

## Understanding how LaunchDarkly roles impact Slack app authorization
Connecting your Slack account with your LaunchDarkly account makes two changes. When you complete the OAuth authorization workflow:

* You allow your Slack and LaunchDarkly accounts to act as a single user.
* You automatically create and configure a webhook in LaunchDarkly that sends notifications to your Slack team.

The first item happens for each individual user. The second item only happens once per team -- typically by the first member on the Slack team to authorize the app with LaunchDarkly.

Members with the `reader` role in LaunchDarkly do not have the ability to create webhooks. If the first person to authorize the LaunchDarkly Slack app is a reader, this can cause a problem, because that user cannot create the necessary webhook.

To learn more about member permissions, read [Understanding Member Roles](https://docs.launchdarkly.com/docs/teams#understanding-member-roles).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9bac34f-slack-webhook-authorize.png",
        "slack-webhook-authorize.png",
        627,
        183,
        "#ebebeb"
      ]
    }
  ]
}
[/block]
If a `reader` initially authorizes the Slack app, an error appears. When this happens, the member can only use some of the app's features. They can view and manage flags, but can't subscribe to notifications.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/19cfb6a-slack-webhook-subscribe.png",
        "slack-webhook-subscribe.png",
        622,
        182,
        "#e8e8e8"
      ]
    }
  ]
}
[/block]
To remedy this situation, the `reader`-level member should ask a team member with write permission to authorize the Slack app to communicate with LaunchDarkly. After the `writer`-level user authorizes the app, the webhook is created. All subsequent team members to authorize the Slack app will be able to subscribe to notifications.
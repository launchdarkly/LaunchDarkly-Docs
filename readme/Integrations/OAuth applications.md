---
title: "OAuth applications"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains the workflow to authorize or revoke access of an OAuth app.
[block:callout]
{
  "type": "warning",
  "body": "It is critically important to only authorize applications you trust to use your LaunchDarkly account. \n\nRead the permissions required by the app carefully and use your own best judgment about whether you trust an app enough to use it.",
  "title": "OAuth apps can require extensive permissions"
}
[/block]

[block:api-header]
{
  "title": "Connecting an OAuth app to LaunchDarkly"
}
[/block]
You can connect your LaunchDarkly account to external applications, such as the LaunchDarkly Slack app, using the OAuth 2.0 protocol. When you authorize an OAuth application, you grant the application access to information and actions a user might take. Some applications can act on your behalf, such as by turning feature flags on and off. 

Your LaunchDarkly credentials and billing information will never be shared with any OAuth application you authorize.

If you are interested in developing an OAuth application, <span><a href="https://ld.click/support-request">Register a new OAuth application</a> </span> to get started developing your own.
[block:api-header]
{
  "title": "OAuth app permissions"
}
[/block]
On initial authorization, an OAuth app shows you a complete list of permissions it requires in order to work. While the app may have the capability to perform many actions in LaunchDarkly, the app's ability to do anything is limited by the abilities of the user who authorizes it. 

Additionally, if your own permissions are reduced, applications you have previously authorized will have reduced permissions as will. 
[block:callout]
{
  "type": "info",
  "title": "When you authorize an OAuth app, it can never do more than you can do",
  "body": "For example, if you are a Writer and authorize an app, and then are downgraded to a Reader, your app will only have Reader-level permissions."
}
[/block]

[block:api-header]
{
  "title": "Disconnecting an OAuth app"
}
[/block]
We care about the security of your information. You or an Administrator can revoke an app's permission to use your account at any time. 
[block:callout]
{
  "type": "info",
  "title": "Administrators can revoke any app",
  "body": "If you are a LaunchDarkly administrator, you can revoke access of any app added to LaunchDarkly, regardless of which team member added it."
}
[/block]
To disconnect an app:
1. Navigate to the **Account settings** page. 
2. Click into the **Authorization** tab.
3. In the "Authorized applications" section, locate the app you would like to disconnect.
4. Click **Review**. The "Application access" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b186c42-Screen_Shot_2019-07-16_at_10.29.02_AM.png",
        "Screen Shot 2019-07-16 at 10.29.02 AM.png",
        647,
        344,
        "#f6f6f7"
      ],
      "caption": "The Application access screen."
    }
  ]
}
[/block]
5. Click **Revoke**. A confirmation screen appears.
6. Review the impact of revoking the app. and type "yes" to confirm if you still wish to revoke the app.


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4469fef-Screen_Shot_2019-07-16_at_10.32.41_AM.png",
        "Screen Shot 2019-07-16 at 10.32.41 AM.png",
        510,
        308,
        "#eeebec"
      ],
      "caption": "The confirmation modal with \"yes\" entered in the confirmation text box."
    }
  ]
}
[/block]
7. Click **Revoke**.

The application's access is revoked immediately.
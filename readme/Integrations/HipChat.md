---
title: "HipChat"
excerpt: ""
---
LaunchDarkly's HipChat integration allows you to receive room notifications for any activities in LaunchDarkly. When something is changed (e.g. when a feature flag is updated, when a new team member is invited to LaunchDarkly, and more) we'll send a HipChat room notification.
[block:api-header]
{
  "type": "basic",
  "title": "Creating a room notification"
}
[/block]
To set up room notifications, you'll need to create a Room Notification token in HipChat. Click on the Rooms tab in HipChat, and select the room that should receive LaunchDarkly notification. Next, click on the Tokens sidebar item. Create a new token with the `Send Notification` scope, then copy the token as well as the room ID or name.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/acf12e2-send_notification.png",
        "send_notification.png",
        1898,
        1014,
        "#eaebeb"
      ],
      "caption": ""
    }
  ]
}
[/block]
In LaunchDarkly, navigate to the [Integrations page](https://app.launchdarkly.com/integrations), and click Add Integration in the chat integrations section. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/087ab6c-integration3.png",
        "integration3.png",
        1122,
        566,
        "#959595"
      ],
      "caption": ""
    }
  ]
}
[/block]
Enter the room ID or name, as well as the room notification token. The policy filter (described below) is optional. If you omit it (the default), you will receive room notifications for all events in LaunchDarkly. 
[block:api-header]
{
  "type": "basic",
  "title": "Adding a policy filter"
}
[/block]
By default, room notifications set up without a policy filter will receive a notification for any change in LaunchDarkly (across any project, environment, goal, feature flag, etc.). You can optionally specify a policy (using the same syntax as our [custom roles](doc:custom-roles) feature) to filter the events sent to your room.

For example, if you only want to receive an event when a change is made to one of your production feature flags, you can add the following policy to your room notification: 
[block:code]
{
  "codes": [
    {
      "code": "  [\n    {\n    \"effect\": \"allow\",\n    \"resources\": [\n      \"proj/*:env/production:flag/*\"\n    ],\n    \"actions\": [\n      \"*\"\n    ]\n  \t}\n  ]",
      "language": "json",
      "name": "Policy"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d01a0f7-policies.png",
        "policies.png",
        2244,
        1332,
        "#959595"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Disabling room notifications"
}
[/block]
You can temporarily disable a room notification by hitting the On/Off switch on the [Integrations](https://app.launchdarkly.com/integrations) page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/281e8f5-integration4.png",
        "integration4.png",
        1121,
        341,
        "#f6f6f6"
      ],
      "caption": "Disabling room notifications"
    }
  ]
}
[/block]
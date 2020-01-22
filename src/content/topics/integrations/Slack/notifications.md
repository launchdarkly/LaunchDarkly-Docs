---
title: "Subscribing to notifications"
excerpt: ""
---
## Overview
This topic explains how to subscribe to flag notifications in Slack channels. 

It can be useful to let an entire channel know when a flag changes. You can subscribe Slack channels to notifications from individual flags or the entire set of flags associated with a filter as described in the previous topic. 

For more information about filter-based notifications, see [Managing Flags with the Slack App](./managing-flags-with-the-slack-app).
## Understanding update notifications in channels
When a flag is updated, either directly in LaunchDarkly or through the Slack app, a notification of the change is sent to any channel subscribed to updates for that flag.

The notification includes the following information: 
* The name of the person who made the change
* The name of the flag
* The environment, project, and key of the flag
* A comment about the change, if applicable

Click **View Flag** to visit the Flag Overview screen.

You can subscribe to updates from specific flags so you receive notifications when the flag changes.

When you view filter results in a channel, you can subscribe to updates from any flag in that set of results. When the flag is changed, either through the LaunchDarkly UI or the Slack app, a notification appears in any channel subscribed to that flag. 

For more information about filtering flags, see [Viewing, Monitoring, and Subscribing to Flags](./managing-flags-with-the-slack-app).

To add a flag to a channel:

1. Open the Slack channel where you wish notifications about a flag to appear.
2. Type `/launchdarkly` in your Slack client's text bar and press **Enter**. The LaunchDarkly Slack app appears.
3. Find the flag you wish to subscribe to by filtering in the Slack app.
4. Click **Add to Channel** in the dropdown menu next to the flag you wish to subscribe to.
5. The channel receives a notification that the flag has been added to that channel.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f8f486c-Screen_Shot_2019-08-15_at_5.00.46_PM.png",
        "Screen Shot 2019-08-
1. at 5.00.46 PM.png",
        1156,
        126,
        "#f6f6f6"
      ],
      "caption": "A notification that a flag has been added to channel."
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7cab6ba-Slack_on.jpg",
        "Slack_on.jpg",
        1382,
        362,
        "#f1f3f2"
      ],
      "caption": "A notification that a flag subscribed to the channel has had a status change."
    }
  ]
}
[/block]

## Removing flag notifications from a channel
You are able to remove Flags from a channel so that you no longer receive notifications when the flag changes.


1. Open the Slack channel where you wish notifications about a flag to appear.
2. Type `/launchdarkly` in your Slack client's text bar and press **Enter**. The LaunchDarkly Slack app appears.
3. Click **List Channel Flags**. A list of the flags sending associated with the channel appears.
4. Locate the flag you wish to remove from the channel.
4. Select **Remove from channel** in the dropdown menu beside the name of the flag.
5. Once the subscription is removed, the entire channel receives a notification of the change.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/64d7c86-Screen_Shot_2019-08-15_at_5.01.19_PM.png",
        "Screen Shot 2019-08-
1. at 5.01.
1. PM.png",
        1212,
        412,
        "#e6e9ed"
      ],
      "caption": "Remove flag from channel"
    }
  ]
}
[/block]
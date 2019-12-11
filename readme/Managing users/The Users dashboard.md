---
title: "The Users dashboard"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains what the **Users** dashboard is, how it is populated, and how to use it.

The Users dashboard gives you a summary view of how each user sees all of the features on your site, and lets you customize their experience from one screen. 
[block:api-header]
{
  "title": "Understanding the Users dashboard"
}
[/block]
The Users dashboard populates automatically when users encounter a feature flag and are evaluated by a LaunchDarkly SDK. The data on the User dashboard is populated from the user data you send in `variation` calls, as well as data from `identify` calls.
[block:callout]
{
  "type": "warning",
  "title": "You cannot add users manually",
  "body": "You cannot create users in the Users dashboard. User data appears in it when users are evaluated by a LaunchDarkly SDK."
}
[/block]
From the user dashboard, you can filter users by name, key, or e-mail address.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9967d98-usersdash.png",
        "usersdash.png",
        2220,
        1156,
        "#f5f5f5"
      ],
      "caption": "The Users dashboard"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Modifying feature flags for a user"
}
[/block]
Click a user to manage the feature flags that apply to them and see a full list of their attributes.

To modify a feature flag the user sees:
1. Navigate to the **Users** dashboard.
2. Click the user you wish to modify. Their user page appears, with their unique **Attributes** on the left and their **Flag settings** on the right.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/043980c-user_profile.png",
        "user_profile.png",
        2294,
        1168,
        "#f7f7f7"
      ],
      "caption": "A user's Flag Settings card on the Users dashboard."
    }
  ]
}
[/block]
3. Click the dropdown next to the flag you wish to modify to change which variation the user receives. 
4. To remove the custom variation setting, click the **X** next to the flag. 
5. Click **Save Settings** to save your changes.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/844a21c-explicit.jpg",
        "explicit.jpg",
        2000,
        1125,
        "#07ab54"
      ],
      "caption": "The Flag settings screen with different flag variations called out."
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Removing a user"
}
[/block]
You can delete individual users from the dashboard by opening their page and clicking the **Delete** button. 

Deleting users from the dashboard does not decrease your Monthly Active User (MAU) count.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/cb1e2de-Screen_Shot_2019-08-08_at_10_54_38_AM.png",
        "Screen_Shot_2019-08-08_at_10_54_38_AM.png",
        1105,
        402,
        "#f8f7f8"
      ],
      "caption": "A user's screen with the Delete button called out."
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Exceeding your Monthly Active Users limit",
  "body": "We never stop or throttle LaunchDarkly services based on your Monthly Active Users (MAU) limits, but we may not save all user information for users beyond your MAU. \n\nFor more information about MAU, see [Usage metrics](doc:usage-metrics)."
}
[/block]
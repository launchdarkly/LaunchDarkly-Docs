---
title: "Building user segments"
excerpt: ""
---
## Overview
This topic explains how to build and manage user segments. User segments let you target groups of users by attribute.
<Callout intent="alert">
  <Callout.Title>This feature is only supported on newer versions of our SDKs</Callout.Title>
   <Callout.Description>* Go: **v3**\n* Java: **3.0.1**\n* Node: **4.0**      \n* PHP: **3.0.0**\n* Python: **5.0.1**\n* Ruby: **3.0.1**\n* .NET: **4.0.0**
If you want to use user segments with the LaunchDarkly Relay Proxy, you must upgrade to the latest version **3.0.1** before upgrading your SDKs. To learn more, read [The LaunchDarkly Relay Proxy](./the-relay-proxy).
You do not need to upgrade mobile (iOS and Android) and client-side Javascript SDKs to use this feature.
If you don't see the **Segments** tab in your project, <span><a href=\"https://ld.click/DocsBuildingUserSegments\" target=\"_blank\" >contact Support</a> </span> to confirm that your SDKs are up-to-date. If they are, we can enable this feature for you.</Callout.Description>
</Callout>

## Understanding user segments
User segments are lists of users that you can use to manage flag targeting behavior in bulk. You can include or exclude individual users from a segment based on user attributes. Use the **Segments** tab to create targeting rules and lists of users to manage flag targeting more efficiently.

Segments are useful for keeping groups of users, like `beta-users` or `enterprise-customers`, up to date. They allow you to more quickly turn features on or off for certain groups with confidence.

There are some differences between flag and segment targeting that you should be aware of:
* Unlike flags, segments are environment-specific. They do not populate in environments other than the one you created them in.
* Segment targeting cannot reference another user segment.
## Creating user segments
Creating a segment is similar to creating a flag. 

To add a new segment:


1. Navigate to the **Segments** tab.
2. Click **New Segment**. The "Create a segment" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/90e375a-Screen_Shot_2019-08-09_at_11_29_58_AM.png",
        "Screen_Shot_2019-08-09_at_11_29_58_AM.png",
        1094,
        253,
        "#f4f4f3"
      ],
      "caption": "The Segments tab with the New Segment button called out."
    }
  ]
}
[/block]
3. Give your segment a human-readable **Name**. 
4. Enter a **Key** for the segment. This field auto-populates based on the segment name, but you can change it if you need to.
5. (Optional) Add a **Description**.
6. (Optional) Choose **Tags** from the dropdown menu.
7. Click **Save Segment**. The Segment targeting screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f4e804b-Screen_Shot_2019-08-09_at_11.33.58_AM.png",
        "Screen Shot 2019-08-09 at 11.33.58 AM.png",
        449,
        498,
        "#f8f9f9"
      ],
      "caption": "The \"Create a segment\" screen."
    }
  ]
}
[/block]

## Customizing a user segment
You can customize a segment to apply to different users or attributes, or exclude users and attributes, in the segment's targeting screen. 

To customize a segment:

1. Navigate to the user segment you wish to modify.
2. Target individual users, or lists of users, with the **Included users** or **Excluded users** options. To learn more about bulk user targeting, read [Targeting users](./targeting-users).
3. Click **Add rules** to create a custom rule for this segment. The custom rule menu appears.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ce6a90b-Screen_Shot_2019-08-09_at_11_52_34_AM.png",
        "Screen_Shot_2019-08-09_at_11_52_34_AM.png",
        1481,
        651,
        "#fbfafa"
      ]
    }
  ]
}
[/block]
4. Specify an **attribute**, **operator**, and **values** for the rule.
5. If you want to add more criteria, click the **plus button** beside the rule criteria.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4c113f0-Screen_Shot_2019-08-09_at_11.53.05_AM.png",
        "Screen Shot 2019-08-09 at 11.53.05 AM.png",
        1471,
        311,
        "#f9f9f9"
      ],
      "caption": "The custom rule menu."
    }
  ]
}
[/block]
6. When you are done configuring a rule, click **Save Changes**.
<Callout intent="info">
  <Callout.Title>Understanding segment rule logic</Callout.Title>
   <Callout.Description>When you specify rules for a segment, LaunchDarkly parses them in order of appearance from top to bottom. You can change how segment targeting applies based on the order of the rules you create.</Callout.Description>
</Callout>
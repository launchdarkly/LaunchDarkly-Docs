---
title: "Viewing, monitoring, and subscribing to flags"
excerpt: ""
---
## Overview
This topic explains how to view and filter flags with the LaunchDarkly Slack app.
## Filtering for feature flags with the menu
You can filter flags to see a list of flags that match the criteria that you enter.

To filter flags:


1. Type `/launchdarkly subscribe` in  your Slack client's text bar and press **Enter**. 
2. The Filter Flags menu appears.
3. Enter optional arguments to search for a specific flag. You can only search for one flag at a time.
4. Use the dropdown menus to specify filtering criteria and hit **Filter**. 
5. Subscribe to any flags by selecting "Add flag to channel" from the dropdown.
6. Subscribe to all the flags from this Filter by clicking the  "Add filter to channel" button.

You can use the four types of filters in any combination to view different flags. If you click **Filter** without specifying any of the fields, all flags will display.

The table below explains the different filtering criteria:
[block:parameters]
{
  "data": {
    "0-0": "Status",
    "1-0": "Project / Environment",
    "2-0": "Tag",
    "2-1": "Optional.
Filter by a list of all tags that exist in LaunchDarkly.",
    "1-1": "Optional.
Filter by project, environment, or a combination of both.",
    "0-1": "Optional. 
Filter by flag status. Available statuses are: \n* Any\n* Active \n* Inactive \n* Archived \n* Launched \n* New",
    "h-0": "Filter Criteria",
    "h-1": "Description",
    "3-0": "Flag Key",
    "3-1": "Optional.
Enter a flag key, which can begin or end with a wildcard *."
  },
  "cols": 2,
  "rows": 4
}
[/block]

## Filtering for feature flags with in-line commands
You can also use in-line commands to filter flags in Slack. 

**Note**: All in-line commands start with `/launchdarkly` and typing `/launchdarkly` or `/ld` will bring up a help menu listing the commands.

To filter feature flags with in-line commands:

1. Type `/launchdarkly subscribe` but append filtering criteria.
2. Specify the filtering criteria with either a single dash (`-`) and the first letter of the criteria, or a double dash (`--`) and the criteria name and an equal sign. 
3. Press **Enter.** The results of the filter display.
4. Subscribe to any flags by selecting "Add flag to channel" from the dropdown.
5. Subscribe to all the flags from this Filter by clicking the  "Add filter to channel" button.

Examples of both types of entries: 
* `-e` or `--environment=`
* `-p` or `--project=`
* `-t` or `--tag=`
* `-s` or `--status=`
* `-f` or `--flag_key=`

**Note**: `/launchdarkly subscribe -p mobile -e test -s active` would retrieve the same flags as `/launchdarkly subscribe --project=mobile --environment=test --status=active`
## Viewing feature flag information
You can view more detail about any flag with the Flag Overview page. The Flag Overview page is available from the list of filtered flags and any flag update notification by clicking "View Flag Details". 

You can use the Flag Overview page to interact with the flag and access it on the LaunchDarkly website. 

Here are some things you can do from the Flag Overview page:
* Click the flag's name to be taken to the Flag Targeting screen of the LaunchDarkly website.
* Toggle the flag on or off by clicking the **Toggle Targeting** button. If you change the flag's state to on or off, a flag update notification appears in the Slack channel.

For more information about flag update notifications, see [Subscribing to Notifications](./slack-app-in-slack-channels).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c7aec4a-Screen_Shot_2019-08-15_at_4.25.26_PM.png",
        "Screen Shot 2019-08-
1. at 4.25.26 PM.png",
        1180,
        398,
        "#f2f2f2"
      ],
      "caption": "A Flag Overview page is pictured."
    }
  ]
}
[/block]
The table below explains the flag detail fields:
[block:parameters]
{
  "data": {
    "h-0": "Flag Detail Name",
    "h-1": "Description",
    "0-0": "Flag Name",
    "1-0": "Description",
    "2-0": "Project",
    "3-0": "Environment",
    "4-0": "Key",
    "5-0": "Tags",
    "6-0": "Status",
    "7-0": "Kind",
    "8-0": "Targeting",
    "9-0": "Temporary",
    "8-1": "Indicates whether the flag targeting is on or off.",
    "0-1": "Displays the flag name. In the example above, the flag name is displayed in blue, under the LaunchDarkly app title.",
    "1-1": "Displays the description of the flag as entered in LaunchDarkly.",
    "2-1": "Displays the name of the project in which the flag exists.",
    "3-1": "Displays the name of the environment in which the flag exists.",
    "4-1": "Display's the flag's key.",
    "5-1": "Displays any tags associated with the flag.",
    "6-1": "Displays the flag's status.",
    "7-1": "Displays which kind of flag this is.",
    "9-1": "Displays whether or not the flag is temporary."
  },
  "cols": 2,
  "rows": 10
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [],
      "caption": "The flag filter modal"
    }
  ]
}
[/block]

<Callout intent="info">
  <Callout.Title>Remember your cases!</Callout.Title>
   <Callout.Description>The data you specify for the in-line commands are case sensitive. If a filter you specify manually does not return any results, verify that you used the correct cases.
For example, if you type `my-project` when the actual name of the project is `My-Project`, the filter does not return any results.</Callout.Description>
</Callout>

## Filter flag results
When you filter flags, the results appear in your Slack channel or DM. You can use the filter results to perform different actions on the flag.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1341cb1-Screen_Shot_2019-08-15_at_4.45.47_PM.png",
        "Screen Shot 2019-08-
1. at 4.45.47 PM.png",
        1230,
        946,
        "#f2f2f2"
      ],
      "caption": "An example set of filtered flags."
    }
  ]
}
[/block]
Flags matching the filter criteria appear in this screen. 

Here are some of the actions you can perform on a flag in this list:
* Click the flag name to open the Flag Targeting screen in LaunchDarkly.
* Click the dropdown menu to choose between **View Flag Details** and **Add to channel**. If you choose to add the flag to the channel, a notification appears in that channel every time the flag status changes.

At the bottom of the filter results, there are three buttons:
* **Next** takes you to another page of filter results, if available.
* **Add filter to Channel** adds the filter criteria to be added to the channel. This automatically adds flags that match that criteria for this filter to the channel. A notification appears in the channel every time the status of one of those flags changes.
* **Adjust Filter** opens the Filter Flags screen where you can adjust the filtering criteria.
## Listing flags in a channel
When a flag is subscribed to a channel, any updates automatically send notifications to that channel.

Use `/launchdarkly flags` to view and manage flags associated with the current channel.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e0a5d19-Screen_Shot_2019-08-15_at_4.49.11_PM.png",
        "Screen Shot 2019-08-
1. at 4.49.
1. PM.png",
        1118,
        278,
        "#f1f0f1"
      ]
    }
  ]
}
[/block]

## Listing filters in a channel
When a filter is applied to the channel, any sets of flags that match the filter criteria automatically send notifications to that channel.

Use `/launchdarkly filters` to view and manage filters associated with the current channel.

For more information about associating filters with channels, see [Filter Flag Results](./managing-flags-with-the-slack-app#filter-flag-results) 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/227fa5f-Screen_Shot_2019-08-15_at_4.52.58_PM.png",
        "Screen Shot 2019-08-
1. at 4.52.58 PM.png",
        1186,
        412,
        "#f3f2f3"
      ],
      "caption": "The filters configured for the channel."
    }
  ]
}
[/block]
This menu displays the values that define the filter, including Status, Project, Environment, and Tag. If you make changes to the filter, including removing it, the channel receives a notification about the changes.
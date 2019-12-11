---
title: "Data Export"
excerpt: ""
---
[block:callout]
{
  "type": "info",
  "title": "Data Export is an add-on feature for Enterprise plans",
  "body": "Data Export is only available to customers on our Enterprise plans. To learn more about our plans, [read about our pricing](https://launchdarkly.com/pricing/).\n\nIf you want to add Data Export to an existing plan, [contact our Sales team](mailto:sales@launchdarkly.com)."
}
[/block]

[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how to use LaunchDarkly's Data Export feature to export and store flag, user, and experimentation event data.

Data Export provides a real-time export of raw analytics data, including feature flag requests, analytics events, custom events, experimentation events, and more. By exporting your data to a location of your choice, you can use your own data warehouse and tools to analyze event data.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7b53e10-DataExport2_1.png",
        "DataExport2 (1).png",
        6001,
        2001,
        "#b7c5cc"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "How it works"
}
[/block]
Data Export works by sending data to one of our supported **destinations**. A destination is an external service which can receive and store the data. 

We support the following export destinations:
- [Kinesis](doc:kinesis-destination) 
- [Google Cloud Pub/Sub](doc:google-cloud-pubsub)
- [mParticle](doc:mparticle-destination)
- [Segment](doc:segment-destination) 

To learn more about event formatting, read [Export format reference](doc:data-export-schema-reference).
[block:callout]
{
  "type": "info",
  "body": "This feature is supported on the following versions of our SDKs (and later versions, if applicable):\n\n* Go: **4.11.0**\n* Java: **4.8.0**\n* Node (server-side): **5.9.0**\n* Node (client-side): **1.1.0**\n* PHP: **3.6.0**\n* Python: **6.10.0**\n* Ruby: **5.6.0**\n* .NET: **5.8.0**\n* JavaScript: **2.14.0**\n* Xamarin: **1.1.0**\n* Android: **2.9.0**\n* Electron: **1.2.0**",
  "title": "Data Export requires certain SDK versions"
}
[/block]

[block:api-header]
{
  "title": "Exporting event data for flags and environments"
}
[/block]
After you create a data export destination, you can send data for individual flags or for all the flags in an environment to it.

###Exporting flag event data

To export data from a specific flag to a destination:
1. Navigate to the dashboard. 
2. Click the name of the flag you wish to export data from. The flag menu appears.
3. Click **Settings.**
4. Select the **Send detailed event information for this flag** checkbox.
5. Click **Save Changes**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4ad18f1-Screen_Shot_2019-07-10_at_2_47_49_PM.png",
        "Screen_Shot_2019-07-10_at_2_47_49_PM.png",
        746,
        504,
        "#f3f2f1"
      ],
      "caption": "The flag's Settings page, with the data export checkbox called out."
    }
  ]
}
[/block]
###Exporting environment event data

When you export event data from an environment, LaunchDarkly exports all data from every new flag you create after you enable data export. It does not send event data from flags created before you enabled data export.

To export data from an environment to a destination:
1. Navigate to the dashboard.
2. Click **Account settings**.
3. Find the environment you wish to export data from. 
4. Click **Edit.** The "Edit production environment" screen appears.
5. Select the **Send detailed event information for new flags** checkbox.
6. Click **Save Environment**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/939d65e-Screen_Shot_2019-07-10_at_2_56_04_PM.png",
        "Screen_Shot_2019-07-10_at_2_56_04_PM.png",
        450,
        681,
        "#e9e0df"
      ],
      "caption": "The Edit production environment screen, with the data export checkbox called out."
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Customizing which data LaunchDarkly exports"
}
[/block]
You can control which users send event data to destinations by choosing a group of users affected by certain flag targeting rules. To learn more, read [Controlling experiment populations](doc:experimentation-targeting).
[block:callout]
{
  "type": "warning",
  "body": "If you can't see this feature, your SDKs may be out of date. To solve this problem:\n\n1. Update your SDKs to the latest version.\n2. Contact support@launchdarkly.com to enable the feature.",
  "title": "Enabling data export population targeting"
}
[/block]
To customize which users send event data to data export destinations:
1. Identify which flag you wish to export events from.
2. Navigate to the flag's **Settings** page.
3. Click **N of N targeting rules** in the "Exporting events from" line. The "Configure event settings" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/125bc16-Screen_Shot_2019-10-22_at_3_41_49_PM.png",
        "Screen_Shot_2019-10-22_at_3_41_49_PM.png",
        760,
        449,
        "#f6f5f6"
      ],
      "caption": "The flag's Settings tab with the targeting rules link called out."
    }
  ]
}
[/block]
4. Click the **Custom selection** radio box to modify the users whose events are exported. When you click **Custom selection**, you can choose which targeting rules you wish to include or exclude in data exports.
5. Select the checkboxes of rules you wish to include in the experiment. This refines the population of users whose events are exported.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e4900ce-7b2e2a1-Screen_Shot_2019-10-14_at_4.52.23_PM.png",
        "7b2e2a1-Screen_Shot_2019-10-14_at_4.52.23_PM.png",
        798,
        926,
        "#f4f6f7"
      ],
      "caption": "The Configure event settings screen."
    }
  ]
}
[/block]
6. Click **Save Changes**. A confirmation modal appears.
7. Type the name or key of the environment in the text box and click **Confirm**.
[block:api-header]
{
  "title": "Delivery guarantees"
}
[/block]
After your application has successfully sent an event to our servers, we will send the event to your configured destinations at least once. 

An event is sent to your destinations exactly once, with some exceptions. In the event of a hardware failure or networking issue, we may send events multiple times. 

Additionally, if your configured destination does not acknowledge receipt of the event, we will retry sending the message 5 times over a 30 minute period.
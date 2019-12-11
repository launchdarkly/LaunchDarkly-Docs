---
title: "Datadog"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how to configure and use the LaunchDarkly Datadog integration.

The Datadog integration lets you set up [Datadog Events](https://docs.datadoghq.com/api/?lang=bash#events) to receive any activity from LaunchDarkly. When something changes, such as a feature flag updates or a new team member is added to LaunchDarkly, LaunchDarkly sends an event to Datadog. Use this integration to correlate and understand how changes to your features in LaunchDarkly impact your app and infrastructure metrics.
[block:api-header]
{
  "title": "Prerequisites"
}
[/block]
To connect Datadog to LaunchDarkly, you need an API key from Datadog. 

To generate an API key:
1. Log into Datadog and navigate to the [APIs tab](https://app.datadoghq.com/account/settings#api) in the "Integrations" section.


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/714d580-Screen_Shot_2019-07-16_at_11.08.43_AM.png",
        "Screen Shot 2019-07-16 at 11.08.43 AM.png",
        410,
        600,
        "#98979e"
      ],
      "caption": "The Datadog UI with the APIs tab selected."
    }
  ]
}
[/block]
2. Click **New API key** in the "API keys" section. A new API key appears in the UI.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8ee32d7-Screen_Shot_2019-07-16_at_11_09_11_AM.png",
        "Screen_Shot_2019-07-16_at_11_09_11_AM.png",
        561,
        351,
        "#f1eef3"
      ],
      "caption": "The Datadog UI with the \"Create API key\" button called out."
    }
  ]
}
[/block]
3. Hover over the bar in the "Key" column to see the API key. Copy the key and save it somewhere secure. You need it to set up the Datadog integration in LaunchDarkly.
[block:api-header]
{
  "title": "Setting up the Datadog integration"
}
[/block]
After you create an API key in Datadog, you can set up the integration in LaunchDarkly.

To set up the Datadog integration:
1. Navigate to the Integrations page and click **Datadog**.
2. Click **Add Integration**. The "Create a Datadog configuration" screen appears.
3. (Optional) Give your integration a human-readable **Name**.
4. Paste the Datadog API key into the **API key** field. You created this key in the [Prerequisites](#section-prerequisites) section.
5. (Optional) Add a policy statement or set a policy with the Advanced editor. To learn more, read [Filtering the events you send to Datadog](#section-filtering-the-events-you-send-to-datadog)
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c506fe9-Screen_Shot_2019-07-16_at_3_33_59_PM.png",
        "Screen_Shot_2019-07-16_at_3_33_59_PM.png",
        641,
        464,
        "#f5f8f9"
      ],
      "caption": "The Create a Datadog configuration screen."
    }
  ]
}
[/block]
6. Click **Save Datadog Configuration**. The new integration appears in the "Your APM integrations" section of the Integrations page. It is switched **on** by default.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/35602e3-Screen_Shot_2019-07-16_at_3.35.00_PM.png",
        "Screen Shot 2019-07-16 at 3.35.00 PM.png",
        1464,
        216,
        "#f2f4f4"
      ],
      "caption": "A Datadog integration in the Your APM integrations section."
    }
  ]
}
[/block]
After you set up the Datadog integration, events from LaunchDarkly appear in your Datadog dashboard.
[block:callout]
{
  "type": "info",
  "title": "Events may not appear immediately",
  "body": "It may take time for changes made in LaunchDarkly to propagate and appear in the Datadog events dashboard depending on Datadog's polling intervals."
}
[/block]

[block:api-header]
{
  "title": "Filtering the events you send to Datadog"
}
[/block]
By default, LaunchDarkly sends events to Datadog for changes made to any project, environment, feature flag, and more. If you have a more limited use case for using the integration, or you wish to restrict which data you send to Datadog, you can filter which events LaunchDarkly sends. 

To filter events, write a policy using the same syntax as our custom roles feature to filter the events sent to Datadog. 

For more information about writing policies, read [Policies in custom roles](doc:policies-in-custom-roles).

For example, if you only want to receive an event when a change is made to one of the feature flags in your testing environment, you can add the following policy to your events stream:
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"effect\": \"allow\",\n    \"resources\": [\n      \"proj/*:env/your-test-environment:flag/*\"\n    ],\n    \"actions\": [\n      \"*\"\n    ]\n\t}\n]",
      "language": "json",
      "name": "Example Datadog policy"
    }
  ]
}
[/block]
To add a custom filter:
1. Navigate to the Integrations page and scroll to the "Your APM integrations" section.
2. Find the integration you wish to modify and click **Edit**. The "Create a Datadog configuration" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7ef7a3c-Screen_Shot_2019-07-16_at_3_35_00_PM.png",
        "Screen_Shot_2019-07-16_at_3_35_00_PM.png",
        1464,
        216,
        "#f4f4f4"
      ],
      "caption": "The Your APM integrations section with the **Edit** button called out."
    }
  ]
}
[/block]
3. Click **Advanced editor**. The Advanced editor opens.
4. Enter your custom policy.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/72c7feb-Screen_Shot_2019-07-16_at_3_34_15_PM.png",
        "Screen_Shot_2019-07-16_at_3_34_15_PM.png",
        643,
        655,
        "#f7f9fa"
      ],
      "caption": "The Create a Datadog configuration screen with the Advanced editor open and a policy inside it."
    }
  ]
}
[/block]
5. Click **Save Datadog Configuration**.
6. Verify that LaunchDarkly is sending a customized set of events by viewing the events in your Datadog dashboard.
[block:api-header]
{
  "title": "Disabling the Datadog integration"
}
[/block]
If you wish to disable the Datadog integration, there are two methods to do so:  
* **Disable the integration** to pause the flow of events to Datadog, but leaves the connection between Datadog and LaunchDarkly intact.
* **Delete the integration** to cease all event export and break the connection between Datadog and LaunchDarkly.

To temporarily disable the Datadog integration:
1. Navigate to the Integrations page and scroll to the "Your APM integrations" section.
2. Find the Datadog integration you wish to disable.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4f37f21-Screen_Shot_2019-07-16_at_3.35.00_PM.png",
        "Screen Shot 2019-07-16 at 3.35.00 PM.png",
        1464,
        216,
        "#f2f4f4"
      ],
      "caption": "A Datadog integration in the Your APM integrations section."
    }
  ]
}
[/block]
3. Click the toggle to turn the integration **off**. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/aa9d2aa-Screen_Shot_2019-07-16_at_4.17.16_PM.png",
        "Screen Shot 2019-07-16 at 4.17.16 PM.png",
        315,
        134,
        "#dee9e7"
      ],
      "caption": "The integration toggle set to **Off**."
    }
  ]
}
[/block]
To permanently delete the Datadog integration:
1. Navigate to the Integrations page and scroll to the "Your APM integrations" section.
2. Find the integration you wish to modify and click **Edit**. The "Create a Datadog configuration" screen appears.
3. Click **Delete** in the "Delete Datadog configuration" section. A confirmation screen appears.
4. Click **Delete** to confirm.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6a5032a-Screen_Shot_2019-07-16_at_3.44.16_PM.png",
        "Screen Shot 2019-07-16 at 3.44.16 PM.png",
        461,
        143,
        "#f7f4f4"
      ],
      "caption": "The Delete Datadog configuration section."
    }
  ]
}
[/block]
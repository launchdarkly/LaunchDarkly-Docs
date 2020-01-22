---
title: "mParticle"
excerpt: ""
---
## Overview
This topic explains how to create and test an mParticle destination for data export. 

mParticle is a customer data platform that allows you to aggregate your analytics and create customer cohorts.
## Prerequisites
To set up an mParticle destination in LaunchDarkly, you will need:

* Your mParticle server to server key
* Your mParticle server to server secret

The key and secret are available in your mParticle account. Copy and save both strings. You'll need them to connect mParticle to LaunchDarkly.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bf9a7be-image001.png",
        "image001.png",
        540,
        545,
        "#f3faf8"
      ],
      "caption": "The mParticle API keys screen."
    }
  ]
}
[/block]

## Creating the mParticle destination in LaunchDarkly
You can use the LaunchDarkly UI to create and modify destinations for data export. 

To create an mParticle destination in LaunchDarkly:

1. Navigate to the **Integrations** screen.
2. Click on the mParticle icon or, if this is not your first destination, click the **Add Destination** drop down.
3. Choose **mParticle** from the dropdown. The "Create a destination" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1f0e8d4-Screen_Shot_2019-07-09_at_2.51.13_PM.png",
        "Screen Shot 2019-07-09 at 2.51.
1. PM.png",
        1126,
        255,
        "#f3f5f4"
      ],
      "caption": "The \"Add Destination\" dropdown with mParticle selected."
    }
  ]
}
[/block]
4. (Optional) Enter a **Name** for the destination.
5. Select an **Environment** for this destination to receive events from.
<Callout intent="alert">
  <CalloutTitle>Environment settings are permanent</CalloutTitle>
   <CalloutDescription>You cannot change an environment after you create the destination. If you wish to export event data from a different environment, you must set up another destination.</CalloutDescription>
</Callout>
6. Select an **mParticle Environment**.
7. Enter your mParticle **Server to Server Key** in the **API key** field.
8. Enter your mParticle **Server to Server Secret** in the **API secret** field.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2804ea6-Screen_Shot_2019-07-09_at_2.50.39_PM.png",
        "Screen Shot 2019-07-09 at 2.50.39 PM.png",
        650,
        716,
        "#fbfbfb"
      ],
      "caption": "The Create a destination screen."
    }
  ]
}
[/block]
9. Select a **User identifier** type from the dropdown. Choose from the following options:
 * customer_id
 * email
 * facebook
 * twitter
 * google
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b236e5a-Screen_Shot_2019-07-09_at_2.50.47_PM.png",
        "Screen Shot 2019-07-09 at 2.50.47 PM.png",
        612,
        303,
        "#fafbfd"
      ],
      "caption": "The User identifier dropdown."
    }
  ]
}
[/block]

<Callout intent="info">
  <CalloutTitle>Choose the correct user identifier for your events</CalloutTitle>
   <CalloutDescription>The user identifier you choose must match an identity you chose to identify users in the mParticle ecosystem.
Every event LaunchDarkly exports has a user key specified by the SDK. The user identifier should correspond to the mParticle user identity your SDK user key represents. For example, if your user key represents an email address, you should choose `email` as the user identifier.
To learn more about exported events, read [Schema reference](./schema-reference).</CalloutDescription>
</Callout>
10. Click **Save Destination**.

The mParticle destination appears in the "Your data export destinations" section of the **Integrations** screen.
## Testing an mParticle destination
After you create an mParticle destination for data export, you can confirm that it's working correctly in the "Create a destination screen." 

To test the mParticle destination:

1. Navigate to the **Integrations** screen.
2. Find the mParticle destination and click **Edit**. The "Edit destination" screen opens.
3. Set the **mParticle environment** to `development`. This allows the test event to appear in the events stream on the mParticle dashboard.
4. Click **Send Event** in the "Send a test event" section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9bdf63c-Screen_Shot_2019-07-09_at_2.56.54_PM.png",
        "Screen Shot 2019-07-09 at 2.56.54 PM.png",
        581,
        161,
        "#f7f7f7"
      ],
      "caption": "The Send a test event section."
    }
  ]
}
[/block]
5. Verify the event appears on the mParticle events live stream.
## Example events
These example events display the structure of the events LaunchDarkly sends to mParticle.

LaunchDarkly sends events in the following formats:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"user_identities\": {\n    \"customer_id\": \"example_user\"\n  },\n  \"environment\": \"production\",\n  \"events\": [\n    {\n      \"event_type\": \"custom_event\"\n      }\n    }\n  ]\n}",
      "language": "text",
      "name": "Feature event"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"user_identities\": {\n    \"customer_id\": \"example_customer\"\n  },\n  \"environment\": \"production\",\n  \"events\": [\n    {\n      \"event_type\": \"custom_event\"\n      }\n    }\n  ]\n}",
      "language": "text",
      "name": "Click event"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"user_identities\": {\n    \"customer_id\": \"example_customer\"\n  },\n  \"environment\": \"production\",\n  \"events\": [\n    {\n      \"event_type\": \"custom_event\"\n      }\n    }\n  ]\n}",
      "language": "text",
      "name": "Custom event"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"user_identities\": {\n    \"customer_id\": \"example_customer\"\n  },\n  \"environment\": \"production\",\n  \"events\": [\n    {\n      \"event_type\": \"screen_view\"\n      }\n    }\n  ]\n}\n",
      "language": "text",
      "name": "Page view event"
    }
  ]
}
[/block]

## Enabling data export for flags and environments
After you create a data export destination, you must start sending flag or environment event data to it. You can enable data export for individual flags, or for all the flags in an environment.

To learn more about exporting event data from flags and environments, read [Data Export](./data-export#exporting-event-data-for-flags-and-environments).
## Deleting an mParticle destination
You can delete a data export destination from the **Integrations** screen.

To delete a destination:

1. Navigate to the **Integrations** screen.
2. Find the destination you wish to delete and click **Edit**. The "Create a destination" screen opens.
3. Click **Delete Destination**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/71bc994-Screen_Shot_2019-07-10_at_11.02.00_AM.png",
        "Screen Shot 2019-07-
1. at 11.02.00 AM.png",
        359,
        141,
        "#f7f6f6"
      ],
      "caption": "The Delete destination section."
    }
  ]
}
[/block]
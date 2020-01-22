---
title: "Segment"
excerpt: ""
---
## Overview
This topic explains how to create and test a Segment destination for data export.
## Prerequisites
There are two prerequisites to configure the Segment integration:
* You must add the LaunchDarkly Source in Segment
* You must find the **Write Key** for your Segment account

First, add the LaunchDarkly Source in Segment. To add the source, [read Segment's documentation](https://segment.com/docs/sources/cloud-apps/launchdarkly/).

Next, configure the Segment integration in LaunchDarkly. To do this, you need the **Write Key** from your Segment account.

To find the write key:

1. Log into Segment and navigate to your project
2. Navigate to **Sources** and select your LaunchDarkly source
3. Select **API Keys** on the Source integration's menu bar
4. Copy the **Write Key** as shown in the text box
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2e4be8a-Screen_Shot_2019-08-09_at_2_32_43_PM.png",
        "Screen_Shot_2019-08-09_at_2_32_43_PM.png",
        1378,
        446,
        "#f8fafb"
      ],
      "caption": "The API Keys section of Segment's UI."
    }
  ]
}
[/block]

## Creating a Segment destination in LaunchDarkly
To create the Segment destination:


1. Navigate to the **Integrations** screen.
2. Click on the Segment icon or, if this is not your first destination, click the **Add Destination** drop down.
3. Choose **Segment** from the dropdown. The "Create a destination" screen appears.
4. (Optional) Give your integration a human-readable **Name**.
5. Choose an **Environment** for this integration to apply to.
6. Enter the Segment **Write key**.
7. Click **Save Destination**. The new integration appears in the list of integrations.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f35e1c3-Screen_Shot_2019-08-09_at_2_40_36_PM.png",
        "Screen_Shot_2019-08-09_at_2_40_36_PM.png",
        643,
        525,
        "#f2f6f8"
      ]
    }
  ]
}
[/block]

## Testing a Segment destination
After you create a Segment destination for data export, you can confirm that it's working correctly in the "Edit destination screen." 

To test the Segment destination:

1. Navigate to the **Integrations** screen.
2. Find the Segment destination and click **Edit**. The "Edit destination" screen opens.
3. Click **Send Event** in the "Send a test event" section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/891be8a-Screen_Shot_2019-08-09_at_2.37.04_PM.png",
        "Screen Shot 2019-08-09 at 2.37.04 PM.png",
        623,
        177,
        "#f8f8f8"
      ],
      "caption": "The Send a test event section of the Edit destination screen."
    }
  ]
}
[/block]
5. Verify the event appears in the Segment **Debugger**.
## Example events
These example events display the structure of the events LaunchDarkly sends to Segment.

LaunchDarkly sends events in the following formats:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"event\": \"feature\",\n  \"integrations\": {},\n  \"messageId\": \"c2f7a2d1-0a1b-456f-8e9a-16756e7a6db5\",\n  \"originalTimestamp\": \"2019-09-13T21:20:18.114Z\",\n  \"properties\": {\n    \"default\": \"true\",\n    \"environment\": \"5d4b12345d2a2806bd2cc6eb\",\n    \"eventId\": \"5d7c12345a51a0006e16ae5\",\n    \"flagVersion\": 42,\n    \"key\": \"b2dee41d-a10b-4f57-855b-10239fb28bec\",\n    \"prereqOf\": \"example parent flag\",\n    \"project\": \"5744c12345c9900708000001\",\n    \"reasonKind\": \"FALLTHROUGH\",\n    \"value\": \"example-flag-value\",\n    \"version\": 1\n  },\n  \"receivedAt\": \"2019-09-13T21:20:19.406Z\",\n  \"sentAt\": \"2019-09-13T21:20:19.366Z\",\n  \"timestamp\": \"2019-09-13T21:20:18.153Z\",\n  \"type\": \"track\",\n  \"userId\": \"example-user-id\",\n}\n",
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
      "code": "{\n  \"event\": \"click\",\n  \"integrations\": {},\n  \"messageId\": \"18925338-0a1b-4521-a36a-c8e9839e4593\",\n  \"originalTimestamp\": \"2019-09-13T21:21:43.114Z\",\n  \"properties\": {\n    \"environment\": \"5d4b12345d2a2806bd2cc6eb\",\n    \"eventId\": \"5d7c123a86f26000065862da\",\n    \"key\": \"5d7c12345a0c92071ec8963d\",\n    \"project\": \"5744c98765c9900708000001\",\n    \"selector\": \"btn\",\n    \"url\": \"http://example.com\",\n    \"version\": 1\n  },\n  \"receivedAt\": \"2019-09-13T21:21:46.415Z\",\n  \"sentAt\": \"2019-09-13T21:21:46.375Z\",\n  \"timestamp\": \"2019-09-13T21:21:43.154Z\",\n  \"type\": \"track\",\n  \"userId\": \"example-user-id\",\n}\n",
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
      "code": "{\n  \"event\": \"custom\",\n  \"integrations\": {},\n  \"messageId\": \"d747a382-0a1b-41d5-b9a6-7ae9b93925bc\",\n  \"originalTimestamp\": \"2019-09-13T21:21:58.114Z\",\n  \"properties\": {\n    \"environment\": \"5d4b12345d2a2806bd2cc6eb\",\n    \"eventId\": \"5d7c123452db400061b14dd\",\n    \"key\": \"90f49c28-0a1b-4187-b196-de0e8f57a5a7\",\n    \"project\": \"5744c12345c9900708000001\",\n    \"version\": 1\n  },\n  \"receivedAt\": \"2019-09-13T21:22:00.673Z\",\n  \"sentAt\": \"2019-09-13T21:22:00.393Z\",\n  \"timestamp\": \"2019-09-13T21:21:58.393Z\",\n  \"type\": \"track\",\n  \"userId\": \"example-user-id\",\n}\n",
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
      "code": "{\n  \"integrations\": {},\n  \"messageId\": \"8c235148-0a1b-4428-a4de-00b90adf2833\",\n  \"originalTimestamp\": \"2019-09-13T21:19:43.114Z\",\n  \"properties\": {\n    \"environment\": \"5d123454d2a2806bd2cc6eb\",\n    \"eventId\": \"5d7c12345db400061b14c1\",\n    \"key\": \"5d7c071234592071ec8954d\",\n    \"project\": \"5744c123459900708000001\",\n    \"url\": \"http://example.com\",\n    \"version\": 1\n  },\n  \"receivedAt\": \"2019-09-13T21:19:45.371Z\",\n  \"sentAt\": \"2019-09-13T21:19:45.331Z\",\n  \"timestamp\": \"2019-09-13T21:19:43.154Z\",\n  \"type\": \"page\",\n  \"userId\": \"example-user-id\",\n}\n",
      "language": "text",
      "name": "Page view event"
    }
  ]
}
[/block]

## Enabling data export for flags and environments
After you create a data export destination, you must start sending flag or environment event data to it. You can enable data export for individual flags, or for all the flags in an environment.

To learn more about exporting event data from flags and environments, read [Exporting event data for flags and environments](./data-export#exporting-event-data-for-flags-and-environments).
## Deleting a Segment destination
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
        "https://files.readme.io/83e1d5a-Screen_Shot_2019-07-10_at_11.02.00_AM.png",
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
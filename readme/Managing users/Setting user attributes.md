---
title: "Setting user attributes"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains what user attributes are, how they impact what you see in LaunchDarkly, how to configure them, and how LaunchDarkly uses them to calculate and display flag settings for users.
[block:api-header]
{
  "title": "Understanding users"
}
[/block]
Users are people, services, machines, or other resources that encounter feature flags in your app. Any identifier that uniquely corresponds to a target can be designated as a user. 

A more precise way to refer to one user is as a *user object*. 
[block:api-header]
{
  "title": "Viewing and managing users"
}
[/block]
By default, all of the attributes in your user objects are sent to LaunchDarkly. This data lets LaunchDarkly calculate the current flag settings for users and powers the autocomplete functionality throughout the LaunchDarkly UI.

Access user pages from the Users dashboard. To learn more, read [The Users dashboard](doc:the-user-dashboard).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/384c00a-user_settings.png",
        "user_settings.png",
        1450,
        777,
        "#f4f4f3"
      ],
      "caption": "A user's page."
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Creating private user attributes"
}
[/block]
You may not want to send all attributes back to LaunchDarkly. The security or data protection requirements of your organization may require you to limit what customer or user data is transmitted from your service to a third-party platform like LaunchDarkly.

For example, you may want to target customers by their personally identifying information (PII), such as their email address, without sending the email address to LaunchDarkly.

LaunchDarkly's **private user attributes** feature lets you choose which attributes get sent back to LaunchDarkly. This lets you create targeting rules based on the attributes without having to send sensitive data back to LaunchDarkly.
[block:callout]
{
  "type": "warning",
  "title": "The SDK does not use the attributes on the Users dashboard to evaluate flags",
  "body": "The SDK only evaluates flags based on the user object you provide. The SDK does not use the attributes shown on the dashboard, and user attributes are not synchronized across SDK instances. \n\nYou must provide all applicable user attributes for your targeting rules to apply correctly."
}
[/block]
Configure private attribute settings in your SDK. 

There are three different ways to configure private attributes:
* You can mark *all* attributes private globally in the `LDClient` configuration object.
* You can mark specific attributes private by name globally in the `LdClient` configuration object.
* You can mark specific attributes private by name for individual users when you construct `LDUser` objects.

User `key`s cannot be marked private.

To learn more about setting these configuration options, read your SDK's documentation. 
[block:callout]
{
  "type": "warning",
  "title": "Implications of using private attributes",
  "body": "If a feature flag contains targeting rules that reference private attributes, the user page may not be able to calculate flag settings for your users. The Users page indicates when it is unable to calculate flag settings because of private attributes. \n\nLaunchDarkly cannot perform autocomplete attributes you have made private."
}
[/block]

[block:api-header]
{
  "title": "Setting custom user attributes"
}
[/block]
A user object is constructed of the user's key, standard attributes, and custom attributes. 

Custom attributes contain any other user data that you would like to use to conditionally target your users. Custom attributes are provided in the users object. Here is an example user object which contains custom user attributes:
[block:code]
{
  "codes": [
    {
      "code": "{\n\"key\":\"YOUR-USER-KEY\",\n\"firstName\": \"Bob\"\n\"custom\":{\n\t\"groups\":[\n\t\t\"YOUR-COMPANY\",\n\t\t\"YOUR-COMPANY-GROUP-2\"\n\t\t]\n\t}\n}",
      "language": "text"
    }
  ]
}
[/block]
The user's key is not optional, but the following standard attributes are all optional:
[block:parameters]
{
  "data": {
    "0-0": "email",
    "1-0": "firstName",
    "2-0": "lastName",
    "3-0": "name",
    "4-0": "avatar",
    "5-0": "ip",
    "6-0": "country",
    "7-0": "anonymous",
    "7-1": "Must be a **boolean**. \n\nThis attribute prevents the user's other attributes from being transmitted to the events endpoint, and prevents the user from showing up on the dashboard.",
    "6-1": "Must be a **string**. \n\nThis attribute represents the country associated with the user.",
    "5-1": "Must be an **IP address**.",
    "4-1": "Must be an **absolute URL** to an avatar image for the user.",
    "3-1": "Must be a **string**.",
    "2-1": "Must be a **string**.",
    "1-1": "Must be a **string**.",
    "0-1": "Must be a **string**.",
    "h-0": "Attribute",
    "h-1": "Requirements"
  },
  "cols": 2,
  "rows": 8
}
[/block]
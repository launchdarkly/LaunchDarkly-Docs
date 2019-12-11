---
title: "Client-side and server-side SDKs"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains the differences between LaunchDarkly's client- and server-side SDKs and helps you determine which type of SDK to use. 

The SDK types have different security considerations as well as some behavioral and architectural differences. They handle flag evaluations differently, utilize different kinds of SDK keys, and support different languages.
[block:api-header]
{
  "title": "Understanding the different types of SDKs"
}
[/block]
It is important to understand the two types of SDKs we support. The different types of SDKs impact critical implementation details and use case. 

All of our SDKs are one of these two categories:
* client-side
* server-side 
[block:callout]
{
  "type": "info",
  "title": "Client-side SDKs include mobile SDKs",
  "body": "Our SDKs primarily for mobile devices, known as our \"mobile SDKs\", are categorized as client-side SDKs since, like our client-side SDKs, most mobile applications have a single-user context. This includes our Android, iOS, React Native and Xamarin SDKs. Each of these SDKs also has some mobile-specific functionality. \n\nTo learn more, read [Functional Differences](#section-functional-differences)."
}
[/block]
The table below summarizes the differences between client- and server-side SDKs:
[block:parameters]
{
  "data": {
    "h-0": "SDK Type",
    "h-1": "Details",
    "0-0": "Client-side",
    "1-0": "Server-side",
    "0-1": "* These SDKs are designed for single-user desktop, mobile, and embedded applications.\n* These SDKs are intended to be used in a potentially less secure environment, such as a personal computer or mobile device.\n* These SDKs include mobile SDKs.",
    "1-1": "* These SDKs are designed for multi-user systems.\n* These SDKs are intended to be used in a trusted environment, such as inside a corporate network or on a web server."
  },
  "cols": 2,
  "rows": 2
}
[/block]

[block:api-header]
{
  "title": "Functional differences between SDKs"
}
[/block]
LaunchDarkly attempts to keep all SDKs at feature parity with each other. Even so, slight feature differences exist between server-side, client-side, and mobile SDKs.

### Persistent feature store integrations

By default, our SDKs store transmitted data in in-memory caches. If you don't want to use an in-memory cache, we provide integrations for **server-side SDKs** to store data in persistent data stores like Redis or DynamoDB instead. 

**Client-side** and **mobile SDKs** may have platform-specific storage mechanisms and can alternatively use our relay proxy.

To learn more, read [Using a persistent feature store](doc:using-a-persistent-feature-store).

### Multi-environment support

We designed our SDKs to work with one LaunchDarkly environment at at time. However, mobile application developers might want their applications to be able to access flags on multiple LaunchDarkly environments. We designed the **mobile SDKs** to support behavior across multiple environments.

For example, if your LaunchDarkly account is set up to have different "Android", "iOS", and "Core" environments and/or projects, you can use the the multi-environment SDK feature to access flags in multiple places.

### Mobile connection state 

This feature also pertains specifically to **mobile SDKs**. Mobile applications are more likely than web / desktop software to lose their network connection. Our mobile SDKs provide additional functionality to monitor the connection state to LaunchDarkly.
[block:api-header]
{
  "title": "Security"
}
[/block]
The client- and server-side SDKs have different security considerations. 

### Client-side SDKs 

These SDKs typically run on customers' own devices. They can be compromised by users who unpack a mobile app to examine the SDK bytecode or use their browser's developer tools to inspect internal site data. As a result, you should never use a server-side SDK key in a client-side or mobile application.

Flag rules may include user identifiers or other personally identifiable information (PII) that you might not want to transmit to client-side applications. Consequently, client-side SDKs depend on LaunchDarkly's servers to safely store flag rules. See [the following section](doc:client-side-and-server-side#section-flag-evaluations) to learn more.

### Server-side SDKs

These SDKs operate within server-architected applications running on your own infrastructure or trusted cloud-based infrastructure. Neither of these locations is directly accessible by end users. Because of the limited access to server-based applications, our server-side SDKs can safely receive flag data and rulesets without needing to obscure or filter out sensitive data.
[block:api-header]
{
  "title": "Flag evaluations"
}
[/block]
The two types of SDKs evaluate feature flags differently. The different evaluation behavior supports data security and efficient data utilization.

### Client-side SDKs

Client-side SDKs are configured to operate for a singular user (identified or anonymous) at a time. When requested, these SDKs delegate to LaunchDarkly for the task of evaluating flags for this user. LaunchDarkly's services are responsible for evaluating flag rules for the specific user. Then, through either the SDK's streaming or polling connections, LaunchDarkly notifies the SDK of the evaluation results. The SDK then stores these results for quick lookup by the host applications.

For security reasons, client-side SDKs cannot download and store an entire ruleset. Client-side SDKs typically run on customers' own devices, so they are vulnerable to having users investigate SDK content by unpacking the SDK on a mobile device or inspecting its behavior in a browser. Instead of storing potentially sensitive data, the client-side SDKs confirm and update flag rules by communicating with LaunchDarkly servers through streaming connections or with REST API requests.

This approach is also beneficial from a data management perspective. Client-side SDKs' bandwidth requirements are lower than server-side SDKs' requirements because LaunchDarkly sends client-side SDKs less data.

### Server-side SDKs

When requested, server-side SDKs evaluate feature flags to determine a user's flag variation. To do this, they execute an in-process flag evaluation algorithm and return the resulting value. 

Server-side SDKs can evaluate flags because these SDKs know your complete flag ruleset. These SDKs can determine users' flag variations without having to make requests to LaunchDarkly's servers for every evaluated flag. 

Server-side SDKs get the complete ruleset associated with an SDK key when initializing a connection to LaunchDarkly's servers. Through this persistent connection, LaunchDarkly will continuously update the SDK's cached flag ruleset whenever flag rules change on LaunchDarkly.
[block:api-header]
{
  "title": "Keys"
}
[/block]
Before embedding an SDK key into your application's LaunchDarkly configuration, you must identify which category of SDK you're using so that you can select the appropriate SDK key. 

The [Account Settings](https://app.launchdarkly.com/settings/projects) page lists three keys for each environment: 
* SDK key
* mobile key
* client-side ID

Each of these keys grants different access levels to LaunchDarkly's APIs.

LaunchDarkly enforces that each of the SDK types use the appropriate key as described below. Requests made with one of the other two keys will be rejected. See ["Language support'](https://docs.launchdarkly.com/docs/client-side-and-server-side#section-language-support) to identify which keys are used by each specific SDK.

### Client-side SDKs

Configure JavaScript-based client-side SDKs to use the client-side ID. This ID grants these SDKs access to evaluate any flags, as long as the flag is associated with the provided key's environment  and has the "Make this flag available to client-side SDKs" option enabled. Because you must manually connect every flag to a client-side SDK, you can restrict which flags are accessible by the client-side ID. 

The client-side ID is public and does not need to be kept a secret.
[block:callout]
{
  "type": "info",
  "title": "Making flags available to client-side SDKs",
  "body": "Find the \"Make this flag available to client-side SDKs\" option on a flag's **Settings** tab."
}
[/block]
### Mobile SDKs

Configure mobile SDKs (plus other client-side SDKs not written in JavaScript) to use the mobile key. This key grants these SDKs evaluation rights to all flags associated with the provided key's environment. Unlike client-side IDs, mobile keys have access to evaluate all flags for the associated environment. 

The mobile key is sensitive by nature and should be kept a secret. If a mobile key is exposed, you can reset it on the **Account Settings** page.

### Server-side SDKs

Configure server-side SDKs to use the SDK key. This key grants server-side SDKs read-only access to all flag data associated with the provided key's environment. With this key, server-side SDKs can download the entire flag ruleset for all flags in the environment. 

The SDK key is sensitive by nature and should be kept a secret. If an SDK key is exposed, you can reset it on the **Account Settings** page.
[block:api-header]
{
  "title": "Language support"
}
[/block]
We offer SDKs for many languages and technologies. Some, but not all, languages have client- and server-side SDKs available.

Explore the following SDK reference guides for specific details about how to use LaunchDarkly with your tech stack:

[block:parameters]
{
  "data": {
    "h-0": "SDK",
    "h-1": "Type",
    "h-2": "Key",
    "0-0": "[.NET](doc:dotnet-sdk-reference)",
    "2-0": "[C/C++ (client-side)](doc:c-sdk-reference)",
    "1-0": "[Android](doc:android-sdk-reference)",
    "3-0": "[C/C++ (server-side)](doc:c-server-sdk-reference)",
    "4-0": "[Electron](doc:electron-sdk-reference)",
    "5-0": "[Go](doc:go-sdk-reference)",
    "6-0": "[iOS (Objective-C)](doc:ios-objc-sdk-reference)",
    "7-0": "[iOS (Swift)](doc:ios-sdk-reference)",
    "8-0": "[Java](doc:java-sdk-reference)",
    "9-0": "[JavaScript](doc:js-sdk-reference)",
    "10-0": "[Node.js (client-side)](doc:node-client-sdk-reference)",
    "11-0": "[Node.js (server-side)](doc:node-sdk-reference)",
    "12-0": "[PHP](doc:php-sdk-reference)",
    "13-0": "[Python](doc:python-sdk-reference)",
    "14-0": "[React](doc:react-sdk-reference)",
    "15-0": "[React Native](doc:react-native-sdk-reference)",
    "17-0": "[Ruby](doc:ruby-sdk-reference)",
    "18-0": "[Xamarin](doc:xamarin-sdk-reference)",
    "0-1": "Server-side",
    "3-1": "Server-side",
    "5-1": "Server-side",
    "8-1": "Server-side",
    "11-1": "Server-side",
    "12-1": "Server-side",
    "13-1": "Server-side",
    "17-1": "Server-side",
    "1-1": "Client-side (Mobile)",
    "2-1": "Client-side",
    "4-1": "Client-side",
    "6-1": "Client-side (Mobile)",
    "7-1": "Client-side (Mobile)",
    "15-1": "Client-side (Mobile)",
    "18-1": "Client-side (Mobile)",
    "9-1": "Client-side",
    "10-1": "Client-side",
    "14-1": "Client-side",
    "0-2": "SDK key",
    "3-2": "SDK key",
    "5-2": "SDK key",
    "8-2": "SDK key",
    "11-2": "SDK key",
    "12-2": "SDK key",
    "13-2": "SDK key",
    "17-2": "SDK key",
    "1-2": "Mobile key",
    "2-2": "Mobile key",
    "4-2": "Client-side ID",
    "6-2": "Mobile key",
    "7-2": "Mobile key",
    "18-2": "Mobile key",
    "15-2": "Mobile key",
    "9-2": "Client-side ID",
    "10-2": "Client-side ID",
    "14-2": "Client-side ID",
    "16-0": "[Roku](doc:roku-sdk-reference)",
    "16-1": "Client-side",
    "16-2": "Mobile key"
  },
  "cols": 3,
  "rows": 19
}
[/block]
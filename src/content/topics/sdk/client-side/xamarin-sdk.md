---
title: "Xamarin SDK Reference"
excerpt: ""
---
This reference guide documents all of the methods available in our Xamarin SDK, and explains in detail how these methods work. If you want to dig even deeper, our SDKs are open source-- head to our [Xamarin SDK GitHub repository](https://github.com/launchdarkly/xamarin-client-sdk) to look under the hood. Additionally you can clone and run sample applications using this SDK with [Xamarin](https://github.com/launchdarkly/hello-xamarin), and [Xamarin.Forms](https://github.com/launchdarkly/hello-xamarin-forms). The [online API docs](https://launchdarkly.github.io/xamarin-client-sdk/) contain the programmatic definitions of every type, property, and method.

<Callout intent="alert">
 <Callout.Title>For use in mobile / desktop and embedded client applications only</Callout.Title>
   <Callout.Description>The LaunchDarkly Xamarin SDK is designed primarily for use in *single user* desktop and embedded applications. It follows the client-side LaunchDarkly model for single-user contexts (much like our other mobile or JavaScript SDKs)-- a network call must be made to change user contexts, so changing users should be infrequent. It is not intended for use in multi-user systems such as web servers. Learn more about our [client-side and server-side SDKs](./client-side-and-server-side).",
 </Callout.Description>
</Callout>

## Getting started
Building on top of our [Quickstart](./getting-started) guide, the following steps will get you started with using the LaunchDarkly SDK in your Xamarin application.
<Callout intent="info">
  <Callout.Title>Requirements</Callout.Title>
   <Callout.Description>The Xamarin SDK natively supports Android (version 7.1 or higher) or iOS (version 
1. or higher); it can also be used on any other platform that supports .NET Standard (version 1.6 or higher), although the .NET Standard version lacks some mobile-specific features such as detecting network connectivity.
Previous beta releases of the SDK used the Xamarin.Essentials library, but it no longer has that dependency.</Callout.Description>
</Callout>
The first step is to install the LaunchDarkly SDK as a dependency. You should use [NuGet](http://docs.nuget.org/docs/start-here/using-the-package-manager-console) to add the Xamarin SDK to your project. (Note that previous beta releases of the SDK used a different package name.)
[block:code]
{
  "codes": [
    {
      "code": "Install-Package LaunchDarkly.XamarinSdk",
      "language": "csharp"
    }
  ]
}
[/block]
Next you should import the LaunchDarkly packages in your application code.
[block:code]
{
  "codes": [
    {
      "code": "using LaunchDarkly.Client;\nusing LaunchDarkly.Xamarin;",
      "language": "csharp"
    }
  ]
}
[/block]
Once the SDK is installed, you'll want to create a single, shared instance of `LDClient`.

Once the dependency is installed, you'll want to initialize the LaunchDarkly client. You'll want to create a single, shared instance of `LdClient`. To create a client instance, you need your environment's mobile key (available on your [account settings page](https://app.launchdarkly.com/settings#/projects)). Never embed a server-side SDK key into a mobile application.

The following example shows the simplest way to create the client. It will block for up to 
1. seconds until the latest feature flags have been retrieved from LaunchDarkly. 
[block:code]
{
  "codes": [
    {
      "code": "var user = User.WithKey(user_key);\nvar timeSpan = TimeSpan.FromSeconds(10);\nldClient = LdClient.Init(\"MY_MOBILE_KEY\", user, timeSpan);",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]
However, calling blocking code from the main thread in an Android app is not considered a best practice. The preferred method (loading the client asynchronously) is shown below.
[block:code]
{
  "codes": [
    {
      "code": "User user = User.WithKey(user_key);\nldClient = await LdClient.InitAsync(\"MY_MOBILE_KEY\", user);",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]

<Callout intent="alert">
<Callout.Title>LdClient must be a singleton</Callout.Title>
   <Callout.Description>It's important to make this a singleton-- internally, the client instance maintains internal state that allows us to serve feature flags without making any remote requests. **Be sure that you're not instantiating a new client with every request.**</Callout.Description>

</Callout>

<Callout intent="alert">
  <Callout.Title>Android requires AccessNetworkState permission</Callout.Title>
   <Callout.Description>For Android, the `AccessNetworkState` permission is required and must be configured in the Android project.  Read more in the [Xamarin docs](https://docs.microsoft.com/en-us/xamarin/essentials/connectivity?context=xamarin%2Fios&tabs=android) about how to implement this requirement.
</Callout.Description>
</Callout>
Using `ldClient`, you can check which variation a particular user should receive for a given feature flag.
[block:code]
{
  "codes": [
    {
      "code": "bool showFeature = ldClient.BoolVariation(\"your.feature.key\", false);\nif (showFeature) {\n    // application code to show the feature \n}\nelse {\n    // the code to run if the feature is off\n}",
      "language": "csharp"
    }
  ]
}
[/block]

## Customizing your client
You can also pass custom parameters to the client by creating a custom configuration object:
[block:code]
{
  "codes": [
    {
      "code": "Configuration config = LaunchDarkly.Client.Configuration\n    .Builder(\"YOUR_SDK_KEY\")\n    .EventFlushInterval(TimeSpan.FromSeconds(2))\n    .Build();\nLdClient ldClient = LdClient.Init(config, user);
",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]
Here, we've customized the event queue flush frequency. The complete list of customizable parameters for `Configuration.Builder` is as follows:
[block:parameters]
{
  "data": {
    "h-0": "Builder Method",
    "h-1": "Parameter Type",
    "0-0": "`BaseUri`",
    "1-0": "`StreamUri`",
    "2-0": "`EventsUri`",
    "3-0": "`IsStreamingEnabled`",
    "4-0": "`EventCapacity`",
    "5-0": "`EventFlushInterval`",
    "6-0": "`PollingInterval`",
    "7-0": "`StartWaitTime`",
    "8-0": "`ReadTimeout`",
    "9-0": "`ReconnectTime`",
    "10-0": "`ConnectionTimeout`",
    "11-0": "`HttpMessageHandler`",
    "12-0": "`Offline`",
    "h-2": "Description",
    "h-3": "Default Value",
    "0-1": "`Uri`",
    "1-1": "`Uri`",
    "2-1": "`Uri`",
    "4-1": "`int`",
    "5-1": "`TimeSpan`",
    "6-1": "`TimeSpan`",
    "7-1": "`TimeSpan`",
    "8-1": "`TimeSpan`",
    "9-1": "`TimeSpan`",
    "10-1": "`TimeSpan`",
    "11-1": "`HttpMessageHandler`",
    "12-1": "`bool`",
    "3-1": "`bool`",
    "0-2": "Set the base URL of the LaunchDarkly server for this configuration",
    "4-2": "Set the capacity of the events buffer.",
    "10-2": "Set the connection timeout for the configuration.",
    "2-2": "Set the events URL of the LaunchDarkly server for this configuration.",
    "5-2": "Set the number of seconds between flushes of the event buffer.",
    "12-2": "Set whether this client is offline.",
    "6-2": "Set the polling interval (when streaming is disabled). Values less than the default of 30 seconds will be set to 30 seconds.",
    "3-2": "Boolean value which enables streaming.",
    "1-2": "LaunchDarkly stream URI to be used.",
    "7-2": "The timeout when reading data from the EventSource API.",
    "1-3": "https://stream.launchdarkly.com",
    "2-3": "https://events.launchdarkly.com",
    "0-3": "https://app.launchdarkly.com",
    "3-3": "`true`",
    "6-3": "30 seconds",
    "4-3": "500 events",
    "5-3": "5 seconds",
    "7-3": "
1. seconds",
    "8-3": "5 minutes",
    "9-3": "1 second",
    "10-3": "
1. seconds",
    "11-3": "A default [HttpClientHandler](https://msdn.microsoft.com/en-us/library/system.net.http.httpclienthandler.aspx)",
    "12-3": "`false`",
    "8-2": "The timeout when reading data from the stream.",
    "9-2": "The stream connection timeout.",
    "11-2": "Sets the handler for http requests. Can be used to configure proxy authentication.",
    "13-0": "`AllAttributesPrivate`",
    "13-1": "`bool`",
    "13-2": "Whether all user attributes (except the user key) should be marked as Private user attributes, and not sent to LaunchDarkly.",
    "13-3": "`false`",
    "14-3": "No attributes are private by default.",
    "14-2": "Adds the name of a user attribute that should be marked as [private](./private-user-attributes) to a internally managed list. May be called multiple times to mark additional attributes as private.",
    "14-1": "`string`",
    "14-0": "`PrivateAttribute`"
  },
  "cols": 4,
  "rows": 15
}
[/block]

## Users
Feature flag targeting and rollouts are all determined by the *user* you pass to your `Identify` call. In our Xamarin SDK, you can construct a simple `User` that only has a key by calling `User.WithKey`, or use `User.Builder` which allows setting all properties. Here's an example:
[block:code]
{
  "codes": [
    {
      "code": " LDUser user = User.Builder(\"aa0ceb\")\n     .FirstName(\"Ernestina\")\n     .LastName(\"Evans\")\n     .Email(\"ernestina@example.com\")\n     .Custom(\"group\", \"admins\")\n     .Build();",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]
Let's walk through this snippet. The argument to `Builder` is the user's key-- in this case we've used the hash `"aa0ceb"`. **The user key is the only mandatory user attribute**. The key should also uniquely identify each user. You can use a primary key, an e-mail address, or a hash, as long as the same user always has the same key. We recommend using a hash if possible.

All of the other attributes (set via calls to `FirstName`, `LastName`, `Email`, and `Custom` attributes) are optional. The attributes you specify will automatically appear on our dashboard, meaning that you can start segmenting and targeting users with these attributes. 

In addition to the built-in attributes defined in the `User` class, you can pass us any of your own user data by passing `custom` attributes, like the `groups` attribute in the example above. 
<Callout intent="info">
  <Callout.Title>A note on types</Callout.Title>
   <Callout.Description>Most of our built-in attributes (like names and e-mail addresses) expect string values. Custom attributes values can be strings, booleans (like true or false), numbers, or arbitrary JSON values.
If you enter a custom value on our dashboard that looks like a number or a boolean, it'll be interpreted that way. The Xamarin SDK is strongly typed, so be aware of this distinction.
</Callout.Description>
</Callout>
Custom attributes are one of the most powerful features of LaunchDarkly. They let you target users according to any data that you want to send to us-- organizations, groups, account plans-- anything you pass to us becomes available instantly on our dashboard.

## Private user attributes
You can optionally configure the Xamarin SDK to treat some or all user attributes as [private user attributes](./private-user-attributes) . Private user attributes can be used for targeting purposes, but are removed from the user data sent back to LaunchDarkly.

In the Xamarin SDK there are two ways to define private attributes for the entire LaunchDarkly client:

* When creating the LaunchDarkly `Configuration` object, you can call the `AllAttributesPrivate` method, which takes in a boolean parameter. If `true`, all user attributes (except the key) for *all users* are removed before the user is sent to LaunchDarkly.
* When creating the LaunchDarkly `Configuration` object, you can call the `PrivateAttributeName` method, which takes in an attribute name (string) as a parameter and adds it to an internally managed list of private attributes. This method may be called multiple times to mark additional attributes as private. If any user has a custom or built-in attribute named in the private attributes list, it will be removed before the user is sent to LaunchDarkly.

You can also mark attributes as private when building the user object itself by calling `AsPrivateAttribute()` immediately after setting the attribute. For example:
[block:code]
{
  "codes": [
    {
      "code": "var user = User.Builder(\"aa0ceb\")\n    .Email(\"test@example.com\").AsPrivateAttribute()\n    .Build();",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]
When this user is sent back to LaunchDarkly, the `email` attribute will be omitted.
## Anonymous users
You can also distinguish logged-in users from anonymous users in the SDK, as follows:
[block:code]
{
  "codes": [
    {
      "code": " LDUser user = User.Builder(\"aa0ceb\")\n     .Anonymous(true)\n     .Build();",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]
You will still need to generate a unique key for anonymous users-- session IDs or UUIDs work best for this. 

Anonymous users work just like regular users, except that they won't appear on your Users page in LaunchDarkly. You also can't search for anonymous users on your Features page, and you can't search or autocomplete by anonymous user keys. This is actually a good thing-- it keeps anonymous users from polluting your Users page!

In Android or iOS, you can also allow the SDK to create a key for an anonymous user based on a unique device identifier (as defined by the [DeviceInfo](https://github.com/jamesmontemagno/DeviceInfoPlugin) Xamarin plugin); it will do so if you set the key to null and also set the anonymous flag:
[block:code]
{
  "codes": [
    {
      "code": "LDUser user = User.Builder((string)null).Anonymous(true).Build();",
      "language": "csharp"
    }
  ]
}
[/block]

## Variation
The `Variation` method determines whether a flag is enabled or not for a specific user.   In Xamarin, there is  a `variation` method for each type (e.g. `BoolVariation`, `StringVariation`):
[block:code]
{
  "codes": [
    {
      "code": "ldClient.BoolVariation(\"your.feature.key\", false);",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]
`variation` calls take the feature flag key and a default value. 

The default value will only be returned if an error is encountered-- for example, if the feature flag key doesn't exist or the user doesn't have a key specified. 

## VariationDetail
The `VariationDetail` methods (`BoolVariationDetail`, etc.) work the same as `Variation`, but also provide additional "reason" information about how a flag value was calculated (for instance, if the user matched a specific rule). You can examine the "reason" data programmatically; you can also view it with data export, if you are capturing detailed analytics events for this flag. To enable this feature, you must call `WithEvaluationReasons(true)` on your `Configuration`.

For more information, see [Evaluation reasons](./evaluation-reasons).
## Track
The `Track` method allows you to record actions your users take on your site. This lets you record events that take place on your server. In LaunchDarkly, you can tie these events to goals in A/B tests. Here's a simple example:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.Track(\"your-goal-key\");",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]
You can also attach custom data to your event by passing an extra parameter to `Track` (using the `LdValue` class to represent any value that can be encoded in JSON): 
[block:code]
{
  "codes": [
    {
      "code": "ldClient.Track(\"Completed purchase\", LdValue.Of(\"sku132\"));",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]

## All Flags

<Callout intent="alert">
   <Callout.Description>Note that unlike `Variation` and `Identify` calls, `AllFlags` does not send events to LaunchDarkly. Thus, users are not created or updated in the LaunchDarkly dashboard.</Callout.Description>
</Callout>

The `AllFlags` method produces a map of feature flag keys to their values for the current user.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.AllFlags();",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]

## Fallback value and offline mode
The default (fallback) values are defined in your code. The default value will only be returned if an error is encountered or if LaunchDarkly is unreachable -- for example, if the feature flag key doesn't exist.

In some situations, you might want avoid remote calls to LaunchDarkly and fall back to default values for your feature flags. For example, if your software is both cloud-hosted and distributed to customers to run on premise, it might make sense to fall back to defaults when running on premise. You can do this by setting offline mode in the client's Config. When the client is in offline mode, no network requests will be made, so it is suitable for unit-testing.
[block:code]
{
  "codes": [
    {
      "code": "Configuration config = Configuration.Builder(\"SDK_KEY\")\n    .Offline(true)\n    .Build();\nLdClient client = LdClient.Init(config);",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]

## Flush
Internally, the LaunchDarkly SDK keeps an event buffer for `Track` and `Identify` calls. These are flushed periodically in a background thread. In some situations (for example, if you're testing out the SDK in a REPL), you may want to manually call `Flush` to process events immediately. 
[block:code]
{
  "codes": [
    {
      "code": "ldClient.Flush();",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]
Note that the flush interval is configurable-- if you need to change the interval, you can do so via the `Configuration` class.
## Dispose
Dispose safely shuts down the client instance and releases all resources associated with the client. In most long-running applications, you should not have to call dispose.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.Dispose();",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]

## Using the Relay Proxy
You can configure the Xamarin SDK to connect to the [LaunchDarkly relay proxy](https://github.com/launchdarkly/ld-relay) as follows:
[block:code]
{
  "codes": [
    {
      "code": "Configuration config = Configuration.Builder(\"YOUR_SDK_KEY\")\n      .StreamUri(new URI(\"YOUR_RELAY_URI\"))\n      .Build();\nLdClient ldClient = LdClient.Init(config);",
      "language": "csharp",
      "name": "C#"
    }
  ]
}
[/block]

## Logging
The Xamarin SDK uses the `Common.Logging` framework. For an example configuration check out the [Common.Logging readme](https://github.com/net-commons/common-logging#2-register-and-configure-commonlogging).

Be aware of two considerations when enabling the DEBUG log level:

 
1. Debug-level logs can be very verbose. It is not recommended that you turn on debug logging in high-volume environments.
 2. Potentially sensitive information is logged including LaunchDarkly users created by you in your usage of this SDK.
## Real-Time Updates
LaunchDarkly manages all flags for a user context in real-time by updating the flag cached based on a real-time event stream. When a flag is modified via the LaunchDarkly dashboard, the flag values for the current user will update almost immediately. The default SDK configuration has been found to be the best combination of low latency updates and minimal battery drain:

 
1. When the app is foregrounded a (Server-Sent Events)[https://en.wikipedia.org/wiki/Server-sent_events] streaming connection is made to LaunchDarkly. This streaming connection stays open as long as your app is in the foreground and is connected to the internet.

 2. When the app is backgrounded, the stream connection is terminated and the SDK will poll (with caching) for flag updates every 
1. minutes.

 3. When the app is foregrounded, we reconnect to the stream and fetch the latest flags.

 4. In either the foreground or background, we don't try to update unless your device has internet connectivity.

This configuration means that you will get near real-time updates for your feature flag values when the app is in the foreground. See the "customizing your client" section above for information on how to change your configuration.

To perform real-time updates in your app, your app will need to register listeners for updates from the streaming/polling connection for each flag you'd like to watch:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.FlagChanged += (sender, eventArgs) => {\n  if (eventArgs.Key == \"key-for-flag-i-am-watching\") {\n    DoSomethingWithNewFlagValue(eventArgs.NewBoolValue);\n  }\n};",
      "language": "csharp"
    }
  ]
}
[/block]
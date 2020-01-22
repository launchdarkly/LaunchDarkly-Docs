---
title: "Android SDK Reference"
excerpt: ""
---
<Callout intent="info">
  <CalloutTitle>Supported Android SDK Versions</CalloutTitle>
   <CalloutDescription>This library is compatible with Android SDK versions 
1. and up (4.1 Jelly Bean)</CalloutDescription>
</Callout>

This reference guide documents all of the methods available in our Android SDK, and explains in detail how these methods work. If you want to dig even deeper, our SDKs are open source-- head to our [Android SDK GitHub repository](https://github.com/launchdarkly/android-client-sdk) or our [JavaDocs](https://javadoc.io/doc/com.launchdarkly/launchdarkly-java-server-sdk/) to look under the hood. Additionally you can clone and run a [sample application](https://github.com/launchdarkly/hello-android) using this SDK.
## Getting started
Building on top of our [Quickstart](./getting-started) guide, the following steps will get you started with using the LaunchDarkly SDK in your Android application.

To get started, declare a dependency on the LaunchDarkly Android SDK.
[block:code]
{
  "codes": [
    {
      "code": "implementation 'com.launchdarkly:launchdarkly-android-client-sdk:2.8.5'",
      "language": "java",
      "name": "Gradle"
    }
  ]
}
[/block]

<Callout intent="info">
  <CalloutTitle>ProGuard / R8</CalloutTitle>
   <CalloutDescription>If you're using ProGuard or R8, the configuration for the Android SDK should be automatically included from the `aar` artifact. If this is not the case for your build, include the Proguard configuration lines from [consumer-proguard-rules.pro](https://github.com/launchdarkly/android-client-sdk/blob/master/launchdarkly-android-client-sdk/consumer-proguard-rules.pro) into your proguard file.</CalloutDescription>
</Callout>
Once the SDK is installed, you'll want to create a single, shared instance of `LDClient`. You should specify your *mobile key* here so that your application will be authorized to connect to LaunchDarkly and for your application and environment.

The following example shows the simplest way to create the client. It will block for up to 5 seconds until the latest feature flags have been retrieved from LaunchDarkly.
[block:code]
{
  "codes": [
    {
      "code": "LDConfig ldConfig = new LDConfig.Builder()\n    .setMobileKey(\"YOUR_MOBILE_KEY\")\n    .build();
user = new LDUser.Builder(\"user key\")\n   .email(\"fake@example.com\")\n   .build();
ldClient = LDClient.init(this.getApplication(), ldConfig, user, 5);\n",
      "language": "java"
    }
  ]
}
[/block]

<Callout intent="info">
<CalloutTitle>Use a mobile key</CalloutTitle>
   <CalloutDescription>Be sure to use a mobile key from your [Environments](https://app.launchdarkly.com/settings#/environments) page. Never embed a server-side SDK key into an embedded or desktop application.</CalloutDescription>
</Callout>
However, calling blocking code from the main thread in an Android app is not considered a best practice. The preferred method is shown below. It will allow you to use the client immediately. Flags from the previous launch of the app are stored on the device and retrieved for immediate use. The client will still connect in the background and continually update itself with the latest flags.
[block:code]
{
  "codes": [
    {
      "code": "LDClient ldClient = LDClient.init(this.getApplication(), ldConfig, user, 0);
",
      "language": "java"
    }
  ]
}
[/block]
Using `ldClient`, you can check which variation a particular user should receive for a given feature flag.
[block:code]
{
  "codes": [
    {
      "code": "boolean showFeature = ldClient.boolVariation(flagKey, true);\nif (showFeature) {\n  // application code to show the feature\n}\nelse {\n  // the code to run if the feature is off\n}",
      "language": "java"
    }
  ]
}
[/block]
Lastly, when your application is about to terminate, shut down `ldClient`. This ensures that the client releases any resources it is using, and that any pending analytics events are delivered to LaunchDarkly. If your application quits without this shutdown step, you may not see your requests and users on the dashboard, because they are derived from analytics events. **This is something you only need to do once**.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.close();",
      "language": "java"
    }
  ]
}
[/block]

## Customizing your client
You can also pass other custom parameters to the client via the configuration object:
[block:code]
{
  "codes": [
    {
      "code": "LDConfig ldConfig = new LDConfig.Builder()\n    .setMobileKey(\"YOUR_MOBILE_KEY\")\n  \t.setConnectionTimeoutMillis(5000)\n    .setEventsFlushIntervalMillis(5000)\n    .build();\n",
      "language": "java"
    }
  ]
}
[/block]
Here, we've customized the client connect and flush interval parameters. For the full set of config options check out the [JavaDoc](http://launchdarkly.github.io/android-client-sdk/) and the Github [Readme](https://github.com/launchdarkly/android-client-sdk/blob/master/README.md) 
## Users
Feature flag targeting and rollouts are all determined by the *user* you pass to your client. In our Android SDK, we use a [builder pattern](http://en.wikipedia.org/wiki/Builder_pattern) to make it easy to construct users. Here's an example:
[block:code]
{
  "codes": [
    {
      "code": "user = new LDUser.Builder(\"aa0ceb\")\n   .email(\"fake@example.com\")\n   .firstName(\"Jake\")\n   .lastName(\"Fake\")\n   .custom(\"group\", \"microsoft\")\n   .build();",
      "language": "java"
    }
  ]
}
[/block]
Let's walk through this snippet. The first argument to the builder is the user's key-- in this case we've used the hash `"aa0ceb"`. **The user key is the only mandatory user attribute**. The key should also uniquely identify each user. You can use a primary key, an e-mail address, or a hash, as long as the same user always has the same key. We recommend using a hash if possible.

All of the other attributes (like `firstName`, `email`, and the `custom` attributes) are optional. The attributes you specify will automatically appear on our dashboard, meaning that you can start segmenting and targeting users with these attributes. 

In addition to built-in attributes like names and e-mail addresses, you can pass us any of your own user data by passing `custom` attributes, like the `groups` attribute in the example above. 
<Callout intent="info">
  <CalloutTitle>A note on types</CalloutTitle>
   <CalloutDescription>Most of our built-in attributes (like names and e-mail addresses) expect string values. Custom attributes values can be strings, booleans (like true or false), numbers, or lists of strings, booleans or numbers. 
If you enter a custom value on our dashboard that looks like a number or a boolean, it'll be interpreted that way. The Android SDK is strongly typed, so be aware of this distinction.</CalloutDescription>
</Callout>
Custom attributes are one of the most powerful features of LaunchDarkly. They let you target users according to any data that you want to send to us-- organizations, groups, account plans-- anything you pass to us becomes available instantly on our dashboard.

## Private user attributes
You can optionally configure the Android SDK to treat some or all user attributes as [private user attributes](https://docs.launchdarkly.com/v2.0/docs/private-user-attributes). Private user attributes can be used for targeting purposes, but are removed from the user data sent back to LaunchDarkly.

In the Android SDK you can define private attributes for the **entire** LaunchDarkly client. When creating the `LDConfig` object, you can call the `setPrivateAttributes` method, which which takes in a set of custom or built-in attributes as a parameter. If any user has a custom or built-in attribute named in this list, it will be removed before the user is sent to LaunchDarkly. 
[block:code]
{
  "codes": [
    {
      "code": "LDConfig ldConfig = new LDConfig.Builder()\n  \t.setPrivateAttributes(new ArrayList<String>(){{add(\"email\");}})\n    .build();",
      "language": "java"
    }
  ]
}
[/block]
You can also mark attributes as private when building the user object itself by passing a list of attribute names to the user build method. For example:
[block:code]
{
  "codes": [
    {
      "code": "user = new LDUser.Builder(\"aa0ceb\")\n   .email(\"test@example.com\")\n   .build(new ArrayList<String>(){{add(\"email\");}});",
      "language": "java"
    }
  ]
}
[/block]
When this user is sent back to LaunchDarkly, the `email` attribute will be removed.
## Anonymous users
You can also distinguish logged-in users from anonymous users in the SDK, as follows:
[block:code]
{
  "codes": [
    {
      "code": "user = new LDUser.Builder(\"user key\")\n   .anonymous(true)\n   .build();",
      "language": "java"
    }
  ]
}
[/block]
You can leave the key parameter in the Builder null or make it an empty string and the client will automatically set it to a LaunchDarkly-specific device-unique string that is consistent between app restarts and device reboots.

Anonymous users work just like regular users, except that they won't appear on your Users page in LaunchDarkly. You also can't search for anonymous users on your Features page, and you can't search or autocomplete by anonymous user keys. This is actually a good thing-- it keeps anonymous users from polluting your Users page!
## Variation
The `variation` method determines whether a flag is enabled or not for a specific user. In Android, there is  a `variation` method for each type (e.g. `boolVariation`, `stringVariation`):
[block:code]
{
  "codes": [
    {
      "code": "variationResult = ldClient.boolVariation(flagKey, false);",
      "language": "java"
    }
  ]
}
[/block]
`variation` calls take the feature flag key and a fallback value. 

The fallback value will only be returned if an error is encountered-- for example, if the feature flag key doesn't exist or the user doesn't have a key specified. 

The `variation` call will automatically create a user in LaunchDarkly if a user with that user key doesn't exist already. There's no need to create users ahead of time (but if you do need to, take a look at Identify). 
<Callout intent="info">
  <CalloutTitle>Handling flag values on initial application launch</CalloutTitle>
   <CalloutDescription>When `LDClient` is initialized for the first time at app launch, users will receive the feature flag fallback values until an initial connection to LaunchDarkly is completed for the first time. Take a look at the section above on various ways to initialize the client.</CalloutDescription>
</Callout>

## VariationDetail

<Callout intent="info">
  <CalloutTitle>Availability</CalloutTitle>
   <CalloutDescription>Since V2.7.0</CalloutDescription>
</Callout>
The `variationDetail` methods (`boolVariationDetail`, etc.) work the same as `variation`, but also provide additional "reason" information about how a flag value was calculated (for instance, if the user matched a specific rule). You can examine the "reason" data programmatically; you can also view it with data export, if you are capturing detailed analytics events for this flag.

For more information, see [Evaluation reasons](./evaluation-reasons).
## All flags

<Callout intent="alert">
  <CalloutTitle>Creating users</CalloutTitle>
   <CalloutDescription>Note that unlike variation and identify calls, allFlags does not send events to LaunchDarkly. Thus, users are not created or updated in the LaunchDarkly dashboard.</CalloutDescription>
</Callout>
The `allFlags` method produces a map of feature flag keys to their values for a specific user.
[block:code]
{
  "codes": [
    {
      "code": "ldclient.allFlags();",
      "language": "java"
    }
  ]
}
[/block]

## Track
The `track` method allows you to record actions your users take on your site. This lets you record events that take place on your server. In LaunchDarkly, you can tie these events to goals in A/B tests. You can also attach custom JSON data to your event by passing an extra `JsonElement` parameter to `track`. Here's a simple example:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.track(\"your-goal-key\", data)",
      "language": "java"
    }
  ]
}
[/block]

## Offline mode
In some situations, you might want to stop making remote calls to LaunchDarkly and switch to the last known values for your feature flags.  `offline` mode lets you do this easily. 
[block:code]
{
  "codes": [
    {
      "code": "LDConfig ldConfig = new LDConfig.Builder()\n    .setMobileKey(\"YOUR_MOBILE_KEY\")\n  \t.setOffline(true)\n    .build();
ldClient = LDClient.init(this.getApplication(), ldConfig, user);
// Or to switch an already-instantiated client to offline mode:\nldclient.setOffline()",
      "language": "java"
    }
  ]
}
[/block]

<Callout intent="info">
  <CalloutTitle>Airplane/Flight Mode</CalloutTitle>
   <CalloutDescription>If a user's device is in airplane/flight mode or if they are not connected to a network, LaunchDarkly will use the latest stored flag settings in memory.  If there are no previously stored flag settings, then the fallback values will be used.</CalloutDescription>
</Callout>

## Flush
Internally, the LaunchDarkly SDK keeps an event buffer for `track` calls. These are flushed periodically in a background thread. In some situations (for example, if you're testing out the SDK in a simulator), you may want to manually call `flush` to process events immediately. 
[block:code]
{
  "codes": [
    {
      "code": "ldclient.flush()",
      "language": "java"
    }
  ]
}
[/block]
Note that the flush interval is configurable-- if you need to change the interval, you can do so via the configuration.

## Changing the User Context
If your app is used by multiple users on a single device, you may want to change users and have separate flag settings for each user. To achieve this, the SDK will store the last 5 user contexts on a single device, with support for switching between different user contexts.

You can use the `identify` method to switch user contexts:
[block:code]
{
  "codes": [
    {
      "code": "LDUser updatedUser = new LDUser.Builder(user)\n   .email(\"fake2@example.com\")\n   .build();
ldClient.identify(updatedUser);",
      "language": "java"
    }
  ]
}
[/block]
The identify() call will load any saved flag values for the new user and immediately trigger an update of the latest flags from LaunchDarkly. 

Identify() returns a  [Future](https://developer.android.com/reference/java/util/concurrent/Future) to indicate completion. If you want to be sure subsequent code is using the latest values from the server, you can wait on the future using `get`.
## Real-Time Updates
LaunchDarkly manages all flags for a user context in real-time by polling flags based on a real-time event stream.  When a flag is modified via the LaunchDarkly dashboard, the flag values for the current user will update almost immediately. The default SDK configuration has been found to be the best combination of low latency updates and minimal battery drain:


1. When the app is foregrounded a [Server-Sent Events](https://en.wikipedia.org/wiki/Server-sent_events) streaming connection is made to LaunchDarkly. This streaming connection stays open as long as your app is in the foreground and is connected to the internet.
2. When the app is backgrounded, the stream connection is terminated and the SDK will poll (with caching) for flag updates every 
1. minutes.
3. When the app is foregrounded, we fetch the latest flags and reconnect to the stream. 
4. In either the foreground or background, we don't try to update unless your device has internet connectivity.

This configuration means that you will get near real-time updates for your feature flag values when the app is in the foreground. See the "customizing your client" section above for information on how to change your configuration.

To perform real-time updates in your app, your app will need to register listeners for updates from the streams / polls for each flag you'd like to watch:
[block:code]
{
  "codes": [
    {
      "code": "String flagKey = \"yourFlagKey\";
FeatureFlagChangeListener listener = new FeatureFlagChangeListener() {\n\t@Override\n  public void onFeatureFlagChange(String flagKey) {\n  \tbool newValue = newLDClient.get().boolVariation(flagKey, false);\n  }\n}
LDClient.get().registerFeatureFlagListener(flagKey, listener);",
      "language": "java"
    }
  ]
}
[/block]
Similarly you can unregister listeners to disable them:
[block:code]
{
  "codes": [
    {
      "code": "LDClient.get().unregisterFeatureFlagListener(flagKey, listener);",
      "language": "java"
    }
  ]
}
[/block]
---
<Callout intent="info">
  <CalloutTitle>Availability</CalloutTitle>
   <CalloutDescription>Since V2.8.0:\n`LDAllFlagsListener`\n`LDClient.registerAllFlagsListener`\n`LDClient.unregisterAllFlagsListener`</CalloutDescription>
</Callout>
Additionally an update listener interface is provided for cases where you would like to be notified any time the flag cache is updated. The application provides a class implementing `LDAllFlagsListener` which provides the SDK with the method `onChange`. Whenever the SDK's flag cache is updated it will call the `onChange` method with a list of flag keys for flags that were updated during the update to the flag cache. 
[block:code]
{
  "codes": [
    {
      "code": "LDAllFlagsListener listener = new LDAllFlagsListener() {\n\t@Override\n  public void onChange(List<String> flagKeys) {\n\t\t// Get new values for flagKeys or other operations\n  }\n}
// register all flags listener\nLDClient.get().registerAllFlagsListener(listener);\n// when done with all flags listener it should be unregistered\nLDClient.get().unregisterAllFlagsListener(listener);",
      "language": "java"
    }
  ]
}
[/block]

## Multiple Environments

<Callout intent="info">
<CalloutTitle>Availablility</CalloutTitle>
   <CalloutDescription>Since V2.6.0</CalloutDescription>
</Callout>
LaunchDarkly's Android SDK supports having multiple LDClient instances tied to separate mobile keys. This allows evaluating flags from multiple environments.

All LDClient instances will evaluate against the same LDUser. The mobile keys for additional environments are specified, along with identifying names, in a map passed to your LDConfig object. 
[block:code]
{
  "codes": [
    {
      "code": "Map<String, String> otherKeys = new HashMap<String, String>();\notherKeys.put(\"platform\", \"PLATFORM_MOBILE_KEY\");\notherKeys.put(\"core\", \"CORE_MOBILE_KEY\");\n \nLDConfig ldConfig = new LDConfig.Builder()\n        .setMobileKey(\"MOBILE_KEY\")\n        .setSecondaryMobileKeys(otherKeys);\n        .build();
LDUser user = new LDUser.Builder(\"user key\")\n        .email(\"fake@example.com\")\n        .build();\n \nLDClient.init(this.getApplication(), ldConfig, user);",
      "language": "java"
    }
  ]
}
[/block]
 To access the secondary mobile key instances, use the `getForMobileKey` method on LDClient. This method takes the identifier name assigned to your environment key in the `secondaryMobileKeys` map and returns the associated LDClient instance. 
[block:code]
{
  "codes": [
    {
      "code": "LDClient coreInstance = LDClient.getForMobileKey(\"core\");\ncoreInstance.boolVariation(\"core-flag\", false);",
      "language": "java"
    }
  ]
}
[/block]
As all the client instances use the same LDUser object, some calls will affect all instances.
[block:code]
{
  "codes": [
    {
      "code": "LDClient coreInstance = LDClient.getForMobileKey(\"core\");
// Calls affect all LDClient Instances\ncoreInstance.identify(/*User Object*/);\ncoreInstance.flush();\ncoreInstance.setOffline();\ncoreInstance.setOnline();\ncoreInstance.close();",
      "language": "java"
    }
  ]
}
[/block]
Track calls, listeners, and flag evaluation are all tied to the client instance they are evaluated against.
## Monitoring SDK Status

<Callout intent="info">
  <CalloutTitle>Availablility</CalloutTitle>
   <CalloutDescription>Since version 2.8.0</CalloutDescription>
</Callout>
The Android SDK exposes some of its internal status through new APIs to allow your application to monitor the SDK's status. This is provided primarily as a mechanism for the application to determine how recently the internal flag cache has been updated with the most recent values, as well as diagnosing potential reasons for the flag cache to be out of date.

The SDK has seven connectivity states dependent on its configuration, application foreground state, network connectivity, as well as calls explicitly setting the client offline or online. A summary of these states is given below.
[block:parameters]
{
  "data": {
    "0-0": "`STREAMING`",
    "0-2": "",
    "1-0": "`POLLING`",
    "2-0": "`BACKGROUND_POLLING`",
    "3-0": "`BACKGROUND_DISABLED`",
    "4-0": "`OFFLINE`",
    "5-0": "`SET_OFFLINE`",
    "6-0": "`SHUTDOWN`",
    "h-0": "ConnectionMode",
    "0-1": "The SDK is either connected to the flag stream, or is actively attempting to acquire a connection.",
    "h-1": "Description",
    "1-1": "The SDK was configured with streaming disabled, and is in foreground polling mode.",
    "2-1": "The SDK has detected the application is in the background and has transitioned to battery conscious background polling.",
    "3-1": "The SDK was configured with background polling disabled. The SDK has detected the application is in the background and is not attempting to update the flag cache.",
    "4-1": "The SDK has detected that the mobile device does not have an active network connection so has ceased flag update attempts until the network status changes.",
    "5-1": "The SDK has been explicitly set offline, either in the initial configuration, by `setOffline()`, or as a result of failed authentication to LaunchDarkly. The SDK will stay offline unless `setOnline()` is called.",
    "6-1": "The shutdown state indicates the SDK has been permanently shutdown as a result of a call to `close()`."
  },
  "cols": 2,
  "rows": 7
}
[/block]
The SDK also internally stores a timestamp of the most recent successful and failed connections to LaunchDarkly, as well as information related to the most recent failed connection. The `LDClient` method `getConnectionInformation()` returns a structure allowing retrieval of these fields. 
[block:code]
{
  "codes": [
    {
      "code": "LDClient ldClient = LDClient.get();\nConnectionInformation connectionInfo = ldClient.getConnectionInformation();\n// One of the seven modes described above\nConnectionInformation.ConnectionMode connectionMode =\n  connectionInfo.getConnectionMode();\n// Most recent successful flag cache update in millis from the epoch\n// Or null if flags have never been retrieved\nLong lastSuccess = connectionInfo.getLastSuccessfulConnection();\n// Most recent unsuccessful flag cache update attempt in millis from the epoch\n// Or null if flag update has never been attempted\nLong lastSuccess = connectionInfo.getLastFailedConnection();\n// Most recent failure or null\nLDFailure ldFailure = connectionInfo.getLastFailure();",
      "language": "java"
    }
  ]
}
[/block]
`LDFailure` is a `LaunchDarklyException` with an associated `FailureType`. It may include a `.cause()` propagated from an underlying exception associated with the update's failure. The cause itself should be considered unstable as it is dependent on internal implementation, though the mechanism to retrieve it will be maintained. The failure types are summarized below.
[block:parameters]
{
  "data": {
    "h-0": "FailureType",
    "0-0": "`INVALID_RESPONSE_BODY`",
    "1-0": "`NETWORK_FAILURE`",
    "2-0": "`UNEXPECTED_STREAM_ELEMENT_TYPE`",
    "3-0": "`UNEXPECTED_RESPONSE_CODE`",
    "4-0": "`UNKNOWN_ERROR`",
    "0-1": "A response body received either through polling or streaming was unable to be parsed.",
    "h-1": "Description",
    "1-1": "A network request for polling, or the `EventSource` stream reported a failure.",
    "2-1": "An event was received through the stream was had an unknown event name. This could indicate a newer SDK is available if new event types have become available through the flag stream since the SDKs release.",
    "3-1": "This indicates the `LDFailure` is an instance of `LDInvalidResponseCodeFailure`. See below for more details.",
    "4-1": "Some other issue occurred"
  },
  "cols": 2,
  "rows": 5
}
[/block]
If matching on the `FailureType`, a default case should be used to handle any future cases provided. The `UNEXPECTED_RESPONSE_CODE` case indicates that the `LDFailure` is can be cast to a `LDInvalidResponseCodeFailure` for more information. This more specific failure includes a response code and whether the failure is considered retryable. An example is given below.
[block:code]
{
  "codes": [
    {
      "code": "LDClient ldClient = LDClient.get();\nConnectionInformation connectionInfo = ldClient.getConnectionInformation();\nLDFailure ldFailure = connectionInfo.getLastFailure();\nif (ldFailure != null) {\n  Timber.d(\"Received failure with message %s\", ldFailure.getMessage());\n  // Retrieve the failure type\n\tLDFailure.FailureType failureType = ldFailure.getFailureType();\n  switch (failureType) {\n    case INVALID_RESPONSE_BODY:\n    \tTimber.d(\"Received invalid response body\");\n    \tbreak;\n    case NETWORK_FAILURE:\n    \tTimber.d(\"Network failure, may have bad connection\");\n    \tbreak;\n    case UNEXPECTED_STREAM_ELEMENT_TYPE:\n    \tTimber.d(\"Unexpected stream element, may require update\");\n    \tbreak;\n    case UNEXPECTED_RESPONSE_CODE:\n    \tLDInvalidResponseCodeFailure responseCodeFailure =\n        (LDInvalidResponseCodeFailure) ldFailure;\n    \tint responseCode = responseCodeFailure.getResponseCode();\n    \tif (responseCodeFailure.isRetryable()) {\n        Timber.d(\"Received invalid response code %d\", responseCode);\n      } else {\n        Timber.d(\"Received invalid response code %d, giving up\", responseCode);\n      }\n    \tbreak;\n    case UNKNOWN_ERROR:\n    default:\n    \tTimber.d(\"Unknown error\");\n    \tbreak;\n  }\n  \n  Throwable cause = ldFailure.getCause();\n  if (cause != null) {\n    // Do something with underlying cause\n  }\n}",
      "language": "java"
    }
  ]
}
[/block]
A callback based interface is also provided to allow notifying the application when the `ConnectionMode` changes as well as whenever the `LDFailure` in `ConnectionStatus` changes. The application must provide a class instance implementing `LDStatusListener` to the SDK client instance method `registerStatusListener` to register the listeners with the SDK. A brief example is given below.
<Callout intent="alert">
  <CalloutTitle>Listener Weak Reference</CalloutTitle>
   <CalloutDescription>The SDK maintains only a weak reference to the registered `LDStatusListener`, so a reference should be maintained by the application for as long as the application desires the listener to be available. This was designed to help prevent creating an inadvertent long term reference to an Activity by creating a static internal class instance for use as a listener. By using an weak reference to the listener, the Activity can still be garbage collected normally, even if it maintains a registered `LDStatusListener` (though unregistering the listener when finished is still recommended).</CalloutDescription>
</Callout>

[block:code]
{
  "codes": [
    {
      "code": "class MainActivity extends Activity {\n  private LDClient ldClient;\n  private LDStatusListener ldStatusListener;\n  \n  @Override\n  protected void onCreate(Bundle savedInstanceState) { \n    super.onCreate(savedInstanceState);\n    setContentView(R.layout.activity_main);\n        \n    ldStatusListener = new LDStatusListener() {\n      @Override\n      public void onConnectionModeChanged(ConnectionInformation connectionInfo) {\n        // handle new connection info\n      }\n      \n      @Override\n      public void onInternalFailure(LDFailure ldFailure) {\n       \t// handle failure\n      }\n    };\n    \n    ldClient = LDClient.get();\n    ldClient.registerStatusListener(ldStatusListener);\n  }\n  \n  @Override\n  protected void onDestroy() {\n    super.onDestroy();\n    ldClient.unregisterStatusListener(ldStatusListener);\n  }\n}",
      "language": "java"
    }
  ]
}
[/block]

## Background Fetch
When the app is backgrounded, the Android SDK does not receive real-time events.  However, a battery-conscious [Android Alarm](https://developer.android.com/training/scheduling/alarms.html) is set to poll for updates once every 
1. minutes. This periodic polling only happens after the app has been run once since device boot. 
## Troubleshooting
The Android SDK makes heavy use of the Timber logging. Include Timber in your application to enable debug output or production logging. An example is shown below to enable debug output when the application is built with a debug configuration.
[block:code]
{
  "codes": [
    {
      "code": "if (BuildConfig.DEBUG) {\n  Timber.plant(new Timber.DebugTree());\n}",
      "language": "java"
    }
  ]
}
[/block]
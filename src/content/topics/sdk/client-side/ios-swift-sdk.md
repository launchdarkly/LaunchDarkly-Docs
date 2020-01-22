---
title: "iOS Swift SDK Reference"
excerpt: ""
---
<Callout intent="alert">
  <Callout.Title>iOS Client SDK for Swift</Callout.Title>
   <Callout.Description>This documentation is for the LaunchDarkly SDK for Swift iOS versions 4.0.0 and later.
Earlier versions of the SDK support [Objective-C](./ios-objc-sdk-reference).
This reference guide documents all of the methods available in our iOS SDK, and explains in detail how these methods work. If you want to dig even deeper, our SDKs are open source-- head to our [iOS SDK GitHub repository](https://github.com/launchdarkly/ios-client-sdk/tree/v4) to look under the hood. Additionally you can clone and run sample applications using this SDK with [iOS](https://github.com/launchdarkly/hello-ios-swift), [macOS](https://github.com/launchdarkly/hello-macos), and [tvOS](https://github.com/launchdarkly/hello-tvos).</Callout.Description>
</Callout>

## Getting started
Building on top of our [Quickstart](./getting-started) guide, the following steps will get you started with using the LaunchDarkly SDK in your iOS application.

The first step is to install the LaunchDarkly SDK as a dependency in your application. LaunchDarkly supports multiple methods for installing the SDK in your application. 

If you're using [CocoaPods](https://cocoapods.org/), you can install the SDK by adding the following to your `Podfile`. Refer to the [SDK releases page](https://github.com/launchdarkly/ios-client-sdk/releases) to identify the latest version.
[block:code]
{
  "codes": [
    {
      "code": "use_frameworks!\ntarget 'YourTargetName' do\n  pod 'LaunchDarkly', '4.3.2'\nend",
      "language": "swift",
      "name": "Podfile"
    }
  ]
}
[/block]
Then, run `pod install` from the project directory that contains the podfile:
[block:code]
{
  "codes": [
    {
      "code": "pod install",
      "language": "shell"
    }
  ]
}
[/block]
If you're using [Carthage](https://github.com/Carthage/Carthage), you can install the SDK by specifying it in your `Cartfile`. Again, refer to the [SDK releases page](https://github.com/launchdarkly/ios-client-sdk/releases) to identify the latest version.
[block:code]
{
  "codes": [
    {
      "code": "github \"launchdarkly/ios-client\" \"4.3.2\"",
      "language": "swift",
      "name": "Cartfile"
    }
  ]
}
[/block]
Then run `carthage update` to build the framework. Optionally, specify the `--platform` option to build only the frameworks that support your platform(s). Drag the built `Darkly.framework` from your platform's Carthage/Build folder into your Xcode project. Follow the instructions at [Getting Started](https://github.com/Carthage/Carthage#getting-started) to finish the setup. Your app may not build until you add the run script phase to `copy-frameworks` to your target(s).

Refer to the [SDK readme](https://github.com/launchdarkly/ios-client-sdk/blob/master/README.md) for instructions on installing the SDK without CocoaPods or Carthage.

Next you should import the LaunchDarkly client in your application code.
[block:code]
{
  "codes": [
    {
      "code": "import LaunchDarkly",
      "language": "swift"
    },
    {
      "code": "@import LaunchDarkly;
",
      "language": "objectivec"
    }
  ]
}
[/block]
Once the SDK is installed and imported, you'll want to create a single, shared instance of `LDClient`. You should specify your *mobile key* here so that your application will be authorized to connect to LaunchDarkly and for your application and environment.
[block:code]
{
  "codes": [
    {
      "code": "let config = LDConfig(mobileKey: \"YOUR_MOBILE_KEY\")
let user = LDUser(key: \"test-user\")
LDClient.shared.start(config: config, user: user)",
      "language": "swift"
    },
    {
      "code": "LDUser *user = [[LDUser alloc] initWithKey:@\"human@example.com\"];
LDConfig *config = [[LDConfig alloc] initWithMobileKey:@\"YOUR_MOBILE_KEY\"];\n",
      "language": "objectivec"
    }
  ]
}
[/block]

<Callout intent="info">
<Callout.Title>Mobile Keys</Callout.Title>
   <Callout.Description>Be sure to use a mobile key from your [Environments](https://app.launchdarkly.com/settings#/environments) page. Never embed a server-side SDK key into a mobile application.</Callout.Description>

</Callout>
Using `LDClient`, you can check which variation a particular user should receive for a given feature flag.
[block:code]
{
  "codes": [
    {
      "code": "let boolFeatureFlagValue = LDClient.shared.variation(forKey: \"bool-flag-key\", fallback: false)
if boolFeatureFlagValue {\n  // application code to show the feature\nelse {\n  // the code to run if the feature is off\n}",
      "language": "swift"
    },
    {
      "code": "BOOL showFeature = [[LDClient sharedInstance] boolVariation:@\"YOUR_FLAG_KEY\" fallback:NO];\nif (showFeature) {\n    NSLog(@\"Showing feature for %@\", user.key);\n} else {\n    NSLog(@\"Not showing feature for user %@\", user.key);\n}
BOOL boolFeature = [[LDClient sharedInstance] boolVariationForKey:BOOLEAN_FLAG_KEY fallback:NO];",
      "language": "objectivec"
    }
  ]
}
[/block]
Lastly, when your application is about to terminate, shut down `LDClient`. This ensures that the client releases any resources it is using, and that any pending analytics events are delivered to LaunchDarkly. If your application quits without this shutdown step, you may not see your requests and users on the dashboard, because they are derived from analytics events. **This is something you only need to do once**.
[block:code]
{
  "codes": [
    {
      "code": "LDClient.shared.stopClient()",
      "language": "swift"
    },
    {
      "code": "[[LDClient sharedInstance] stopClient];",
      "language": "objectivec"
    }
  ]
}
[/block]

## Client Configuration Options
Here is a complete client configuration object utilizing all available fields:
[block:code]
{
  "codes": [
    {
      "code": "var ldConfig = LDConfig(mobileKey: safeKey)\n/// The default url for making feature flag requests\nldConfig.baseUrl = URL(string: \"https://app.launchdarkly.com\")!\n/// The default url for making event reports\nldConfig.eventsUrl = URL(string: \"https://mobile.launchdarkly.com\")!\n/// The default url for connecting to the *clientstream*\nldConfig.streamUrl = URL(string: \"https://clientstream.launchdarkly.com\")!\n/// The default maximum number of events the LDClient can store\nldConfig.eventCapacity = 100\n/// The default maximum number of events the LDClient can store\nldConfig.connectionTimeout: TimeInterval = 10.0\n/// The default time interval between event reports. (30 seconds)\nldConfig.eventFlushInterval: TimeInterval = 30.0\n/// The default time interval between feature flag requests. Used only for polling mode. (5 minutes)\nldConfig.flagPollingInterval: TimeInterval =  300.0\n/// The default interval between feature flag requests while running in the background. Used only for polling mode. (60 minutes)\nldConfig.backgroundFlagPollingInterval: TimeInterval = 3600.0\n/// The default streaming mode (streaming)\nldConfig.streamingMode = LDStreamingMode.streaming\n/// The default mode for enabling background flag requests. (false)\nldConfig.enableBackgroundUpdates = false\n/// The default mode to set LDClient online on a start call. (true)\nldConfig.startOnline = true\n/// The default setting for private user attributes. (false)\nldConfig.allUserAttributesPrivate = false\n/// The default private user attribute list (nil)\nldConfig.privateUserAttributes: [String]? = nil\n/// The default HTTP request method for `clientstream` connection and feature flag requests. When true, these requests will use the non-standard verb `REPORT`. When false, these requests will use the standard verb `GET`. (false)\nldConfig.useReport = false\n/// The default setting controlling the amount of user data sent in events. When true the SDK will generate events using the full LDUser, excluding private attributes. When false the SDK will generate events using only the LDUser.key. (false)\nldConfig.inlineUserInEvents = false\n/// The default setting controlling information logged to the console, and modifying some setting ranges to facilitate debugging. (false)\nldConfig.debugMode = false",
      "language": "swift"
    },
    {
      "code": "LDConfig *config = [[LDConfig alloc] initWithMobileKey:@\"YOUR_MOBILE_KEY\"];\nconfig.streamingMode = NO;\nconfig.flagPollingInterval = 30.0;",
      "language": "objectivec"
    }
  ]
}
[/block]

## User Configuration Options
Here is a complete user configuration object utilizing all available fields:
[block:code]
{
  "codes": [
    {
      "code": "var user = LDUser()\n///Client app defined string that uniquely identifies the user. If the client app does not define a key, the SDK will assign an identifier associated with the anonymous user. The key cannot be made private.\nuser.key: String\n///Client app defined name for the user. (Default: nil)\nuser.name: String?\n///Client app defined first name for the user. (Default: nil)\nuser.firstName: String?\n///Client app defined last name for the user. (Default: nil)\nuser.lastName: String?\n///Client app defined country for the user. (Default: nil)\nuser.country: String?\n///Client app defined ipAddress for the user. (Default: nil)\nuser.ipAddress: String?\n///Client app defined email address for the user. (Default: nil)\nuser.email: String?\n///Client app defined avatar for the user. (Default: nil)\nuser.avatar: String?\n///Client app defined dictionary for the user. The client app may declare top level dictionary items as private. If the client app defines custom as private, the SDK considers the dictionary private except for device & operatingSystem (which cannot be made private). See `privateAttributes` for details. (Default: nil)\nuser.custom: [String: Any]?\n///Client app defined isAnonymous for the user. If the client app does not define isAnonymous, the SDK will use the `key` to set this attribute. isAnonymous cannot be made private. (Default: true)\nuser.isAnonymous: Bool\n///Client app defined device for the user. The SDK will determine the device automatically, however the client app can override the value. The SDK will insert the device into the `custom` dictionary. The device cannot be made private. (Default: the system identified device)\nuser.device: String?\n///Client app defined operatingSystem for the user. The SDK will determine the operatingSystem automatically, however the client app can override the value. The SDK will insert the operatingSystem into the `custom` dictionary. The operatingSystem cannot be made private. (Default: the system identified operating system)\nuser.operatingSystem: String?\n/**\nClient app defined privateAttributes for the user.\nThe SDK will not include private attribute values in analytics events, but private attribute names will be sent.\nThis attribute is ignored if `LDConfig.allUserAttributesPrivate` is true. Combined with `LDConfig.privateUserAttributes`. (Default: nil)\n*/\nuser.privateAttributes: [String]?\n",
      "language": "swift"
    },
    {
      "code": "LDUser *user = [[LDUser alloc] initWithKey:@\"human@example.com\"];\nuser.firstName = @\"Human\";\nuser.lastName = @\"Person\";\nuser.custom = @{@\"groups\": @[@\"beta_testers\"]};",
      "language": "objectivec"
    }
  ]
}
[/block]

## Private User Attributes
You can optionally configure the iOS SDK to treat some or all user attributes as private user attributes. Private user attributes can be used for targeting purposes, but are removed from the user data sent back to LaunchDarkly.

In the iOS SDK there are two ways to define private attributes for the entire LaunchDarkly client:

 - When creating the LDConfig object, you can set the allUserAttributesPrivate attribute to true.

 - When creating the LDConfig object, you can set the privateUserAttributes attribute to a list of user attribute names, such as @[@"name", @"email"];. If any user has a custom or built-in attribute named in this list, it will be removed before the user is sent to LaunchDarkly.

You can also mark attributes as private when building the user object itself by calling the equivalent “private” user builder method. For example:
[block:code]
{
  "codes": [
    {
      "code": "var user = LDUser()\nuser.key = \"PRIVATE_USER_ATTRIBUTE_KEY\"\nuser.name = \"private_citizen\"\nuser.privateAttributes = [\"name\"]",
      "language": "swift"
    },
    {
      "code": "LDUser *user = [[LDUser alloc] initWithKey:@\"human@example.com\"];\nuser.firstName = @\"Human\";\nuser.privateAttributes = @[@\"firstName\"];",
      "language": "objectivec"
    }
  ]
}
[/block]

## Anonymous Users
You can also distinguish logged-in users from anonymous users in the SDK, as follows:
[block:code]
{
  "codes": [
    {
      "code": "var user = LDUser()\nuser.key = \"ANONYMOUS_USER_ATTRIBUTE_KEY\"\nuser.name = \"anonymous_citizen\"\nuser.isAnonymous = true",
      "language": "swift"
    },
    {
      "code": "LDUser *user = [[LDUser alloc] initWithKey:@\"human@example.com\"];\nuser.firstName = @\"Human\";\nuser.isAnonymous = YES;",
      "language": "objectivec"
    }
  ]
}
[/block]
You will still need to generate a unique key for anonymous users-- session IDs or UUIDs work best for this.

Anonymous users work just like regular users, except that they won't appear on your Users page in LaunchDarkly. You also can't search for anonymous users on your Features page, and you can't search or autocomplete by anonymous user keys. This is actually a good thing-- it keeps anonymous users from polluting your Users page!
## Getting Flag Variations
The variation method determines whether a flag is enabled or not for a specific user. In the V4 SDK, there is a single variation method for all types using Swift, however Objective-C requires type specific methods:
[block:code]
{
  "codes": [
    {
      "code": "let boolFeatureFlagValue = LDClient.shared.variation(forKey: \"bool-flag-key\", fallback: false)
let dictionaryFlagValue = LDClient.shared.variation(forKey: \"dictionary-key\", fallback: [\"a\": 
1. \"b\": 2] as [LDFlagKey: Any])",
      "language": "swift"
    },
    {
      "code": "BOOL boolFeature = [[LDClient sharedInstance] boolVariationForKey:BOOLEAN_FLAG_KEY fallback:NO];
NSInteger numberFeature = [[LDClient sharedInstance] integerVariationForKey:NUMBER_FLAG_KEY fallback:0];",
      "language": "objectivec"
    }
  ]
}
[/block]
The `variation` method returns the variation for the given feature flag. If the flag does not exist, cannot be cast to the correct return type, or the LDClient is not started, the method returns the fallback value. Use this method when the fallback value is a non-Optional type. See `variation` with the Optional return value when the fallback value can be nil. A *variation* is a specific flag value. For example a boolean feature flag has 2 variations, *true* and *false*. You can create feature flags with more than 2 variations using other feature flag types. See `LDFlagValue` for the available types. The LDClient must be started in order to return feature flag values. If the LDClient is not started, it will always return the fallback value. The LDClient must be online to keep the feature flag values up-to-date.
 
When online, the LDClient has two modes for maintaining feature flag values: *streaming* and *polling*. The client app requests the mode by setting the `config.streamingMode`, see `LDConfig` for details.

In streaming mode, the LDClient opens a long-running connection to LaunchDarkly's streaming server (called *clientstream*). When a flag value changes on the server, the clientstream notifies the SDK to update the value. Streaming mode is not available on watchOS. On iOS and tvOS, the client app must be running in the foreground to connect to clientstream. On macOS the client app may run in either foreground or background to connect to clientstream. If streaming mode is not available, the SDK reverts to polling mode.

In polling mode, the LDClient requests feature flags from LaunchDarkly's app server at regular intervals defined in the LDConfig. When a flag value changes on the server, the LDClient will learn of the change the next time the SDK requests feature flags.

When offline, LDClient closes the clientstream connection and no longer requests feature flags. The LDClient will return feature flag values (assuming the LDClient was started), which may not match the values set on the LaunchDarkly server.

A call to `variation` records events reported later. Recorded events allow clients to analyze usage and assist in debugging issues.

<Callout intent="info">
<Callout.Title>Handling flag values on initial application launch</Callout.Title>
   <Callout.Description>When LDClient is initialized for the first time at app launch, users will receive feature flag fallback values until an initial connection to LaunchDarkly is completed for the first time. Take a look at the section above on various ways to initialize the client.</Callout.Description>

</Callout>

## VariationDetail

<Callout intent="info">
  <Callout.Title>Availability</Callout.Title>
   <Callout.Description>Since V4.3.0</Callout.Description>
</Callout>
The `variationDetail` methods work the same as `variation`, but also provide additional `reason` information about how a flag value was calculated (for instance, if the user matched a specific rule). You can examine the `reason` data programmatically; you can also view it with data export, if you are capturing detailed analytics events for this flag.

For more information, see [Evaluation reasons](./evaluation-reasons).
## Getting All Flags

<Callout intent="alert">
<Callout.Title>Creating Users</Callout.Title>
   <Callout.Description>Note that unlike `variation` and `identify` calls, `allFlags` does not send events to LaunchDarkly. Thus, users are not created or updated in the LaunchDarkly dashboard.</Callout.Description>

</Callout>
Returns a dictionary with the flag keys and their values. If the LDClient is not started, returns nil. The dictionary will not contain feature flags from the server with null values. LDClient will not provide any source or change information, only flag keys and flag values. The client app should convert the feature flag value into the desired type.
[block:code]
{
  "codes": [
    {
      "code": "let allFlags = LDClient.shared.allFlagValues",
      "language": "swift"
    },
    {
      "code": "NSArray allFlags = [LDClient sharedInstance].allFlagValues;",
      "language": "objectivec"
    }
  ]
}
[/block]

## Tracking Events
Adds a custom event to the LDClient event store. A client app can set a tracking event to allow client customized data analysis. Once an app has called `trackEvent`, the app cannot remove the event from the event store. LDClient periodically transmits events to LaunchDarkly based on the frequency set in LDConfig.eventFlushInterval. The LDClient must be started and online. The SDK stores events tracked while the LDClient is offline, but started. Once the SDK's event store is full, the SDK discards events until they can be reported to LaunchDarkly. Configure the size of the event store using `eventCapacity` on the `config`. The first parameter key: is the key for the event. The SDK does nothing with the key, which can be any string the client app sends. The second parameter data: is the data for the event and is optional. The SDK does nothing with the data, which can be any valid JSON item the client app sends. The method throws `JSONSerialization.JSONError.invalidJsonObject` if the data is not a valid JSON item.

<Callout intent="info">
  <Callout.Title>Experimentation Metric Values</Callout.Title>
   <Callout.Description>Since V4.3.0</Callout.Description>
</Callout>
You can now optionally add a `metricValue` parameter of type `Double` to `track` in Swift or as a required paramter to the overloaded `track` method in Objective C.
[block:code]
{
  "codes": [
    {
      "code": "let data = [\"some-custom-key\": \"some-custom-value\", \"another-custom-key\": 7]\nLDClient.shared.trackEvent(key: \"MY_TRACK_EVENT_NAME\", data: data)",
      "language": "swift"
    },
    {
      "code": "[LDClient sharedInstance] trackEventWithKey:@\"MY_TRACK_EVENT_NAME\" data:@{@\"event-data-key\":7}];",
      "language": "objectivec"
    }
  ]
}
[/block]

## Offline Mode
In some situations, you might want to stop making remote calls to LaunchDarkly and switch to the last known values for your feature flags. Offline mode lets you do this easily. The SDK protects itself from multiple rapid calls to `setOnline(true)` by enforcing an increasing delay (called *throttling*) each time `setOnline(true)` is called within a short time. The first time, the call proceeds normally. For each subsequent call the delay is enforced, and if waiting, increased to a maximum delay. When the delay has elapsed, the `setOnline(true)` will proceed, assuming that the client app has not called `setOnline(false)` during the delay. Therefore a call to `setOnline(true)` may not immediately result in the LDClient going online. Client app developers should consider this situation abnormal, and take steps to prevent the client app from making multiple rapid `setOnline(true)` calls. Calls to `setOnline(false)` are not throttled. Note that calls to `start(config: user: completion:)`, and setting the `config` or `user` can also call `setOnline(true)` under certain conditions. After the delay, the SDK resets and the client app can make a subsequent call to `setOnline(true)` without being throttled.
     
Client apps can set a completion closure called when the setOnline call completes. For unthrottled `setOnline(true)` and all `setOnline(false)` calls, the SDK will call the closure immediately on completion of this method. For throttled `setOnline(true)` calls, the SDK will call the closure after the throttling delay at the completion of the `setOnline` method.
     
The SDK will not go online if the client has not been started, or the `mobileKey` is empty. For macOS, the SDK will not go online in the background unless `enableBackgroundUpdates` is true.

Use `isOnline` to get the online/offline state.
[block:code]
{
  "codes": [
    {
      "code": "LDClient.shared.setOnline(false)\nLDClient.shared.setOnline(true) {\n\treturn true\n}\nlet connectionStatus = LDClient.shared.isOnline",
      "language": "swift"
    },
    {
      "code": "[LDClient sharedInstance] setOnline:NO;\n[LDClient sharedInstance] setOnline:YES ^void (){\n\tNSString connectionStatus = [LDClient sharedInstance].isOnline;\n};",
      "language": "objectivec"
    }
  ]
}
[/block]

<Callout intent="info">
<Callout.Title>Lack of Network Connectivity</Callout.Title>
   <Callout.Description>If a user's device is in airplane/flight mode or if they are not connected to a network, LaunchDarkly will use the latest stored flag settings in memory. If there are no previously stored flag settings, then the fallback values will be used.</Callout.Description>

</Callout>

## Reporting Events
Internally, the LaunchDarkly SDK keeps an event buffer for `trackEvent` calls. These are flushed periodically in a background thread. In some situations (for example, if you're testing out the SDK in a simulator), you may want to manually call `reportEvents` to process events immediately.
[block:code]
{
  "codes": [
    {
      "code": "LDClient.shared.reportEvents()",
      "language": "swift"
    },
    {
      "code": "[LDClient sharedInstance] reportEvents;",
      "language": "objectivec"
    }
  ]
}
[/block]

## Changing the User Context

<Callout intent="info">
  <Callout.Title>Availability</Callout.Title>
   <Callout.Description>Since version 4.2.0</Callout.Description>
</Callout>
If your app is used by multiple users on a single device, you may want to change users and have separate flag settings for each user. To achieve this, the SDK will store the last 5 user contexts on a single device, with support for switching between different user contexts. When a new user is set, the LDClient goes offline and sets the new user. If the client was online when the new user was set, it goes online again, subject to a throttling delay if in force. To change both the `config` and `user`, set the LDClient offline, set both properties, then set the LDClient online. Setting `user` is now deprecated, please use the `identify` method instead. This method allows you to set a completion and you no longer need to manually set LDClient online. Client apps should follow [Apple's Privacy Policy](apple.com/legal/privacy) when collecting user information. If the client app does not create a LDUser, LDClient creates an anonymous default user, which can affect the feature flags delivered to the LDClient.

You can use the `identify` method to switch user contexts:
[block:code]
{
  "codes": [
    {
      "code": "// Usage as of 4.2.0\nvar newUser = LDUser()\nnewUser.key = \"MY_NEW_USER_KEY\"\nLDClient.shared.identify(user: newUser)\n//identify can also be called with a completion\nLDClient.shared.identify(user: newUser) {\n\tNSLog(\"User updated!\")\n}
// Usage in versions prior to 4.2.0 (now deprecrated)\nvar newUser = LDUser()\nnewUser.key = \"MY_NEW_USER_KEY\"\nLDClient.shared.user = newUser\n",
      "language": "swift"
    },
    {
      "code": "LDUser *newUser = [[LDUser alloc] initWithKey:@\"martian@example.com\"];\n[LDClient sharedInstance].user = newUser;",
      "language": "objectivec"
    }
  ]
}
[/block]

## Real-time Updates
LaunchDarkly manages all flags for a user context in real-time by updating flags based on a real-time event stream.  When a flag is modified via the LaunchDarkly dashboard, the flag values for the current user will update almost immediately.

To accomplish real-time updates, LaunchDarkly broadcasts an event stream that is listened to by the V4 SDK. Whenever an event is performed on the dashboard, the V4 SDK is notified of the updated flag settings in real-time.

The SDK provides methods for listening to a single flag, all the flags, or a lack of change to any flags. `observeFlagsUnchanged` is called when the SDK successfully receives an update or comes back online but no flags have changed. If the flag's value changes, the method executes the handler, passing in the `changedFlag` containing the old and new flag values, and old and new flag value source. The SDK retains only weak references to the owner, which allows the client app to freely destroy owners without issues. Client apps should use a capture list specifying `[weak self]` inside handlers to avoid retain cycles causing a memory leak. The SDK executes handlers on the main thread. `LDChangedFlag` does not know the type of `oldValue` or `newValue`. The client app should cast the value into the type needed. 
[block:code]
{
  "codes": [
    {
      "code": "let flagKey = \"MY_OBSERVE_FLAG_KEY\"\nlet flagChangeOwner = flagKey as LDFlagChangeOwner
LDClient.shared.observe(keys: [flagKey], owner: flagChangeOwner, handler: { (changedFlags) in\n\tif changedFlags[flagKey] != nil {\n\t\t//Your code here\n\t}\n})
LDClient.shared.stopObserving(owner: flagChangeOwner)
LDClient.shared.observeFlagsUnchanged(owner: self) {\n\tLDClient.shared.stopObserving(owner: self as LDFlagChangeOwner)\n}
LDClient.shared.observeAll(owner: self) {_ in\n\tLDClient.shared.stopObserving(owner: self as LDFlagChangeOwner)\n}",
      "language": "swift"
    },
    {
      "code": "__weak typeof(self) weakSelf = self;\n[[LDClient sharedInstance] observeKeys:self.flagKeys owner:self handler:^(NSDictionary<NSString *,LDChangedFlag *> * _Nonnull changedFlags) {\n    __strong typeof(weakSelf) strongSelf = weakSelf;\n    for (NSString* flagKey in changedFlags.allKeys) {\n        //Your code here\n    }\n}];\n[[LDClient sharedInstance] observeFlagsUnchangedWithOwner:self handler:^{\n    __strong typeof(weakSelf) strongSelf = weakSelf;\n    //Your code here\n}];",
      "language": "objectivec"
    }
  ]
}
[/block]

## Background Fetch
When the app is backgrounded, the V4 SDK does not receive real-time events.  However, there is support for a background fetch to update flag values opportunistically, according to iOS standard defaults.

To change the  background fetch interval for flags in your app, just add the following code in your `LDConfig`:
[block:code]
{
  "codes": [
    {
      "code": "var ldConfig = LDConfig(mobileKey: \"MY_MOBILE_KEY\")\nldConfig.backgroundFlagPollingInterval = 3600",
      "language": "swift"
    },
    {
      "code": "LDConfig *config = [[LDConfig alloc] initWithMobileKey:@\"YOUR_MOBILE_KEY\"];\nconfig.backgroundFlagPollingInterval = 3600",
      "language": "objectivec"
    }
  ]
}
[/block]

## Monitoring SDK Status

<Callout intent="info">
  <Callout.Title>Availability</Callout.Title>
   <Callout.Description>Since version 4.2.0</Callout.Description>
</Callout>
The iOS SDK exposes some of its internal status through the Connection Status API to allow your application to monitor the SDK's status. This is provided primarily as a mechanism for the application to determine how recently the internal flag cache has been updated with the most recent values, as well as diagnosing potential reasons for the flag cache to be out of date.

The SDK has four connectivity states dependent on its configuration, application foreground state, network connectivity, as well as calls explicitly setting the client offline or online. A summary of these states is given below.
[block:parameters]
{
  "data": {
    "h-0": "Connection Mode",
    "h-1": "Description",
    "0-0": "`streaming`",
    "1-0": "`polling`",
    "2-0": "`offline`",
    "3-0": "`establishingStreamingConnection`",
    "3-1": "The SDK is attempting to connect to LaunchDarkly via streaming.",
    "0-1": "The SDK has an active streaming connection.",
    "1-1": "The SDK has an active polling connection.",
    "2-1": "The SDK is set offline or has no network connection."
  },
  "cols": 2,
  "rows": 4
}
[/block]
The SDK also internally stores a timestamp of the most recent successful and failed connections to LaunchDarkly, as well as information related to the most recent failed connection. `lastKnownFlagValidity` is nil if either no connection has ever been successfully made or if the SDK has an active streaming connection. It will have a value if it is 
1. in polling mode and at least one poll has completed successfully, or 2) if in streaming mode whenever the streaming connection closes. The `LDClient.shared` method `getConnectionInformation()` returns a structure allowing retrieval of these fields. 

The `ConnectionInformation` class can return four different values for `lastFailureReason`. A summary of these values is given below.
[block:parameters]
{
  "data": {
    "0-0": "`none`",
    "1-0": "`unknownError`",
    "2-0": "`unauthorized`",
    "3-0": "`httpError`",
    "0-1": "This will be returned when no error has been recorded.",
    "1-1": "This will be returned when there is an internal error in the stream request.",
    "2-1": "This will be returned when an incorrect mobile key is provided.",
    "3-1": "This will be returned when an error with an HTTP error code is present."
  },
  "cols": 2,
  "rows": 4
}
[/block]
You can listen to changes in `ConnectionInformation.ConnectionMode` in a similar manner to flag observers. Here is an example of the new API.
[block:code]
{
  "codes": [
    {
      "code": "let connectionInformation = LDClient.shared.getConnectionInformation()\nprint(\"Current Connection Status: \\(connectionInformation.description())\")\n//Setting a Connection Mode Listener\nLDClient.shared.observeCurrentConnectionMode(owner: self) { [weak self] (connectionMode) in\n\t//do something after ConnectionMode was updated.\n\tprint(\"Connection Mode: \\(connectionMode)\")\n}",
      "language": "swift"
    }
  ]
}
[/block]
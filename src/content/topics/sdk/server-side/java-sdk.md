---
title: "Java SDK Reference"
excerpt: ""
---
This reference guide documents all of the methods available in our Java SDK, and explains in detail how these methods work. If you want to dig even deeper, our SDKs are open source-- head to our [Java SDK GitHub repository](https://github.com/launchdarkly/java-server-sdk) or our [Javadocs](http://launchdarkly.github.io/java-server-sdk/) to look under the hood. Additionally you can clone and run a [sample application](https://github.com/launchdarkly/hello-java) using this SDK and an example of running it in another JRE-based language such as [Scala](https://github.com/launchdarkly/hello-scala).
<Callout intent="alert">
  <Callout.Title>Android support</Callout.Title>
   <Callout.Description>The Java SDK is intended for use in server environments only, and should not be used in mobile devices. Learn more about our [client-side and server-side SDKs](./client-side-and-server-side).
If you want to use LaunchDarkly in an Android application, see our [Android SDK Reference](./android-sdk-reference) Guide.</Callout.Description>
</Callout>

<Callout intent="info">
  <Callout.Title>Java Compatibility</Callout.Title>
   <Callout.Description>The LaunchDarkly Java SDK is compatible with Java 7 and higher.</Callout.Description>
</Callout>

## Getting started
Building on top of our [Quickstart](./getting-started) guide, the following steps will get you started with using the LaunchDarkly SDK in your Java application.

The first step is to install the LaunchDarkly SDK as a dependency in your application using your application's dependency manager. Refer to the [SDK releases page](https://github.com/launchdarkly/java-server-sdk/releases) to identify the latest version. In this example, it will use the latest published release of major version 4.x.
[block:code]
{
  "codes": [
    {
      "code": "<dependency>\n  <groupId>com.launchdarkly</groupId>\n  <artifactId>launchdarkly-java-server-sdk</artifactId>\n  <version>[4.0,5.0)</version>\n</dependency>",
      "language": "xml"
    }
  ]
}
[/block]
Next you should import the LaunchDarkly client in your application code.
[block:code]
{
  "codes": [
    {
      "code": "import com.launchdarkly.client.*;",
      "language": "java"
    }
  ]
}
[/block]
Once the SDK is installed and imported, you'll want to create a single, shared instance of `LDClient`. You should specify your SDK key here so that your application will be authorized to connect to LaunchDarkly and for your application and environment.
[block:code]
{
  "codes": [
    {
      "code": "LDClient ldClient = new LDClient(\"YOUR_SDK_KEY\");",
      "language": "java"
    }
  ]
}
[/block]

<Callout intent="alert">
  <Callout.Title>LDClient must be a singleton</Callout.Title>
   <Callout.Description>It's important to make this a singleton-- internally, the client instance maintains internal state that allows us to serve feature flags without making any remote requests. **Be sure that you're not instantiating a new client with every request.**</Callout.Description>
</Callout>
Using `ldClient`, you can check which variation a particular user should receive for a given feature flag.
[block:code]
{
  "codes": [
    {
      "code": "LDUser user = new LDUser(\"user@test.com\");\nboolean showFeature = ldClient.boolVariation(\"your.feature.key\", user, false);\nif (showFeature) {\n  // application code to show the feature\n}\nelse {\n  // the code to run if the feature is off\n}",
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
      "code": "// shut down the client, since we're about to quit\nldClient.close();",
      "language": "java"
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
      "code": "LDConfig config = new LDConfig.Builder()\n      .connectTimeout(3)\n      .socketTimeout(3)\n      .build();\nLDClient ldClient = new LDClient(\"YOUR_SDK_KEY\", config);",
      "language": "java"
    }
  ]
}
[/block]
Here, we've customized the client connect and socket timeout parameters. See the Javadoc for [LDConfig.Builder](http://launchdarkly.github.io/java-server-sdk/com/launchdarkly/client/LDConfig.Builder.html) for the complete list of configuration options for the client including proxy settings, timeouts, and more.
## Users
Feature flag targeting and rollouts are all determined by the *user* you pass to your `variation` calls. In our Java SDK, we use a [builder pattern](http://en.wikipedia.org/wiki/Builder_pattern) to make it easy to construct users. Here's an example:
[block:code]
{
  "codes": [
    {
      "code": " LDUser user = new LDUser.Builder(\"aa0ceb\") // required\n      .firstName(\"Ernestina\")               // optional\n      .lastName(\"Evans\")                    // optional\n      .email(\"ernestina@example.com\")       // optional\n      .customString(\"groups\", Arrays.asList(\"Google\", \"Microsoft\")) // optional\n      .build()",
      "language": "java"
    }
  ]
}
[/block]
Let's walk through this snippet. The first argument to the builder is the user's key-- in this case we've used the hash `"aa0ceb"`. **The user key is the only mandatory user attribute**. The key should also uniquely identify each user. You can use a primary key, an e-mail address, or a hash, as long as the same user always has the same key. We recommend using a hash if possible.

All of the other attributes (like `firstName`, `email`, and the `custom` attributes) are optional. The attributes you specify will automatically appear on our dashboard, meaning that you can start segmenting and targeting users with these attributes. 

Our Javadoc for [LDUser.Builder](http://launchdarkly.github.io/java-server-sdk/com/launchdarkly/client/LDUser.Builder.html) shows you all the attributes that LaunchDarkly supports by default. In addition to these, you can pass us any of your own user data by passing `custom` attributes, like the `groups` attribute in the example above. 
<Callout intent="info">
  <Callout.Title>A note on types</Callout.Title>
   <Callout.Description>Most of our built-in attributes (like names and e-mail addresses) expect string values. Custom attributes values can be strings, booleans (like true or false), numbers, or lists of strings, booleans or numbers. 
If you enter a custom value on our dashboard that looks like a number or a boolean, it'll be interpreted that way. The Java SDK is strongly typed, so be aware of this distinction.</Callout.Description>
</Callout>
Custom attributes are one of the most powerful features of LaunchDarkly. They let you target users according to any data that you want to send to us-- organizations, groups, account plans-- anything you pass to us becomes available instantly on our dashboard.

## Private user attributes
You can optionally configure the Java SDK to treat some or all user attributes as [private user attributes](https://docs.launchdarkly.com/v2.0/docs/private-user-attributes). Private user attributes can be used for targeting purposes, but are removed from the user data sent back to LaunchDarkly.

In the Java SDK there are two ways to define private attributes for the **entire** LaunchDarkly client:

* When creating the `LDConfig` object, you can call the `allAttributesPrivate` method, which takes in a boolean parameter. If `true`, all user attributes (except the key) for *all users* are removed before the user is sent to LaunchDarkly.
* When creating the `LDConfig` object, you can call the `privateAttributeNames` method, which takes in a set of custom or built-in attributes as a parameter. If any user has a custom or built-in attribute named in this list, it will be removed before the user is sent to LaunchDarkly. 

You can also mark attributes as private when building the user object itself by calling the equivalent “private” user builder method. For example:
[block:code]
{
  "codes": [
    {
      "code": "LDUser user = new LDUser.Builder(\"aa0ceb\")\n  .privateEmail(\"test@example.com\")\n  .build();",
      "language": "java"
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
      "code": " LDUser user = new LDUser.Builder(\"aa0ceb\")\n      .anonymous(true)\n      .build();",
      "language": "java"
    }
  ]
}
[/block]
You will still need to generate a unique key for anonymous users-- session IDs or UUIDs work best for this. Each unique user key registers a user in our system, so capture and reuse your anonymous user's key between requests.

Anonymous users work just like regular users, except that they won't appear on your Users page in LaunchDarkly. You also can't search for anonymous users on your Features page, and you can't search or autocomplete by anonymous user keys. This is actually a good thing-- it keeps anonymous users from polluting your Users page!


## Variation
The `variation` method determines which variation of a feature flag a user receives. In Java, there is  a `variation` method for each type (e.g. `boolVariation`, `stringVariation`):
[block:code]
{
  "codes": [
    {
      "code": "boolean value = ldClient.boolVariation(\"your.feature.key\", user, false);",
      "language": "java"
    }
  ]
}
[/block]
`variation` calls take the feature flag key, an `LDUser`, and a default value. 

The default value will only be returned if an error is encountered-- for example, if the feature flag key doesn't exist or the user doesn't have a key specified. 

The `variation` call will automatically create a user in LaunchDarkly if a user with that user key doesn't exist already. There's no need to create users ahead of time (but if you do need to, take a look at Identify). 
## VariationDetail
The `variationDetail` methods (`boolVariationDetail`, etc.) work the same as `variation`, but also provide additional "reason" information about how a flag value was calculated (for instance, if the user matched a specific rule). You can examine the "reason" data programmatically; you can also view it with data export, if you are capturing detailed analytics events for this flag.

For more information, see [Evaluation reasons](./evaluation-reasons).
## Track
The `track` method allows you to record actions your users take on your site. This lets you record events that take place on your server. In LaunchDarkly, you can tie these events to goals in A/B tests. Here's a simple example:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.track(\"your-goal-key\", user);",
      "language": "java"
    }
  ]
}
[/block]
You can also attach custom JSON data to your event by passing an extra parameter to `track`: 
[block:code]
{
  "codes": [
    {
      "code": "JsonObject data = new JsonObject();\ndata.add(\"price\", 320);\nldClient.track(\"Completed purchase\", user, data);",
      "language": "java"
    }
  ]
}
[/block]
You can attach any JSON object (using [Google's GSON API](http://google-gson.googlecode.com/svn/trunk/gson/docs/javadocs/index.html)) to your events.
## Identify
The `identify` method creates or updates users in LaunchDarkly, making them available for targeting and autocomplete on the dashboard. In most cases, you won't need to call `identify`-- the `variation` call will automatically create users on the dashboard for you. `identify` can be useful if you want to pre-populate your dashboard before launching any features. 
[block:code]
{
  "codes": [
    {
      "code": "ldClient.identify(user);",
      "language": "java"
    }
  ]
}
[/block]

## All flags

<Callout intent="alert">
  <Callout.Title>Creating users</Callout.Title>
   <Callout.Description>Note that unlike variation and identify calls, allFlagsState does not send events to LaunchDarkly. Thus, users are not created or updated in the LaunchDarkly dashboard.</Callout.Description>
</Callout>
The `allFlagsState` captures the state of all feature flags with regard to a specific user. This includes their values as well as other metadata.

This method can be useful for passing feature flags to your front-end. In particular, it can be used to provide bootstrap flag settings for our [JavaScript SDK](./js-sdk-reference).

[block:code]
{
  "codes": [
    {
      "code": "FeatureFlagsState state = ldClient.allFlagsState(user);",
      "language": "java"
    }
  ]
}
[/block]

## Secure mode hash
The `secureModeHash` method computes an HMAC signature of a user signed with the client's SDK key. If you're using our [JavaScript SDK](./js-sdk-reference) for client-side flags, this method generates the signature you need for secure mode.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.secureModeHash(user);",
      "language": "java"
    }
  ]
}
[/block]

## Flush
Internally, the LaunchDarkly SDK keeps an event buffer for `track` and `identify` calls. These are flushed periodically in a background thread. In some situations (for example, if you're testing out the SDK in a REPL), you may want to manually call `flush` to process events immediately. 
[block:code]
{
  "codes": [
    {
      "code": "ldClient.flush();",
      "language": "java"
    }
  ]
}
[/block]
Note that the flush interval is configurable-- if you need to change the interval, you can do so via `LDConfig.Builder`.
## Offline mode
In some situations, you might want to stop making remote calls to LaunchDarkly and fall back to default values for your feature flags. For example, if your software is both cloud-hosted and distributed to customers to run on premise, it might make sense to fall back to defaults when running on premise. You can do this by setting `offline` mode in the client's `Configuration`.
[block:code]
{
  "codes": [
    {
      "code": "LDConfig config = new LDConfig.Builder()\n      .offline(true)\n      .build();\nLDClient ldClient = new LDClient(\"YOUR_SDK_KEY\", config);\nldClient.boolVariation(\"any.feature.flag\", user, false) // will always return the default value (false)\n  \n  ",
      "language": "java"
    }
  ]
}
[/block]

## Close
Close safely shuts down the client instance and releases all resources associated with the client. In most long-running applications, you should not have to call close.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.close()",
      "language": "java"
    }
  ]
}
[/block]

## Logging
The Java SDK uses [SLF4J](https://www.slf4j.org/). All loggers are namespaced under `com.launchdarkly`. For an example configuration check out the [hello-java](https://github.com/launchdarkly/hello-java) project.

Be aware of two considerations when enabling the DEBUG log level:

1. Debug-level logs can be very verbose. It is not recommended that you turn on debug logging in high-volume environments.
2. Potentially sensitive information is logged including LaunchDarkly users created by you in your usage of this SDK.
## Redis
The Java SDK provides an interface to use Redis as a persistent store of feature flag configurations. Here's an example client configuration hooked up to a Redis instance:
[block:code]
{
  "codes": [
    {
      "code": "String host = \"localhost\";\nint port = 443;\nint cacheTimeSecs = 60\nRedisFeatureStore store = new RedisFeatureStoreBuilder(host, port, cacheTimeSecs).build()\n  \nLDConfig config = new LDConfig.Builder()\n      .featureStore(store)\n      .build();\nLDClient ldClient = new LDClient(\"YOUR_SDK_KEY\", config);",
      "language": "java"
    }
  ]
}
[/block]
For advanced `RedisFeatureStore` configuration options, please see the SDK's [JavaDoc](https://static.javadoc.io/com.launchdarkly/launchdarkly-java-server-sdk/4.6.5/com/launchdarkly/client/RedisFeatureStoreBuilder.html)
<Callout intent="alert">
  <Callout.Title>Potential network connectivity issues caused by DNS caching</Callout.Title>
   <Callout.Description>There is a potential problem for any Java application that communicates with a web service, if that service uses a load-balancing framework. LaunchDarkly is such a service.
The issue is that if a service starts to use a different set of IP addresses, a Java application could continue trying to use an old IP address, causing connection attempts to fail. In most environments, this is unlikely to be a problem because IP addresses are not cached for very long. However, Java has special behavior if the runtime environment has a [security manager](https://docs.oracle.com/javase/tutorial/essential/environment/security.html): in that case, it caches IP addresses indefinitely and will never update them until the application is restarted.
If you are running in an environment that has a security manager—or if you're not sure whether that is the case—we recommend that you set the cache duration (TTL) explicitly. [This page](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/java-dg-jvm-ttl.html) describes two ways to do so.</Callout.Description>
</Callout>

## Using the Java SDK in OSGi
Versions 4.6.0 and higher of the SDK can be installed as OSGi bundles.

Note that the SDK's default jar—the one you get from Maven or Gradle if you do not specify a "classifier"—does not contain Gson or SLF4j, since applications are often built with their own specific versions of those libraries. Therefore, using that jar in OSGi requires Gson and SLF4j to be provided by some other bundle.

However, there is also a distribution that includes Gson and SLF4j as part of the SDK bundle. You can use this if you do not care about controlling the versions of those libraries separately. To do so, add the classifier "all":


[block:code]
{
  "codes": [
    {
      "code": "<!-- in Maven: -->\n<dependency>\n   <groupId>com.launchdarkly</groupId>\n   <artifactId>launchdarkly-java-server-sdk</artifactId>\n   <version>4.6.5</version>\n   <classifier>all</classifier>\n</dependency>
// or in Gradle:\n\"com.launchdarkly:launchdarkly-java-server-sdk:4.6.5:all\"",
      "language": "xml"
    }
  ]
}
[/block]
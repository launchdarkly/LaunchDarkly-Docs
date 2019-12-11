---
title: "Haskell SDK Reference"
excerpt: ""
---
[block:callout]
{
  "type": "danger",
  "body": "The SDK is currently in beta and should not be considered ready for production use while this message is visible.",
  "title": "Beta"
}
[/block]

[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains the basics of our Haskell server-side SDK and how it works. 

If you want to learn more, visit our [Haskell SDK GitHub repository](https://github.com/launchdarkly/haskell-server-sdk/). You can even clone and run a [sample application](https://github.com/launchdarkly/hello-haskell-server/) using this SDK.
[block:api-header]
{
  "title": "Getting started"
}
[/block]
Follow the steps below to get started using the LaunchDarkly SDK in your Haskell application.

The root module of the SDK `LaunchDarkly.Server` re-exports the entire project. That's all that you need to start.
[block:code]
{
  "codes": [
    {
      "code": "import LaunchDarkly.Server",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]
After you import and install the SDK, create a single shared instance of `Client`. 

Specify your SDK key here to authorize your application to connect to LaunchDarkly and for your application and environment. <-- I DON'T KNOW WHAT "FOR YOUR APPLICATION AND ENVIRONMENT" MEANS IN THIS CONTEXT
[block:code]
{
  "codes": [
    {
      "code": "client :: IO Client\nclient = makeClient $ makeConfig \"YOUR_SDK_KEY\"",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "It's important to make this a singleton-- internally, the client instance maintains internal state that allows us to serve feature flags without making any remote requests. Be sure that you're not instantiating a new client with every request.",
  "title": "Client must be a singleton"
}
[/block]
Using `client`, you can check which variation a particular user should receive for a given feature flag.
[block:code]
{
  "codes": [
    {
      "code": "boolVariation client \"YOUR_FLAG_KEY\" (makeUser \"abc\") False",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Customizing your client"
}
[/block]
You can also pass other custom parameters to the client via the configuration object:
[block:code]
{
  "codes": [
    {
      "code": "{-# LANGUAGE OverloadedStrings #-}\n\nimport LaunchDarkly.Server.Config\n\nimport Data.Function ((&))\n\nconfig :: Config\nconfig = (makeConfig \"YOUR_SDK_KEY\")\n    & configSetEventsCapacity 1000\n    & configSetFlushIntervalSeconds 30",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]
Here, we've customized the event queue capacity and flush interval parameters.
[block:api-header]
{
  "title": "Users"
}
[/block]
Feature flag targeting and rollouts are all determined by the user you pass to your variation calls.
[block:code]
{
  "codes": [
    {
      "code": "{-# LANGUAGE OverloadedStrings #-}\n\nimport LaunchDarkly.Server.User\n\nimport Data.Function ((&))\n\nuser :: User\nuser = (makeUser \"aa0ceb\")\n    & setFirstName \"Ernestina\"\n    & setLastName \"Evans\"\n    & setEmail \"ernestina@example.com\"\n",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]
Let's walk through this snippet. The most important attribute is the user key-- in this case we've used the hash `"aa0ceb"`. The user key is the only mandatory user attribute. The key should also uniquely identify each user. You can use a primary key, an e-mail address, or a hash, as long as the same user always has the same key. We recommend using a hash if possible.

All of the other attributes (like `firstName`, `email`, and the `custom` attributes) are optional. The attributes you specify will automatically appear on our dashboard, meaning that you can start segmenting and targeting users with these attributes.

In addition to built-in attributes like names and e-mail addresses, you can pass us any of your own user data by passing `custom` attributes, like the `groups` attribute in the example above

Custom attributes are one of the most powerful features of LaunchDarkly. They let you target users according to any data that you want to send to us-- organizations, groups, account plans-- anything you pass to us becomes available instantly on our dashboard.
[block:api-header]
{
  "title": "Private user attributes"
}
[/block]
You can optionally configure the Haskell SDK to treat some or all user attributes as [private user attributes](https://docs.launchdarkly.com/docs/private-user-attributes). Private user attributes can be used for targeting purposes, but are removed from the user data sent back to LaunchDarkly.

When creating the `Config` object, you can use `configSetAllAttributesPrivate`. When you do this, all user attributes (except the key) for the user are removed before the user is sent to LaunchDarkly.
[block:code]
{
  "codes": [
    {
      "code": "config' = configSetAllAttributesPrivate True config",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]
When creating the `Config` object, you can list specific private attributes with `configSetPrivateAttributeNames`. If any user has a custom or built-in attribute named in this list, it will be removed before the user is sent to LaunchDarkly.
[block:code]
{
  "codes": [
    {
      "code": "import Data.Set (fromList)\n\nconfig' = configSetPrivateAttributeNames (fromList [\"email\"]) config",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]
You can also define private attribute names on a per-user basis. For example:
[block:code]
{
  "codes": [
    {
      "code": "import Data.Set (fromList)\n\nuser' = userSetPrivateAttributeNames (fromList [\"email\"]) user",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Variation"
}
[/block]
The `variation` family of functions determine whether a flag is enabled or not for a specific user.
[block:code]
{
  "codes": [
    {
      "code": "",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]
The functions take a `Client`, `User`, feature flag key, and a default value.

The default value will only be returned if an error is encountered-- for example, if the feature flag key doesn't exist or the user doesn't have a key specified. 
[block:api-header]
{
  "title": "VariationDetail"
}
[/block]
The `variationDetail` family of functions are similar to the `variation` family, but they additionally return an explanation of the evaluation that is programmatically inspectable. For more information about the nature of the "reason" data, see the reference guide on [Evaluation reasons](https://docs.launchdarkly.com/docs/evaluation-reasons).
[block:code]
{
  "codes": [
    {
      "code": "details :: IO (EvaluationDetail Bool)\ndetails = boolVariationDetail client user \"YOUR_FEATURE_KEY\" False",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]
For particular information on the `EvaluationDetail` structure please inspect the `LaunchDarkly.Server.Details` module.
[block:api-header]
{
  "title": "All flags"
}
[/block]
The `allFlags` function captures the state of all feature flag keys with regard to a specific user. This includes their values, as well as other metadata.

This method can be useful for passing feature flags to your front-end. In particular, it can be used to provide bootstrap flag settings for our [JavaScript SDK](https://docs.launchdarkly.com/docs/js-sdk-reference).
[block:code]
{
  "codes": [
    {
      "code": "state = allFlags client user",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Anonymous users"
}
[/block]
You can also distinguish logged-in users from anonymous users in the SDK, as follows:
[block:code]
{
  "codes": [
    {
      "code": "user` = userSetAnonymous True user",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]
You will still need to generate a unique key for anonymous users-- session IDs or UUIDs work best for this.

Anonymous users work just like regular users, except that they won't appear on your Users page in LaunchDarkly. You also can't search for anonymous users on your Features page, and you can't search or autocomplete by anonymous user keys. This is actually a good thing-- it keeps anonymous users from polluting your Users page!
[block:api-header]
{
  "title": "Flush"
}
[/block]
Internally, the LaunchDarkly SDK keeps an event buffer for analytics events. These are flushed periodically in a background thread. In some situations (for example, if you're testing out the SDK in a simulator), you may want to manually call flush to process events immediately.
[block:code]
{
  "codes": [
    {
      "code": "flushEvents client",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]
This function will not block, but instead initiate a flush operation in the background. Note that the flush interval is configurable-- if you need to change the interval, you can do so via the configuration.
[block:api-header]
{
  "title": "Track"
}
[/block]
The `track` function allows you to record actions your users take on your site. This lets you record events that take place on your server. In LaunchDarkly, you can tie these events to goals in A/B tests. Here's a simple example:
[block:code]
{
  "codes": [
    {
      "code": "track client user \"your-goal-key\" Nothing Nothing",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]
You can also attach a JSON object containing arbitrary data to your event, or a custom metric value.
[block:api-header]
{
  "title": "Identify"
}
[/block]
The `identify` function creates or updates users on LaunchDarkly, making them available for targeting and autocomplete on the dashboard. In most cases, you won't need to call `identify`-- the `variation` call will automatically create users on the dashboard for you. `identify` can be useful if you want to pre-populate your dashboard before launching any features. 
[block:code]
{
  "codes": [
    {
      "code": "identify client user",
      "language": "text",
      "name": "Haskell"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Offline mode"
}
[/block]
In some situations, you might want to stop making remote calls to LaunchDarkly and fall back to default values for your feature flags. For example, if your software is both cloud-hosted and distributed to customers to run on premise, it might make sense to fall back to defaults when running on premise. You can do this by setting offline mode in the config object:
[block:code]
{
  "codes": [
    {
      "code": "config' = configSetOffline True config",
      "language": "text"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Shutting down"
}
[/block]
Close safely shuts down the client instance and releases all resources associated with the client. In most long-running applications, you should not have to call close. This can be used to ensure all events have been flushed synchronously before closing your application. You should not evaluate flags after `close` has been initiated. 
[block:code]
{
  "codes": [
    {
      "code": "close client",
      "language": "text"
    }
  ]
}
[/block]
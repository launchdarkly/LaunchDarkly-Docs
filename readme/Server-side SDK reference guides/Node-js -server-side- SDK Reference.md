---
title: "Node.js (server-side) SDK Reference"
excerpt: ""
---
This reference guide documents all of the methods available in our Node.js SDK, and explains in detail how these methods work. If you want to dig even deeper, our SDKs are open source-- head to our [Node.js SDK repository](https://github.com/launchdarkly/node-server-sdk) on GitHub to look under the hood. The online [API docs](https://launchdarkly.github.io/node-server-sdk/) contain the programmatic definitions of every type and method. Additionally you can clone and run sample applications using this SDK with [vanilla JavaScript](https://github.com/launchdarkly/hello-node-server), [TypeScript](https://github.com/launchdarkly/hello-node-typescript), and [server-side bootstrapping](https://github.com/launchdarkly/hello-bootstrap).
[block:callout]
{
  "type": "info",
  "title": "Client-side feature flags?",
  "body": "Our Node.js SDK is designed specifically for server-side Node.js. Learn more about our [client-side and server-side SDKs](doc:client-side-and-server-side).\n\nIf you're looking to use feature flags in JavaScript in a browser environment, see our [JavaScript SDK Reference](doc:js-sdk-reference).\n\nIf you're creating a *client-side* Node application, see our [Node Client-Side SDK Reference](node-client-sdk-reference). Alternatively if you're creating a desktop application in Electron, see our [Electron SDK Reference](doc:electron-sdk-reference)."
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Getting started"
}
[/block]
Building on top of our [Quickstart](doc:getting-started) guide, the following steps will get you started with using the LaunchDarkly SDK in your Node.js application.

The first step is to install the LaunchDarkly SDK as a dependency in your application using your application's dependency manager. 
[block:code]
{
  "codes": [
    {
      "code": "npm install launchdarkly-node-server-sdk --save\n\n# Note that in earlier versions, the package name was ldclient-node",
      "language": "less"
    }
  ]
}
[/block]
Next you should import the LaunchDarkly client in your application code.
[block:code]
{
  "codes": [
    {
      "code": "const LaunchDarkly = require('launchdarkly-node-server-sdk');",
      "language": "javascript"
    }
  ]
}
[/block]
Once the SDK is installed and imported, you'll want to create a single, shared instance of the LaunchDarkly client. You should specify your SDK key here so that your application will be authorized to connect to LaunchDarkly and for your application and environment.
[block:code]
{
  "codes": [
    {
      "code": "ldClient = LaunchDarkly.init(\"YOUR_SDK_KEY\");",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "LDClient must be a singleton",
  "body": "It's important to make this a singleton-- internally, the client instance maintains internal state that allows us to serve feature flags without making any remote requests. **Be sure that you're not instantiating a new client with every request.**"
}
[/block]
The client will emit a `ready` event when it has been initialized and can serve feature flags.

Using `ldClient`, you can check which variation a particular user should receive for a given feature flag. Note that the `ready` event is _only_ emitted once - when the client first initializes. In a production application you should place your `ldClient.variation` code so that it is invoked as desired.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.once(\"ready\", function() {\n  ldClient.variation(\"your.flag.key\", {\"key\": \"user@test.com\"}, false,\n                     function(err, showFeature) {\n    if (showFeature) {\n      // application code to show the feature\n    } else {\n      // the code to run if the feature is off\n    }\n  });\n});",
      "language": "javascript"
    }
  ]
}
[/block]
Lastly, when your application is about to terminate, shut down `ldClient`. This ensures that the client releases any resources it is using, and that any pending analytics events are delivered to LaunchDarkly. If your application quits without this shutdown step, you may not see your requests and users on the dashboard, because they are derived from analytics events. **This is something you only need to do once**.
[block:code]
{
  "codes": [
    {
      "code": "// This example repeats the code from the previous example because in Node, the client methods are\n// asynchronous, so in order to add another step that happens after the previous steps are finished,\n// we need to add code *inside* the existing block. In other words, do not type the whole thing over\n// again, just modify the last part you added as shown.\n//\n// Again, in a real application, this step is something you would only do when the application is\n// about to quit-- NOT after every call to variation().\n\nldClient.once(\"ready\", function() {\n  ldClient.variation(\"your.flag.key\", {\"key\": \"user@test.com\"}, false,\n                     function(err, showFeature) {\n    if (showFeature) {\n      // application code to show the feature\n    } else {\n      // the code to run if the feature is off\n    }\n    \n    // ADDED: shut down the client, since we're about to quit\n    ldClient.close();\n  });\n});",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Customizing your client"
}
[/block]
You can also pass custom parameters to the client by creating a custom configuration object:
[block:code]
{
  "codes": [
    {
      "code": "var config = {\"timeout\": 3};\nldClient = LaunchDarkly.init(\"YOUR_SDK_KEY\", config);",
      "language": "javascript"
    }
  ]
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Parameters",
    "h-1": "Type",
    "h-2": "Description",
    "h-3": "Default",
    "0-0": "`timeout`",
    "0-1": "`int`",
    "0-3": "5 seconds",
    "0-2": "Must be a number, in seconds, and controls the request timeout to LaunchDarkly.",
    "1-0": "`capacity`",
    "1-1": "`int`",
    "1-2": "Must be a number, and controls the maximum size of the event buffer. LaunchDarkly sends events asynchronously, and buffers them for efficiency.",
    "1-3": "1000 events",
    "2-0": "`logger`",
    "2-2": "Configures a logger for warnings and errors generated by the SDK.",
    "2-1": "`object`",
    "3-0": "`flushInterval`",
    "3-1": "`int`",
    "3-2": "Controls how long the SDK buffers events before sending them back to our server. If your server generates many events per second, we suggest decreasing the `flush_interval` and / or increasing `capacity` to meet your needs.",
    "3-3": "5 seconds",
    "4-0": "`proxyHost`",
    "4-1": "`string`",
    "4-2": "Allows you to specify a host for an optional HTTP proxy.",
    "5-0": "`proxyPort`",
    "5-2": "Allows you to specify a port for an optional HTTP proxy. Both the host and port must be specified to enable proxy support.",
    "5-1": "`int`",
    "6-0": "`proxyAuth`",
    "6-1": "`string`",
    "6-2": "Allows you to specify basic authentication parameters for an optional HTTP proxy. Usually of the form `username:password`",
    "7-0": "`offline`",
    "7-1": "`bool`",
    "7-2": "Whether the client should be initialized in offline mode. In offline mode, default values are returned for all flags and no remote network requests are made.",
    "7-3": "`false`",
    "8-0": "`stream`",
    "8-1": "`bool`",
    "8-2": "Whether streaming or polling should be used to receive flag updates.",
    "8-3": "`true`",
    "9-0": "`useLdd`",
    "9-1": "`bool`",
    "9-2": "If true, the SDK will rely on LDD for feature updates. See Deployment options for more details.",
    "9-3": "`false`",
    "10-0": "`baseUri`",
    "11-0": "`streamUri`",
    "12-0": "`eventsUri`",
    "10-2": "Set the base URL of the LaunchDarkly server for this configuration.",
    "11-2": "Set the stream URL of the LaunchDarkly server for this configuration.",
    "12-2": "Set the events URL of the LaunchDarkly server for this configuration.",
    "10-3": "https://app.launchdarkly.com",
    "11-3": "https://stream.launchdarkly.com",
    "12-3": "https://events.launchdarkly.com",
    "10-1": "`Uri` or `string`",
    "11-1": "`Uri` or `string`",
    "12-1": "`Uri` or `string`",
    "13-0": "`featureStore`",
    "13-2": "Sets the feature flag store to be used by the client.",
    "13-3": "flags are stored in memory, with an option to use a redis feature store. \nTo learn more, read  [Database integrations](https://docs.launchdarkly.com/docs/node-sdk-reference#section-database-integrations).",
    "14-0": "`allAttributesPrivate`",
    "14-1": "`bool`",
    "14-2": "Whether all user attributes (except the user key) should be marked as [private](https://docs.launchdarkly.com/docs/private-user-attributes), and not sent to LaunchDarkly.",
    "15-0": "`privateAttributeNames`",
    "15-1": "An array of `string`s",
    "15-2": "Must be a list of strings. The names of user attributes that should be marked as [private](https://docs.launchdarkly.com/docs/private-user-attributes), and not sent to LaunchDarkly.",
    "2-3": "See [Logging](https://docs.launchdarkly.com/docs/node-sdk-reference#section-logging)",
    "14-3": "`false`",
    "15-3": "`[]`",
    "4-3": "`null`",
    "5-3": "`null`",
    "6-3": "`null`",
    "13-1": "`InMemoryFeatureStore` or `RedisFeatureStore`\n\nDepending on your configuration, you may also be able to use `dynamodb` or `consul`. These types require additional dependencies.",
    "16-1": "`integer`",
    "17-1": "`integer`",
    "16-3": "`1000`",
    "17-3": "`300`",
    "18-3": "`false`",
    "18-1": "`bool`",
    "16-0": "`userKeysCapacity`",
    "17-0": "`userKeysFlushInterval`",
    "18-0": "`inlineUsersInEvents`",
    "17-2": "The interval (in seconds) at which the event processor will reset its set of known user keys.",
    "16-2": "The number of user keys that the event processor can remember at any one time, so that duplicate user details will not be sent in analytics events.",
    "18-2": "Whether to include full user details in every analytics event.  By default, events will only include the user key, except for one \"index\" event that provides*\n the full details for the user.",
    "19-0": "`sendEvents`",
    "19-1": "`bool`",
    "19-2": "Boolean value which enables sending events back to LaunchDarkly.",
    "19-3": "`true`"
  },
  "cols": 4,
  "rows": 20
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Users"
}
[/block]
Feature flag targeting and rollouts are all determined by the *user* you pass to your `variation` calls. In our Node.JS SDK, users are simply JSON objects. Here's an example:
[block:code]
{
  "codes": [
    {
      "code": "var user = {\n  \"key\": \"aa0ceb\",\n  \"firstName\": \"Ernestina\",\n  \"lastName\": \"Evans\",\n  \"email\": \"ernestina@example.com\",\n  \"custom\": {\n    \"groups\": [\"Google\", \"Microsoft\"]\n  }\n};",
      "language": "javascript"
    }
  ]
}
[/block]
Let's walk through this snippet. The most important attribute is the user key-- in this case we've used the hash `"aa0ceb"`. **The user key is the only mandatory user attribute**. The key should also uniquely identify each user. You can use a primary key, an e-mail address, or a hash, as long as the same user always has the same key. We recommend using a hash if possible.

All of the other attributes (like `firstName`, `email`, and the `custom` attributes) are optional. The attributes you specify will automatically appear on our dashboard, meaning that you can start segmenting and targeting users with these attributes. 

Besides the `key`, LaunchDarkly supports the following attributes at the "top level". Remember, all of these are optional:

* `ip`: Must be an IP address.
* `firstName`: Must be a string. If you provide a first name, you can search for users on the Users page by name.
* `lastName`: Must be a string. If you provide a last name, you can search for users on the Users page by name.
* `country`: Must be a string representing the country associated with the user. 
* `email`: Must be a string representing the user's e-mail address. If an `avatar` URL is not provided, we'll use [Gravatar](http://en.gravatar.com/) to try to display an avatar for the user on the Users page.
* `avatar`: Must be an absolute URL to an avatar image for the user. 
* `name`: Must be a string. You can search for users on the User page by name
* `anonymous`: Must be a boolean. See the section below on anonymous users for more details.

In addition to built-in attributes, you can pass us any of your own user data by passing `custom` attributes, like the `groups` attribute in the example above. 
[block:callout]
{
  "type": "info",
  "title": "A note on types",
  "body": "Most of our built-in attributes (like names and e-mail addresses) expect string values. Custom attribute values can be strings, booleans (like true or false), numbers, or lists of strings, booleans or numbers. \n\nIf you enter a custom value on our dashboard that looks like a number or a boolean, it'll be interpreted that way."
}
[/block]
Custom attributes are one of the most powerful features of LaunchDarkly. They let you target users according to any data that you want to send to us-- organizations, groups, account plans-- anything you pass to us becomes available instantly on our dashboard.
[block:api-header]
{
  "title": "Private user attributes"
}
[/block]
You can optionally configure the Node SDK to treat some or all user attributes as [Private user attributes](doc:private-user-attributes). Private user attributes can be used for targeting purposes, but are removed from the user data sent back to LaunchDarkly.

In the Node SDK there are two ways to define private attributes for the **entire** LaunchDarkly client:

* In the LaunchDarkly `config`, you can set `allAttributesPrivate` to `true`. If this is enabled, all user attributes (except the key) for *all users* are removed before the user is sent to LaunchDarkly.
* In the LaunchDarkly `config` object, you can define a list of `privateAttributeNames`. If any user has a custom or built-in attribute named in this list, it will be removed before the user is sent to LaunchDarkly.

You can also define a set of `privateAttributeNames` on the user object itself. For example:
[block:code]
{
  "codes": [
    {
      "code": "var user = {\n  \"key\": \"aa0ceb\",\n  \"email\": \"test@example.com\",\n  \"privateAttributeNames\": [\"email\"]\n}\n",
      "language": "json"
    }
  ]
}
[/block]
When this user is sent back to LaunchDarkly, the `email` attribute will be removed.
[block:api-header]
{
  "type": "basic",
  "title": "Anonymous users"
}
[/block]
You can also distinguish logged-in users from anonymous users in the SDK, as follows:
[block:code]
{
  "codes": [
    {
      "code": "var user = {\"key\":\"aa0ceb\", \"anonymous\": true};",
      "language": "javascript"
    }
  ]
}
[/block]
You will still need to generate a unique key for anonymous users-- session IDs or UUIDs work best for this. 

Anonymous users work just like regular users, except that they won't appear on your Users page in LaunchDarkly. You also can't search for anonymous users on your Features page, and you can't search or autocomplete by anonymous user keys. This is actually a good thing-- it keeps anonymous users from polluting your Users page!
[block:api-header]
{
  "type": "basic",
  "title": "Variation"
}
[/block]
The `variation` method determines which variation of a feature flag a user receives.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.variation(\"your.feature.key\", user, false, function(err, show_feature) {\n  if (show_feature) {\n      # application code to show the feature\n  }\n  else {\n      # the code to run if the feature is off \n  } \n});",
      "language": "javascript"
    }
  ]
}
[/block]
`variation` calls take the feature flag key, an `LDUser`, and a default value. 

The default value will only be returned in offline mode or if an error is encountered-- for example, if the feature flag key doesn't exist or the user doesn't have a key specified. 

The `variation` call will automatically create a user in LaunchDarkly if a user with that user key doesn't exist already. There's no need to create users ahead of time (but if you do need to, take a look at Identify). 
[block:api-header]
{
  "title": "VariationDetail"
}
[/block]
The `variationDetail` method allows you to evaluate a feature flag (using the same parameters as you would for variation) and receive more information about how the value was calculated. 

The variation detail is returned in an object that contains both the result value and a "reason" object which will tell you, for instance, if the user was individually targeted for the flag or was matched by one of the flag's rules. It will also indicate if the flag returned the default value due to an error.

You can examine the "reason" data programmatically; you can also view it with data export, if you are capturing detailed analytics events for this flag.

For more information, see [Evaluation reasons](doc:evaluation-reasons).
[block:api-header]
{
  "type": "basic",
  "title": "Track"
}
[/block]
The `track` method allows you to record actions your users take on your site. This lets you record events that take place on your server. In LaunchDarkly, you can tie these events to goals in A/B tests. Here's a simple example:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.track(\"your-goal-key\", user);",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Subscribing to feature flag changes"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "This feature is not available on other server-side SDKs",
  "body": "You cannot subscribe to feature flag changes with other server-side SDKs. Only the Node.js SDK supports this feature from the server side. \n\nAll client-side SDKs support this feature."
}
[/block]
To subscribe to all feature flag changes, listen for the update event:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.on('update', function(settings) {\n  console.log('flags changed:', settings);\n});",
      "language": "javascript"
    }
  ]
}
[/block]
The `settings` object will contain detailed information for flags that have changed. You can also subscribe to specific flags:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.on('update:YOUR_FLAG_KEY', function(oldValue, newValue) {\n  console.log('YOUR_FLAG_KEY changed:', newValue, '(' + oldValue + ')');\n});",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Identify"
}
[/block]
The `identify` method creates or updates users on LaunchDarkly, making them available for targeting and autocomplete on the dashboard. In most cases, you won't need to call `identify`-- the `variation` call will automatically create users on the dashboard for you. `identify` can be useful if you want to pre-populate your dashboard before launching any features. 
[block:code]
{
  "codes": [
    {
      "code": "ldClient.identify(user);",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "All flags"
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "Note that unlike variation and identify calls, allFlagsState does not send events to LaunchDarkly. Thus, users are not created or updated in the LaunchDarkly dashboard and your flags' last requested date will not be updated.",
  "title": "Creating users"
}
[/block]
The `allFlagsState` method captures the state of all feature flag keys with regard to a specific user. This includes their values, as well as other metadata.

This method can be useful for passing feature flags to your front-end. In particular, it can be used to provide bootstrap flag settings for our [JavaScript SDK](doc:js-sdk-reference).
[block:code]
{
  "codes": [
    {
      "code": "ldClient.allFlagsState(user, function(err, flagsState) {\n  // this object can be converted to JSON or can be queried for flag values\n});",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Secure mode hash"
}
[/block]
The `secureModeHash` method computes an HMAC signature of a user signed with the client's SDK key. If you're using our [JavaScript SDK](doc:js-sdk-reference) for client-side flags, this method generates the signature you need for secure mode.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.secureModeHash(user);",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Flush"
}
[/block]
Internally, the LaunchDarkly SDK keeps an event buffer for `track` and `identify` calls. These are flushed periodically in a background thread. In some situations (for example, if you're testing out the SDK in a REPL), you may want to manually call `flush` to process events immediately. 
[block:code]
{
  "codes": [
    {
      "code": "ldClient.flush();",
      "language": "javascript"
    }
  ]
}
[/block]
Note that the flush interval is configurable-- if you need to change the interval, you can do so when configuring your client instance.
[block:api-header]
{
  "type": "basic",
  "title": "Offline mode"
}
[/block]
In some situations, you might want to stop making remote calls to LaunchDarkly and fall back to default values for your feature flags. For example, if your software is both cloud-hosted and distributed to customers to run on premise, it might make sense to fall back to defaults when running on premise. You can do this by setting `offline` mode in the client's `config` object.
[block:code]
{
  "codes": [
    {
      "code": "var config = {\"offline\": true};\nldClient = LaunchDarkly.init(\"YOUR_SDK_KEY\", config);\nldClient.variation(\"any.feature.flag\", user, false, cb) // cb will always be invoked with the default value (false)\n\n",
      "language": "javascript"
    }
  ]
}
[/block]
Note that the default value you set in the variation method will be returned in offline mode, this does not refer to the default rule set in your flag configuration.
[block:api-header]
{
  "type": "basic",
  "title": "Close"
}
[/block]
Close safely shuts down the client instance and releases all resources associated with the client. In most long-running applications, you should not have to call `close`.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.close();",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Logging"
}
[/block]
The Node.js SDK uses [Winston](https://github.com/winstonjs/winston) by default. All loggers are namespaced under `[LaunchDarkly]`.

A custom logger may be passed to the SDK via the configurable `logger` property. Note that Winston's syntax for instantiating and configuring loggers changed between versions 2.x and 3.x. Be sure to declare a dependency on a specific Winston version if you run into errors using the transitive dependency.
[block:code]
{
  "codes": [
    {
      "code": "logger =\n  new winston.Logger({\n    level: \"debug\",\n    transports: [\n      new winston.transports.Console()\n    ]\n  }\n);\nldClient = LaunchDarkly.init(\"YOUR_SDK_KEY\", {\"logger\": logger});",
      "language": "javascript",
      "name": "Winston 2.x"
    },
    {
      "code": "logger = \n  winston.createLogger({\n    level: 'debug',\n    transports: [\n      new winston.transports.Console()\n    ]\n  }\n);\nldClient = LaunchDarkly.init(\"YOUR_SDK_KEY\", {\"logger\": logger});",
      "language": "javascript",
      "name": "Winston 3.x"
    }
  ]
}
[/block]
Be aware of two considerations when enabling the DEBUG log level:
 1. Debug-level logs can be very verbose. It is not recommended that you turn on debug logging in high-volume environments.
 2. Potentially sensitive information is logged including LaunchDarkly users created by you in your usage of this SDK.
[block:api-header]
{
  "title": "Database integrations"
}
[/block]
Feature flag data can be cached with Redis, DynamoDB, or Consul.

See ["Using a persistent feature store"](doc:using-a-persistent-feature-store) for more information.
[block:api-header]
{
  "title": "Promises and async"
}
[/block]
All asynchronous SDK methods which accept a callback also return a `Promise`. This means that if your application uses promises to manage asynchronous operations, interacting with the SDK should be convenient. Since the `async/await`  syntax is based on Promises, these methods will also work with `await`.
[block:code]
{
  "codes": [
    {
      "code": "// Using the .then() method to add a continuation handler for a Promise\nldClient.variation(\"any.feature.flag\", user, false).then(function(value) {\n  // application code\n});\n\n// Using \"await\" instead, within an async function\nvar value = await ldClient.variation(\"any.feature.flag\", user, false);",
      "language": "javascript"
    }
  ]
}
[/block]
There is also an alternative to the `ready` event:
[block:code]
{
  "codes": [
    {
      "code": "// Using .then() and .catch() to add success and error handlers to a Promise\nldClient.waitForInitialization().then(function(client) {\n\t// initialization complete\n}).catch(function(err) {\n  // initialization failed\n});\n\n// Using \"await\" instead, within an async function\ntry {\n  await ldClient.waitForInitialization();\n  // initialization complete\n} catch (err) {\n  // initialization failed\n}",
      "language": "javascript"
    }
  ]
}
[/block]
`allFlagsState` and `flush` also return a `Promise`.
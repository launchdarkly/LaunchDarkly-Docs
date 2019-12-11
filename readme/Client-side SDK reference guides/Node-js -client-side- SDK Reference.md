---
title: "Node.js (client-side) SDK Reference"
excerpt: ""
---
This reference guide documents all of the methods available in our client-side Node.js SDK, and explains in detail how these methods work. If you want to dig even deeper, our SDKs are open source-- head to our [Client-Side Node.js SDK GitHub repository](https://github.com/launchdarkly/node-client-sdk) to look under the hood. The online [API docs](https://launchdarkly.github.io/node-client-sdk/) contain the programmatic definitions of every type and method. Additionally you can clone and run a [sample application](https://github.com/launchdarkly/hello-node-client) using this SDK.
[block:callout]
{
  "type": "warning",
  "body": "This SDK is intended for client-side (desktop or Node-enabled device) feature flags **only**. Learn more about our [client-side and server-side SDKs](doc:client-side-and-server-side).\n\nIf you have a Node.js application and are looking to set up LaunchDarkly on the server-side, head to our [Node.js SDK Reference](doc:node-sdk-reference).\n\nIf you are using Electron, there is an [Electron SDK](doc:electron-sdk-reference) more specifically designed for that environment.",
  "title": "For client-side use only"
}
[/block]
This SDK is closely related to the [browser JavaScript SDK](doc:js-sdk-reference) and has almost exactly the same API, but does not have any browser-specific functionality, and adds several features specific to Node.
[block:api-header]
{
  "title": "Getting started"
}
[/block]
Building on top of our [Quickstart](doc:getting-started) guide, the following steps will get you started with using the LaunchDarkly SDK in your Node.js code.

The first step is to install the LaunchDarkly SDK as a dependency in your application using your application's dependency manager. 
[block:code]
{
  "codes": [
    {
      "code": "npm install --save launchdarkly-node-client-sdk",
      "language": "shell",
      "name": "Installing with npm"
    },
    {
      "code": "yarn add launchdarkly-node-client-sdk",
      "language": "shell",
      "name": "Installing with yarn"
    }
  ]
}
[/block]
Next you should import the LaunchDarkly client in your application code.
[block:code]
{
  "codes": [
    {
      "code": "const LaunchDarkly = require('launchdarkly-node-client-sdk');",
      "language": "javascript"
    }
  ]
}
[/block]
Once the SDK is installed and imported, you'll want to create a single, shared instance of the LaunchDarkly client. To create a client instance, you need your environment's client-side ID (available on your [account settings page](https://app.launchdarkly.com/settings#/projects)). Client-side IDs are not secret-- they can be safely exposed in your client-side code.

Feature flag targeting and rollouts are all determined by the active *user*. You must pass a user context to the SDK during initialization before requesting any feature flags with `variation`.  Failure to pass a valid user context to the SDK during initialization will result in an error.

Here's a basic example showing how to initialize the client:
[block:code]
{
  "codes": [
    {
      "code": "const user = {\n  key: \"aa0ceb\"\n};\n\nconst ldClient = LaunchDarkly.initialize('YOUR_CLIENT_SIDE_ID', user);",
      "language": "javascript"
    }
  ]
}
[/block]
The client will emit a `ready` event when it has been initialized (you can also use the `waitForInitialization()` method, which returns a Promise). Once it has been initialized, you can safely call `variation` to access your feature flags. (Note that the `ready` event is only emitted once, when the client first initializes. In a production application, your calls to `ldClient.variation` would normally not be inside of this event handler.)
[block:code]
{
  "codes": [
    {
      "code": "ldClient.on('ready', () => {\n  console.log(\"It's now safe to request feature flags\");\n  \n  const showFeature = ldClient.variation(\"YOUR_FEATURE_KEY\", false);\n\n  if (showFeature) {\n   \t...\n  } else {\n    ...\n  }\n});",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Streaming Updates",
  "body": "The SDK does not subscribe to streaming real-time updates automatically when it is initialized. Setting the `streaming` option to `true` in the client configuration will cause the SDK to open a streaming connection to LaunchDarkly and receive live feature flag updates; you can also specify an event handler with `ldClient.on('change')` to be notified immediately when a flag has changed."
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Making feature flags available to the client-side SDK",
  "body": "Feature flags must be marked available to the client-side SDK (see your feature flag's settings page) before they can be used in `variation` calls on the front-end. If you request a feature flag that is not available, you'll receive the default value for that flag.\n\nIf you always want flags marked as available to the client-side SDK by default, you can check the \"Make new flags available to the client-side (JavaScript) SDK by default\" in your [project settings](https://app.launchdarkly.com/settings#/projects)."
}
[/block]
Lastly, when your application is about to terminate, shut down `ldClient`. This ensures that the client releases any resources it is using, and that any pending analytics events are delivered to LaunchDarkly. If your application quits without this shutdown step, you may not see your requests and users on the dashboard, because they are derived from analytics events. **This is something you only need to do once**.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.close(() => {\n  console.log('Client has been closed');\n  process.exit(0);\n});",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Customizing your client"
}
[/block]
You can also pass custom parameters to the client by creating a custom configuration object:
[block:code]
{
  "codes": [
    {
      "code": "const options = {\n  flushInterval: 10000,\n  allAttributesPrivate: true\n};\n\nconst ldClient = LaunchDarkly.initialize('YOUR_CLIENT_SIDE_ID', user, options);",
      "language": "javascript"
    }
  ]
}
[/block]
For a full guide to the available configuration options, see `LDOptions` in the [TypeScript reference](https://launchdarkly.github.io/node-client-sdk/).
[block:api-header]
{
  "type": "basic",
  "title": "Users"
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Personally-identifying user keys",
  "body": "By default, when the SDK requests feature flags from LaunchDarkly, it makes an HTTP GET request with the user properties encoded in the URL. If you do not want user keys or other properties to be in request URLs, enable the `useReport` option in your client configuration; this will cause user data to be sent in the body of an HTTP REPORT request instead."
}
[/block]
Let's walk through the user JSON in more detail. The most important attribute is the user key-- in this case we've used the hash `"aa0ceb"`. **The user key is the only mandatory user attribute**. The key should also uniquely identify each user. You can use a primary key, an e-mail address, or a hash, as long as the same user always has the same key. We recommend using a hash if possible.

Here's a more complete example of a user:
[block:code]
{
  "codes": [
    {
      "code": "const user = {\n  key: \"aa0ceb\",\n  firstName: \"Ernestina\",\n  lastName: \"Evans\",\n  email: \"ernestina@example.com\",\n  custom: {\n    groups: [\"Google\", \"Microsoft\"]\n  }\n};",
      "language": "javascript"
    }
  ]
}
[/block]
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
You can optionally configure the JavaScript SDK to treat all user attributes as [private user attributes](doc:private-user-attributes) . Private user attributes can be used for targeting purposes, but are removed from the user data sent back to LaunchDarkly.

To mark all user attributes (except the key) as private in the JavaScript SDK, you can use the  `allAttributesPrivate` option:
[block:code]
{
  "codes": [
    {
      "code": "const user = {\n  key: \"aa0ceb\",\n  name: \"Grace Hopper\",\n  email: \"gracehopper@example.com\"\n};\n\nconst ldClient = LaunchDarkly.initialize('YOUR_CLIENT_SIDE_ID', user, {\n  allAttributesPrivate: true\n});",
      "language": "javascript"
    }
  ]
}
[/block]
In the above example, the `name` and `email` attributes will be removed.

You can also specify an array of which attributes should be private with the `privateAttributeNames` option. This option can also be configured on a per-user basis by specifying which attributes should be private in your user object.

In the example below, this option is configured in both the user object and the configuration object to demonstrate what this looks like:
[block:code]
{
  "codes": [
    {
      "code": "const user = {\n  key: \"aa0ceb\",\n  name: \"Grace Hopper\",\n  email: \"gracehopper@example.com\"\n  privateAttributeNames: [\"email\"]\n};\n\nconst ldClient = LaunchDarkly.initialize('YOUR_CLIENT_SIDE_ID', user, {\n  privateAttributeNames: [\"email\"]\n});",
      "language": "javascript"
    }
  ]
}
[/block]
In the example above, only the user's key and their name will be sent back to LaunchDarkly.
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
      "code": "// To create an anonymous user with an auto-generated key, you can specify\n// the \"anonymous\" property and omit the \"key\" property. The LaunchDarkly\n// client will create a unique key for this user and cache it locally.\nconst user = { anonymous: true };\n\n// You can also specify any key you wish:\nconst user2 = { key: \"aa0ceb\", anonymous: true };",
      "language": "javascript",
      "name": ""
    }
  ]
}
[/block]
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
      "code": "const value = ldClient.variation(\"your.feature.key\", false);",
      "language": "javascript"
    }
  ]
}
[/block]
`variation` calls take the feature flag key and a default value. 

The default value will only be returned if an error is encountered—for example, if the feature flag key doesn't exist or the user doesn't have a key specified. 
[block:api-header]
{
  "type": "basic",
  "title": "Track"
}
[/block]
The `track` method allows you to record actions your users take, giving them any event name you wish. This lets you record events that take place client-side. The current user data automatically accompanies the event.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.track(\"something-happened\");\n\nldClient.track(\"something-happened-with-custom-data\", { someData: 2 });",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Subscribing to feature flag changes"
}
[/block]
The client uses an event emitter pattern to allow you to subscribe to feature flag changes in real time. To subscribe to all feature flag changes, listen for the change event:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.on('change', allChanges => {\n  console.log('flags changed:', JSON.stringify(allChanges));\n});",
      "language": "javascript"
    }
  ]
}
[/block]
The `allChanges` object will contain a map of updated feature flag keys and values. The map will only contain the keys to flags that have changed. You can also subscribe to specific flags:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.on('change:YOUR_FLAG_KEY', (value, previous) => {\n  console.log('YOUR_FLAG_KEY changed:', value, '(was ' + previous + ')');\n});",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "All flags"
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Creating users",
  "body": "Note that the allFlags method in this SDK functions differently than our other SDKs.\n\n**This method will send analytics events to LaunchDarkly as if you'd called variation for every feature flag.**\n\nYou can disable this behavior by initializing the SDK with `sendEventsOnlyForVariation` set to `true`"
}
[/block]
The `allFlags` method will return a key/value map of all your feature flags. 

The map will contain null values for any flags that would return the fallback value (the second argument that you normally pass to variation). 
[block:api-header]
{
  "type": "basic",
  "title": "Bootstrapping"
}
[/block]
Bootstrapping refers to providing the LaunchDarkly client object with an initial, immediately available set of feature flag values that will be used instead of waiting for a connection to LaunchDarkly. This feature is normally used in the browser JavaScript SDK, with the values being provided by LaunchDarkly-enabled code on the back end, but you can use it to set the feature flags to any values you wish:
[block:code]
{
  "codes": [
    {
      "code": "const ldClient = LaunchDarkly.initialize(\n  'YOUR_CLIENT_SIDE_ID',\n  user,\n  {\n    bootstrap: {\n      flagKey1: flagValue1,\n      flagKey2: flagValue2\n  \t}\n  }\n);\n",
      "language": "javascript"
    }
  ]
}
[/block]
A more useful mode in a client-side Node application is to bootstrap from locally cached values. In this mode, if no values have been cached yet, the SDK will obtain flags from LaunchDarkly and then cache them in persistent storage; the next time you start up, the cached flags will be immediately available, and the SDK will also contact LaunchDarkly in the background to obtain updated values if any. To activate this mode, use the special string `"localstorage"`:
[block:code]
{
  "codes": [
    {
      "code": "const ldClient = LaunchDarkly.initialize(\n  'YOUR_CLIENT_SIDE_ID', \n  user, \n  {\n    bootstrap: 'localStorage'\n  }\n);\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Changing the user context"
}
[/block]
You may wish to change the user context dynamically and receive the new set of feature flags for that user or generate events for the new user. To do this, you can call the `identify` function. You may pass a callback that will be called when the new flags are in effect.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.identify(newUser, () => {\n  console.log(\"New user's flags available\");\n});\n\n// or, with a Promise:\nldClient.identify(newUser).then(() => {\n  console.log(\"New user's flags available\");\n});\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Flush"
}
[/block]
Internally, the LaunchDarkly SDK keeps an analytics event buffer. These events are flushed periodically (asynchronously). In some situations, you may want to manually call `flush` to process events immediately.

Note that this method is asynchronous. You may pass a callback or wait for the returned `Promise`  to determine when all events have been flushed.
[block:code]
{
  "codes": [
    {
      "code": "ldClient.flush();\n\n// or, with a callback:\nldClient.flush(() => {\n  console.log('flush complete');\n});\n\n// or, with a Promise:\nldClient.flush().then(() => {\n  console.log('flush complete');\n});\n",
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
By default, the SDK uses the `winston` package. There are four logging levels: `debug`, `info`, `warn`, and `error`; by default, `debug` and `info` messages are hidden. See the [TypeScript definitions](https://github.com/launchdarkly/js-client-sdk/blob/master/packages/launchdarkly-js-sdk-common/typings.d.ts) for `LDLogger`, `LDOptions`, and `createConsoleLogger` for more details.

A custom logger may be passed to the SDK via the configurable logger property. Note that Winston's syntax for instantiating and configuring loggers changed between versions 2.x and 3.x. Be sure to declare a dependency on a specific Winston version if you run into errors using the transitive dependency.
[block:code]
{
  "codes": [
    {
      "code": "const logger =\n  new winston.Logger({\n    level: \"debug\",\n    transports: [\n      new winston.transports.Console()\n    ]\n  }\n);\n\nconst user = {\n  key: \"aa0ceb\"\n};\n\nconst ldClient = LaunchDarkly.initialize(\n  'YOUR_CLIENT_SIDE_ID', \n  user,\n  {\"logger\": logger}\n);",
      "language": "javascript",
      "name": "Winston 2.x"
    },
    {
      "code": "const logger = \n  winston.createLogger({\n    level: 'debug',\n    transports: [\n      new winston.transports.Console()\n    ]\n  }\n);\n\nconst user = {\n  key: \"aa0ceb\"\n};\n\nconst ldClient = LaunchDarkly.initialize(\n  'YOUR_CLIENT_SIDE_ID', \n  user,\n  {\"logger\": logger}\n);",
      "language": "javascript",
      "name": "Winston 3.x"
    }
  ]
}
[/block]
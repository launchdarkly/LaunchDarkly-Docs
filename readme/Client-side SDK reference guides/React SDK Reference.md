---
title: "React SDK Reference"
excerpt: ""
---
This reference guide documents all of the methods available in our client-side React SDK, and explains in detail how these methods work. If you want to dig even deeper, our SDKs are open source — head to the [React SDK code](https://github.com/launchdarkly/react-client-sdk) in our JavaScript SDK GitHub repository to look under the hood. The online [API docs](https://launchdarkly.github.io/react-client-sdk/) contain the programmatic definitions of every type and method. Additionally you can clone and run a [sample application](https://docs.launchdarkly.com/docs/react-sdk-reference#section-example-app) using this SDK.
[block:callout]
{
  "type": "info",
  "title": "React SDK is based on the JavaScript SDK",
  "body": "The React SDK builds on top of LaunchDarkly's JavaScript SDK to provide a better integration for use in React applications. As a result, much of the JavaScript SDK functionality is also available for use by the React SDK. For a complete client-side JavaScript SDK reference, please refer to our [documentation](https://docs.launchdarkly.com/docs/js-sdk-reference)."
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "This SDK uses the Context API, which requires React version 16.3.0 or later. Please note that you must use a newer version if you wish to additionally use the Hooks API -- see the \"Hooks\" section below for more information.",
  "title": "Requires React 16.3.0 or later"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Getting started"
}
[/block]
Building on top of our [Quickstart](doc:getting-started) guide, the following steps will get you started with using the LaunchDarkly SDK in your React code.

You can use either `npm` or `yarn` to install the React SDK:
[block:code]
{
  "codes": [
    {
      "code": "npm i --save launchdarkly-react-client-sdk",
      "language": "shell",
      "name": "Installing with npm"
    },
    {
      "code": "yarn add launchdarkly-react-client-sdk",
      "language": "shell",
      "name": "Installing with yarn"
    }
  ]
}
[/block]
Once the dependency is installed, you'll want to initialize the React SDK. To do this, you need your environment's client-side ID (available on your [account settings page](https://app.launchdarkly.com/settings#/projects)). Client-side IDs are not secret-- they can be safely exposed in your client-side code.

There are two ways you can initialize the React SDK. The first is using the `asyncWithLDProvider` function. The second is using the `withLDProvider` function. Both rely on React's `Context` API to make it easy for you to access your flags from any level of your component hierarchy. Both functions accept a [`ProviderConfig`](https://docs.launchdarkly.com/docs/react-sdk-reference#section-configuring-the-react-sdk) object used to configure the React SDK. Continue reading below for more information about these functions.

## `asyncWithLDProvider`
The `asyncWithLDProvider` function initializes the React SDK and returns a provider which is a React component. It is an async function.
[block:code]
{
  "codes": [
    {
      "code": "import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';\n\n(async () => {\n  const LDProvider = await asyncWithLDProvider({\n    clientSideID: 'your-client-side-id',\n    user: {\n      \"key\": \"aa0ceb\",\n      \"name\": \"Grace Hopper\",\n      \"email\": \"gracehopper@example.com\"\n \t  },\n\t  options: { /* ... */ }\n  });\n\n  render(\n    <LDProvider>\n      <YourApp />\n    </LDProvider>,\n    document.getElementById('reactDiv'),\n  );\n})();",
      "language": "javascript"
    }
  ]
}
[/block]
Once initialization is complete, your flags and the ldClient will be available at the start of your React app lifecycle. This will ensure your app does not flicker due to flag changes at startup time. 
[block:callout]
{
  "type": "warning",
  "title": "Delayed rendering",
  "body": "The asynchronous nature of the `asyncWithLDProvider` function means that the rendering of your React app will be delayed until initialization is completed. Typically this should take only a few milliseconds but can take up to 200 milliseconds. Alternatively you can use the [`withLDProvider`](https://docs.launchdarkly.com/docs/react-sdk-reference#section--withldprovider-) function if you prefer to render your app first and then process flag updates once rendering is complete."
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "The `asyncWithLDProvider` function uses the Hooks API, which requires React version 16.8.0 or later.",
  "title": "Requires React 16.8.0 or later"
}
[/block]
## `withLDProvider`
The `withLDProvider` function initializes the React SDK and wraps your root component in a `Context.Provider`:
[block:code]
{
  "codes": [
    {
      "code": "import { withLDProvider } from 'launchdarkly-react-client-sdk';\n\nexport default withLDProvider({ \n  clientSideID: 'your-client-side-id',\n  user: {\n    \"key\": \"aa0ceb\",\n    \"name\": \"Grace Hopper\",\n    \"email\": \"gracehopper@example.com\"\n  },\n  options: { /* ... */ }\n})(YourApp);",
      "language": "javascript",
      "name": ""
    }
  ]
}
[/block]
Customizing your client can be done via the `options` field. See the [JavaScript SDK reference](https://docs.launchdarkly.com/docs/js-sdk-reference#section-customizing-your-client) for all the available options.

Note that the React SDK automatically subscribes to flag change events; this is unlike the [JavaScript SDK Reference](doc:js-sdk-reference#section-subscribing-to-feature-flag-changes) where customers need to opt in to event listening. Consequently, in the React SDK, streaming mode is enabled by default. To disable streaming mode, specify a `streaming: false` attribute in your `options` object.

## `withLDConsumer`

The return value of `withLDConsumer` is a wrapper function that takes your component and returns a React component injected with `flags` & `ldClient` as props.
[block:code]
{
  "codes": [
    {
      "code": "import { withLDConsumer } from 'launchdarkly-react-client-sdk';\n\nconst Home = ({ flags, ldClient /*, ...otherProps */ }) => {\n  // You can call any of the methods from the JavaScript SDK\n  // ldClient.identify({...})\n  \n  return flags.devTestFlag ? <div>Flag on</div> : <div>Flag off</div>;\n};\n\nexport default withLDConsumer()(Home);",
      "language": "javascript",
      "name": ""
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Configuring the React SDK"
}
[/block]
The [`ProviderConfig`](https://launchdarkly.github.io/react-client-sdk/interfaces/providerconfig.html) object is used to configure the React SDK. The only mandatory property is the client-side id. All other properties are optional.

* `clientSideId` - This is your project and environment specific client-side id. This property is mandatory.

* `user` - A LaunchDarkly [user](http://docs.launchdarkly.com/docs/js-sdk-reference#section-users) object. This property is optional.

* `options` - LaunchDarkly JavaScript SDK initialization [options](https://docs.launchdarkly.com/docs/js-sdk-reference#section-customizing-your-client). This property is optional.

* `reactOptions` - This property is specific to the React SDK. You can use this option to [disable automatic camel casing](https://docs.launchdarkly.com/docs/react-sdk-reference#section-flag-keys) of flag keys when using the React SDK. This property is optional.

* `flags` - If specified, the React SDK will only request and subscribe for updates to these flags. The React SDK will request for and subscribe to all flags when this property is unspecified. This property is optional.
[block:api-header]
{
  "title": "Hooks"
}
[/block]
The React SDK offers two custom hooks which you can use as an alternative to `withLDConsumer`: `useFlags` and `useLDClient`.
[block:callout]
{
  "type": "warning",
  "title": "Requires React 16.8.0 or later",
  "body": "`useFlags` and `useLDClient` use the Hooks API, which requires React version 16.8.0 or later."
}
[/block]
`useFlags` is a custom hook which returns all feature flags. It uses the useContext primitive to access the LaunchDarkly context set up by `asyncWithLDProvider` or `withLDProvider`. You will still need to use the `asyncWithLDProvider` or the `withLDProvider` higher-order component at the root of your application to initialize the React SDK and populate the context with `LDClient` and your flags.

`useLDClient` is the second custom hook which returns the underlying LaunchDarkly JavaScript SDK client object. Like the `useFlags` custom hook, `useLDClient` also uses the useContext primitive to access the LaunchDarkly context set up by `asyncWithLDProvider` or `withLDProvider`. You will still need to use the `asyncWithLDProvider` or the `withLDProvider` higher-order component to initialize the React SDK to use this custom hook.
[block:code]
{
  "codes": [
    {
      "code": "import React from 'react';\nimport { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';\n\nconst HooksDemo = () => {\n  const { devTestFlag } = useFlags();\n  const ldClient = useLDClient();\n  \n  const onLoginSuccessful = () => ldClient.identify({ key: 'aa0ceb' });\n\n  return (\n    <div>{devTestFlag ? 'Flag on' : 'Flag off'}</div>\n  );\n};\n\nexport default HooksDemo;",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Users"
}
[/block]
All user-related functionality provided by the JavaScript SDK is equally accessible in the React SDK. Refer to the [users](https://docs.launchdarkly.com/docs/js-sdk-reference#section-users), [private user attributes](https://docs.launchdarkly.com/docs/js-sdk-reference#section-private-user-attributes), and [anonymous users](https://docs.launchdarkly.com/docs/js-sdk-reference#section-anonymous-users) sections of the JavaScript SDK reference guide for more information.
[block:api-header]
{
  "title": "Flag keys"
}
[/block]
LaunchDarkly primarily identifies feature flags by a key which must only contain alphanumeric characters, dots (`.`), underscores (`_`), and dashes (`-`). These keys are used across all of LaunchDarkly's APIs as well as in the SDKs to identify flags.

However, keys in this format are slightly inconvenient to access in JavaScript and React as they cannot be accessed with the dot notation. As a result, the React SDK automatically camel-cases all flag keys. A flag with key `dev-flag-test` would be accessible as `flags.devFlagTest`.

Automatically camel-casing flag keys poses some problems, though. For one thing, it is possible to induce a key collision if there are multiple LaunchDarkly flag keys which resolve to the same camel-cased key. For example, `dev-flag-test` and `dev.flag.test` would be considered unique keys on LaunchDarkly yet the React SDK would consider them to have the same camel-cased keys. Secondly, our [Git code references](doc:git-code-references) tool expects your source code to reference the exact key -- not a camel-cased equivalent -- and as a result, the tool does not support detecting references of keys that were automatically camel-cased.

To disable the SDK's automatic camel-casing feature, you can provide `asyncWithLDProvider` or `withLDProvider` with the `reactOptions.useCamelCaseFlagKeys` property as shown in the following example. This is supported in versions 2.13.0 and later of the React SDK.
[block:code]
{
  "codes": [
    {
      "code": "export default withLDProvider({ \n  clientSideID: 'your-client-side-id',\n  user: {\n    \"key\": \"aa0ceb\",\n    \"name\": \"Grace Hopper\",\n    \"email\": \"gracehopper@example.com\"\n  },\n  reactOptions: { \n    useCamelCaseFlagKeys: false\n  }\n})(App);",
      "language": "javascript"
    }
  ]
}
[/block]
With this configuration option in place, you would now access your `dev-flag-test` flag using bracket notation -- for example, `flag['dev-flag-test']`.
[block:api-header]
{
  "title": "Example App"
}
[/block]
Check the [example](https://github.com/launchdarkly/react-client-sdk/tree/master/examples/hoc) for a fully working single page app with react and react-router. You'll need to enter your `clientSideId` in the [client root app file](https://github.com/launchdarkly/react-client-sdk/blob/master/examples/hoc/src/universal/app.js) and create a flag with key `dev-test-flag` in your dashboard before running the example.
---
title: "Python SDK Reference"
excerpt: ""
---
This reference guide documents all of the methods available in our Python SDK, and explains in detail how these methods work. If you want to dig even deeper, our SDKs are open source-- head to our [Python SDK GitHub repository](https://github.com/launchdarkly/python-server-sdk) to look under the hood. The online [Python API docs](https://launchdarkly-python-sdk.readthedocs.io/) contain the programmatic definitions of every class and method. Additionally you can clone and run a [sample application](https://github.com/launchdarkly/hello-python) using this SDK.
## Getting started
Building on top of our [Quickstart](./getting-started) guide, the following steps will get you started with using the LaunchDarkly SDK in your Python application.

The first step is to install the LaunchDarkly SDK as a dependency in your application using your application's dependency manager. Refer to the [SDK releases page](https://github.com/launchdarkly/python-server-sdk/releases) to identify the latest version if you want to depend on a specific version.
[block:code]
{
  "codes": [
    {
      "code": "pip install launchdarkly-server-sdk",
      "language": "python"
    }
  ]
}
[/block]
Next you should import the LaunchDarkly client in your application code.
[block:code]
{
  "codes": [
    {
      "code": "import ldclient",
      "language": "python"
    }
  ]
}
[/block]
Once the SDK is installed and imported, you'll want to create a single, shared instance of `ldclient`. The `get()` function enforces the singleton pattern; you should only have one instance of the client in your application. You should specify your SDK key here so that your application will be authorized to connect to LaunchDarkly and for your application and environment.
[block:code]
{
  "codes": [
    {
      "code": "ldclient.set_sdk_key(\"YOUR_SDK_KEY\")\nld_client = ldclient.get()",
      "language": "python"
    }
  ]
}
[/block]
Using `ld_client`, you can check which variation a particular user should receive for a given feature flag.
[block:code]
{
  "codes": [
    {
      "code": "show_feature = ld_client.variation(\"your.flag.key\", {\"key\": \"user@test.com\"}, False)\nif show_feature:\n  # application code to show the feature\nelse:\n  # the code to run if the feature is off",
      "language": "python"
    }
  ]
}
[/block]
Lastly, when your application is about to terminate, shut down `ld_client`. This ensures that the client releases any resources it is using, and that any pending analytics events are delivered to LaunchDarkly. If your application quits without this shutdown step, you may not see your requests and users on the dashboard, because they are derived from analytics events. **This is something you only need to do once**.
[block:code]
{
  "codes": [
    {
      "code": "# shut down the client, since we're about to quit\nld_client.close()",
      "language": "python"
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
      "code": "ldclient.set_config(Config(sdk_key='YOUR_SDK_KEY', connect_timeout=5))",
      "language": "python"
    }
  ]
}
[/block]
The `Config` allows you to specify a variety of options. Most likely the defaults will work just fine. The complete list of customizable parameters is as follows:
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "h-3": "Default Value",
    "0-0": "`base_uri`",
    "1-0": "`events_uri`",
    "2-0": "`stream_uri`",
    "3-0": "`connect_timeout`",
    "4-0": "`read_timeout`",
    "5-0": "`events_upload_max_batch_size`",
    "7-0": "`events_max_pending`",
    "8-0": "`stream`",
    "9-0": "`send_events`",
    "10-0": "`offline`",
    "11-0": "`poll_interval`",
    "12-0": "`use_ldd`",
    "13-0": "`feature_store`",
    "14-0": "`feature_requester_class`",
    "15-0": "`event_consumer_class`",
    "16-0": "`update_processor_class`",
    "0-1": "`string`",
    "1-1": "`string`",
    "2-1": "`string`",
    "3-1": "`integer`",
    "4-1": "`integer`",
    "5-1": "`integer`",
    "7-1": "`integer`",
    "8-1": "`boolean`",
    "9-1": "`boolean`",
    "10-1": "`boolean`",
    "14-1": "`(str, Config, FeatureStore) -> FeatureRequester`",
    "15-1": "`(queue.Queue, str, Config) -> EventConsumer`",
    "11-1": "`integer`",
    "12-1": "`boolean`",
    "13-1": "`InMemoryFeatureStore` or `RedisFeatureStore`",
    "16-1": "`(str, Config, FeatureStore) -> UpdateProcessor`",
    "0-2": "Sets the base URL of the LaunchDarkly server for this configuration.",
    "1-2": "Set the events URL of the LaunchDarkly server for this configuration.",
    "2-2": "Sets the stream URL of the LaunchDarkly server for this configuration.",
    "8-2": "Boolean value which enables streaming.",
    "7-2": "Sets the capacity of the events buffer.",
    "5-2": "The maximum amount of events to be sent in a single request.",
    "4-2": "The timeout when reading data from feature flag requests.",
    "9-2": "Boolean value which enables sending events back to LaunchDarkly.",
    "10-2": "Set whether this client is offline.",
    "14-2": "A factory for a FeatureRequester implementation taking the sdk key and config",
    "15-2": "A factory for an EventConsumer implementation taking the event queue, sdk key, and config",
    "13-2": "Sets the feature flag store to be used by the client. By default, flags are stored in memory, with an option to use a [redis feature store](https://docs.launchdarkly.com/v2.0/docs/python-sdk-reference#redis).",
    "12-2": "If true, the SDK will rely on LDD for feature updates. See Deployment options for more details.",
    "11-2": "Set the polling interval (when streaming is disabled).",
    "3-2": "Set the connection timeout for the configuration.",
    "16-2": "A factory for an UpdateProcessor implementation taking the sdk key, config, and FeatureStore implementation",
    "10-3": "`False`",
    "14-3": "`None`",
    "15-3": "`None`",
    "0-3": "https://app.launchdarkly.com",
    "1-3": "https://events.launchdarkly.com",
    "2-3": "https://stream.launchdarkly.com",
    "3-3": "
1. seconds",
    "4-3": "
1. seconds",
    "5-3": "10000",
    "7-3": "10000",
    "8-3": "`True`",
    "9-3": "`True`",
    "11-3": "1",
    "12-3": "`False`",
    "13-3": "An `InMemoryFeatureStore`",
    "16-3": "`None`",
    "17-0": "`all_attributes_private`",
    "17-1": "`bool`",
    "18-0": "`all_attribute_names`",
    "18-1": "`string`",
    "18-2": "Must be a list of strings. The names of user attributes that should be marked as [Private user attributes](https://docs.launchdarkly.com/docs/private-user-attributes), and not sent to LaunchDarkly.",
    "17-2": "Whether all user attributes (except the user key) should be marked as [Private user attributes](https://docs.launchdarkly.com/docs/private-user-attributes), and not sent to LaunchDarkly.",
    "18-3": "`[]`",
    "17-3": "`False`",
    "19-0": "`user_keys_capacity`",
    "19-1": "`integer`",
    "19-2": "The number of user keys that the event processor can remember at any one time, so that duplicate user details will not be sent in analytics events.",
    "19-3": "`1000`",
    "20-0": "`user_keys_flush_interval`",
    "20-1": "`integer`",
    "20-2": "The interval (in seconds) at which the event processor will reset its set of known user keys.",
    "21-0": "`inline_users_in_events`",
    "21-1": "`bool`",
    "21-3": "`False`",
    "20-3": "`300`",
    "21-2": "Whether to include full user details in every analytics event.  By default, events will only include the user key, except for one \"index\" event that provides the full details for the user.",
    "6-0": "`flush_interval`",
    "6-1": "`integer`",
    "6-2": "The number of seconds in between flushes of the events buffer. Decreasing the flush interval means that the event buffer is less likely to reach capacity."
  },
  "cols": 4,
  "rows": 22
}
[/block]

## Users
Feature flag targeting and rollouts are all determined by the *user* you pass to your `Variation` calls. In our Python SDK, users are simply dictionaries. Here's an example:
[block:code]
{
  "codes": [
    {
      "code": "user = {\n  \"key\": \"aa0ceb\",\n  \"firstName\": \"Ernestina\",\n  \"lastName\": \"Evans\",\n  \"email\": \"ernestina@example.com\",\n  \"custom\": {\n    \"groups\": [\"Google\", \"Microsoft\"]\n  }\n}",
      "language": "python"
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
<Callout intent="info">
  <Callout.Title>A note on types</Callout.Title>
   <Callout.Description>Most of our built-in attributes (like names and e-mail addresses) expect string values. Custom attribute values can be strings, booleans (like True or False), numbers, or lists of strings, booleans or numbers. 
If you enter a custom value on our dashboard that looks like a number or a boolean, it'll be interpreted that way.</Callout.Description>
</Callout>
Custom attributes are one of the most powerful features of LaunchDarkly. They let you target users according to any data that you want to send to us-- organizations, groups, account plans-- anything you pass to us becomes available instantly on our dashboard.

## Private user attributes
You can optionally configure the Python SDK to treat some or all user attributes as [Private user attribute](https://docs.launchdarkly.com/v2.0/docs/private-user-attributes). Private user attributes can be used for targeting purposes, but are removed from the user data sent back to LaunchDarkly.

In the Python SDK there are two ways to define private attributes for the entire LaunchDarkly client:
* In the LaunchDarkly `config`, you can set `all_attributes_private` to true. If this is enabled, all user attributes (except the key) for all users are removed before the user is sent to LaunchDarkly.
* In the LaunchDarkly `config` object, you can define a list of `private_attribute_names`. If any user has a custom or built-in attribute named in this list, it will be removed before the user is sent to LaunchDarkly.

You can also define a set of `privateAttributeNames` on the user object itself. For example:
[block:code]
{
  "codes": [
    {
      "code": "user = {\n  \"key\": \"aa0ceb\",\n  \"email\": \"test@example.com\",\n  \"privateAttributeNames\": [\"email\"]\n}",
      "language": "python"
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
      "code": "user = {\"key\":\"aa0ceb\", \"anonymous\": True}",
      "language": "python"
    }
  ]
}
[/block]
You will still need to generate a unique key for anonymous users-- session IDs or UUIDs work best for this. Anonymous users still count toward your plan's MAU limit, so make sure you capture and reuse your anonymous user's key between requests.

Anonymous users work just like regular users, except that they won't appear on your Users page in LaunchDarkly. You also can't search for anonymous users on your Features page, and you can't search or autocomplete by anonymous user keys. This is actually a good thing-- it keeps anonymous users from polluting your Users page!
## Variation
The `variation` method determines which variation of a feature flag a user receives.
[block:code]
{
  "codes": [
    {
      "code": "ldclient.get().variation(\"your.feature.key\", user, False)",
      "language": "python"
    }
  ]
}
[/block]
`variation` calls take the feature flag key, an `LDUser`, and a default value. 

The default value will only be returned if an error is encountered-- for example, if the feature flag key doesn't exist or the user doesn't have a key specified. 

The `variation` call will automatically create a user in LaunchDarkly if a user with that user key doesn't exist already. There's no need to create users ahead of time (but if you do need to, take a look at Identify). 
## Track
The `track` method allows you to record actions your users take on your site. This lets you record events that take place on your server. In LaunchDarkly, you can tie these events to goals in A/B tests. Here's a simple example:
[block:code]
{
  "codes": [
    {
      "code": "ldclient.get().track(\"your-goal-key\", user)",
      "language": "python"
    }
  ]
}
[/block]
You can also attach an extra dictionary containing arbitrary data to your event:
[block:code]
{
  "codes": [
    {
      "code": "ldclient.get().track(\"Completed purchase\", user, {\"price\": 320})",
      "language": "python"
    }
  ]
}
[/block]

## Identify
The `identify` method creates or updates users on LaunchDarkly, making them available for targeting and autocomplete on the dashboard. In most cases, you won't need to call `identify`-- the `variation` call will automatically create users on the dashboard for you. `identify` can be useful if you want to pre-populate your dashboard before launching any features. 
[block:code]
{
  "codes": [
    {
      "code": "ldclient.get().identify(user)",
      "language": "python"
    }
  ]
}
[/block]

## All Flags

<Callout intent="alert">
  <Callout.Title>Creating users</Callout.Title>
   <Callout.Description>Note that unlike variation and identify calls, all_flags_state does not send events to LaunchDarkly. Thus, users are not created or updated in the LaunchDarkly dashboard.</Callout.Description>
</Callout>

The `all_flags_state` method captures the state of all feature flag keys with regard to a specific user. This includes their values, as well as other metadata.

This method can be useful for passing feature flags to your front-end. In particular, it can be used to provide bootstrap flag settings for our [JavaScript SDK](./js-sdk-reference).
[block:code]
{
  "codes": [
    {
      "code": "state = ldclient.get().all_flags_state(user)",
      "language": "python"
    }
  ]
}
[/block]

## Secure mode hash
The `SecureModeHash` method computes an HMAC signature of a user signed with the client's SDK key. If you're using our [JavaScript SDK](./js-sdk-reference) for client-side flags, this method generates the signature you need for secure mode.
[block:code]
{
  "codes": [
    {
      "code": "ldclient.get().secure_mode_hash(user)",
      "language": "python",
      "name": null
    }
  ]
}
[/block]

## Offline mode
In some situations, you might want avoid remote calls to LaunchDarkly and fall back to default values for your feature flags. For example, if your software is both cloud-hosted and distributed to customers to run on premise, it might make sense to fall back to defaults when running on premise. You can do this by setting `offline` mode in the client's `Config`.
[block:code]
{
  "codes": [
    {
      "code": "# Initialization:\nldclient.config = Config(offline = True)\nldclient.sdk_key = \"YOUR_SDK_KEY\"
ldclient.get().variation(\"any.feature.flag\", user, False) # will always return the default value (false)",
      "language": "python"
    }
  ]
}
[/block]

## Flush
Internally, the LaunchDarkly SDK keeps an event buffer for `variation`, `track`, and `identify` calls. These are flushed periodically in a background thread. In some situations (for example, if you're testing out the SDK in a REPL), you may want to manually call `flush` to process events immediately. Otherwise Python may close before flushing the event buffer and your user changes and tracks will not be lost.
[block:code]
{
  "codes": [
    {
      "code": "ldclient.get().flush()",
      "language": "python"
    }
  ]
}
[/block]
Note that the flush interval is configurable-- if you need to change the interval, you can do so when configuring your client instance.
## Close
Close safely shuts down the client instance and releases all resources associated with the client. In most long-running applications, you should not have to call close.
[block:code]
{
  "codes": [
    {
      "code": "ldclient.get().close()",
      "language": "python"
    }
  ]
}
[/block]

## Configuring uWSGI
The LaunchDarkly SDK is compatible with uWSGI. However, in uWSGI environments, the SDK requires the `enable-threads` option to be set.
## Logging
The Python SDK uses Python's built-in [logging library](https://docs.python.org/2/library/logging.html). All loggers are namespaced under `ldclient.util`. For an example configuration check out the [hello-python](https://github.com/launchdarkly/hello-python) project.

Be aware of two considerations when enabling the DEBUG log level:

1. Debug-level logs can be very verbose. It is not recommended that you turn on debug logging in high-volume environments.
2. Potentially sensitive information is logged including LaunchDarkly users created by you in your usage of this SDK.
## HTTPS proxy
Python's standard HTTP library provides a built-in HTTPS proxy. If the HTTPS_PROXY environment variable is present then the SDK will proxy all network requests through the URL provided.

How to set the HTTPS_PROXY environment variable on Mac/Linux systems:
[block:code]
{
  "codes": [
    {
      "code": "export HTTPS_PROXY=https://web-proxy.domain.com:8080",
      "language": "text",
      "name": "shell"
    }
  ]
}
[/block]
How to set the HTTPS_PROXY environment variable on Windows systems:
[block:code]
{
  "codes": [
    {
      "code": "set HTTPS_PROXY=https://web-proxy.domain.com:8080",
      "language": "text",
      "name": "CMD"
    }
  ]
}
[/block]
Or it can be set from within python:
[block:code]
{
  "codes": [
    {
      "code": "os.environ[\"https_proxy\"] = \"https://web-proxy.domain.com:8080\"",
      "language": "python"
    }
  ]
}
[/block]

## Using a database as a persistent store
The Python SDK supports Redis, Consul, or DynamoDB as a persistent store of feature flag configurations. For more information, see [Using a persistent feature store](./using-a-persistent-feature-store).
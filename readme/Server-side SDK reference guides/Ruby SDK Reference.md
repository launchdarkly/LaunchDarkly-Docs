---
title: "Ruby SDK Reference"
excerpt: ""
---
This reference guide documents all of the methods available in our Ruby SDK, and explains in detail how these methods work. If you want to dig even deeper, our SDKs are open source-- head to our [Ruby SDK GitHub repository](https://github.com/launchdarkly/ruby-server-sdk) to look under the hood. The online [Ruby API docs](https://www.rubydoc.info/gems/launchdarkly-server-sdk) contain the programmatic definitions of every class and method. Additionally you can clone and run a [sample application](https://github.com/launchdarkly/hello-ruby) using this SDK.
[block:callout]
{
  "type": "warning",
  "title": "RubyGem",
  "body": "Due to a bug in recent versions of RubyGems, versions 2.4.x (of RubyGems, not of Ruby) are not compatible with the LaunchDarkly Ruby SDK."
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Getting started"
}
[/block]
Building on top of our [Quickstart](doc:getting-started) guide, the following steps will get you started with using the LaunchDarkly SDK in your Ruby application.

The first step is to install the LaunchDarkly SDK as a dependency in your application using your application's dependency manager. Refer to the [SDK releases page](https://github.com/launchdarkly/ruby-server-sdk/releases) to identify the latest version if you want to depend on a specific version.

If you are using Bundler, you can add `gem "launchdarkly-server-sdk"` to your Gemfile and run `bundle install`. Otherwise, you can install the gem directly:
[block:code]
{
  "codes": [
    {
      "code": "gem install launchdarkly-server-sdk",
      "language": "ruby"
    }
  ]
}
[/block]
Next you should import the LaunchDarkly client in your application code. (This step may not be necessary if you are using a framework that automatically loads all dependencies, as Rails does.)
[block:code]
{
  "codes": [
    {
      "code": "require 'ldclient-rb'",
      "language": "ruby"
    }
  ]
}
[/block]
Once the SDK is installed and imported, you'll want to create a single, shared instance of `LDClient`. You should specify your SDK key here so that your application will be authorized to connect to LaunchDarkly and for your application and environment.
[block:code]
{
  "codes": [
    {
      "code": "ld_client = LaunchDarkly::LDClient.new(\"YOUR_SDK_KEY\")",
      "language": "ruby"
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
Using `ld_client`, you can check which variation a particular user should receive for a given feature flag.
[block:code]
{
  "codes": [
    {
      "code": "show_feature = ld_client.variation(\"your.flag.key\", {key: \"user@test.com\"}, false)\nif show_feature\n  # application code to show the feature\nelse\n  # the code to run if the feature is off",
      "language": "ruby"
    }
  ]
}
[/block]
Lastly, when your application is about to terminate, shut down `ld_client`. This ensures that the client releases any resources it is using, and that any pending analytics events are delivered to LaunchDarkly. If your application quits without this shutdown step, you may not see your requests and users on the dashboard, because they are derived from analytics events. **This is something you only need to do once**.
[block:code]
{
  "codes": [
    {
      "code": "# shut down the client, since we're about to quit\nld_client.close",
      "language": "ruby"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Initializing LDClient in a Rails Application"
}
[/block]
To use LaunchDarkly in a Rails application, initialize the client in `config/initializers/launchdarkly.rb`:
[block:code]
{
  "codes": [
    {
      "code": "Rails.configuration.ld_client = LaunchDarkly::LDClient.new(\"your_sdk_key\")",
      "language": "ruby"
    }
  ]
}
[/block]
To use LaunchDarkly with the Rails application preloader [Spring](https://github.com/rails/spring), we recommend using an `after_fork` callback in the config/spring.rb file:
[block:code]
{
  "codes": [
    {
      "code": "Spring.after_fork do\n  Rails.configuration.ld_client = LaunchDarkly::LDClient.new('SDK KEY')\nend",
      "language": "ruby",
      "name": "Rails - Spring initialization"
    }
  ]
}
[/block]
Similarly, with [Unicorn](https://bogomips.org/unicorn/), you'll need to specify an `after_fork` hook in your unicorn.rb config file:
[block:code]
{
  "codes": [
    {
      "code": "after_fork do |server,worker|\n  Rails.configuration.ld_client = LaunchDarkly::LDClient.new('SDK KEY')\nend\n",
      "language": "ruby",
      "name": "Ruby - Unicorn initialization"
    }
  ]
}
[/block]
If you're using the [Puma](https://github.com/puma/puma) web server, we recommend initializing the client in `on_worker_boot`: 
[block:code]
{
  "codes": [
    {
      "code": "on_worker_boot do\n  Rails.configuration.ld_client = LaunchDarkly::LDClient.new('SDK KEY')\nend",
      "language": "ruby",
      "name": "Ruby - Puma Initialization"
    }
  ]
}
[/block]
If you're using the [Passenger](https://www.phusionpassenger.com/library/indepth/ruby/spawn_methods/#smart-spawning-hooks) web server, we recommend initializing the client in `config.ru`, or from any code called while loading `config.ru`: 
[block:code]
{
  "codes": [
    {
      "code": "if defined?(PhusionPassenger)\n  PhusionPassenger.on_event(:starting_worker_process) do |forked|\n    Rails.configuration.ld_client = LaunchDarkly::LDClient.new('SDK KEY')\n  end\nend",
      "language": "ruby"
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
You can also customize the behavior of the client by creating a custom configuration object:
[block:code]
{
  "codes": [
    {
      "code": "config = LaunchDarkly::Config.new({connect_timeout: 1, read_timeout: 1})\nld_client = LaunchDarkly::LDClient.new(\"YOUR_SDK_KEY\", config)",
      "language": "ruby"
    }
  ]
}
[/block]
The client constructor takes a configuration object as an optional parameter. In this example, we've set the connection timeout to LaunchDarkly to 1 second, and the read timeout to 2 seconds. The complete list of  customizable parameters is as follows:
[block:parameters]
{
  "data": {
    "h-0": "Options",
    "h-1": "Type",
    "h-2": "Description",
    "h-3": "Default",
    "0-0": "`logger`",
    "0-1": "`logger`",
    "0-2": "A logger to use for messages from the LaunchDarkly client.",
    "7-0": "`connect_timeout`",
    "7-1": "`int`",
    "7-2": "Must be a number, in seconds, and controls the connection timeout to LaunchDarkly",
    "7-3": "2 seconds",
    "0-3": "Rails logger in a Rails environment, or stdout otherwise.",
    "1-0": "`base_uri`",
    "1-1": "`string`",
    "1-3": "https://app.launchdarkly.com",
    "1-2": "The base URL for the LaunchDarkly server.",
    "2-0": "`stream_uri`",
    "2-1": "`string`",
    "2-3": "https://stream.launchdarkly.com",
    "2-2": "The stream URL for the LaunchDarkly streaming events server.",
    "3-0": "`events_uri`",
    "3-1": "`string`",
    "3-2": "The events URL for the LaunchDarkly events server.",
    "3-3": "https://events.launchdarkly.com",
    "4-0": "`capacity`",
    "4-1": "`int`",
    "4-2": "The capacity of the events buffer. The client buffers up to this many events in memory before flushing. If the capacity is exceeded before the buffer is flushed, events will be discarded.",
    "4-3": "1000 events",
    "5-0": "`flush_interval`",
    "5-1": "`float`",
    "5-2": "The number of seconds between flushes of the event buffer.",
    "5-3": "30 seconds",
    "6-0": "`read_timeout`",
    "6-1": "`float`",
    "6-2": "The read timeout for network connections in seconds.",
    "6-3": "10 seconds",
    "8-0": "`cache_store`",
    "8-1": "`object`",
    "8-2": "A cache store for the Faraday HTTP caching library.",
    "8-3": "Rails cache in a Rails environment, or a thread-safe in-memory store otherwise.",
    "9-0": "`use_ldd`",
    "9-1": "`bool`",
    "9-2": "Whether you are using the LaunchDarkly relay proxy in daemon mode. In this configuration, the client will not use a streaming connection to listen for updates, but instead will get feature state from a Redis instance. The `stream` `poll_interval` options will be ignored if this option is set to true.",
    "9-3": "`false`",
    "10-0": "`offline`",
    "10-1": "`bool`",
    "10-2": "Whether the client should be initialized in offline mode. In offline mode, default values are returned for all flags and no remote network requests are made.",
    "10-3": "`false`",
    "11-0": "`poll_interval`",
    "11-1": "`float`",
    "11-2": "The number of seconds between polls for flag updates if streaming is off.",
    "11-3": "1 second",
    "12-0": "`stream`",
    "12-1": "`bool`",
    "12-2": "Whether or not the streaming API should be used to receive flag updates.",
    "12-3": "`true`",
    "13-0": "`send_events`",
    "13-1": "`bool`",
    "13-2": "Whether or not to send events back to LaunchDarkly. This differs from `offline` in that it affects only the sending of client-side events, not streaming or polling for events from the server.",
    "13-3": "`true`",
    "14-0": "`user_keys_capacity`",
    "14-1": "`integer`",
    "14-2": "The number of user keys that the event processor can remember at any one time, so that duplicate user details will not be sent in analytics events.",
    "14-3": "`1000`",
    "15-0": "`user_keys_flush_interval`",
    "15-1": "`integer`",
    "15-2": "The interval (in seconds) at which the event processor will reset its set of known user keys.",
    "15-3": "`300`",
    "16-0": "`inline_users_in_events`",
    "16-1": "`bool`",
    "16-2": "Whether to include full user details in every analytics event.  By default, events will only include the user key, except for one \"index\" event that provides the full details for the user.",
    "16-3": "false"
  },
  "cols": 4,
  "rows": 17
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Users"
}
[/block]
Feature flag targeting and rollouts are all determined by the *user* you pass to your `variation` calls. In our Ruby SDK, users are simply hashes. Here's an example:
[block:code]
{
  "codes": [
    {
      "code": "user = {\n  key: \"aa0ceb\",\n  firstName: \"Ernestina\",\n  lastName: \"Evans\",\n  email: \"ernestina@example.com\",\n  custom: {\n    groups: [\"Google\", \"Microsoft\"]\n  }\n}",
      "language": "ruby"
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
  "title": "A note on attribute keys",
  "body": "All user attribute keys (both built-in and custom attributes) must be symbols and not strings."
}
[/block]

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
  "title": "Private User Attributes"
}
[/block]
You can optionally configure the Ruby SDK to treat some or all user attributes as [Private user attributes](https://docs.launchdarkly.com/v2.0/docs/private-user-attributes). Private user attributes can be used for targeting purposes, but are removed from the user data sent back to LaunchDarkly.

In the Ruby SDK there are two ways to define private attributes for the entire LaunchDarkly client:
- In the LaunchDarkly `config`, you can set `all_attributes_private` to true. If this is enabled, all user attributes (except the key) for all users are removed before the user is sent to LaunchDarkly.
- In the LaunchDarkly config object, you can define a list of `private_attribute_names`. If any user has a custom or built-in attribute named in this list, it will be removed before the user is sent to LaunchDarkly.

You can also define a set of `privateAttributeNames` on the user object itself. For example:
[block:code]
{
  "codes": [
    {
      "code": "user = {\n  key: \"aa0ceb\",\n  firstName: \"Ernestina\",\n  lastName: \"Evans\",\n  email: \"ernestina@example.com\",\n  custom: {\n    groups: [\"Google\", \"Microsoft\"]\n  },\n  privateAttributeNames: ['email']\n}",
      "language": "ruby"
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
      "code": "user = {key: \"aa0ceb\", anonymous: true}",
      "language": "ruby"
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
      "code": "value = ld_client.variation(\"your.feature.key\", user, false)",
      "language": "ruby"
    }
  ]
}
[/block]
`variation` calls take the feature flag key, a user, and a default value.

The default value will only be returned if an error is encountered-- for example, if the feature flag key doesn't exist or the user doesn't have a key specified. 

The `variation` call will automatically create a user in LaunchDarkly if a user with that user key doesn't exist already. There's no need to create users ahead of time (but if you do need to, take a look at Identify). 
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
      "code": "ld_client.track(\"your-goal-key\", user)",
      "language": "ruby"
    }
  ]
}
[/block]
You can also attach an extra hash containing arbitrary data to your event:
[block:code]
{
  "codes": [
    {
      "code": "ld_client.track(\"Completed purchase\", user, {price: 320})",
      "language": "ruby"
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
      "code": "ld_client.identify(user)",
      "language": "ruby"
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
  "body": "Note that unlike variation and identify calls, all_flags_state does not send events to LaunchDarkly. Thus, users are not created or updated in the LaunchDarkly dashboard.",
  "title": "Creating users"
}
[/block]
The `all_flags_state` method captures the state of all feature flag keys with regard to a specific user. This includes their values, as well as other metadata.

This method can be useful for passing feature flags to your front-end. In particular, it can be used to provide bootstrap flag settings for our [JavaScript SDK](doc:js-sdk-reference).
[block:code]
{
  "codes": [
    {
      "code": "state = ld_client.all_flags_state(user)",
      "language": "ruby"
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
The `secure_mode_hash` method computes an HMAC signature of a user signed with the client's SDK key. If you're using our [JavaScript SDK](doc:js-sdk-reference) for client-side flags, this method generates the signature you need for secure mode.
[block:code]
{
  "codes": [
    {
      "code": "ld_client.secure_mode_hash(user)",
      "language": "ruby"
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
      "code": "ld_client.flush",
      "language": "ruby"
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
In some situations, you might want to stop making remote calls to LaunchDarkly and fall back to default values for your feature flags. For example, if your software is both cloud-hosted and distributed to customers to run on premise, it might make sense to fall back to defaults when running on premise. Offline mode lets you do this easily. 
[block:code]
{
  "codes": [
    {
      "code": "config = LaunchDarkly::Config.new({offline: true})\nld_client = LaunchDarkly::LDClient.new(\"YOUR_SDK_KEY\", config)\nld_client.variation(\"any.feature.flag\", user, false) # will always return the default value (false)\n\n",
      "language": "ruby"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Proxy Configuration"
}
[/block]
The Ruby SDK uses Faraday and Socketry to handle its network traffic. Both of these libraries provide built-in support for the use of an HTTPS proxy. If the `HTTPS_PROXY` environment variable is present then the SDK will proxy all network requests through the URL provided.

Alternatively the `:proxy` configuration option can be passed.
[block:code]
{
  "codes": [
    {
      "code": "config = LaunchDarkly::Config.new({proxy: \"https://user:pass@hostname\"})",
      "language": "ruby"
    }
  ]
}
[/block]
The `HTTP_PROXY` environment variable is not used because all LaunchDarkly services require HTTPS.
[block:api-header]
{
  "type": "basic",
  "title": "Close"
}
[/block]
Close safely shuts down the client instance and releases all resources associated with the client. In most long-running applications, you should not have to call close.
[block:code]
{
  "codes": [
    {
      "code": "ld_client.close",
      "language": "ruby"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Logging"
}
[/block]
The Ruby SDK uses Ruby's built-in [Logger class](https://ruby-doc.org/stdlib-2.4.0/libdoc/logger/rdoc/Logger.html). All loggers are namespaced under `[LDClient]`. A custom logger may be passed to the SDK via the configurable `logger` property:
[block:code]
{
  "codes": [
    {
      "code": "log = ::Logger.new($stdout)\nlog.level = ::Logger::DEBUG\nconfig = LaunchDarkly::Config.new({logger: log})\nclient = LaunchDarkly::LDClient.new(\"YOUR_SDK_KEY\", config)",
      "language": "ruby"
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
Feature flag data can be kept in a persistent store using Redis, DynamoDB, or Consul. These adapters are implemented in the `LaunchDarkly::Integrations::Redis`, `LaunchDarkly::Integrations::DynamoDB`, and `LaunchDarkly::Integrations::Consul` modules; to use them, call the `new_feature_store` method in the module, and put the returned object in the `feature_store` property of your client configuration.

See the [API documentation](https://www.rubydoc.info/gems/launchdarkly-server-sdk/LaunchDarkly/Integrations) and ["Using a persistent feature store"](doc:using-a-persistent-feature-store) for more information.
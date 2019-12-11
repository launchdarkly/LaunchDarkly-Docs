---
title: "Python Twisted SDK Reference"
excerpt: ""
---
This reference guide documents all of the methods available in our Python Twisted SDK, and explains in detail how these methods work. If you want to dig even deeper, our SDKs are open source-- head to our [Python SDK GitHub repository](https://github.com/launchdarkly/python-client) to look under the hood. 
[block:api-header]
{
  "type": "basic",
  "title": "Getting started"
}
[/block]
If you haven't taken a look at our [Quickstart](doc:getting-started) guide yet, we recommend starting there to see how install our SDK into your Python application. Support for the Twisted framework is defined as an optional dependency, so you will need to install `ldclient-py[twisted]`:
[block:code]
{
  "codes": [
    {
      "code": "pip install ldclient-py[twisted]",
      "language": "text"
    }
  ]
}
[/block]
Once the SDK is installed, you'll want to create a single, shared instance of the LaunchDarkly client:
[block:code]
{
  "codes": [
    {
      "code": "ld_client = TwistedLDClient(\"YOUR_SDK_KEY\")",
      "language": "python"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "TwistedLDClient must be a singleton",
  "body": "It's important to make this a singleton-- internally, the client instance maintains internal state that allows us to serve feature flags without making any remote requests. **Be sure that you're not instantiating a new client with every request.**"
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
      "code": "config = TwistedConfig('https://app.launchdarkly.com', 1, 2)\nld_client = TwistedLDClient(\"YOUR_SDK_KEY\", config)",
      "language": "python"
    }
  ]
}
[/block]
The `TwistedConfig` allows you to specify a custom base URL (you probably don't need to do this), as well as customize timeout parameters. In this example, we've set the connection timeout to LaunchDarkly to 1 second, and the read timeout to 2 seconds.
[block:api-header]
{
  "type": "basic",
  "title": "Users"
}
[/block]
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

* `ip`: Must be an IP address. If you provide an IP, LaunchDarkly will use a geolocation service to automatically infer a `country` for the user (unless you've already specified one).
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
  "body": "Most of our built-in attributes (like names and e-mail addresses) expect string values. Custom attribute values can be strings, booleans (like True or False), numbers, or lists of strings, booleans or numbers. \n\nIf you enter a custom value on our dashboard that looks like a number or a boolean, it'll be interpreted that way."
}
[/block]
Custom attributes are one of the most powerful features of LaunchDarkly. They let you target users according to any data that you want to send to us-- organizations, groups, account plans-- anything you pass to us becomes available instantly on our dashboard.
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
      "code": "user = {\"key\":\"aa0ceb\", \"anonymous\": True}",
      "language": "python"
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
      "code": "ld_client.variation(\"your.feature.key\", user, False)",
      "language": "python"
    }
  ]
}
[/block]
`variation` calls take the feature flag key, an `LDUser`, and a default value. 

The default value will only be returned if an error is encountered-- for example, if the feature flag key doesn't exist or the user doesn't have a key specified. 

The `variation` call will automatically create a user in LaunchDarkly if a user with that user key doesn't exist already. There's no need to create users ahead of time (but if you do need to, take a look at Identify). 

Note that the Twisted LDClient implementation of `variation` returns a [`Deferred`](https://twistedmatrix.com/documents/14.0.1/core/howto/defer.html).
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
      "code": "ld_client.track(\"Signed up\", user)",
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
      "code": "ld_client.track(\"Completed purchase\", {\"price\": 320})",
      "language": "python"
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
      "language": "python"
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
  "body": "Note that unlike variation and identify calls, all_flags does not send events to LaunchDarkly. Thus, users are not created or updated in the LaunchDarkly dashboard.",
  "title": "Creating users"
}
[/block]
The `all_flags` method produces a dictionary of feature flag keys to their values for a specific user.

This method can be useful for passing feature flags to your front-end. In particular, it can be used to provide bootstrap flag settings for our [JavaScript SDK](doc:js-sdk-reference).
[block:code]
{
  "codes": [
    {
      "code": "ld_client.all_flags()",
      "language": "python"
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
      "language": "python"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Offline mode"
}
[/block]
In some situations, you might want to stop making remote calls to LaunchDarkly and fall back to default values for your feature flags. For example, if your software is both cloud-hosted and distributed to customers to run on premise, it might make sense to fall back to defaults when running on premise. You can do this by setting `offline` mode in the client's `Configuration`.
[block:code]
{
  "codes": [
    {
      "code": "config = Config(offline = True)\nld_client = LDClient(\"YOUR_SDK_KEY\", config)\nld_client.variation(\"any.feature.flag\", user, False) # will always return the default value (false)",
      "language": "python"
    }
  ]
}
[/block]
You can bring LaunchDarkly back online by calling `set_online`.
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
      "code": "ld_client.flush()",
      "language": "python"
    }
  ]
}
[/block]
Note that the flush interval is configurable-- if you need to change the interval, you can do so when configuring your client instance.

Note that the Twisted LDClient implementation of `flush` returns a [`Deferred`](https://twistedmatrix.com/documents/14.0.1/core/howto/defer.html).
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
      "code": "ld_client.close()",
      "language": "python"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Configuring uWSGI"
}
[/block]
The LaunchDarkly SDK is compatible with uWSGI. However, in uWSGI environments, the SDK requires the `enable-threads` option to be set. If `enable-threads` is not set, flag request events will not be sent back to LaunchDarkly, which will impact autocomplete functionality on the dashboard as well as A/B testing functionality.
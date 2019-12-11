---
title: "Migration guide"
excerpt: ""
---
[block:callout]
{
  "type": "info",
  "title": "Migrating from LaunchDarkly v1 to v2",
  "body": "On September 1st, 2016, we released a series of exciting new LaunchDarkly [features](https://launchdarkly.com/features/), including support for multivariate feature flags, custom targeting rules, webhooks, and real-time JavaScript flag updates.  To take advantage of the new features, you must update all of your LaunchDarkly SDKs to the latest released versions.  \n\nOnce your SDKs are updated, email us at <a href=\"mailto:support@launchdarkly.com?Subject=Version%202%20Migration\">support@launchdarkly.com</a> and an engineer will help you complete the migration."
}
[/block]
# LaunchDarkly Migration Guide

To take advantage of our new features, you'll need to update all of your LaunchDarkly SDKs to the latest released versions. You must do this across all of your environments. Behind the scenes, all of your current flag settings will be maintained, so you won't see any change in behavior after the update.

## New Features

* [Multivariate Feature Flags](http://blog.launchdarkly.com/launched-multivariate-feature-flags/)
* [Custom Rules](http://blog.launchdarkly.com/launched-custom-targeting-rules/)
* [Prerequisites](http://blog.launchdarkly.com/launched-prerequisites-for-flag-dependencies/) 
* [Bulk User Targeting](http://blog.launchdarkly.com/launched-bulk-user-targeting/)
* [Webhooks](http://docs.launchdarkly.com/docs/webhooks)
* [Slack/HipChat Integrations](http://blog.launchdarkly.com/launched-slack-and-hipchat-integrations/)

## Server-side SDKs

All of our server-side SDKs have received a major version update, but for the most part, the changes are backwards compatible. The most obvious change is that we've renamed the `toggle` method to `variation`. In the typed languages, you'll see `boolVariation`, `stringVariation`, etc. We've kept the old `toggle` method around, but deprecated it to simplify the transition for you.

### Changelogs

To help with the update, we've added a `CHANGELOG` file to each of our open-source SDKs. Here's the link for each SDK and the minimum version that supports the v2 features:

* [Python](https://github.com/launchdarkly/python-client/blob/master/CHANGELOG.md) 2.0.0
* [Ruby](https://github.com/launchdarkly/ruby-client/blob/master/CHANGELOG.md) 2.0.1
* [Node.js](https://github.com/launchdarkly/node-client/blob/master/CHANGELOG.md) 3.0.0
* [Go ](https://github.com/launchdarkly/go-client/blob/v2/CHANGELOG.md) gopkg.in/launchdarkly/go-client.v2
* [Java](https://github.com/launchdarkly/java-client/blob/master/CHANGELOG.md) 2.0.0
* [.NET](https://github.com/launchdarkly/.net-client/blob/master/CHANGELOG.md) 2.0.0
* [PHP](https://github.com/launchdarkly/php-client/blob/master/CHANGELOG.md) 2.0.0
* [Android](https://github.com/launchdarkly/android-client/blob/master/CHANGELOG.md) 1.0.1
* [iOS](https://github.com/launchdarkly/ios-client/blob/master/CHANGELOG.md) 2.0.0

## Redis cache / LD Daemon

If you're using Redis caching, or the [LD Daemon](https://github.com/launchdarkly/ld-daemon), change the Redis key prefix in your Redis store configuration when you update your SDK. For example, in Java, the [RedisFeatureStoreBuilder](https://github.com/launchdarkly/java-client/blob/master/src/main/java/com/launchdarkly/client/RedisFeatureStoreBuilder.java#L117) allows you to prefix all of your Redis keys with a sentinel string. When you upgrade your SDK, append a string like `v2` to the key prefix so that your Redis store will use a new set of keys after the update.  

This step is necessary because the data model for our feature flags has changed, and the previous flags stored in Redis are not compatible with the new model.

## Mobile SDKs

We've released a new version of our iOS SDK. You can find the changelog [here](https://github.com/launchdarkly/ios-client/blob/master/CHANGELOG.md). 2.0.0 is the minimum version that supports v2 functionality. As with our server-side SDKs, the main change is that we've renamed the `toggle` method.

All versions of the Android SDK support v2 functionality.

We've ensured that older SDKs in the field will continue to work once you've been updated, so there's no need to worry about your app breaking in the field when you update. 

However, the older SDKs do not support multivariate flags. You'll need to release a new version of your app with our latest SDK to take advantage of multivariate flags.

## Client-side JavaScript SDKs

We've changed the way we support client-side JavaScript. Instead of a dynamically loaded snippet, we've released the SDK as a standalone NPM module. The new SDK offers many new features, including:

* Support for local storage caching
* Support for bootstrapping feature flag values from your backend server
* Support for real-time feature flag updates

Take a look at our new [client-side JavaScript documentation](http://docs.launchdarkly.com/docs/js-sdk-reference) for more details. You must update to our new client-side SDK (and stop using the old snippet) in order for us to update your account.

## Custom REST API integrations

If you've built a custom integration on top of our REST API, you'll need to update it to call our [new v2 REST API](http://apidocs.launchdarkly.com/). This API uses a new authentication mechanism (we no longer allow you to authenticate with SDK keys). If you have any questions about how to update your custom integration, we'd be happy to help.
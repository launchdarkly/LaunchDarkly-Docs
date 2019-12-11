---
title: "Getting started (booth demos)"
excerpt: ""
---
Setting up LaunchDarkly to control your first feature flag takes only a few minutes!

You can start using the LaunchDarkly client as soon as it is added to your project.

Don't see an example for your tech stack? No worries! LaunchDarkly supports more technologies than what's listed here in these examples. See the bottom of this page for a complete list.
[block:code]
{
  "codes": [
    {
      "code": "// Configure the LaunchDarkly client with your SDK key\nLDClient ldClient = new LDClient(YOUR_SDK_KEY);\n\n// Given a particular feature flag key, check which variation a user should receive\nLDUser user = new LDUser(\"user@test.com\");\nboolean showFeature = ldClient.boolVariation(\"your.feature.key\", user, false);\nif (showFeature) {\n  // application code to show the feature \n}\nelse {\n  // the code to run if the feature is off\n}",
      "language": "java",
      "name": "Java"
    },
    {
      "code": "# Configure the LaunchDarkly client with your SDK key\nldclient.set_sdk_key(\"YOUR_SDK_KEY\")\nld_client = ldclient.get()\n\n# Given a particular feature flag key, check which variation a user should receive\nshow_feature = ldclient.variation(\"your.flag.key\", {\"key\": \"user@test.com\"}, False)\nif show_feature:\n    # application code to show the feature\nelse:\n    # the code to run if the feature is off",
      "language": "python",
      "name": null
    },
    {
      "code": "# Configure the LaunchDarkly client with your SDK key\nld_client = LaunchDarkly::LDClient.new(YOUR_SDK_KEY)\n\n# Given a particular feature flag key, check which variation a user should receive\nshow_feature = ld_client.variation(\"your.flag.key\", {:key => \"user@test.com\"}, false)\nif show_feature\n    # application code to show the feature\nelse\n    # the code to run if the feature is off",
      "language": "ruby"
    },
    {
      "code": "// Configure the LaunchDarkly client with your SDK key\nld_client := ld.MakeClient(YOUR_SDK_KEY, 5*time.Second)\n\n// Given a particular feature flag key, check which variation a user should receive\nkey := \"user@test.com\"\nshow_feature := ld_client.BoolVariation(\"your.flag.key\", ld.NewUser(key), false)\nif (show_feature) {\n    // application code to show the feature\n} else {\n    // the code to run if the feature is off \n}",
      "language": "go"
    },
    {
      "code": "// Configure the LaunchDarkly client with your SDK key\nldclient = LaunchDarkly.init(YOUR_SDK_KEY)\n\n// Given a particular feature flag key, check which variation a user should receive\nldclient.once('ready', function() {\n  ldclient.variation(\"your.flag.key\", {\"key\": \"user@test.com\"}, false,\n    function(err, showFeature) {\n      if (showFeature) {\n        // application code to show the feature\n      } else {\n        // the code to run if the feature is off\n      }\n    });\n});",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "# Configure the LaunchDarkly client with your SDK key\n$client = new LaunchDarkly\\LDClient(YOUR_SDK_KEY);\n\n# Given a particular feature flag key, check which variation a user should receive\n$user = new LaunchDarkly\\LDUser(\"user@test.com\");\nif ($client->variation(\"your.flag.key\", $user)) {\n    # application code to show the feature\n} else {\n    # the code to run if the feature is off\n}",
      "language": "php"
    },
    {
      "code": "// Configure the LaunchDarkly client with your SDK key\nLdClient ldClient = new LdClient(\"YOUR_SDK_KEY\");\n\n// Given a particular feature flag key, check which variation a user should receive\nUser user = User.WithKey(username);\nbool showFeature = ldClient.BoolVariation(\"your.feature.key\", user, false);\nif (showFeature) {\n  // application code to show the feature \n}\nelse {\n  // the code to run if the feature is off\n}",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "// Configure the LaunchDarkly client with your SDK key\nLDConfig *config = [[LDConfig alloc] initWithMobileKey: @\"YOUR_MOBILE_KEY\"];\n\n// Configure the LaunchDarkly client for the current iOS user\nLDUserBuilder *user = [[LDUserBuilder alloc] init];\nuser.key = @\"aa0ceb\";\n[[LDClient sharedInstance] start:config withUserBuilder:user];\n\n// Given a particular feature flag key, check which variation the user should receive\nBOOL showFeature = [[LDClient sharedInstance] boolVariation:@\"YOUR_FLAG_KEY\" fallback:NO];\nif (showFeature) {\n  // application code to show the feature \n} else {\n  // the code to run if the feature is off\n}",
      "language": "objectivec",
      "name": "iOS"
    },
    {
      "code": "// Configure the LaunchDarkly client with your SDK key\nLDConfig ldConfig = new LDConfig.Builder().setMobileKey(\"YOUR_MOBILE_KEY\").build();\n\n// Configure the LaunchDarkly client for the current Android user\nLDUser user = new LDUser.Builder(\"user key\")\n        .email(\"fake@example.com\")\n        .build();\nLDClient client = LDClient.init(getApplication(), ldConfig, user, 5);\n\n// Given a particular feature flag key, check which variation the user should receive\nif (client.boolVariation(FLAG_KEY, false)) {\n  // application code to show the feature \n} else {\n  // the code to run if the feature is off\n}",
      "language": "java",
      "name": "Android"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Want to know more?"
}
[/block]
Explore the following SDK reference guides for specific details about how to use LaunchDarkly with your tech stack.

Server-side SDKs:

* [.NET](doc:dotnet-sdk-reference)
* [C/C++ (server-side)](doc:c-server-sdk-reference)
* [Go](doc:go-sdk-reference)
* [Java](doc:java-sdk-reference)
* [Node.js (server-side)](doc:node-sdk-reference)
* [PHP](doc:php-sdk-reference)
* [Python](doc:python-sdk-reference)
* [Ruby](doc:ruby-sdk-reference)

Client-side SDKs:

* [Android](doc:android-sdk-reference)
* [C/C++ (client-side)](doc:c-sdk-reference)
* [Electron](doc:electron-sdk-reference)
* [iOS (Objective-C)](doc:ios-objc-sdk-reference)
* [iOS (Swift)](doc:ios-sdk-reference)
* [JavaScript](doc:js-sdk-reference)
* [Node.js (client-side)](doc:node-client-sdk-reference)
* [React](doc:react-sdk-reference)
* [React Native](doc:react-native-sdk-reference)
* [Roku](doc:roku-sdk-reference) 
* [Xamarin](doc:xamarin-sdk-reference)
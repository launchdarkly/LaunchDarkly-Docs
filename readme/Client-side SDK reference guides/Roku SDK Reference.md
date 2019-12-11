---
title: "Roku SDK Reference"
excerpt: ""
---
This reference guide documents basic usage of our Roku SDK, and explains in detail how features work. If you want to dig even deeper, our SDKs are open source-- head to our [Roku Client Github repository](https://github.com/launchdarkly/roku-client-sdk) to look under the hood. The complete API reference is available here. Additionally you can clone and run a [sample application](https://github.com/launchdarkly/hello-roku) using this SDK.

The Roku SDK is written in BrightScript.
[block:api-header]
{
  "title": "Getting started"
}
[/block]
Building on top of our [Quickstart guide](https://docs.launchdarkly.com/docs/getting-started), the following steps will get you started with using the LaunchDarkly SDK in your Roku Application.

We provide releases on [GitHub](https://github.com/launchdarkly/roku-client-sdk/releases). Download the latest release and extract the provided files into your source tree. You may need to rename the paths inside `LaunchDarklyTask.xml` depending on your project structure.

For SceneGraph usage add a `LaunchDarklyTask` node to your scene and then:

[block:code]
{
  "codes": [
    {
      "code": "REM get a reference to to task\nlaunchDarklyNode = m.top.findNode(\"my-node-name\")\nREM create configuration\nconfig = LaunchDarklyConfig(\"MY_MOBILE_KEY\", launchDarklyNode)\nREM create a user\nuser = LaunchDarklyUser(\"user-key\")\nREM initialize the client\nLaunchDarklySGInit(config, user)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
For each SceneGraph component you want to use the SDK in you need to initialize an interface to talk to the SceneGraph. This interface provides all the expected client functionality such as evaluation.
[block:code]
{
  "codes": [
    {
      "code": "REM create the scenegraph communication wrapper\nlaunchDarkly = LaunchDarklySG(launchDarklyNode)\nREM use the client\nvalue = launchDarkly.boolVariation(\"MY_FLAG_KEY\", false)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
Creating a client outside of the SceneGraph API is similar. In the legacy API you do not need `LaunchDarklySGInit` or the `LaunchDarklySG` functions.
[block:code]
{
  "codes": [
    {
      "code": "REM get a reference to the task\nlaunchDarklyNode = m.top.findNode(\"MY_NODE_NAME\")\nREM create configuration\nconfig = LaunchDarklyConfig(\"MY_MOBILE_KEY\", launchDarklyNode)\nREM create a user\nuser = LaunchDarklyUser(\"user-key\")\n\nREM create message port\nmessagePort = createObject(\"roMessagePort\")\nREM initialize the client\nlaunchDarkly = LaunchDarkly(config, user, messagePort)\n\nREM use the client\nvalue = launchDarkly.boolVariation(\"MY_FLAG_KEY\", false)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
If not using the SceneGraph you need to poll events to drive the client in your standard event loop.
[block:code]
{
  "codes": [
    {
      "code": "while (true)\n    REM do not wait forever or timers will break\n    msg = wait(3000, messagePort)\n    \n    if launchDarkly.handleMessage(msg) then\n        REM this message was for the client\n    else\n        REM handle non client messages\n    end if\nend while",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Variations"
}
[/block]
The `*variation` methods determine which variation of a feature flag a user receives.
[block:code]
{
  "codes": [
    {
      "code": "REM typed variations\nmyInt = launchDarkly.intVariation(\"MY_FLAG_KEY\", 123)\nmyBool = launchDarkly.boolVariation(\"MY_FLAG_KEY\", false)\nmyString = launchDarkly.stringVariation(\"MY_FLAG_KEY\", \"hello world!\")\nmyObjectOrArray = launchDarkly.jsonVariation(\"MY_FLAG_KEY\", {\"value\": 123})\nREM generic variation\nmyValue = launchDarkly.variation(\"MY_FLAG_KEY\", false)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
`*variation` calls take a feature flag key and a default value. 

The default value will only be returned if an error is encountered—for example, if the feature flag key doesn't exist or the user doesn't have a key specified. 
[block:api-header]
{
  "title": "Evaluation explanations"
}
[/block]
For each variation type there is also an associated version that returns the reason a particular value was returned. For example:
[block:code]
{
  "codes": [
    {
      "code": "details = launchDarkly.intVariationDetail(\"MY_FLAG_KEY\", 123)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
These variation methods return an object containing the keys `value`, `reason`, and `variationIndex`. The `value` field is the result of the evaluation. The `reason` field is an object that explains why the result happened, for example details about a rule match. The reason object will always contain a `kind` field. Lastly the (potentially null) `variationIndex` field contains the id of the particular value returned.
[block:api-header]
{
  "title": "Customizing your client"
}
[/block]
You can create a client configuration object with:
[block:code]
{
  "codes": [
    {
      "code": "REM for a legacy Roku application\nconfig = LaunchDarklyConfig(\"YOUR_MOBILE_KEY\")\nREM for a SceneGraph Roku Application\nconfig = LaunchDarklyConfig(\"YOUR_MOBILE_KEY\", CLIENT_SCENEGRAPH_NODE)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
We support the following configuration options for both SceneGraph and non SceneGraph usage:
[block:code]
{
  "codes": [
    {
      "code": "config.setAppURI(String)\nconfig.setEventsURI(String)\nconfig.setStreamURI(String)\n\nconfig.setPollingIntervalSeconds(Integer)\nconfig.setOffline(Boolean)\n\nconfig.addPrivateAttribute(String)\nconfig.setAllAttributesPrivate(Boolean)\n\nconfig.setEventsCapacity(Integer)\nconfig.setEventsFlushIntervalSeconds(Integer)\nconfig.setStreaming(Boolean)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Logging"
}
[/block]
### Log levels

You can configure the SDK log level. For example to set the level to `info`:
[block:code]
{
  "codes": [
    {
      "code": "config.setLogLevel(LaunchDarklyLogLevels().info)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
The SDK supports the following Levels:
[block:code]
{
  "codes": [
    {
      "code": "LaunchDarklyLogLevels().error\nLaunchDarklyLogLevels().warn\nLaunchDarklyLogLevels().info\nLaunchDarklyLogLevels().debug\nLaunchDarklyLogLevels().none",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
A custom logging backend can be provided. This will be different depending on if you are using the SceneGraph API or the Legacy API.

### Legacy API Custom Logger
[block:code]
{
  "codes": [
    {
      "code": "function CustomLogger() as Object\n    return {\n        log: function(level as Integer, message as String)\n            print level message\n        end function\n    }\nend function\n\nconfig.setLogger(CustomLogger())",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
### SceneGraph API Custom Logger
[block:code]
{
  "codes": [
    {
      "code": "<!-- /components/CustomLogger.xml -->\n\n<component name=\"CustomLogger\" extends=\"Task\">\n    <interface>\n        <field id=\"log\" type=\"assocarray\" alwaysNotify=\"true\"/>\n    </interface>\n    \n    <script type=\"text/brightscript\" uri=\"pkg:/components/CustomLogger.brs\"/>\n</component>",
      "language": "xml",
      "name": ""
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "REM /components/CustomLogger.brs\n\nfunction init()\n    m.messagePort = createObject(\"roMessagePort\")\n\n    m.top.observeField(\"log\", m.messagePort)\nend function\n\nfunction mainThread() as Void\n    while (true)\n        msg = wait(0, m.messagePort)\n\n        if type(msg) = \"roSGNodeEvent\" then\n            if field = \"log\" then\n                value = msg.getData()\n                print value.level value.message\n            end if\n        end if\n    end while\nend function\n",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
To use the logger create the SceneGraph logger node and then:
[block:code]
{
  "codes": [
    {
      "code": "config.setLoggerNode(myLoggerNode)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Users"
}
[/block]
You can create a user object with:
[block:code]
{
  "codes": [
    {
      "code": "user = LaunchDarklyUser(\"my-user-key\")",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
User objects can be customized with:
[block:code]
{
  "codes": [
    {
      "code": "user.setFirstName(String)\nuser.setLastName(String)\nuser.setEmail(String)\nuser.setName(String)\nuser.setAvatar(String)\nuser.setCustom(AssociativeArray)\n",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
A user can be marked as [anonymous](https://docs.launchdarkly.com/docs/anonymous-users) with:
[block:code]
{
  "codes": [
    {
      "code": "user.setAnonymous(Boolean)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
Users can have specific fields marked as private with:
[block:code]
{
  "codes": [
    {
      "code": "user.addPrivateAttribute(String)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Track"
}
[/block]
The track method allows you to record custom events in your application with LaunchDarkly:
[block:code]
{
  "codes": [
    {
      "code": "REM without optional data\nlaunchDarkly.track(\"YOUR_EVENT_KEY\")\nREM with optional data\nlaunchDarkly.track(\"YOUR_EVENT_KEY\", {\"customField\": 123})\nREM with optional numeric metric\nlaunchDarkly.track(\"YOUR_EVENT_KEY\", invalid, 52.3)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]

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
      "code": "launchDarkly.flush()",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Changing the user context"
}
[/block]
If your app is used by multiple users on a single device, you may want to change users and have separate flag settings for each user. To achieve this, the SDK supports switching between different user contexts.
[block:code]
{
  "codes": [
    {
      "code": "user = LaunchDarklyUser(\"abc\")\nlaunchDarkly.identify(user)",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
The `identify` call will load any saved flag values for the new user and immediately trigger an update of the latest flags from LaunchDarkly. Since this method re-fetches flag settings for the new user, it should not be called at high frequency. The intended use case for switching user contexts is the login / logout flow.
[block:api-header]
{
  "title": "Getting all flags"
}
[/block]
You can get an associative array of `flagKey` -> `flagValue` for all flags from the client with:
[block:code]
{
  "codes": [
    {
      "code": "allFlags = launchDarkly.allFlags()",
      "language": "lua",
      "name": "BrightScript"
    }
  ]
}
[/block]
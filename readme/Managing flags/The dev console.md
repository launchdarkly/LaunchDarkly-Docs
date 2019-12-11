---
title: "The dev console"
excerpt: ""
---
[block:callout]
{
  "type": "warning",
  "title": "Debugger",
  "body": "We've replaced the dev console with the new [debugger](doc:debugger). Customers that have a Debugger tab in their sidebar should refer to the documentation for the [debugger](doc:debugger)."
}
[/block]
The dev console helps you test whether you've set up LaunchDarkly correctly. From the console, you can see your users' feature flag requests and events in real-time.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/hdglBrSDTlC9uCt7BECM_console.png",
        "console.png",
        "1535",
        "1030",
        "#b17498",
        ""
      ]
    }
  ]
}
[/block]
You can access the dev console from the sidebar. The filter buttons allow you to isolate specific events (like clicks or pageviews) or pinpoint errors and warnings, which represent problems with the data being sent to LaunchDarkly.

The dev console must be the active tab in its browser window.  You can have a second window open with your application, if you need to click around in your app in order to generate events.

Please note that in high-volume environments, the events sent to the dev console may be sampled. When this happens, you will see a subset of events on the dev console, instead of every event.
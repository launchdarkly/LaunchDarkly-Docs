---
title: "Front-end flags"
excerpt: ""
---
JavaScript-heavy web applications (single page apps, for example) may want to take advantage of feature flags on the front-end. LaunchDarkly gives you two options for doing this. 
[block:api-header]
{
  "type": "basic",
  "title": "Pass feature flags from the backend via templates"
}
[/block]
One option is to use your backend SDK to evaluate feature flags (as you would normally) and simply pass the flag values to your front-end in a template. Depending on your templating language, this might look something like this:
[block:code]
{
  "codes": [
    {
      "code": "<script>\n   var flags = {\n    enableNewDashboard: {{ ldclient.toggle(\"new.dashboard.enable\", ...) }},\n    alternatePage: {{ ldclient.toggle(\"alternate.page\", ...) }}\n   };\n</script>",
      "language": "html"
    }
  ]
}
[/block]
At runtime, the flag values will be evaluated during template rendering, yielding the feature flag values to use for each specific user:
[block:code]
{
  "codes": [
    {
      "code": "<script>\n   var flags = {\n    enableNewDashboard:  true,\n    alternatePage: false\n   };\n</script>",
      "language": "html"
    }
  ]
}
[/block]
While this requires a bit of plumbing to set up, it will have lower performance overhead than using the client-side SDK, and has no potential to leak private information to clients.  
[block:api-header]
{
  "type": "basic",
  "title": "Use the client-side LaunchDarkly SDK"
}
[/block]
LaunchDarkly also offers a client-side JavaScript SDK that makes it easy to use feature flags in your front-end code. Refer to the [Quickstart guide](https://app.launchdarkly.com/quickstart#/install-sdk/javascript) for integration instructions. 

A few things to keep in mind about the client-side SDK. First, if you're using it, your `identify` call needs to contain all the user information necessary to do targeting properly. In practice that means that the user you pass to `identify` should be identical to the user you pass in your backend SDK integration. Second, the client-side SDK is loaded synchronously, so there is a slight impact to page load times.  

A final point to note is that your JavaScript will contain a static copy of your feature flag rules. We do encrypt all strings in your rules, so specific user keys, e-mail addresses, and user names will not be revealed.
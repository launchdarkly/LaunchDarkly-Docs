---
title: "Completely restricting secure user data"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains what aspects of LaunchDarkly you can customize to decrease or eliminate the amount of user data the LaunchDarkly platform receives. 

Extensive customization of LaunchDarkly will impact LaunchDarkly's core features. Some aspects of LaunchDarkly may not work as expected if you choose more restrictive user data constraints. 
[block:api-header]
{
  "title": "Creating a maximally secure LaunchDarkly experience"
}
[/block]
You can configure various aspects of LaunchDarkly to increase user privacy and restrict which data is transmitted to LaunchDarkly. 

Here are our most restrictive configuration options:

## Sever SDKs from
NEED MORE INFO HERE

## Block LaunchDarkly at the network level

You can block all traffic sent to events.launchdarkly.com.

WHY WOULD THEY DO THIS, AND WHAT ARE THE CONSEQUENCES? NEED MORE TECHNICAL DETAILS HERE

## Require Do Not Track when browsers contact LaunchDarkly

If your users are all accessing LaunchDarkly from corporate machines or within your company's network, you can work with your IT team to force all browsers accessing LaunchDarkly to use Do Not Track, a web browser setting that requests web apps not track individuals accessing them through that browser. 

To learn more, visit [All about DNT](https://allaboutdnt.com/).

WHY DO WE REFERENCE THIS IN BOTH BEST PRACTICES AND THIS TOPIC?

## Enable ad blockers 

If you're using an ad blocker in your browser, you can prevent some tracking and personal information from being transmitted to LaunchDarkly. However, because ad blockers are third-party products, LaunchDarkly cannot control how they implement their restrictions. For example, some feature flags may not work if you're using certain ad blockers.
[block:api-header]
{
  "title": "Impacted features"
}
[/block]
Restricting LaunchDarkly's access to user data this extensively has the following consequences on features: 

 * The Users dashboard won't populate
 * Autocomplete won't function anywhere in the app
 * Data export is completely unavailable 
 * Experimentation is completely unavailable 
 * The Debugger will show no events at all 
 * Flag status indicators don't work
 * Many aspects of the Usage page will not work, including flag insights

ARE ANY OF THESE TIED TO SPECIFIC FEATURES LISTED ABOVE? I'D LOVE TO BE ABLE TO ARTICULATE WHICH FEATURES ARE RELATED TO SPECIFIC SECURITY CONFIGURATIONS
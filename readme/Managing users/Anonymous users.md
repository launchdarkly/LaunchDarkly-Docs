---
title: "Anonymous users"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains what anonymous users are and how their information is handled in LaunchDarkly.

Anonymous users are identical to regular users but they are not stored in your dashboard. One of the primary reasons that users are sent anonymously is to avoid unauthenticated users diluting the useful data in the user dashboard. 
[block:callout]
{
  "type": "info",
  "title": "Ensuring user privacy",
  "body": "You can use anonymous users to hide personally identifiable information (PII), but we recommend using private user attributes instead. \n\nTo learn more, read [Private user attributes](doc:private-user-attributes)."
}
[/block]

[block:api-header]
{
  "title": "Best practices for using unique keys"
}
[/block]
Sometimes it is useful to generate a unique key for anonymous users. We recommend using unique keys for the following reasons: 
* If you are targeting users individually by key. 
* If you are using LaunchDarkly's A/B testing feature.
* If you are using the Analytics Data Stream. 
* If you are conducting percentage rollouts. 

If you do not have a need to uniquely identify your anonymous users, you could use a shared key for them.
---
title: "Running A/B tests"
excerpt: ""
---
[block:callout]
{
  "type": "info",
  "title": "A/B Testing with Multivariate Flags",
  "body": "We are currently working on support for A/B testing with multivariate flags.  For now, if you would like to do A/B testing, you must use a boolean feature flag."
}
[/block]
Setting up LaunchDarkly to run A/B tests (aka experiments) involves a few additional setup steps beyond what's needed to control feature flags. We'll walk through the steps one by one. We'll assume that you've already gone through the basic [Setup](doc:getting-started) steps and can successfully toggle features on and off.

[block:callout]
{
  "type": "danger",
  "title": "Include the client-side SDK",
  "body": "If you want to run client-side A/B tests (click and pageview goals), you must set up the client-side SDK. See our [JavaScript SDK Reference](doc:js-sdk-reference) for details.\n\nAlternatively, if your web application is not written in JavaScript, you may use custom events to emulate tracking client-side goals."
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Create goals"
}
[/block]
Goals are the metrics used to measure the effectiveness of a feature. To run an A/B test, you need to define the goals you care about. LaunchDarkly supports three kinds of goals:
* Click goals - track whether a user clicks on a specific page element.
* Page view goals - track whether a user lands on a specific page (for example, a confirmation page).
* Custom goals - track other user interactions that don't correspond to page views or clicks.
  
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a4398d6-goalspage.jpg",
        "goalspage.jpg",
        2000,
        1125,
        "#0aa856"
      ]
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Creating goals",
  "body": "You can create goals directly in LaunchDarkly, or import them from [Optimizely](doc:optimizely)."
}
[/block]
Once you've created your goals, you'll need to decide which goals to track for each feature.
[block:api-header]
{
  "type": "basic",
  "title": "Track goals"
}
[/block]
Goals are defined per project in LaunchDarkly and can be re-used for multiple feature flags. In order to indicate which goals are relevant to each flag, you need to associate them with the feature flag. You can do this on the feature flag's Experiments tab by clicking "Manage Goals". 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c1b1e6c-abtestinggoals.jpg",
        "abtestinggoals.jpg",
        2000,
        1125,
        "#989999"
      ],
      "caption": "Associating a goal with a feature flag"
    }
  ]
}
[/block]
When you're ready to start tracking your goals, the following snippet can be implemented into your application:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.track(\"Signed up\", user);",
      "language": "java",
      "name": "Java"
    },
    {
      "code": "ldclient.get().track(\"Signed up\", user)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "ld_client.track(\"Signed up\", user)",
      "language": "ruby",
      "name": "Ruby"
    },
    {
      "code": "ldClient.Track(\"Signed up\", user)",
      "language": "go",
      "name": "Go"
    },
    {
      "code": "ld_client.track(\"Signed up\", user);",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "$client->track(\"Signed up\", user);",
      "language": "php",
      "name": "PHP"
    },
    {
      "code": "ldclient.track(\"Signed up\");",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "ldClient.Track(\"Signed up\", user);",
      "language": "text",
      "name": ".NET"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Custom event data",
  "body": "Optionally, you can also attach custom JSON data to your event by passing an extra parameter to your track call. See our SDK reference guides for more information"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "View results"
}
[/block]
Once your goals have been set up (and you've verified that you're receiving events for your goals on the [dev console](doc:dev-console), you'll begin to see results in the Experiments tab.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b49fc8c-abtest.jpg",
        "abtest.jpg",
        2000,
        1125,
        "#fafafa"
      ],
      "caption": "A/B testing results on the Experiments tab"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Showing results",
  "body": "We'll only show results once each variation of the feature flag has received at least one impression."
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Event processing time",
  "body": "We process events on a five minute delay. If you're not seeing the numbers you expect on the analytics tab, ensure that you've waited at least five minutes for your events to be processed."
}
[/block]
Once we've determined a winner, we'll show a green checkbox next to the winning variation. We'll select a winner when each variation has at least 1000 distinct users (impressions), and the confidence interval is above 95%.
[block:api-header]
{
  "type": "basic",
  "title": "More about custom goals and events"
}
[/block]
Custom goals are useful for recording interactions that don't directly correspond to clicks or page views. LaunchDarkly allows you to record custom events client-side (via our JavaScript SDK) or on the server (via our server-side SDKs).
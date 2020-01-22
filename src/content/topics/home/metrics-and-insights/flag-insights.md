---
title: "The flag Insights graph"
excerpt: ""
---
## Overview
This topic explains what a flag's Insights graph does and how to use it.
## Using the Insights graph
With the flag Insights graph, your engineering and product teams have greater visibility into how many times people are seeing each version of a flag over time, as well as any changes to the flag that could have affected how many times each flag was evaluated.  

To navigate to the Insights tab:


1. Find the feature flag you wish to investigate.
2. Click the flag's name. The flag's **Targeting** page opens.
3. Click into the **Insights** tab.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8f321c5-flag-insights-example.png",
        "flag-insights-example.png",
        2378,
        1208,
        "#f8f9fa"
      ],
      "caption": "The flag **Insights** tab."
    }
  ]
}
[/block]
The flag Insights graph shows you how changes to flag targeting rules, new variations, or an increased number of users affects how all of your end users are seeing your application.

Each Insights graph also has annotations powered by LaunchDarkly's audit log entries. They tell you about changes to your flag and when those changes were made. This gives you input about how changes affect what your users see.

Flag Insights graphs are generated on a per-flag evaluation basis, not a per-user basis. This means that if the same user is evaluated 20 times, the Insights graph records and displays all 20 evaluations.
---
title: "Experimentation"
excerpt: ""
---
## Overview
This topic explains the concepts and value of LaunchDarkly's experimentation feature. Read on to learn about experimentation, how to use it, and what it can do for you.
<Callout intent="info">
  <Callout.Title>Experimentation is an add-on feature</Callout.Title>
  <Callout.Description>Experimentation is only available to customers on our Enterprise and Pro plans. To learn more about our plans, [read about our pricing](https://launchdarkly.com/pricing/).
If you want to add Experimentation to an existing plan, [contact our Sales team](mailto:sales@launchdarkly.com).</Callout.Description>

</Callout>

## What is experimentation?
LaunchDarkly's experimentation feature lets you validate the impact of features you roll out to your app or infrastructure. Measure whatever you need, from pageviews to clicks, page load time to infrastructure costs, and more.

By connecting metrics you create to flags in your LaunchDarkly environment, you can precisely measure the changes in your users' behavior based on what flags they see. This helps you make more informed decisions, so the features your development team ships align with your business objectives. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ba67446-Experimentation_v1mp.png",
        "Experimentation_v1mp.png",
        2400,
        800,
        "#324350"
      ],
      "caption": "Flags + Metrics = Experiments"
    }
  ]
}
[/block]

<Callout intent="info">
  <Callout.Title>Experimentation is available in the LaunchDarkly API</Callout.Title>
  <Callout.Description>As always, LaunchDarkly is an API-first product. Everything you see in the experimentation UI is powered by a fully supported API endpoint.
To learn more, read our [API docs](https://apidocs.launchdarkly.com/reference).</Callout.Description>

</Callout>

## Why should I use experimentation?
LaunchDarkly's flexible, role-agnostic platform means anyone can become an experimentation expert, regardless of their role. Product managers can use experiments to measure the value of the features they ship, designers can use experiments to conduct multivariate testing on UI and UX components, and DevOps engineers can use it to test the efficacy of their infrastructure changes.

When experiments are tied to feature flags, you can make changes based on your findings quickly and easily. 

If an experiment tells you a flag has positive impact, you can roll that flag out to your entire userbase to maximize its value. Alternatively, if you don't like the results you're getting from one flag, just switch it off and minimize its impact on your userbase.

Experimentation can do all of these things and more:
* A/B/n testing (Multivariate testing)
* Chart-based visualizations of your experiment results
* Pause and resume experiments so you have granular control over when data is recorded
* Display confidence intervals with results so you decide which variation you can trust to have the most impact
* Expose specific groups of users to experiments, refining your testing population and getting you accurate results faster
## How does it work?
Experiments track the impact of different flag variations against a baseline variation of the metric you want to measure. When a user encounters a feature flag in your application, LaunchDarkly registers an event. If that flag is currently connected to a metric, the experiment receives a data point. Experiment data is collected in the Experiments tab, which displays experiment data in near-real time. 

After a flag variation has reached statistical significance, LaunchDarkly declares a "winning" flag variation for your experiment. A winning variation is the variation with the most positive deviation from the baseline. You may have multiple winning variations, depending on what you're trying to measure.

After you decide which flag variation has the impact you want, you can seamlessly roll that variation out to 100% of your users with LaunchDarkly's percentage rollouts feature. To learn more about percentage rollouts, read [Percentage rollouts](https://docs.launchdarkly.com/docs/targeting-users#percentage-rollouts).

If you're satisfied with the results, you can pause an experiment after it declares a winning variation, or you can let it run indefinitely to continue gathering data. 

To learn more about using experiments, read [Managing experiments](./experimentation-manage).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2baca50-experiment_results.png",
        "experiment results.png",
        2000,
        1000,
        "#fbfcfc"
      ],
      "caption": "An active multivariate experiment."
    }
  ]
}
[/block]

<Callout intent="info">
  <Callout.Title>Experimentation requires certain SDK versions</Callout.Title>
   <Callout.Description>This feature is supported on the following versions of our SDKs (and later versions, if applicable):
* Go: **4.11.0**\n* Java: **4.8.0**\n* Node (server-side): **5.9.0**\n* Node (client-side): **1.1.0**\n* PHP: **3.6.0**\n* Python: **6.10.0**\n* Ruby: **5.6.0**\n* .NET: **5.8.0**\n* JavaScript: **2.14.0**\n* Xamarin: **1.1.0**\n* Android: **2.9.0**\n* Electron: **1.2.0**</Callout.Description>
</Callout>

## Best practices for using experimentation
As you think about creating experiments for your features, keep these best practices in mind:
* **Use feature flags on every new feature you develop.** This is a best practice, but it especially helps when you're running experiments in LaunchDarkly. By flagging every feature, you can quickly turn any aspect of your product into an experiment. 
* **Consider experiments from day one.** Create hypotheses in the planning stage of feature development, so you and your team are ready to run experiments as soon as your feature launches.
* **Define what you're measuring.** Align with your team on which tangible metrics you're optimizing for, and what results constitute success.
* **Plan your experiments in relation to each other.** If you're running multiple experiments simultaneously, make sure they don't collect similar or conflicting data.

You can use experiments to measure a variety of different outcomes. Some example experiments include:
* Test the efficacy of different search implementations, such as elasticsearch versus SOLR versus Algolia
* Track how features you ship are increasing or decreasing page load time
* Calculate conversion rates by monitoring how frequently users click on various page elements
## Pricing for experiments
Experiment events are charged on a per-event basis. Consider this when you're discussing your billing plan with LaunchDarkly. This feature is only available for Pro and Enterprise plans, so speak to your LaunchDarkly account team if you have questions.

You can minimize the cost of experimentation by only running experiments on selected user groups. 
The number of experiments per flag (i.e. having multiple metrics connected to a single flag), the user engagement with that flag, and the target groups included in the experiment can all affect the volume of events LaunchDarkly sends. 

Experimentation includes a built-in feature that lets you refine the users included in an experiment based on the flag's targeting rules. To learn more, read [Controlling experiment populations](./experimentation-targeting).

You may be billed twice for some events if you're also using LaunchDarkly's Data Export features. To learn more, read [Data Export](./data-export).
<Callout intent="info">
  <Callout.Title>We want your feedback!</Callout.Title>
   <Callout.Description>We're actively soliciting feedback and input on Experimentation. If you try it out and have something to tell us, we're eager to hear from you.
Send us an email at feedback@launchdarkly.com.</Callout.Description>
</Callout>
---
title: "Creating experiments"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how to set up and configure an experiment in LaunchDarkly. It introduces the concepts of metrics, explains different metric types, and explains how metrics interact with feature flags to create experiments.

In LaunchDarkly, the combination of metrics and flags is an **experiment**. Experiments let you measure the effect of flags on users by mapping them to the metrics your team cares about. 

When a user performs a metric-tracked action in your application after they encounter  a feature flag, the experiment that flag informs logs an event. 

For example, an experiment might show that users are more likely to convert by clicking "Checkout" when the Checkout button is a certain color. The metric you would track to measure that is when they click on the Checkout button. It would be connected to a flag serving four variations, each of which is a different color for the button.

It takes three steps to create an experiment. You must:
1. [Create a metric](#section-creating-metrics), or choose an existing metric
2. [Connect the metric to feature flags](#section-connecting-metrics-to-feature-flags), and 
3. [Start recording your experiment](#section-starting-your-experiment)

After you create an experiment, you can reuse its components to create new experiments. You can reuse existing metrics by connecting them to multiple flags simultaneously, which allows you to run experiments measuring the impact of those flags on the same metric. Similarly, a single flag can have multiple metrics connected to it, which allows you to run many experiments.
[block:api-header]
{
  "title": "Creating metrics"
}
[/block]
Metrics are the measure against which you evaluate flag events. You can use metrics to track all kinds of things, from how often users access a URL to how long that URL takes to load a page. Create metrics that align with your business goals and connect them to your team's flags to track the impact of different flag variations over time.

You can use different metrics to track experiment results in LaunchDarkly. They are:
* Conversion metrics, which register events when a user takes an action based on a feature flag they encounter.
* Numeric metrics, which measure numeric values against a baseline you set.
 
The following table explains different actions you can track with a metric: 
[block:parameters]
{
  "data": {
    "h-0": "Event kind",
    "h-1": "Description",
    "2-0": "Custom (conversion)",
    "1-0": "Pageview",
    "0-0": "Click",
    "0-1": "This is a conversion metric. Tracks the clicks on a UI element.\n\nFor example, how frequently a user clicks the **Save** button.",
    "1-1": "This is a conversion metric. Tracks how many times a page is viewed. \n\nFor example, how many times a blog post is viewed based on three different titles.",
    "2-1": "Tracks events for any arbitrary event. \n\nFor example, whether a user search called a service or not.",
    "3-0": "Custom (numeric)",
    "3-1": "This event kind is **required** for numeric metrics.\n\nTracks increases or decreases in numeric value against a baseline you set.\n\nFor example, how many items are in a user's cart when they check out of your online store."
  },
  "cols": 2,
  "rows": 4
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "You must be using the Javascript or React SDK to use click and pageview metrics.\n\nIf you do not have the Javascript or React SDK and would like to track clicks or pageviews, use a custom conversion metric.",
  "title": "We recommend the Javascript or React SDKs for some metrics"
}
[/block]

[block:api-header]
{
  "title": "Creating click metrics"
}
[/block]
Click metrics track how often a user interacts with an element of your product's UI. 

For example, you might want to track how often a user clicks a **Save** button when it is a red or blue. You can create a metric that monitors clicks on the **Save** button as designated by a CSS selector located at a specific URL. 

You can even monitor clicks on the button across different URLs by telling the metric to track different URLs based on substrings or simple matches. For example, you could track an event on every URL with `/checkout-page/` in the URL path.
[block:callout]
{
  "type": "info",
  "title": "What's a CSS selector?",
  "body": "CSS selectors designate specific areas of your product UI, like buttons or images, that your users can interact with. \n\nFor example, some CSS selectors include `#example-element-id`, `.example-classname`, `button.example-button`, or `.example-button, .example-button-alt`."
}
[/block]
To create a click metric:

1. Navigate to the **Metrics** screen.
2. Click **New**. The "Create a new metric" screen appears.
3. Enter a human-readable **Name** for the metric.
4. (Optional) Enter a **Description**.
5. (Optional) Type or choose from available **Tags**.
6. (Optional) Choose a **Maintainer**. By default, the person who creates the metric is set as the Maintainer.
7. Choose **Click** from the **Event kind** dropdown. 
8. Enter one or more CSS selectors in the **Click targets** field. 
9. Specify a type of URL you want to track behavior on. There are four types of URL matching:
[block:parameters]
{
  "data": {
    "h-0": "URL matching schema",
    "h-1": "Description",
    "h-2": "Example",
    "0-0": "Simple match",
    "1-0": "Exact match",
    "2-0": "Substring match",
    "3-0": "Regular expression",
    "0-1": "This triggers an event when the user accesses a URL, or clicks on an element hosted at a URL, that matches the string you enter in the **Target URL** field or a formulation of that URL that included appended parameters.\n\nIf you want events to record for URLs with substrings, specify each URL individually.",
    "0-2": "You specify: `example.com`.\n\nViews or clicks at `example.com`, and `example.com#signin` trigger events.\n\nYou specify: `example.com` and `example.com/login`.\n\nViews or clicks on `example.com` and `example.com/login`trigger events.",
    "1-1": "This triggers an event when the user accesses a URL, or clicks on an element hosted at a URL, that exactly matches what you enter in the **Target URL** field.\n\nIdentical base URLs with different substrings do not trigger events.",
    "1-2": "You specify: `example.com`\n\nOnly views or clicks at `example.com` trigger events. \n\nViews and clicks at `www.example.com/signup` and\n`https://www.example.com` do not trigger events.",
    "2-1": "This triggers an event when the user accesses a URL, or clicks on an element hosted at a URL with a specific string of text in it.",
    "2-2": "You specify: `your-substring`\n\n`example.com/your-substring`\n`home.com/username/your-substring/`\n`launchdarkly.com/your-substring/settings`\n\nBecause all of these URLs contain `your-substring`, clicks on the CSS selectors you specify on each page trigger events.",
    "3-1": "This triggers an event based on a regex expression you specify. This lets you designate more precise locations to trigger click and pageview events.",
    "3-2": "You specify: `example\\.com\\/account\\/.*\\/billing` \n\nThis matches any string between `account/` and `/billing`, such as `http://example.com/account/12345/billing`"
  },
  "cols": 3,
  "rows": 4
}
[/block]
10. (Optional) Click **Add Additional URL** to track behavior on more than one URL.
11. Click **Save Metric**.
[block:api-header]
{
  "title": "Creating pageview metrics"
}
[/block]
Pageview metrics track how often users see an element on a page hosted at a specific URL. 

For example, you might want to track how often customers view an item when its price is discounted different amounts.

To create a pageview metric:

1. Follow steps 1-6 in [Creating click metrics](#section-creating-click-metrics) until you have configured the form up to the "Event information" section.
2. Choose **Page view** from the **Event kind** dropdown.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/762ab07-Screen_Shot_2019-10-31_at_2.54.29_PM.png",
        "Screen Shot 2019-10-31 at 2.54.29 PM.png",
        762,
        303,
        "#e1e1e2"
      ],
      "caption": "The **Event kind** dropdown."
    }
  ]
}
[/block]
3. Specify a type of URL you want to track behavior on. To learn about the different options for URL matching, see the table in [Creating click metrics](#section-creating-click-metrics).
4. (Optional) Click **Add Additional URL** to track behavior on more than one URL.
5. Click **Save Metric**.
[block:api-header]
{
  "title": "Creating custom conversion metrics"
}
[/block]
Custom conversion metrics require you to create an event name and insert it into your application to track conversions for any event in your code. To add a custom conversion metric in LaunchDarkly, you must identify it with a code snippet embedded in your app.

When you're ready to add a custom event, put this snippet in your code:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.track(\"Example event name\", user, value);",
      "language": "java",
      "name": "Example event code snippet"
    }
  ]
}
[/block]
The area of your code you should put custom conversion metric information into, and the type of information you should include, varies based on which SDKs you use. 

Often, the information you should put in your code includes the event key, user object, data field, or numeric value fields. To learn more, read the documentation for your SDKs.

To create a custom conversion metric:

1. Follow steps 1-6 in [Creating click metrics](#section-creating-click-metrics) until you have configured the form up to the "Event information" section.
2. Choose **Custom** from the **Event kind** dropdown. 


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ca6e973-Screen_Shot_2019-10-31_at_2.52.55_PM.png",
        "Screen Shot 2019-10-31 at 2.52.55 PM.png",
        776,
        304,
        "#e1e2e3"
      ],
      "caption": "The **Event kind** dropdown."
    }
  ]
}
[/block]
3. Click to select the **Conversion** radio button
4. Enter a human-readable **Event name**. This is the event name you will reference in your code snippet when you insert the metric information into your app.
5. Click **Save Metric**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/08362e1-Screen_Shot_2019-10-15_at_10.17.47_AM.png",
        "Screen Shot 2019-10-15 at 10.17.47 AM.png",
        761,
        453,
        "#f4f7f9"
      ],
      "caption": "The \"Event information\" section of the \"Create a new metric\" screen with a conversion metric configured."
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Creating numeric metrics"
}
[/block]
Alternatively, you can use **numeric metrics** to track the changes in a value against a baseline value. Unlike conversion metrics, which track whether or not an event occurred, numeric metrics let you measure changes in value against a baseline flag variation you choose.

For example, you can use numeric metrics to track:
* Page load time
* The efficacy of various search algorithms 
* The number of items in a shopping cart at checkout
[block:callout]
{
  "type": "warning",
  "title": "iOS and React Native SDK feature availability",
  "body": "Numeric metrics are not supported on the iOS and React Native SDKs."
}
[/block]
To add a custom numeric metric in LaunchDarkly, you must identify it with a code snippet embedded in your app.

When you're ready to add a custom event, put this snippet in your code:
[block:code]
{
  "codes": [
    {
      "code": "ldClient.track(\"Example event name\", user, null, numericValue);\n\n/* The `user` parameter is ommitted in client-side SDKs */",
      "language": "java",
      "name": "Example event code snippet"
    }
  ]
}
[/block]
Like conversion metrics, numeric metrics also require you to create an event name and insert it into your application's code to track metric data. The area of your code you should put custom conversion metric information into, and the type of information you should include, varies based on which SDKs you use. 

Often, the information you should put in your code includes the event key, user object, data field, or numeric value fields. To learn more, read the documentation for your SDKs.
[block:callout]
{
  "type": "info",
  "title": "Can't see numeric metrics options?",
  "body": "If you can't see the feature described below, your SDKs may be out of date. To solve this problem:\n\n1. Update your SDKs to the latest version.\n2. Contact support@launchdarkly.com to enable numeric metrics."
}
[/block]
To create a numeric metric:

1. Follow steps 1-6 in [Creating click metrics](#section-creating-click-metrics) until you have configured the form up to the "Event information" section.
2. Enter a human-readable **Event name**. This is the event name you will reference in your code snippet when you insert the metric information into your app.
3. Enter a **Unit of measure** to track.
4. Choose a **Success criteria** from the dropdown.  
5. Click **Save Metric**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5c96063-Screen_Shot_2019-10-15_at_10.23.58_AM.png",
        "Screen Shot 2019-10-15 at 10.23.58 AM.png",
        756,
        506,
        "#f5f7f9"
      ],
      "caption": "The \"Event information\" section of the \"Create a new metric\" screen with a numeric metric configured."
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Choosing success criteria for numeric metrics",
  "body": "When you designate a success criteria, you can choose **Lower than baseline** or **Higher than baseline** depending on what you want to track. \n\nFor example, if you're trying to track page load time to measure the impact of your infrastructure changes, you might want a success criteria that is lower than the baseline if your baseline flag variation shows the original page load time and you want to measure decreases in page load time."
}
[/block]

[block:api-header]
{
  "title": "Connecting metrics to feature flags"
}
[/block]
After you've created a metric, you can connect it to one or more feature flags. If users load a URL, click an element, or otherwise participate in the behavior the metric tracks, LaunchDarkly sends an event to your experiment.

You can connect multiple metrics to one flag to run multiple experiments about that same flag. Alternatively, you can connect the same metric to multiple flags, which saves you from having to create identical metrics for multiple flags.

To connect a metric to a flag:

1. Navigate to the flag's Experiments tab. 
2. If the flag does not have other running experiments, click **Create an Experiment.** If it already has running experiments, click **Manage Experiments**. The "Update experiment settings for all environments" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0ec0110-Trial_Duration_-_Experiments.png",
        "Trial_Duration_-_Experiments.png",
        796,
        473,
        "#f3f4f5"
      ],
      "caption": "A flag's Experiments tab with the **Manage Experiments** button called out."
    }
  ]
}
[/block]
3. Enter a metric name or choose a metric from the **Add new metric** dropdown. The metric you choose appears in the table below.
4. Choose a **Baseline** from the dropdown.
5. Click **Save Experiment Settings**. The new experiment appears in the flag's Experiments tab.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/09a9c41-Screen_Shot_2019-10-15_at_10.57.58_AM.png",
        "Screen Shot 2019-10-15 at 10.57.58 AM.png",
        766,
        537,
        "#f8f9f9"
      ],
      "caption": "The \"Update experiment settings for all environments\" screen, configured to connect a metric to a flag."
    }
  ]
}
[/block]
You're not done yet! After you create an experiment, you have to start it in every environment where you want it to run.
[block:api-header]
{
  "title": "Starting your experiment"
}
[/block]
After you've connected a metric to a flag, you can start your experiment whenever you want. All you need to do is press the **Start Recording** button in every environment where you want to record data. 

To learn more about starting and pausing recording for experiments, read [The experiment lifecycle](doc:experimentation-lifecycle).
[block:callout]
{
  "type": "info",
  "body": "When you create an experiment, it appears in every environment in your project. However, the **Start Recording** button only impacts the experiment in one environment at a time. If you want to run the experiment in multiple environments, you must click **Start Recording** for each environment individually. \n\nFor example, you might run an experiment in Staging to gather data internally before turning it on in Production to gather customer data.",
  "title": "Experiment settings are environment-specific"
}
[/block]
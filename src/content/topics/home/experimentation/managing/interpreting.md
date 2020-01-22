---
title: "Interpreting experiment data"
excerpt: ""
---
## Overview
This topic explains how to read an experiment's card in the flag's Experiments tab and apply its findings to your product.
## Understanding experiments as they run
When your experiments are running, you can view information about them on the Experiments tab for the flags connected to them. The Experiments tab displays all the experiments a flag is participating in, including both experiments that are currently recording and experiments that are paused.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/93599c3-Screen_Shot_2019-10-15_at_8.49.47_AM.png",
        "Screen Shot 2019-10-
1. at 8.49.47 AM.png",
        1471,
        1131,
        "#f8f9f9"
      ],
      "caption": "A flag's Experiments tab, with one paused experiment and one recording experiment."
    }
  ]
}
[/block]
An experiment's card shows details about what data the experiment is collecting and what that data means. You can see information about the experiment, like its name and experiment type, in the header line. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c5ad095-Screen_Shot_2019-10-15_at_9.04.44_AM.png",
        "Screen Shot 2019-10-
1. at 9.04.44 AM.png",
        1430,
        344,
        "#f9f9fa"
      ],
      "caption": "An experiment's card."
    }
  ]
}
[/block]
Here are some things you can do from an experiment's card:
* Pause the experiment or resume recording. To learn more, read [The experiment lifecycle](./experimentation-lifecycle).
* Edit metrics connected to the experiment. Edit experiment metrics to start new experiments using this flag.
* Reset the experiment data. This leaves the metric connected to the flag, but deletes all the data the experiment has collected so far. After the historical data is deleted, the experiment begins collecting new data.
* Delete the experiment. To learn more, read [Deleting experiments](./experimentation-delete).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/442ee76-Screen_Shot_2019-10-14_at_4.31.19_PM.png",
        "Screen Shot 2019-10-
1. at 4.31.
1. PM.png",
        838,
        606,
        "#f5f5f5"
      ],
      "caption": "The experiment card's 3-dot menu."
    }
  ]
}
[/block]
* Visualize experiment data over a set period of time. Click the **date menu** to change the time period of the data you see.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7d1a8b8-Screen_Shot_2019-10-15_at_9.28.16_AM.png",
        "Screen Shot 2019-10-
1. at 9.28.
1. AM.png",
        734,
        452,
        "#f5f5f5"
      ],
      "caption": "An experiment's date menu, expanded."
    }
  ]
}
[/block]
* Visualize your experiment's data over time in a chart. Click **Show** to change views.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/59a71b1-Screen_Shot_2019-10-15_at_9.07.37_AM.png",
        "Screen Shot 2019-10-
1. at 9.07.37 AM.png",
        1414,
        756,
        "#fbfbfb"
      ],
      "caption": "An experiment's chart view."
    }
  ]
}
[/block]

## Reading experiment data
The data an experiment has collected is represented in a set of columns in the experiment's card.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/326ebf2-experiment_results_v1.png",
        "experiment results_v1.png",
        2100,
        1100,
        "#f8fafa"
      ],
      "caption": "An experiment's data."
    }
  ]
}
[/block]
Each column represents something different:
* **Variation**: Which flag variation's data is shown in the row
* **Conversions / unique visitors**: How many unique visitors take action based on the variation they see, relative to the total number of users who views the page. For click experiments, this means the denominator is the number of views matching the URL specified in the click metric UI.
* **Conversion rate**: The percentage of users who take action based on the variation they see, relative to the total number of unique visitors who encounter the flag variation.
* **Confidence interval**: A range of values between which the actual value for the conversion rate likely falls. A smaller confidence interval equates a more confident prediction. For example, a confidence interval of 11%-13% is more reliable than a confidence interval of 10%-30%.
* **Change**: The difference, in positive or negative values, the flag variation has from the baseline variation. Baseline flag variations say **Baseline** rather than showing a value.
* **Statistical significance**: The likelihood of a variation to impact the users who see it. LaunchDarkly calculates this with a p-value of .05. 
## Winning variations
After your experiment has registered enough events to achieve statistical significance compared to the baseline flag variation, LaunchDarkly declares a *winning variation*. A winning variation appears when that variation reaches 95% statistical significance. 

If you run an experiment over an extended period of time, the winning variation may change. Review your experiment data regularly to make sure you're making the most informed choices about your business and product.

You can view the statistical significance of your metrics, and the winning versions, in the **Statistical significance** column. The baseline variation does not show statistical significance. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ca7026b-real-time_updates__1_.png",
        "real-time_updates__1_.png",
        1209,
        618,
        "#f8fafa"
      ],
      "caption": "An experiment with a winning variation designated."
    }
  ]
}
[/block]
Your winning variation is the flag variation that has the most positive impact compared to the baseline. If you're doing multivariate testing, which means comparing multiple different flag variations to the baseline simultaneously, you may have multiple winning variations. If you do, you can choose which variation best meets your needs and roll that flag out to your entire user base. 

After you determine a winning variation, you can roll the winning variation out to 100% of your users from the flag's targeting page. To learn more, read [Percentage rollouts](https://docs.launchdarkly.com/docs/targeting-users#percentage-rollouts).
<Callout intent="info">
  <Callout.Title>Consider pausing an experiment after choosing a winning variation</Callout.Title>
   <Callout.Description>If you're done with an experiment and have rolled the winning variation to your user base, it might be a good time to pause your experiment. Experiments on a userbase that only sees one flag variation do not return useful results. 
Pausing an experiment retains all the data collected so far. To learn more, read [Managing experiments](./managing-experiments).</Callout.Description>
</Callout>

## Further analyzing results
If you're using Data Export, you can find experiment data in your data export destinations to further analyze it using third-party tools of your own. 

To learn more, read [Data Export](./data-export).
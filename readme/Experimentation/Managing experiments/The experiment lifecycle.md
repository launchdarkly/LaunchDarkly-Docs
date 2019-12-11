---
title: "The experiment lifecycle"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how to start recording data in an experiment and pause the experiment when you're finished. 
[block:api-header]
{
  "title": "Starting experiments"
}
[/block]
Experiments do not start collecting data automatically. When you have a new experiment you're ready to run, you must press the **Start Recording** on the experiment itself.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/60aed7c-Set_Logging_Level_-_Experiments.png",
        "Set_Logging_Level_-_Experiments.png",
        1252,
        867,
        "#f9f9fa"
      ],
      "caption": "A flag's Experiments tab with the **Start Recording** button called out."
    }
  ]
}
[/block]
The **Start Recording** button only applies to the experiment in that specific environment. If you wish to run the same experiment in multiple environments, you must press the **Start Recording** button on each experiment in each environment. This behavior prevents you from being billed for events you don't want to track. 

To learn more about creating an experiment, read [Creating experiments](doc:experimentation-create). 

After you start your experiment, you can check on it at any time in the flag's Experiments tab. Experiment data appears in the Experiments page after a few minutes. You may have to refresh the page to fetch new data for your experiment.
[block:api-header]
{
  "title": "Pausing experiments"
}
[/block]
If you've discovered a winning variation, or decided to stop running the experiment for some other reason, you can stop collecting events by clicking **Pause experiment** on any running experiment.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d7c27d8-Screen_Shot_2019-10-15_at_9.48.59_AM.png",
        "Screen Shot 2019-10-15 at 9.48.59 AM.png",
        551,
        209,
        "#f6f7f7"
      ],
      "caption": "An experiment's card with the **Pause experiment** button displayed."
    }
  ]
}
[/block]
You can pause an experiment at any time. Just like the start button, the pause button only impacts one experiment in one environment. If you wish to stop collecting data from every instance of an experiment, you must pause each experiment in each environment individually.

When you pause an experiment, LaunchDarkly stops collecting data about user behavior for that experiment. The data that was already collected for that experiment is still available, however, in the Experiments screen.

Pausing an experiment is not the same as deleting an experiment. As a best practice, we recommend pausing experiments you're not using, rather than deleting them. This lets you retain the results and data the experiment has already collected.

If you want to start a paused experiment, click **Resume recording**. Resumed experiments begin collecting event data again and their charts update with new information.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/aee7ddf-Alternate_sort_order_-_Experiments-2.png",
        "Alternate_sort_order_-_Experiments-2.png",
        230,
        170,
        "#f4f5f6"
      ],
      "caption": "An experiment's card with the **Resume recording** button displayed."
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Deleting experiments"
}
[/block]
You can delete an experiment permanently from the flag's Experiments page.
[block:callout]
{
  "type": "danger",
  "body": "Deleting an experiment means deleting all the event data collected for that experiment in every environment. \n\nWe recommend pausing experiments whenever possible, rather than deleting them.",
  "title": "You cannot restore deleted experiment data"
}
[/block]
To delete an experiment:

1. Navigate to a flag's Experiments tab and find the experiment you wish to delete.
2. Click the **3-dot** menu icon. A dropdown menu appears.
3. Click **Delete experiment across environments**. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5d5518b-Alternate_sort_order_-_Experiments.png",
        "Alternate_sort_order_-_Experiments.png",
        387,
        282,
        "#f4f4f4"
      ],
      "caption": "The experimentation edit menu."
    }
  ]
}
[/block]
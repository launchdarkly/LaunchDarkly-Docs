---
title: "Compare and copy flag settings"
excerpt: "Change the image of the compare button to the correct location. It is now in the ellipsis menu to the right of the sorting filter."
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how to use the **Compare** button on the dashboard to view flag configurations across different environments.
[block:api-header]
{
  "title": "Comparing flags across environments"
}
[/block]
You can compare flag configurations between two environments with the **Compare flags** button. Find it on the dashboard. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4fcc2ac-comparekabab.png",
        "comparekabab.png",
        1166,
        297,
        "#f4f4f4"
      ],
      "caption": "The dashboard with the Compare button called out."
    }
  ]
}
[/block]
To compare a flag, it must have at least two variations, one in each of the environments you wish to compare. 

To compare a flag:
1. Navigate to the dashboard and click **Compare.** The Compare flags screen appears. By default, the Source environment is set to the environment you are currently in.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/aa34324-Screen_Shot_2019-07-22_at_10.48.43_AM.png",
        "Screen Shot 2019-07-22 at 10.48.43 AM.png",
        1191,
        410,
        "#f7f7f7"
      ],
      "caption": "The Compare flags screen."
    }
  ]
}
[/block]
2. Choose an environment from the dropdown. Flags appear below the dropdown indicating the differences between the two variations. 
3. Click a flag's row to see more details about the two variations. This view is similar to a code diff. Current flag configuration appears on the left, and on the right, the proposed flag configuration. The proposed flag configuration is the flag variation from the source environment.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8715aef-Screen_Shot_2019-07-22_at_10.53.16_AM.png",
        "Screen Shot 2019-07-22 at 10.53.16 AM.png",
        1120,
        939,
        "#f6f8f7"
      ],
      "caption": "The flag comparison screen."
    }
  ]
}
[/block]
4. Select checkboxes to choose which settings you would like to copy over from the source environment.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/51a6a7e-Screen_Shot_2019-07-22_at_10_56_31_AM.png",
        "Screen_Shot_2019-07-22_at_10_56_31_AM.png",
        580,
        362,
        "#f8eeed"
      ],
      "caption": "The comparison screen with checkboxes called out."
    }
  ]
}
[/block]
5. Click **Copy Settings** to save the changes.
[block:callout]
{
  "type": "warning",
  "body": "You can copy all custom targeting rules simultaneously with the **Select all** checkbox. \n\nHowever, if one of your rules references a segment that does not exist in the target environment, you cannot copy any targeting rules. You will still be able to copy Targeting state, Prequisites, Individual user targets, Default rule, and fallback rule (\"If targeting is off, serve\").",
  "title": "Restrictions on custom targeting rules"
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b24b69c-Screen_Shot_2019-07-22_at_11.00.00_AM.png",
        "Screen Shot 2019-07-22 at 11.00.00 AM.png",
        731,
        319,
        "#b9b9b6"
      ],
      "caption": "The error message indicating that you cannot copy targeting rules."
    }
  ]
}
[/block]
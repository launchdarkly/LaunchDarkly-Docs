---
title: "Archiving and deleting flags"
excerpt: ""
---
## Overview
This topic explains how to archive flags you no longer need, or delete flags that are archived.

When a flag is no longer being served to users, and it is not a prerequisite of other flags, it may be time to archive it. Archiving a flag retires it from LaunchDarkly without deleting it. You can restore an archived flag if you need it, or find it to reference its configuration later. 

LaunchDarkly will not let you archive a flag that is a prerequisite of other flags. Flags are good candidates for archival when they are serving only one variation in the environment you choose and have not been requested in the last 7 days.

You can delete an archived flag after you determine that it will no longer be needed in your project.

## Archiving flags
To archive a flag:

1. Navigate to the flag dashboard.  
2. Find the flag you wish to archive and click **Archive**. The "Archive this flag?" screen appears. If the flag has dependencies, you cannot archive it. To learn how to resolve flag dependencies, read [Resolving dependencies](#resolving-dependencies).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/80fee1d-Screen_Shot_2019-08-12_at_4.16.23_PM.png",
        "Screen Shot 2019-08-
1. at 4.16.23 PM.png",
        791,
        313,
        "#fafafa"
      ],
      "caption": "A flag that cannot be archived due to dependencies."
    }
  ]
}
[/block]
3. Choose the environments your team or customers depend on to confirm you can archive the flag from those environments without unintended consequences. Verify that the flag is not in use by reviewing its states in the flag archive fields. 
<Callout intent="alert">
   <Callout.Title>Archiving a flag removes it from every environment in your project</Callout.Title>
   <Callout.Description>All flags exist in every environment for a project, but often only a few environments matter for your teams’ production processes. 
   
   Archiving a flag will remove it from every environment in the project. Be absolutely certain you can archive a flag without any unintended impact.</Callout.Description>
</Callout>

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e2a8272-Screen_Shot_2019-08-13_at_11.34.51_AM.png",
        "Screen Shot 2019-08-
1. at 11.34.51 AM.png",
        799,
        698,
        "#f8f8f8"
      ],
      "caption": "A flag with no dependencies that prevent it from being archived."
    }
  ]
}
[/block]
5. Type the flag's name in the "Archive flag" text box.
6. Click **Archive**. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/470d3f2-Screen_Shot_2019-08-13_at_11.35.59_AM.png",
        "Screen Shot 2019-08-
1. at 11.35.59 AM.png",
        797,
        705,
        "#f8f8f9"
      ],
      "caption": "The \"Archive this flag?\" screen."
    }
  ]
}
[/block]
The flag is archived and removed from the flag dashboard. You can find it in the archived flag list. To learn more, read [Viewing and restoring archived flags](#viewing-and-restoring-archived-flags).
<Callout intent="info">
  <Callout.Title>Archived flags serve their coded values if requested</Callout.Title>
   <Callout.Description>If users request a flag after you archive it, the flag value that returns is the value you defined in code.</Callout.Description>
</Callout>
Archived flags are indicated with a grey and white striped background.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6f12a9d-Screen_Shot_2019-08-12_at_4.05.58_PM.png",
        "Screen Shot 2019-08-
1. at 4.05.58 PM.png",
        1501,
        316,
        "#f9f9f9"
      ],
      "caption": "An archived flag."
    }
  ]
}
[/block]
You can also archive a flag from the flag's Settings page. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a435cc7-Screen_Shot_2019-08-12_at_4.07.45_PM.png",
        "Screen Shot 2019-08-
1. at 4.07.45 PM.png",
        769,
        165,
        "#f4f4f4"
      ],
      "caption": "The archive option on a flag's Settings page."
    }
  ]
}
[/block]

## <a name="resolving-dependendcies"></a>Resolving dependencies
You cannot archive flags that are prerequisites of other flags. If you attempt to archive a prerequisite flag, the "Archive this flag?" screen prevents you from doing so.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d01028a-Screen_Shot_2019-08-12_at_4.16.23_PM.png",
        "Screen Shot 2019-08-
1. at 4.16.23 PM.png",
        791,
        313,
        "#fafafa"
      ],
      "caption": "The \"Archive this flag?\" screen with dependencies that block it from being archived."
    }
  ]
}
[/block]
If the flag is a prerequisite of other flags, you cannot archive it. You must remove the flag as a prerequisite before you can archive it.

Other dependencies will not stop you from archiving a flag, but we recommend resolving all dependencies before you archive a flag. 

These dependencies are:
* The flag is serving multiple variations
* The flag has been requested in the last 7 days 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b99c856-Screen_Shot_2019-08-12_at_4.27.43_PM.png",
        "Screen Shot 2019-08-
1. at 4.27.43 PM.png",
        795,
        723,
        "#f7f8f8"
      ],
      "caption": "A flag with dependencies that do not block it from being archived."
    }
  ]
}
[/block]

## <a name="viewing-and-restoring-archived-flags"></a>Viewing and restoring archived flags
Archived flags are visible from the flag dashboard. Click the three-dot button to see an option to view them.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ff4e2d9-Screen_Shot_2019-08-13_at_11.14.04_AM.png",
        "Screen Shot 2019-08-
1. at 11.14.04 AM.png",
        376,
        212,
        "#eaf0ee"
      ],
      "caption": "The \"View archived flags\" option."
    }
  ]
}
[/block]
Archived flags appear on their own dashboard, which is indicated with grey and white stripes.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b13516c-Screen_Shot_2019-08-13_at_11.21.04_AM.png",
        "Screen Shot 2019-08-
1. at 11.21.04 AM.png",
        1486,
        460,
        "#f7f8f8"
      ],
      "caption": "The \"Archived feature flags\" screen."
    }
  ]
}
[/block]
To restore an archived flag:

1. Navigate to the "Archived feature flags" screen and find the flag you wish to restore.
2. Click **Restore**. The "Restore this flag?" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4712d98-Screen_Shot_2019-08-13_at_11_22_52_AM.png",
        "Screen_Shot_2019-08-13_at_11_22_52_AM.png",
        1499,
        93,
        "#fcf9f9"
      ],
      "caption": "An archived flag with the \"Restore\" button called out."
    }
  ]
}
[/block]
3. Confirm that the flag state is such that restoring the flag will have no unexpected consequences. 

<Callout intent="info">
  <Callout.Title>Restoring a flag means it will be evaluated again</Callout.Title>
   <Callout.Description>When you restore an archived flag, it returns to evaluation just like any other flag. This is why it is important to confirm that the flag will have no unexpected impact after you restore it.</Callout.Description>
</Callout>

4. Type the flag's name in the "Restore flag" text box.
5. Click **Restore**. The flag appears in the flag dashboard.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/238a48b-Screen_Shot_2019-08-13_at_11.23.10_AM.png",
        "Screen Shot 2019-08-
1. at 11.23.
1. AM.png",
        797,
        543,
        "#f7f7f7"
      ],
      "caption": "The \"Restore this flag?\" screen."
    }
  ]
}
[/block]
You can also restore an archived flag from the flag's Settings page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a095811-Screen_Shot_2019-08-13_at_11.26.20_AM.png",
        "Screen Shot 2019-08-
1. at 11.26.20 AM.png",
        402,
        162,
        "#f3f3f3"
      ],
      "caption": "The \"Restore flag\" section of the flag's Settings page."
    }
  ]
}
[/block]

## Deleting archived flags
After you archive a flag, you can delete it if you no longer need it. 

If you delete a flag, its rules will be deleted. Should it be requested again, the flag value defined in code will be returned for all users. Remove any references to the feature flag from your application code before you delete it.
<Callout intent="alert">
  <Callout.Title>Deleted flags are gone forever</Callout.Title>
   <Callout.Description>If you delete a flag, you cannot restore it. Be absolutely certain you do not need a flag anymore before you delete it.</Callout.Description>
</Callout>
To delete an archived flag:

1. Click on the **edit menu** button (three vertical dots) next to the **Flag +** button.
2. Click on the **View archived flags** dropdown. The "Archived feature flags" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d069faf-Screen_Shot_2019-11-08_at_1.28.40_PM.png",
        "Screen Shot 2019-11-08 at 1.28.40 PM.png",
        400,
        190,
        "#eff3f3"
      ],
      "caption": "The **Edit menu** with the **View archived flags** option selected."
    }
  ]
}
[/block]
3. Find the flag you wish to delete.
4. Click **Delete**. The "Delete this flag?" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6623b99-Screen_Shot_2019-08-12_at_4_43_05_PM.png",
        "Screen_Shot_2019-08-12_at_4_43_05_PM.png",
        1492,
        293,
        "#f7f6f6"
      ],
      "caption": "The \"Archived feature flags\" screen with the **Delete** button called out."
    }
  ]
}
[/block]
5. Type the flag's name in the checkbox to confirm.
6. Click **Delete**.

The flag is deleted permanently.
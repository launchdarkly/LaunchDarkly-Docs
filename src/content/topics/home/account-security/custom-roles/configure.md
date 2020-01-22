---
title: "Configuring custom roles"
excerpt: ""
---
## Overview

This topic explains how to create and implement custom roles and policies in LaunchDarkly.

Custom roles are very flexible. You can create a custom role with broad or precise permissions and apply it to one or more members in your team. 

To configure a custom role:

1. [Create a custom role](#creating-a-custom-role)
2. [Create one or more policies for that custom role](#creating-policies-for-roles-and-resources) 
3. [Give one or more team members to that custom role](#giving-a-member-a-custom-role)

## <a name="creating-a-custom-role"></a>Creating a custom role

Before you can give a team member custom permissions in LaunchDarkly, you must create a custom role to give them.

To create a custom role:

1. Navigate to **Account Settings**.
2. Click into the **Roles** tab.
3. Click **New Role**. The "Create a role" screen appears.
4. Enter a human-readable **Name** for the role.
5. Enter a **Key** for the role.
6. (Optional) Enter a **Description** to explain what the role does.
7. (Optional) Create a policy in the "Policy" fields.
8. Click **Save Role**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ab92200-Screen_Shot_2019-06-28_at_2.42.34_PM.png",
        "Screen Shot 2019-06-28 at 2.42.34 PM.png",
        645,
        726,
        "#fafafb"
      ],
      "caption": "The \"Create a role\" screen."
    }
  ]
}
[/block]

## Editing existing custom roles

Edit an existing policy at any time by clicking the **pencil icon** or add a new policy by clicking **Add statement**.

To edit a custom role:

1. Navigate to **Account Settings**.
2. Click into the **Roles** tab and find the role you wish to edit.
3. Click **Edit**. The "Edit [your role's name]" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6ed9a1a-Screen_Shot_2019-06-28_at_3.57.09_PM.png",
        "Screen Shot 2019-06-28 at 3.57.09 PM.png",
        1057,
        65,
        "#fcfcfc"
      ],
      "caption": "The Edit button on a custom role."
    }
  ]
}
[/block]
4. Change whatever features of the role you wish.
5. Click **Save.**

## Deleting custom roles

Delete a custom role from the Account Settings page. 

To delete a custom role:

1. Navigate to **Account Settings**.
2. Click into the **Roles** tab and find the role you wish to edit.
3. Click **Edit**. The "Edit [your role's name]" screen appears.
4. Click **Delete Role**. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b60367d-Screen_Shot_2019-06-28_at_4.07.05_PM.png",
        "Screen Shot 2019-06-28 at 4.07.05 PM.png",
        350,
        152,
        "#faf9f9"
      ],
      "caption": "The Delete Role button."
    }
  ]
}
[/block]

## <a name="creating-policies-for-roles-and-resources"></a>Creating policies for roles and resources

Policies are sets of actions a custom role is allowed or not allowed to take. You can create policies from the **Roles** tab.

<Callout intent="info">
  <Callout.Title>Write policies by hand in the Advanced editor</Callout.Title>
   <Callout.Description>Advanced users can write custom policies of their own with the Advanced editor. 
To learn more about writing your own policies, read [Policies in custom roles](./policies-in-custom-roles).</Callout.Description>
</Callout>

To create a policy:


1. Complete the steps in [Creating a custom role](#creating-a-custom-role).
2. In the "Create a role" screen, click into the **Resources** field.
3. Specify a resource this policy affects.
 <Callout intent="info">
  <Callout.Title>The Resource Finder can help</Callout.Title>
   <Callout.Description>Click **Resource finder** to choose projects, feature flags, environments, metrics, and roles to add to your policy.</Callout.Description>
 </Callout>

4. Choose an **Effect** from the dropdown. 
5. Choose one or more **Actions** for the policy to enforce.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/babc759-Screen_Shot_2019-06-28_at_2.44.15_PM.png",
        "Screen Shot 2019-06-28 at 2.44.15 PM.png",
        624,
        502,
        "#f6f7f8"
      ],
      "caption": "The Actions dropdown with some options selected."
    }
  ]
}
[/block]
6. Click **Update**. The results of your policy display.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/00e5d66-Screen_Shot_2019-06-28_at_2.58.57_PM.png",
        "Screen Shot 2019-06-28 at 2.58.57 PM.png",
        618,
        204,
        "#f7f7f7"
      ],
      "caption": "A custom policy."
    }
  ]
}
[/block]

## <a name="giving-a-member-a-custom-role"></a>Giving a member a custom role

After you have created a custom role and policies for it, you must give that role to all members to whom you wish it to apply. 

To give a member a custom role:

1. Navigate to **Account Settings**.
2. Click into the **Team** tab and find the team member you wish to give a custom role.
3. Click **Edit** beside that team member's name. The member's Settings page opens.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f70ce13-Screen_Shot_2019-07-08_at_3.03.39_PM.png",
        "Screen Shot 2019-07-08 at 3.03.39 PM.png",
        450,
        473,
        "#f9f9fa"
      ],
      "caption": "The member's Settings page."
    }
  ]
}
[/block]
4. Click the member's **Role**. A dropdown menu expands.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a3b0d8e-Screen_Shot_2019-07-08_at_3.01.55_PM.png",
        "Screen Shot 2019-07-08 at 3.01.55 PM.png",
        451,
        196,
        "#c7ced8"
      ],
      "caption": "The Role dropdown menu."
    }
  ]
}
[/block]
5. Choose **Custom** from the dropdown. All available custom roles appear with checkboxes beside them.
6. Choose all custom roles you wish to give the member.
7. Click **Save Member**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a0153f7-Screen_Shot_2019-07-08_at_3.02.26_PM.png",
        "Screen Shot 2019-07-08 at 3.02.26 PM.png",
        448,
        463,
        "#f5f7f7"
      ],
      "caption": "Custom roles given to the member."
    }
  ]
}
[/block]

<Callout intent="alert">
  <Callout.Title>Add members individually</Callout.Title>
   <Callout.Description>You must add a custom role to one member at a time. You may not apply a role to multiple members simultaneously. \n\nFor example, if you wish to add a role for the QA team, you must find each QA team member and add the role to each member individually.</Callout.Description>
</Callout>

## Viewing custom role details

You can see details about a specific custom role by clicking the role where it appears in the LaunchDarkly UI. More information is available on the "Role policy details" screen.

To view details for custom roles from the **Roles** tab:


1. Navigate to **Account Settings** and click into the **Roles** tab.
2. Find the role with details you wish to view and click **Details**. The "Role policy details" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3b36970-Screen_Shot_2019-10-24_at_11_15_33_AM.png",
        "Screen_Shot_2019-10-24_at_11_15_33_AM.png",
        2162,
        114,
        "#f8f2f4"
      ],
      "caption": "A role's entry in the **Roles** tab with the **Details** button called out."
    }
  ]
}
[/block]
To view details for custom roles from other parts of the LaunchDarkly UI, click a custom role's name to open the "Role policy details" screen.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a1e95bc-Screen_Shot_2019-10-24_at_10_53_27_AM.png",
        "Screen_Shot_2019-10-24_at_10_53_27_AM.png",
        1081,
        68,
        "#f9edee"
      ],
      "caption": "A member's entry in the **Team** tab with their custom roles called out."
    }
  ]
}
[/block]
Use the "Role policy details" screen to view detailed information about a custom role, including which projects and feature flags the role has permission to modify. You can also see each action the custom role can perform and what that action does.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2cf01fa-Screen_Shot_2019-10-24_at_10.54.21_AM.png",
        "Screen Shot 2019-10-24 at 10.54.21 AM.png",
        519,
        471,
        "#f8f9f9"
      ],
      "caption": "The \"Role policy details\" screen.\""
    }
  ]
}
[/block]

<Callout intent="info">
  <Callout.Title>\"Role policy details\" is for custom roles only</Callout.Title>
   <Callout.Description>The \"Role policy details\" screen is only available for custom roles. It won't open if you click on a default `reader`, `writer`, or `admin` role.</Callout.Description>

</Callout>

## Removing a custom role from a member

If a team member changes function or needs their permissions modified, you can remove a custom role from them at any time. 

To remove a custom role from a member:

1. Navigate to **Account Settings**.
2. Click into the **Team** tab and find the team member you wish to remove a custom role from.
3. Click **Edit** beside that team member's name. The member's Settings page opens.
4. Deselect the checkboxes for the roles you wish to remove from the member. 
5. (Optional) If you wish to return the member to a standard role, choose **Reader**, **Writer**, or **Admin / Owner** from the **Role** dropdown.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/96f3847-Screen_Shot_2019-07-08_at_3.01.55_PM.png",
        "Screen Shot 2019-07-08 at 3.01.55 PM.png",
        451,
        196,
        "#c7ced8"
      ],
      "caption": "The Role dropdown menu."
    }
  ]
}
[/block]
6. Click **Save Member**.
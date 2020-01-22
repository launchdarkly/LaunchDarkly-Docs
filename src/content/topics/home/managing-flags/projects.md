---
title: "Projects"
excerpt: ""
---
## Overview
This topic explains what projects are in LaunchDarkly, and how you can use them to manage different priorities, teams, and tasks across your organization.
## Understanding projects
Projects let you manage multiple different business objectives from one LaunchDarkly account. For example, you can create one project called *Mobile App* and another project called *Web App*.  Every project has its own unique set of environments and feature flags. 

Environments are organizational units contained within a project. To learn more, read [Environments](./environments).

Set up a project to serve one set of end users. Sorting your flags into related chunks of functionality based on their impact on end users helps you logically organize related flags.
<Callout intent="info">
  <Callout.Title>Creating private projects</Callout.Title>
   <Callout.Description>You can restrict who has access to a project with LaunchDarkly's custom roles feature. 
To learn more, read [Configuring private projects with custom roles](./configuring-private-projects-with-custom-roles).</Callout.Description>
</Callout>

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/HWUYxwyTsydZn67km7c7_Projects.jpg",
        "Projects.jpg",
        "1687",
        "949",
        "#f7ece5",
        ""
      ],
      "caption": "A visual representation of two projects, \"Web App\" and \"Mobile App,\" each of which have multiple environments."
    }
  ]
}
[/block]
Your LaunchDarkly account supports an unlimited number of projects, environments, flags, and server-side Monthly Active Users (MAU). If you are on a **legacy Starter plan**, your account may be limited to two projects and two environments. Contact our Support team at support@launchdarkly.com to remove those restrictions.
## Creating new projects
When you first create your LaunchDarkly account, you will start with a *Default* project, and all team members in your account will have access to every project within your account by default. Your current project is visible in the top of the sidebar.  You must always have at least one project. 


1. Navigate to the **Account Settings** page.
2. Click **New Project**. The "Create a project" screen appears.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2aff574-Screen_Shot_2019-08-06_at_2_32_30_PM.png",
        "Screen_Shot_2019-08-06_at_2_32_30_PM.png",
        1091,
        252,
        "#f5f5f4"
      ],
      "caption": "The Account settings page with the New Project button called out."
    }
  ]
}
[/block]
3. Give your project a human-readable **Name**. 
4. (Optional) Give your project a unique **Key**. This field populates automatically based on your name, but you can change it now if you wish.
<Callout intent="alert">
  <Callout.Title>Project keys are permanent after you save them</Callout.Title>
   <Callout.Description>After you save the project key, you cannot modify it. You can change a project's name, however, whenever you want.</Callout.Description>
</Callout>
5. (Optional) Assign **tags** to your project.
6. (Optional) Check the **Make new flags available to client-side SDKs by default** checkbox to make all flags created in this environment available on the client side. To learn more, read [Other flag settings](./other-flag-settings). 
7. Click **Save Project**. The new project appears in the Account Settings page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5f5d4be-Screen_Shot_2019-08-06_at_2.31.34_PM.png",
        "Screen Shot 2019-08-06 at 2.31.34 PM.png",
        462,
        464,
        "#f2f4f5"
      ],
      "caption": "The Create a project screen."
    }
  ]
}
[/block]

## Projects and environments
You can create multiple environments within each project. All projects must have at least one environment. 

Environments allow you to manage your feature flags throughout your entire development lifecycle, from local development through production. Typical environments within a project could be Production, QA, Staging, or individual environments.

To learn more, read [Environments](./environments).
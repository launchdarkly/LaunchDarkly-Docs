---
title: "Custom roles"
excerpt: ""
---
[block:callout]
{
  "type": "info",
  "title": "This feature requires an enterprise plan",
  "body": "Custom roles are only available to customers on our enterprise plans. \n\nTo learn more about enterprise plans, contact [sales@launchdarkly.com](mailto:sales@launchdarkly.com?Subject=Custom%20roles)."
}
[/block]

[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains what custom roles are and how to create them.

Custom roles give you fine-grained access control to everything in LaunchDarkly, from feature flags to metrics, environments, and teams. With custom roles, it's possible to enforce access policies that meet your exact workflow needs. 
[block:api-header]
{
  "title": "Concepts"
}
[/block]
LaunchDarkly's role-based permission system provides global access control levels for team members based on a set of built-in roles. The built-in roles are:
* reader
* writer
* admin / owner

If you're on an enterprise plan, you can also create flexible policies that cut across your entire project called **custom roles**. 

With custom roles, you can:
* Restrict view access for a project to a group of members. This has the effect of locking the project to only the members you specify. If a member cannot view a project, they cannot modify or configure any of the resources within it, including feature flags.
* Lock your production environment down to a small set of trusted users
* Differentiate infrastructure-level feature flags (controlled by your devOps team) from experiments (controlled by product management or marketing)
* Allow team members to control feature flags on environments that are designated for their team only

Our custom role system is inspired by [AWS Identity and Access Management (IAM)](https://aws.amazon.com/iam/), so if you're familiar with IAM, you'll see a few similarities.
[block:api-header]
{
  "title": "Using custom roles"
}
[/block]
Implementing custom roles is a three step process. You must create the role itself, define actions that role can and cannot take by writing a policy, and finally give the role to one or more users.

To implement a custom role:
1. Create a custom role
2. Create one or more policies for that custom role
3. Give one or more users that custom role

To learn more, read [Configuring custom roles](doc:configuring-custom-roles).

Custom roles are extremely configurable. The other topics in this section give more details about writing custom roles and the policies that power them. 

To learn more about configuring custom roles, read the following topics:
* [Resources in custom roles](doc:resources-in-custom-roles) 
* [Tags in custom roles](doc:tags-in-custom-roles) 
* [Actions in custom roles](doc:actions-in-custom-roles) 
* [Policies in custom roles](doc:policies-in-custom-roles)
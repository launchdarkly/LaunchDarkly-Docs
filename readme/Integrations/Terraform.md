---
title: "Terraform"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains what the LaunchDarkly Terraform provider is, what you can use it for, and where to find additional documentation for it. 

Use the LaunchDarkly Terraform provider to manage LaunchDarkly resources as Terraform resources. This allows you to use Terraform scripts to configure and control feature flags, environments, projects, and more.

You do not have to choose between the LaunchDarkly UI and the Terraform provider. You can use a hybrid of both if that meets your needs better. It may make sense to manage one set of LaunchDarkly resources through the Terraform provider, and another set through the UI. For example, you could designate a group of flags to update and configure only through the Terraform provider.
[block:callout]
{
  "type": "info",
  "title": "The Terraform provider and custom roles",
  "body": "A common scenario is to use custom roles to define the LaunchDarkly entities that are managed by Terraform. For example, you can tag Terraform-managed resources with a `terraform` tag, and use custom roles to prevent team members from modifying those resources via the LaunchDarkly UI.\n\nTo learn more about custom roles, read [Custom roles](doc:custom-roles)."
}
[/block]

[block:api-header]
{
  "title": "Using the Terraform provider"
}
[/block]
See the [LaunchDarkly Terraform provider documentation](https://terraform.io/docs/providers/launchdarkly/index.html) hosted on Terraform's site.
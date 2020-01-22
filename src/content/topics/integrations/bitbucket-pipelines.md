---
title: "Bitbucket Pipelines"
excerpt: ""
---
## Overview
This topic explains how to create and enable feature flags using Bitbucket Pipelines. 

The LaunchDarkly integration lets you insert feature flag actions directly into your Pipeline's continuous delivery flow. [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) is a continuous delivery platform that lets your team build, test, and deploy from Bitbucket. It exists within Bitbucket, giving you end-to-end visibility from coding to deployment. 

We provide two scripts you can add to your pipelines:
* **Create feature flags in your Pipelines build**: This lets you create feature flags within a specified project. The feature flag will be created in all environments for that project.
* **Enable a feature flag in your Pipelines build**: This lets you turn on a specific feature flag for a specific environment within a project.
## Prerequisites
To use the LaunchDarkly Bitbucket Pipelines integration, you must meet the following prerequisites:

* [A Bitbucket account](https://bitbucket.org/account/signup/)
* [Bitbucket Pipelines (Beta)](https://bitbucket.org/product/features/pipelines) installed on your Bitbucket account 
* A Github account
## Creating feature flags in your Pipelines build
You can configure a Bitbucket Pipeline step to create a set of feature flags in LaunchDarkly as part of your build process.

To set up your Bitbucket Pipeline with LaunchDarkly:

1. Copy the `create-launchdarkly-flags.sh` shell script from our [Bitbucket repository](https://bitbucket.org/launchdarkly/launchdarkly-pipelines/src).
2. Add `create-launchdarkly-flags.sh` to your Pipelines build configuration.
3. Add two environment variables to your Pipelines settings:
    * `LAUNCHDARKLY_ACCESS_TOKEN`: Copy your API access token from the [Authorizations tab](https://app.launchdarkly.com/settings#/tokens).
    * `LAUNCHDARKLY_PROJECT_KEY`: Copy your project key from your [LaunchDarkly Projects tab](https://app.launchdarkly.com/settings#/projects).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bc30ae8-ld_access.jpg",
        "ld_access.jpg",
        1800,
        1147,
        "#f9f9f9"
      ],
      "caption": "The Account settings screen with the Access Tokens tab selected."
    }
  ]
}
[/block]

<Callout intent="alert">
  <CalloutTitle>Do not use the LaunchDarkly environment key</CalloutTitle>
   <CalloutDescription>Be careful to use the LaunchDarkly **project key** in the Bitbucket Pipelines settings, not the environment key. 
The screenshot below calls out both the project and environment keys.</CalloutDescription>
</Callout>

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2d02626-projenv.jpg",
        "projenv.jpg",
        1800,
        922,
        "#3c992d"
      ],
      "caption": "The Projects screen with the project key and environment keys called out."
    }
  ]
}
[/block]
4. Add an `ld-flags.conf` file to your repository and declare flags in it. 

When your Pipelines build runs, any feature flags you declare in this file is also created in LaunchDarkly.
## Enabling a feature flag in your Pipelines build
You can configure a Pipeline step that enables an existing feature flag in an environment as part of your build. 

To enable feature flags with Bitbucket Pipelines:

1. Copy the `enable-launchdarkly-flags.sh` shell script from our [Bitbucket repository](https://bitbucket.org/launchdarkly/launchdarkly-pipelines/src).
2. Add `enable-launchdarkly-flags.sh` to your Pipelines build configuration.
3. Add these environment variables to your Pipelines settings:
    * `LAUNCHDARKLY_ACCESS_TOKEN`: Copy your API access token from the [Authorization tab](https://app.launchdarkly.com/settings#/tokens).
    * `LAUNCHDARKLY_PROJECT_KEY`: Copy your project key from your [LaunchDarkly Projects tab](https://app.launchdarkly.com/settings#/projects).
    * `LAUNCHDARKLY_ENVIRONMENT_KEY`: Copy your environment key from your [LaunchDarkly Projects tab](https://app.launchdarkly.com/settings#/projects).
    * `LAUNCHDARKLY_FLAG_KEY`: Enter the key for the feature flag you wish to enable.
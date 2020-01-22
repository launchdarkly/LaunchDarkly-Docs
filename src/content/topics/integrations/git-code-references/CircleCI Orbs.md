---
title: "CircleCI Orbs"
excerpt: ""
---
## Overview
This topic explains how you can use the `ld-find-code-refs` utility with CircleCI to automatically populate code references in LaunchDarkly.
## Prerequisites
To complete this procedure, you must have the following prerequisites:

* A personal API access token with `writer` permissions. To learn more, read [Personal API access tokens](./api-access-tokens).
* The LaunchDarkly [CircleCI Orb](https://circleci.com/orbs/registry/orb/launchdarkly/ld-find-code-refs).
<Callout intent="info">
  <Callout.Title>Circle Workflow version 2.1 or higher is required</Callout.Title>
   <Callout.Description>To use CircleCI Orbs, you must be using a Circle Workflow version of 2.1 or higher.
If you're using an earlier version, try manually using the utility [binary or docker image](https://github.com/launchdarkly/ld-find-code-refs/tree/master/README.md#execution-via-cli) to create your own workflow job.

## Setting up the LaunchDarkly CircleCI integration
To set up the LaunchDarkly orb in CircleCI:

1. Save your personal API access token as an environment variable titled `LD_ACCESS_TOKEN` in your CircleCI project settings. To learn more, read [CircleCI's documentation](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project).
2. Create a YAML file in CircleCI with configuration including LaunchDarkly's Orb.
Here's an example minimal configuration using LaunchDarkly's Orb:
[block:code]
{
  "codes": [
    {
      "code": "version: 2.1
orbs:\n  launchdarkly: launchdarkly/ld-find-code-refs@0.5.0
workflows:\n  main:\n    jobs:\n      - launchdarkly/find-code-references:\n          proj_key: $YOUR_LAUNCHDARKLY_PROJECT_KEY\n          repo_type: github # can be 'github', 'bitbucket', or 'custom'\n          repo_url: $YOUR_REPO_URL # used to generate links to your repository in the LaunchDarkly webapp",
      "language": "yaml"
    }
  ]
}
[/block]

## Additional configuration options
You can learn more about configuration options in CircleCI's documentation. To learn more, read [Explore Orbs / launchdarkly/ld-find-code-refs](https://ld.click/CircleCIOrbs).
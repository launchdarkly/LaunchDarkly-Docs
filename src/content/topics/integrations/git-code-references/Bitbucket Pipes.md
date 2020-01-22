---
title: "Bitbucket Pipes"
excerpt: ""
---
## Overview
This topic explains how to use the `ld-find-code-refs` utility with Bitbucket Pipes to create code references in LaunchDarkly.

You can use the [`ld-find-code-refs`](https://github.com/launchdarkly/ld-find-code-refs/) utility with [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) to automatically populate code references in LaunchDarkly. To do this, you must create a Pipes configuration using LaunchDarkly's [code reference pipe](https://bitbucket.org/launchdarkly/ld-find-code-refs-pipe).
## Prerequisites
To set up Bitbucket Pipes, you have the following prerequisite:

* A Bitbucket Pipelines configuration file. To create one, navigate to the Pipelines section of your Bitbucket repository.
* A personal API access token with `writer` permissions. To learn more, read [Personal API access tokens](./api-access-tokens).
<Callout intent="info">
  <CalloutTitle>Personal API tokens can also use custom roles</CalloutTitle>
   <CalloutDescription>Alternatively, you can give the access token access to a custom role with the `code-reference-repository` resource specifier. 
To learn more, read [Custom roles](./custom-roles).</CalloutDescription>
</Callout>

## Setting up the Pipes configuration
To set up the Bitbucket Pipes configuration:


1. Create a new Pipeline configuration in your Bitbucket repository.
2. Configure the Pipeline to run on `push` using the `default` configuration. Include the following variables:
* `LD_ACCESS_TOKEN`: This secured variable should be your personal API access token.
* `LD_PROJ_KEY`: This should be your LaunchDarkly project key.

Here's an example of a minimal Pipeline configuration:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6911c41-Screen_Shot_2019-01-17_at_12.13.47_PM.png",
        "Screen Shot 2019-01-
1. at 12.13.47 PM.png",
        1353,
        711,
        "#f8f9fa"
      ],
      "caption": "An example Pipeline configuration."
    }
  ]
}
[/block]
You can copy and paste the following code into a blank Pipelines configuration if you have set the `LD_PROJ_KEY` and `LD_ACCESS_TOKEN` environment variables as repository variables:
[block:code]
{
  "codes": [
    {
      "code": "pipelines:\n  default:\n    - step:\n        script:\n          - pipe: launchdarkly/ld-find-code-refs-pipe:1.0.0\n            environment:\n              LD_ACCESS_TOKEN: $LD_ACCESS_TOKEN\n              LD_PROJ_KEY: $LD_PROJ_KEY\n",
      "language": "yaml"
    }
  ]
}
[/block]
To learn more about repository variables, read [Atlassian's documentation](https://confluence.atlassian.com/bitbucket/variables-in-pipelines-794502608.html).

3. Confirm that the pipeline is working by creating a new pull request with the workflow file and visiting the Pipelines page on your repository's webpage. If your pipeline fails, there may be a problem with your configuration. To investigate, check the pipeline's logs to view any error messages.
## Pipeline configuration
The [code reference pipe](https://bitbucket.org/launchdarkly/ld-find-code-refs-pipe) may be configured with additional environment variables to enable more functionality.
[block:parameters]
{
  "data": {
    "h-0": "Variable",
    "h-1": "Description",
    "h-2": "Required",
    "h-3": "Required",
    "0-2": "Yes.",
    "1-2": "Yes.",
    "2-2": "no",
    "3-2": "no",
    "4-2": "no",
    "0-0": "`LD_ACCESS_TOKEN`",
    "0-1": "**Required**.
A LaunchDarkly personal access token with writer-level access, or access to the `code-references` [custom role](./custom-roles) resource. 
Supply this as a secured environment variable.",
    "1-0": "`LD_PROJ_KEY`",
    "1-1": "**Required**.
A LaunchDarkly project key. The flag parser searches this project for code references in this project.",
    "2-1": "**Optional**.
A regular expression (PCRE) defining the files, file types, and directories which the flag finder should exclude.
Examples: `vendor/`, `vendor/.*`, `.*\\.css`",
    "2-0": "`LD_EXCLUDE`",
    "3-0": "`LD_CONTEXT_LINES`",
    "3-1": "**Optional**.
The number of context lines above and below a code reference for the flag parser to send to LaunchDarkly.
If `< 0`, no source code is sent to LaunchDarkly. 
If `0`, only the lines containing flag references are sent. 
If `> 0`, sends that number of context lines above and below the flag reference. 
A maximum of 5 context lines may be provided. Defaults to 2.",
    "4-0": "`LD_BASE_URI`",
    "4-1": "**Optional**.
Set the base URL of the LaunchDarkly server for this configuration. Defaults to https://app.launchdarkly.com.",
    "5-0": "`LD_DEBUG`",
    "5-1": "**Optional**.\nEnables verbose default logging. Defaults to `false`.",
    "5-2": "no",
    "6-0": "`LD_DELIMITERS`",
    "6-1": "**Optional**.
Specifies additional delimiters used to match flag keys. Must be a non-control ASCII character. 
If more than one character is provided in delimiters, each character will be treated as a separate delimiter. Will only match flag keys with surrounded by any of the specified delimeters. This option may also be specified multiple times for multiple delimiters. 
By default, only flags delimited by single-quotes, double-quotes, and backticks will be matched. 
Default: `[\" ' `]`.",
    "6-2": "O"
  },
  "cols": 2,
  "rows": 7
}
[/block]
---
title: "GitHub Actions"
excerpt: ""
---
## Overview
This topic explains how to use the [`ld-find-code-refs`](https://github.com/launchdarkly/ld-find-code-refs/) utility with [GitHub Actions](https://github.com/features/actions) to automatically populate code references in LaunchDarkly.
## Prerequisites
To complete this procedure, you must have the following prerequisites:

* A personal API access token with `writer` permissions, stored as a repository secret titled `LD_ACCESS_TOKEN`. To learn more, read [Personal API access tokens](./api-access-tokens). 
## Setting up GitHub Actions
To set up 


1. Log into GitHub and navigate to your repo.
2. Navigate to **Settings** > **Secrets** and click **Add a new secret**.  
3. Paste in your access token to the field that appears and click **Save secret**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2f9ba98-secret-configuration.png",
        "secret-configuration.png",
        3584,
        2278,
        "#e5e9e9"
      ],
      "caption": "GitHub's secret configuration screen."
    }
  ]
}
[/block]
4. Return to your GitHub repository to create a new Actions workflow. 
 * **If you already have a `action.yml` file**: Copy and paste the `launchDarklyCodeReferences` job declaration below into the jobs section in your `action.yml` file. 
 * **If you don't already have a workflow file:** Create a new file titled `action.yml` in the `.github/workflows` directory of your repository. Paste the following code in the **Edit file** section:
[block:code]
{
  "codes": [
    {
      "code": "on: push\nname: Example Workflow\njobs:\n  launchDarklyCodeReferences:\n    name: LaunchDarkly Code References\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v1\n    - name: LaunchDarkly Code References\n      uses: launchdarkly/find-code-references@v3\n      env:\n        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n        LD_ACCESS_TOKEN: ${{ secrets.LD_ACCESS_TOKEN }}\n        LD_PROJ_KEY: YOUR_PROJECT_KEY",
      "language": "yaml"
    }
  ]
}
[/block]

<Callout intent="info">
   <Callout.Title>Best practices for configuring an Actions file</Callout.Title>
   <Callout.Description>We strongly recommend that you update the second `uses` attribute value to reference the latest tag in the [launchdarkly/find-code-references](https://github.com/launchdarkly/find-code-references) repository. 
This pins your workflow to a particular version of the launchdarkly/find-code-references action.</Callout.Description>
</Callout>
5. Commit this file under a new branch and submit as a PR to your code reviewers to be merged into your master branch. 
<Callout intent="info">
<Callout.Title>Code references are not blocked by PR approval</Callout.Title>
   <Callout.Description>You do not need to have this branch merged into the master branch for code references to appear in the LaunchDarkly UI; code references will appear for this newly created branch.</Callout.Description>

</Callout>
As shown in the example above, the workflow should run on the `push` event and contain an action provided by the [launchdarkly/find-code-references](https://github.com/launchdarkly/find-code-references) repository. 

Include both the `LD_ACCESS_TOKEN` as a secret and a new environment variable containing your LaunchDarkly project key.
## Troubleshooting
Once your workflow is created, the best way to confirm that the workflow is executing correctly is to create a new pull request with the workflow file and verify that the newly created action succeeds.

If the action fails, there may be a problem with your configuration. To investigate, review the action's logs to view any error messages.
## Additional configuration options
You can configure `ld-find-code-refs` with additional environment variables to enable more functionality.
[block:parameters]
{
  "data": {
    "h-0": "Variable",
    "h-1": "Description",
    "h-2": "Required",
    "h-3": "Required",
    "0-0": "`LD_ACCESS_TOKEN`",
    "0-1": "A LaunchDarkly personal access token with writer-level access, or access to the `code-reference-repository` [custom role](./custom-roles) resource. Supply this as a GitHub repository secret.",
    "0-3": "yes",
    "1-0": "`LD_PROJ_KEY`",
    "1-1": "A LaunchDarkly project key. The flag finder searches this project for code references in this project.",
    "1-3": "yes",
    "2-0": "`LD_EXCLUDE`",
    "2-1": "A regular expression (PCRE) defining the files and directories which the flag finder should exclude. Partial matches are allowed. 
Examples: `vendor/`, `vendor/.*`",
    "2-3": "no",
    "3-0": "`LD_CONTEXT_LINES`",
    "3-1": "The number of context lines above and below a code reference for the flag finder to send to LaunchDarkly. 
If < 0, no source code will be sent to LaunchDarkly. 
If 0, only the lines containing flag references will be sent. 
If > 0, will send that number of context lines above and below the flag reference. 
A maximum of 5 context lines may be provided. Defaults to 2.",
    "3-2": "no",
    "3-3": "no",
    "4-0": "`LD_BASE_URI`",
    "4-1": "Set the base URL of the LaunchDarkly server for this configuration. Defaults to https://app.launchdarkly.com.",
    "4-3": "no",
    "4-2": "no",
    "0-2": "yes",
    "1-2": "yes",
    "2-2": "no",
    "5-0": "`LD_DEBUG`",
    "5-2": "no",
    "5-1": "Enables verbose default logging. Defaults to `false`.",
    "6-0": "`LD_DELIMITERS`",
    "6-1": "Specifies additional delimiters used to match flag keys. Must be a non-control ASCII character. If you provide more than one character in delimiters, each character is treated as a separate delimiter. \nThis only matches flag keys surrounded by any of the specified delimeters. 
You can also specify this option multiple times for multiple delimiters. By default, only flags delimited by single-quotes, double-quotes, and backticks are matched. 
Default: `[\" ' `]`.",
    "6-2": "no"
  },
  "cols": 3,
  "rows": 7
}
[/block]
Here's an example of a workflow configured to exclude the vendor directory and send 1 line of context above and below each code reference for each flag in the `default` project:
[block:code]
{
  "codes": [
    {
      "code": "on: push\nname: Example Workflow\njobs:\n  launchDarklyCodeReferences:\n    name: LaunchDarkly Code References\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v1\n    - name: LaunchDarkly Code References\n      uses: launchdarkly/find-code-references@v3\n      env:\n        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n        LD_ACCESS_TOKEN: ${{ secrets.LD_ACCESS_TOKEN }}\n        LD_PROJ_KEY: YOUR_PROJECT_KEY\n        LD_EXCLUDE: \"vendor/\"\n        LD_CONTEXT_LINES: \"1\"\n",
      "language": "yaml"
    }
  ]
}
[/block]
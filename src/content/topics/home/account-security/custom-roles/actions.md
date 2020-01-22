---
title: "Actions in custom roles"
excerpt: ""
---
## Overview

This topic explains how to use actions to write policies for custom roles. These actions are scoped by resource type. 

To learn more about policies in custom roles, read:

* [Policies in custom roles](./policies-in-custom-roles) 
* [Example policies](./example-policies)

Each resource has a set of actions associated with it that represent changes that you can make to that resource. For example, feature flags have actions like `createFlag`, `deleteFlag`, `updateName`, and more.

Action names generally begin with `create`, `update`, or `delete`. 

To learn more about resources, read [Resources in custom roles](./resources-in-custom-roles).

You can specify actions in bulk using glob syntax. For example, you can describe all modifications to feature flags with the action specifier `update*`.

## Actions reference

### Account actions

[block:parameters]
{
  "data": {
    "h-0": "Action",
    "h-1": "Description",
    "0-0": "`updateOrganization`",
    "0-1": "Update the organization name",
    "1-0": "`updateSubscription`",
    "1-1": "Change the pricing plan (e.g. Startup / Team / Growth) for the account",
    "2-0": "`updatePaymentCard`",
    "2-1": "Change the credit card for the account",
    "3-0": "`updateRequireMfa`",
    "3-1": "Change whether multi-factor authentication (MFA) is required for all users on the account",
    "4-0": "`updateAccountToken`",
    "4-1": "Modify account tokens (for the [LaunchDarkly REST API](http://apidocs.launchdarkly.com/docs/authentication))",
    "5-0": "`updateSessionRefresh`",
    "6-0": "`updateSessionDuration`",
    "7-0": "`revokeSessions`",
    "7-1": "Revoke all user sessions (logs out all users)",
    "6-1": "Change the time a user session will remain active before the user has to re-authenticate",
    "5-1": "Change whether sessions are refreshed automatically"
  },
  "cols": 2,
  "rows": 8
}
[/block]

### Members actions

`member` is a top-level action. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "member/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [Managing teams](./teams).
[block:parameters]
{
  "data": {
    "0-0": "`createMember`",
    "0-1": "Add a new team member to an account",
    "1-0": "`updateRole`",
    "1-1": "Update a team member's built-in roles (reader, writer, or admin)",
    "2-0": "`updateCustomRole`",
    "2-1": "Update a team member's custom roles",
    "3-0": "`deleteMember`",
    "3-1": "Remove a team member from an account",
    "h-0": "Action",
    "h-1": "Description",
    "4-0": "`sendMfaRequest`",
    "5-0": "`sendMfaRecoveryCode`",
    "4-1": "Send a team member a request to enable MFA",
    "5-1": "Send a team member their MFA recovery code"
  },
  "cols": 2,
  "rows": 6
}
[/block]

### Tokens actions

`token` is a child resources of **members**. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "member/*:token/*",
      "language": "text"
    }
  ]
}
[/block]
To learn more, read [Personal API access tokens](./api-access-tokens).
[block:parameters]
{
  "data": {
    "0-0": "`createAccessToken`",
    "0-1": "Create a personal access token",
    "1-0": "`updateAccessTokenPolicy`",
    "1-1": "Change the policy filter of a personal access token",
    "2-0": "`updateAccessTokenName`",
    "2-1": "Change the name of a personal access token",
    "3-0": "`updateAccessTokenDescription`",
    "3-1": "Change the description of a personal access token",
    "4-0": "`deleteAccessToken`",
    "4-1": "Delete a personal access token",
    "h-0": "Action",
    "h-1": "Description"
  },
  "cols": 2,
  "rows": 5
}
[/block]

### Role actions

`role` is a **top-level resource**. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "role/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [Custom roles](./custom-roles).
[block:parameters]
{
  "data": {
    "0-0": "`createRole`",
    "1-0": "`updatePolicy`",
    "2-0": "`updateName`",
    "3-0": "`deleteRole`",
    "4-0": "`updateMembers`",
    "0-1": "Create new custom roles",
    "1-1": "Update a custom role's policy",
    "2-1": "Update a custom role's name",
    "3-1": "Delete a custom role",
    "4-1": "Add or remove users from a custom role (equivalent to `updateCustomRole` on team members).",
    "h-0": "Action",
    "h-1": "Description"
  },
  "cols": 2,
  "rows": 5
}
[/block]

### Project actions

`proj` is a **top-level resource**. 
[block:code]
{
  "codes": [
    {
      "code": "proj/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [Projects](./projects).
[block:parameters]
{
  "data": {
    "0-0": "`createProject`",
    "0-1": "Create a new project",
    "1-0": "`deleteProject`",
    "1-1": "Delete a project",
    "2-0": "`updateProjectName`",
    "2-1": "Rename a project",
    "3-0": "`updateIncludeInSnippetByDefault`",
    "3-1": "Make new flags available to the client-side (JavaScript) SDK by default",
    "4-0": "`updateTags`",
    "4-1": "Update tags associated with a project",
    "h-0": "Action",
    "h-1": "Description",
    "5-0": "`viewProject`",
    "5-1": "View a project. If set to `deny`, anyone impacted by this policy can neither view nor modify a project.
To learn more, read [Configuring private projects with custom roles](./configuring-private-projects-with-custom-roles)."
  },
  "cols": 2,
  "rows": 6
}
[/block]

### Environments actions

`env` is a child resources of **projects**. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "proj/*:env/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [Environments](./environments).
[block:parameters]
{
  "data": {
    "h-0": "Action",
    "h-1": "Description",
    "0-0": "`createEnvironment`",
    "0-1": "Create new environments",
    "1-0": "`deleteEnvironment`",
    "1-1": "Delete an existing environment",
    "2-0": "`updateName`",
    "2-1": "Change the name of an environment",
    "3-0": "`updateColor`",
    "3-1": "Change the color swatch for an environment",
    "4-0": "`updateTtl`",
    "4-1": "Change the TTL for an environment",
    "5-0": "`updateApiKey`",
    "5-1": "Reset the API key for an environment",
    "6-0": "`updateMobileKey`",
    "6-1": "Reset the mobile key for an environment",
    "7-0": "`updateSecureMode`",
    "7-1": "Turn secure mode on or off for an environment",
    "8-0": "`updateTags`",
    "8-1": "Update tags associated with an environment",
    "9-0": "`updateRequireComments`",
    "9-1": "Require comments for changes to flags and segments",
    "10-0": "`updateConfirmChanges`",
    "10-1": "Require environment confirmation for changes to flags and segments"
  },
  "cols": 2,
  "rows": 11
}
[/block]

### Metrics actions
<Callout intent="info">
  <Callout.Title>The name of this action has changed</Callout.Title>
   <Callout.Description>Goals have been redesigned as metrics and associated with our Experimentation add-on. You do not need to update your actions to use `metric`, however. If you are using goals actions, they will still work.</Callout.Description>
</Callout>

`metric` is a child resource of **projects**. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "proj/*:metric/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [Experimentation introduction](./experimentation).
[block:parameters]
{
  "data": {
    "0-0": "`createMetric`",
    "1-0": "`deleteMetric`",
    "2-0": "`updateKey`",
    "3-0": "`updateName`",
    "4-0": "`updateDescription`",
    "5-0": "`updateUrls`",
    "6-0": "`updateSelector`",
    "5-1": "Update the URLs for a click or page view metric",
    "4-1": "Update metrics descriptions",
    "6-1": "Update the CSS selector for a click metric",
    "3-1": "Update metrics names",
    "2-1": "Update keys for custom metrics",
    "1-1": "Delete metrics",
    "0-1": "Create metrics",
    "h-0": "Action",
    "h-1": "Description",
    "7-0": "`updateOptimizelyMetrics`",
    "7-1": "Update Optimizely metrics"
  },
  "cols": 2,
  "rows": 8
}
[/block]

### Feature flags actions

`flag` is a child of **both a project and environments**. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "proj/*:env/*:flag/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [Creating a feature flag](./creating-a-feature-flag).
[block:parameters]
{
  "data": {
    "h-0": "Action",
    "h-1": "Description",
    "0-0": "`createFlag`",
    "2-0": "`deleteFlag`",
    "3-0": "`updateOn`",
    "3-1": "Trigger the kill switch for a feature",
    "2-1": "Delete a feature. Deleting a feature impacts all environments in a project, so users will need permission to delete features in all environments.",
    "0-1": "Create a feature flag. Creating a feature flag impacts all environments in a project, so users will need **permission** to create flags in all environments.",
    "4-0": "`updateIncludeInSnippet`",
    "4-1": "Change whether the feature flag is available to front-end code via the [JavaScript SDK](./js-sdk-reference) . Impacts all environments in a project.",
    "5-0": "`updateName`",
    "5-1": "Change the name of a feature flag. Impacts all environments in a project.",
    "6-0": "`updateDescription`",
    "6-1": "Change the description of a feature flag. Impacts all environments in a project.",
    "7-0": "`updateTemporary`",
    "7-1": "Marks a flag temporary or permanent. Impacts all environments in a project.",
    "8-0": "`updateTags`",
    "8-1": "Update tags associated with a flag. Impacts all environments in a project.",
    "9-0": "`updatePrerequisites`",
    "9-1": "Update flag prerequisites.",
    "10-0": "`updateTargets`",
    "10-1": "Update individual user targeting.",
    "11-0": "`updateRules`",
    "11-1": "Update custom targeting rules.",
    "12-0": "`updateFallthrough`",
    "12-1": "Update the \"default\" or \"fallthrough\" rule.",
    "14-0": "`updateOffVariation`",
    "14-1": "Update the variation returned when the kill switch is set to `off`.",
    "15-0": "`updateMaintainer`",
    "15-1": "Update the flag maintainer. Impacts all environments.",
    "16-0": "`updateAttachedMetrics`",
    "16-1": "Update metrics connected to a flag (start or pause an experiment).",
    "13-0": "`updateFlagVariations`",
    "13-1": "Change the flag's variations. Impacts all environments.",
    "1-1": "Create a new flag with settings based on an existing flag. To clone a flag, you need to have the `cloneFlag` permission on the source flag, as well as the `createFlag` permission for the new flag",
    "1-0": "`cloneFlag`",
    "17-0": "`updateFlagCustomProperties`",
    "17-1": "Update custom properties attached to a flag. Impacts all environments.",
    "18-0": "`updateVariations`",
    "18-1": "Update percentage rollout variations"
  },
  "cols": 2,
  "rows": 19
}
[/block]

### Segments actions

`segment` is a child of **both a project and environments**. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "proj/*:env/*:segment/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [Building user segments](./segmenting-users).
[block:parameters]
{
  "data": {
    "h-0": "Action",
    "h-1": "Description",
    "0-0": "`createSegment`",
    "0-1": "Create a segment.",
    "1-0": "`deleteSegment`",
    "1-1": "Delete a segment",
    "2-0": "`updateName`",
    "2-1": "Update segment name.",
    "3-0": "`updateDescription`",
    "3-1": "Update segment description.",
    "4-0": "`updateTags`",
    "4-1": "Update tags associated with a segment.",
    "5-0": "`updateIncluded`",
    "5-1": "Update the list of users explicitly included in a segment.",
    "6-0": "`updateExcluded`",
    "6-1": "Update the list of users explicitly excluded from a segment.",
    "7-0": "`updateRules`",
    "7-1": "Update the targeting rules for a segment."
  },
  "cols": 2,
  "rows": 8
}
[/block]
### Webhooks actions

`webhook` is a **top-level resource**. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "webhook/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [Webhooks](./webhooks).
[block:parameters]
{
  "data": {
    "0-0": "`createWebhook`",
    "0-1": "Create a new webhook.",
    "1-0": "`deleteWebhook`",
    "1-1": "Delete a webhook.",
    "2-0": "`updateUrl`",
    "2-1": "Update the URL for a webhook.",
    "3-0": "`updateSecret`",
    "3-1": "Update the webhook secret.",
    "4-0": "`updateStatements`",
    "4-1": "Update the policy filter for a webhook.",
    "5-0": "`updateOn`",
    "5-1": "Turn a webhook on or off.",
    "6-0": "`updateName`",
    "6-1": "Change the name of a webhook"
  },
  "cols": 2,
  "rows": 7
}
[/block]

### Integrations actions

Most third-party integrations (e.g. [HipChat room notifications](./hipchat)) use a shared set of custom role actions.

`integration` is a **top-level resource**. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "integration/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]

[block:parameters]
{
  "data": {
    "0-0": "`createIntegration`",
    "0-1": "Create a new third-party integration.",
    "1-0": "`deleteIntegration`",
    "1-1": "Delete a third-party integration.",
    "2-0": "`updateConfiguration`",
    "2-1": "Change the settings of a third-party integration.",
    "3-0": "`updateOn`",
    "4-0": "`updateName`",
    "3-1": "Turn a third-party integration on or off.",
    "4-1": "Change the name of a third-party integration.",
    "h-0": "Action",
    "h-1": "Description"
  },
  "cols": 2,
  "rows": 5
}
[/block]

### Destinations actions

`destination` is a child of **both a project and environments**.
[block:code]
{
  "codes": [
    {
      "code": "proj/*:env/*:destination/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [Data Export](./data-export).
[block:parameters]
{
  "data": {
    "0-0": "`createDestination`",
    "1-0": "`deleteDestination`",
    "2-0": "`updateConfiguration`",
    "3-0": "`updateOn`",
    "4-0": "`updateName`",
    "0-1": "Create a new destination.",
    "1-1": "Delete a destination.",
    "2-1": "Change the settings of a destination.",
    "3-1": "Turn a destination on or off.",
    "4-1": "Change the name of a destination."
  },
  "cols": 2,
  "rows": 5
}
[/block]

### Code references actions

`code-reference-repository` is a **top-level resource**. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "code-reference-repository/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [Git code references](./git-code-references).
[block:parameters]
{
  "data": {
    "h-0": "Action",
    "h-1": "Description",
    "0-0": "`createCodeRefsRepository`",
    "1-0": "`updateCodeRefsRepositoryName`",
    "2-0": "`updateCodeRefsRepositoryConfiguration`",
    "3-0": "`updateCodeRefsRepositoryOn`",
    "4-0": "`updateCodeRefsRepositoryBranches`",
    "5-0": "`deleteCodeRefsRepository`",
    "0-1": "Connect a Git repository.",
    "1-1": "Update a Git repository connection name.",
    "2-1": "Update a Git repository connection configuration.",
    "3-1": "Flip the on/off status of a Git repository connection.",
    "4-1": "Update the stored branch data for a Git repository connection.",
    "5-1": "Delete a Git repository connection."
  },
  "cols": 2,
  "rows": 6
}
[/block]

<Callout intent="alert">
  <Callout.Title>Optimizely API Tokens</Callout.Title>
   <Callout.Description>For customers with A/B testing, a special resource `integration/optimizely` in conjunction with the action `updateIntegration` can be used to control access to updating their Optimizely API Token.</Callout.Description>
</Callout>

### Users actions

`user` is a child of **both a project and environments**. A code sample is below:
[block:code]
{
  "codes": [
    {
      "code": "proj/*:env/*:user/*",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
To learn more, read [The user dashboard](./the-user-dashboard).
[block:parameters]
{
  "data": {
    "0-0": "`deleteUser`",
    "0-1": "Deletes a user"
  },
  "cols": 2,
  "rows": 1
}
[/block]
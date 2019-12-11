---
title: "Example policies"
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
This topic shows some examples of different types of policies you can implement with custom roles. It also provides a reference for different actions you can configure in a policy.


[block:callout]
{
  "type": "info",
  "title": "Creating private projects with custom roles",
  "body": "Use the `viewProject` action to allow or deny viewing and editing access to projects. To learn more, read [Configuring private projects with custom roles](doc:configuring-private-projects-with-custom-roles)."
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Granting access to specific environments and flags"
}
[/block]
This example policy allows members of the QA team to administer environments tagged `qa_*` and manage flags in environments tagged `qa_*`.
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"effect\": \"allow\",\n    \"resources\": [\"proj/*:env/*;qa_*\"],\n    \"actions\": [\"*\"]\n  },\n  {\n    \"effect\": \"allow\",\n    \"resources\": [\"proj/*:env/*;qa_*:/flag/*\"],\n    \"actions\": [\"*\"]\n  }\n]",
      "language": "json",
      "name": "QA team policy"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Granting access to kill switch features, but not flag rollout or targeting rules"
}
[/block]
This example policy allows members of the ops team to kill switch features on the production environment. They may not change percentage rollouts or targeting rules, or manage any environments or projects.
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"effect\": \"allow\",\n    \"resources\": [\"proj/*:env/production:flag/*\"],\n    \"actions\": [\"updateOn\"]\n  }\n]\n",
      "language": "json",
      "name": "Ops team"
    }
  ]
}
[/block]
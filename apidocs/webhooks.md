The webhooks API lets you build your own integrations that subscribe to activities in LaunchDarkly. When an activity is generated in LaunchDarkly, such as when a flag is changed or a project is created, LaunchDarkly sends an HTTP POST payload to the webhook's URL. Use webhooks to update external issue trackers, update support tickets, notify customers of new feature rollouts, and more.

## Designating the payload

The webhook payload is identical to an [Audit log entry](/tag/Audit-log#operation/getAuditLogEntry). 

Here's a sample payload:

<blockquote>
    <h3><span>📘</span>Webhook delivery order</h3>
    <p>Webhooks may not be delivered in chronological order. We recommend using the payload's "date" field as a timestamp to reorder webhooks as they are received.</p>
</blockquote>

```json
{
  "_links": {
    "canonical": {
      "href": "/api/v2/projects/alexis/environments/test",
      "type": "application/json"
    },
    "parent": {
      "href": "/api/v2/auditlog",
      "type": "application/json"
    },
    "self": {
      "href": "/api/v2/auditlog/57c0a8e29969090743529965",
      "type": "application/json"
    },
    "site": {
      "href": "/settings#/projects",
      "type": "text/html"
    }
  },
  "_id": "57c0a8e29969090743529965",
  "date": 1472243938774,
  "accesses": [
    {
      "action": "updateName",
      "resource": "proj/alexis:env/test"
    }
  ],
  "kind": "environment",
  "name": "Testing",
  "description": "- Changed the name from ~~Test~~ to *Testing*",
  "member": {
    "_links": {
      "parent": {
        "href": "/internal/account/members",
        "type": "application/json"
      },
      "self": {
        "href": "/internal/account/members/548f6741c1efad40031b18ae",
        "type": "application/json"
      }
    },
    "_id": "548f6741c1efad40031b18ae",
    "email": "refapp@launchdarkly.com",
    "firstName": "Reese",
    "lastName": "Applebaum"
  },
  "titleVerb": "changed the name of",
  "title": "[Reese Applebaum](mailto:refapp@launchdarkly.com) changed the name of [Testing](https://app.launchdarkly.com/settings#/projects)",
  "target": {
    "_links": {
      "canonical": {
        "href": "/api/v2/projects/alexis/environments/test",
        "type": "application/json"
      },
      "site": {
        "href": "/settings#/projects",
        "type": "text/html"
      }
    },
    "name": "Testing",
    "resources": [
      "proj/alexis:env/test"
    ]
  }
}
```

## Signing the webhook

Optionally, you can define a `secret` when you create a webhook. If you define the secret, the webhook `POST` request will include an `X-LD-Signature header`, whose value will contain an HMAC SHA256 hex digest of the webhook payload, using the `secret` as the key.

Compute the signature of the payload using the same shared secret in your code to verify that the webhook was triggered by LaunchDarkly.

## Understanding connection retries

If LaunchDarkly receives a non-`2xx` response to a webhook `POST`, it will retry the delivery one time. Webhook delivery is not guaranteed. If you build an integration on webhooks, make sure it is tolerant of delivery failures.

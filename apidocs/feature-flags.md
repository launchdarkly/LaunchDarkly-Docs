## Anatomy of a feature flag

The feature flag API allows you to control percentage rollouts, target specific users, or even toggle off a feature programmatically. By looking at the representation of a feature flag, we can see how to do any of these tasks.

## Sample feature flag representation

Every feature flag has a set of top-level attributes, as well as an `environments` map containing the flag rollout and targeting rules specific to each environment. Top-level attributes include things like the flag's name, description, tags, and creation date.

For reference, here's a complete feature flag representation. Below we break this down and explain each attribute in detail.

```json
{
  "name": "Alternate product page",
  "kind": "boolean",
  "description": "This is a description",
  "key": "alternate.page",
  "creationDate": 1418684722483,
  "includeInSnippet": true,
  "variations": [
    {
      "value": true,
      "name": "true"
    },
    {
      "value": false,
      "name": "false"
    }
  ],
  "defaults": {
    "onVariation": 0,
    "offVariation": 1
  },
  "temporary": false,
  "tags": ["ops", "experiments"],
  "_links": {
    "parent": {
      "href": "/api/v2/flags/default",
      "type": "application/json"
    },
    "self": {
      "href": "/api/v2/flags/default/alternate.page",
      "type": "application/json"
    }
  },
  "maintainerId": "548f6741c1efad40031b18ae",
  "_maintainer": {
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
    "firstName": "Reese",
    "lastName": "App",
    "role": "owner",
    "email": "refapp@launchdarkly.com",
    "_pendingInvite": false,
    "isBeta": false,
    "customRoles": []
  },
  "goalIds": [],
  "environments": {
    "production": {
      "on": true,
      "archived": false,
      "salt": "YWx0ZXJuYXRlLnBhZ2U=",
      "sel": "45501b9314dc4641841af774cb038b96",
      "lastModified": 1469326565348,
      "version": 61,
      "targets": [
        {
          "values": ["1461797806427-7-115540266"],
          "variation": 0
        },
        {
          "values": ["Gerhard.Little@yahoo.com"],
          "variation": 1
        }
      ],
      "rules": [
        {
          "variation": 0,
          "clauses": [
            {
              "attribute": "groups",
              "op": "in",
              "values": ["Top Customers"],
              "negate": false
            },
            {
              "attribute": "email",
              "op": "endsWith",
              "values": ["gmail.com"],
              "negate": false
            }
          ]
        }
      ],
      "fallthrough": {
        "rollout": {
          "variations": [
            {
              "variation": 0,
              "weight": 60000
            },
            {
              "variation": 1,
              "weight": 40000
            }
          ]
        }
      },
      "offVariation": 1,
      "prerequisites": [],
      "_site": {
        "href": "/default/production/features/alternate.page",
        "type": "text/html"
      }
    },
    "test": {
      "on": true,
      "archived": false,
      "salt": "YWx0ZXJuYXRlLnBhZ2U=",
      "sel": "76c63094d35949bb9dc9bd5c570bacf5",
      "lastModified": 1455145480896,
      "version": 37,
      "targets": [
        {
          "values": [],
          "variation": 0
        },
        {
          "values": [],
          "variation": 1
        }
      ],
      "rules": [],
      "fallthrough": {
        "rollout": {
          "variations": [
            {
              "variation": 0,
              "weight": 49000
            },
            {
              "variation": 1,
              "weight": 51000
            }
          ]
        }
      },
      "prerequisites": [],
      "_site": {
        "href": "/default/tester/features/alternate.page",
        "type": "text/html"
      }
    }
  }
}
```

## Top-level attributes

Most of the top-level attributes have a straightforward interpretation. For example, to change the name of a feature, [update the feature flag](#operation/patchFeatureFlag) with the `name` attribute set to the new name:

```json
[
    { "op": "replace", "path": "/name", "value": "New name" }
]
```

The `variations` array represents the different variation values that a feature flag has. For a boolean flag, there are two variations: `true` and `false`. Multivariate flags have more variation values, and those values could be any JSON type: numbers, strings, objects, or arrays. In targeting rules, the variations are referred to by their index into this array. Below are some specific examples.

## Per-environment configurations

Each entry in the `environments` map contains a JSON object that represents the environment-specific flag configuration data that you see on the [Targeting](https://docs.launchdarkly.com/home/flags/targeting-users) tab of your Manage Feature page. For example, to toggle off a feature flag in your production environment, use the following JSON patch operation:

```json
[
    { "op": "replace", "path": "/environments/production/on", "value": false }
]
```

Each section of the Targeting tab corresponds to a different attribute of the per-environment configuration data, as shown here:

## Individual user targets

The `targets` array in the per-environment configuration data represents the individual user targeting rules on the Targeting tab. Each object in the `targets` array represents a list of user keys assigned to a particular variation. For example:

```json
{
    ...
    "environments" : {
        "production" : {
            ...
            "targets": [
                {
                    "values": ["foo@example.com"],
                    "variation: 0
                }
            ]
        }
    }
}
```

This `targets` array here means that user `foo@example.com` receives the first variation listed in the `variations` array. Recall that the variations are stored at the top level of the flag JSON in an array, and the per-environment configuration rules point to indexes into this array. If this is a boolean flag, `foo@example.com` is receiving the `true` variation.

## Targeting rules

The `rules` array corresponds to the custom targeting rules section of the Targeting tab. This is where you can express complex rules on attributes with conditions and operators. For example, a rule like "roll out the `true` variation to 80% of users whose email address ends with `gmail.com` could be expressed here.

## The fallthrough rule

The `fallthrough` object is a special rule that contains no conditions. It is the rollout strategy that is applied when none of the individual or custom targeting rules match.

## The off variation

The off variation represents the variation to serve if the feature flag is turned off, meaning the `on` attribute is `false`. For boolean flags, this is usually `false`. For multivariate flags, set the off variation to whatever variation represents the control or baseline behavior for your application. If you don't set the off variation, LaunchDarkly will serve the fallback value defined in your code.

## Percentage rollouts

The `weight` attribute defines the percentage rollout for each variation. Weights range from 0 (a 0% rollout) to 100000 (a 100% rollout). The weights are scaled by a factor of 1000 so that fractions of a percent can be represented without using floating-point. For example, a weight of `50000` means that 50% of users that don't otherwise match any `targets` will see that variation. The sum of weights across all variations should be 100%.

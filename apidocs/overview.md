# Authentication

All REST API resources are authenticated with [personal access tokens](https://docs.launchdarkly.com/v2.0/docs/api-access-tokens) or session cookies. Other authentication mechanisms are not supported. You can manage personal access tokens on your [Account settings](https://app.launchdarkly.com/settings/tokens) page. 

LaunchDarkly also has SDK keys, mobile keys, and client-side IDs that are used by our server-side SDKs,  mobile SDKs, and client-side JavaScript SDKs, respectively. **These keys cannot be used to access our REST API**. These keys are environment-specific, and can only perform read-only operations (fetching feature flag settings).

| Auth mechanism | Allowed resources | Use cases |
| -------------- | ----------------- | --------- |
| [Personal access tokens](https://docs.launchdarkly.com/v2.0/docs/api-access-tokens) | Can be customized on a per-token basis | Building scripts, custom integrations, data export |
| SDK keys | Can only access read-only SDK-specific resources and the firehose, restricted to a single environment | Server-side SDKs, Firehose API |
| Mobile keys | Can only access read-only mobile SDK-specific resources, restricted to a single environment | Mobile SDKs |
| Client-side ID | Single environment, only flags marked available to client-side | Client-side JavaScript |

<blockquote>
    <h3><span>❗️</span>Keep your access tokens and SDK keys private</h3>
    <p>Access tokens should *never* be exposed in untrusted contexts. Never put an access token in client-side JavaScript, or embed it in a mobile application (LaunchDarkly has special mobile keys that you can embed in mobile apps). If you accidentally expose an access token or SDK key, you can reset it from your [Account Settings](https://app.launchdarkly.com/settings#/tokens) page.</p>
    <p>The client-side ID is safe to embed in untrusted contexts-- it's designed for use in client-side JavaScript.</p>
</blockquote>

## Via request header

The preferred way to authenticate with the API is by adding an `Authorization` header containing your access token to your requests. The value of the `Authorization` header must be your access token.

Manage personal access tokens from the [Account Settings](https://app.launchdarkly.com/settings/tokens) page.

## Via session cookie

For testing purposes, you can make API calls directly from your web browser. If you're logged in to the application, the API will use your existing session to authenticate calls.

If you have a [role](http://docs.launchdarkly.com/v2.0/docs/teams) other than Admin, or have a [custom role](http://docs.launchdarkly.com/v2.0/docs/custom-roles) defined, you may not have permission to perform some API calls.  You'll receive a `401` response code in that case.

<blockquote>
    <h3><span>❗️</span>Modifying the Origin header causes an error</h3>
    <p>We validate that the Origin header for any API request authenticated by a session cookie matches the expected Origin header. The expected Origin header is `https://app.launchdarkly.com`.</p>
    <p>If the Origin header does not match what's expected, we return an error. This error can prevent the LaunchDarkly app from working correctly. </p>
    <p>Any browser extension that intentionally changes the Origin header can cause this problem. For example, the `Allow-Control-Allow-Origin: *` Chrome extension changes the Origin header to http://evil.com and causes the app to fail.</p>
    <p>To prevent this error, do not modify your Origin header.</p>
    <p>We do not require origin matching when authenticating with an Access Token, so this issue does not affect normal API usage.</p>
</blockquote>

# Representations

All resources expect and return JSON response bodies. Error responses will also send a JSON body-- see [Errors](doc:errors) for a more detailed description of the error format used by the API. 

In practice this means that you'll always get a response with a `Content-Type` header set to `application/json`.

In addition, request bodies for `PUT`, `POST`, `REPORT` and `PATCH` requests must be encoded as JSON with a `Content-Type` header set to `application/json`.

## Summary and detailed representations

When you fetch a list of resources, the response will only include the most important attributes of each resource. This is a *summary representation* of the resource. When you fetch an individual resource (for example, a single feature flag), you'll receive a *detailed representation* containing all of the attributes of the resource.

The best way to find a detailed representation is to follow links-- every summary representation includes a link to its detailed representation.

## Links and addressability

The best way to navigate the API is by following links-- these are attributes in representations that link to other resources. The API always uses the same format for links:

* Links to other resources within the API are encapsulated in a `_links` object.
* If the resource has a corresponding link to HTML content on the site, it is stored in a special `_site` link.

Each link has two attributes: an href (the URL) and a type (the content type). For example, a feature resource might return the following:

```json
{
    "_links": {
        "parent": {
            "href": "/api/features",
            "type": "application/json"
        },
        "self": {
            "href":"/api/features/sort.order",
            "type":"application/json"
        }
    },
    "_site":{
        "href":"/features/sort.order",
        "type":"text/html"
    }
}
```

From this, we can navigate to the parent collection of features by following the `parent` link, or navigate to the site page for the feature by following the `_site` link.

Collections are always represented as a JSON object with an `items` attribute containing an array of representations. Like all other representations, collections will have `_links` defined at the top level.

Paginated collections include `first`, `last`, `next`, and `prev` links containing a URL with the respective set of elements in the collection.

# Updates

Resources that accept partial updates use the `PATCH` verb, and support the [JSON Patch](http://tools.ietf.org/html/rfc6902) format. Some resources also support the  [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) format. In addition, some resources support optional comments that can be submitted with updates. Comments appear in outgoing webhooks, the audit log, and other integrations.

## Updates via JSON Patch

[JSON Patch](http://tools.ietf.org/html/rfc6902)  is a way to specify the modifications to perform on a resource. For example, in this feature flag representation:

```json
{
    "name": "New recommendations engine",
    "key": "engine.enable",
    "description": "This is the description",
    ...
}
```

You can change the feature flag's description with the following patch document:

```json
[
    { "op": "replace", "path": "/description", "value": "This is the new description"}
]
```

JSON Patch documents are always arrays. You can specify multiple modifications to perform in a single request. You can also test that certain preconditions are met before applying the patch:

```json
[
    { "op": "test", "path": "/version", "value": 10 },
    { "op": "replace", "path": "/description", "value": "The new description" }
]
```

The above patch request tests whether the feature flag's `version` is `10`, and if so, changes the feature flag's description.

Attributes that aren't editable, like a resource's `_links`, have names that start with an underscore.

## Updates via JSON Merge Patch

The API also supports the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) format, as well as the [Update feature flag](doc:update-feature-flag) resource. 

JSON Merge Patch is less expressive than JSON Patch but in many cases, it is simpler to construct a merge patch document. For example, you can change a feature flag's description with the following merge patch document:

```json
{
    "description": "New flag description"
}
```

## Updates with comments

You can submit optional comments with `PATCH` changes. Currently, the [Update feature flag](doc:update-feature-flag) resource supports comments.

To submit a comment along with a JSON Patch document, use the following format:

```json
{
    "comment": "This is a comment string",
    "patch": [ {"op": "replace", "path": "/description", "value": "The new description" } ]
}
```

To submit a comment along with a JSON Merge Patch document, use the following format:

```json
{
    "comment": "This is a comment string",
    "merge": { "description": "New flag description"}
}
```

## Updates via semantic patches

The API also supports the Semantic patch format. A semantic `PATCH` is a way to specify the modifications to perform on a resource as a set of executable instructions. 

JSON Patch uses paths and a limited set of operations to describe how to transform the current state of the resource into a new state. Semantic patch allows you to be explicit about intent using precise, custom instructions. In many cases, semantic patch instructions can also be defined independently of the current state of the resource. This can be useful when defining a change that may be applied at a future date.

For example, in this feature flag configuration in environment Production:

```json
{
    "name": "Alternate sort order",
    "kind": "boolean",
    "key": "sort.order",
   ...
    "environments": {
        "production": {
            "on": true,
            "archived": false,
            "salt": "c29ydC5vcmRlcg==",
            "sel": "8de1085cb7354b0ab41c0e778376dfd3",
            "lastModified": 1469131558260,
            "version": 81,
            "targets": [
                {
                    "values": [
                        "Gerhard.Little@yahoo.com"
                    ],
                    "variation": 0
                },
                {
                    "values": [
                        "1461797806429-33-861961230",
                        "438580d8-02ee-418d-9eec-0085cab2bdf0"
                    ],
                    "variation": 1
                }
            ],
            "rules": [],
            "fallthrough": {
                "variation": 0
            },
            "offVariation": 1,
            "prerequisites": [],
            "_site": {
                "href": "/default/production/features/sort.order",
                "type": "text/html"
            }
       }
    }
}
```

You can add a date you want a user to be removed from the feature flag's user targets. For example,  “remove user 1461797806429-33-861961230 from the user target for variation 0 on the Alternate sort order flag in the production environment on Wed Jul 08 2020 at 15:27:41 pm”. This is done using the following:

```json
{
    "comment": "update expiring user targets",
    "instructions": [
        {
            "kind": "removeExpireUserTargetDate",
            "userKey": "userKey",
            "variationId": "978d53f9-7fe3-4a63-992d-97bcb4535dc8",
        },
        {
            "kind": "updateExpireUserTargetDate",
            "userKey": "userKey2",
            "variationId": "978d53f9-7fe3-4a63-992d-97bcb4535dc8",
            "value": 1587582000000
        },
        {
            "kind": "addExpireUserTargetDate",
            "userKey": "userKey3",
            "variationId": "978d53f9-7fe3-4a63-992d-97bcb4535dc8",
            "value": 1594247266386
        }
    ]
}
```

Here is another example. In this feature flag configuration:

```json
{
    "name": "New recommendations engine",
    "key": "engine.enable",
    "environments": {
        "test": {
            "on": true
        }
    }
}
```

You can change the feature flag's description with the following patch document as a set of executable instructions. For example, “add user X to targets for variation Y and remove user A from targets for variation B for test flag”.

```json
{
    "comment": "",
    "instructions": [
        {
            "kind": "removeUserTargets",
            "values": ["438580d8-02ee-418d-9eec-0085cab2bdf0"],
            "variationId": "852cb784-54ff-46b9-8c35-5498d2e4f270"
        },
        {
            "kind": "addUserTargets",
            "values": ["438580d8-02ee-418d-9eec-0085cab2bdf0"],
            "variationId": "1bb18465-33b6-49aa-a3bd-eeb6650b33ad"
        }
    ]
}
```

<blockquote>
    <h3><span>📘</span>Supported semantic patch API endpoints</h3>
    <p>TODO: update these links</p>
    <p><a href="#operation/patchFeatureFlag">Update feature flag</a></p>
    <p><a href="">Update expiring user targets on feature flag</a></p>
    <p><a href="">Update expiring user target for flags</a></p>
</blockquote>

# Errors

TODO

# CORS

TODO

# Rate limiting

TODO

# Open API (Swagger)

TODO

# Method Overriding

TODO

# Beta resources

TODO

# Versioning

TODO
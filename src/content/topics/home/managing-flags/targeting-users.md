---
title: "Targeting users"
excerpt: ""
---
## Overview
This topic explains how to use a flag's **Targeting** tab to control which users or targets see a variation of a feature flag.

You can use the Targeting tab to roll features out for internal testing, private betas, or usability tests before performing a broader rollout.

While the Targeting tab uses the language of targeted "users", a user can be any identifier that uniquely corresponds to a target. You can target users of your application, email addresses, systems, services, machines, resources, or anything else that can be uniquely identified.
## Assigning users to a variation
The "Target individual users" section of the targeting tab allows you to assign individual users to a particular flag variation.
<Callout intent="info">
  <Callout.Title>Only target small numbers of users individually</Callout.Title>
   <Callout.Description>We recommend using individual user targeting for very small numbers of individual users. Targeting more than 10,000 users individually may cause performance degradation, because the SDK takes longer to initialize when the targeting rules payload is large. 
To learn more about targeting many users, read [Targeting rules based on user attributes](#targeting-rules-based-on-user-attributes).</Callout.Description>
</Callout>
If your application is already sending data back to LaunchDarkly, you can search for users by name, email address, or user key. These strings are case sensitive. Hover over the user row to see more attributes for that user.

If you need to target a user that LaunchDarkly doesn't know about, you can enter their key manually. These users display in yellow until they encounter a feature flag.

In the screenshot below, two users are seeing the `true` variation of the "Show new dashboard" flag. That flag is targeted to them. This means that these users will see the new dashboard when they access it.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f214d48-user-targeting.png",
        "user-targeting.png",
        1102,
        676,
        "#f9f9f7"
      ],
      "caption": "The \"Show new dashboard\" flag with two users targeted."
    }
  ]
}
[/block]

## <a name="targeting-rules-based-on-user-attributes"></a>Targeting rules based on user attributes
In addition to targeting individual users, LaunchDarkly lets you target segments of users by constructing rules. 

Each rule has three parts: 
* an **attribute**, which defines the scope of the flag's impact, such as only impacting an email address
* an **operator**, which sets differentiating characteristics of the attribute, such as limiting the attribute to emails that end with a certain extension 
* a **user value**, which identifies a user or resource by a value you specify, such as `gmail.com`.

For example, let's define a rule that serves `true` to all users whose e-mail address ends with `gmail.com`.

To write this rule, we specify the attribute as `email`, the operator as `ends with`, and the user value as `gmail.com`. Remember to click **Save Changes** to apply the rule.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b1c1a58-Screen_Shot_2019-08-02_at_11.56.56_AM.png",
        "Screen Shot 2019-08-02 at 11.56.56 AM.png",
        1091,
        175,
        "#f9f9f9"
      ],
      "caption": "A user targeting rule."
    }
  ]
}
[/block]

### Operators

LaunchDarkly supports the following operators:
[block:parameters]
{
  "data": {
    "h-0": "Operator",
    "h-1": "Attribute type",
    "h-2": "Meaning",
    "0-0": "is one of (=), is not one of (!=)",
    "0-1": "string, number, boolean, date",
    "0-2": "exact match",
    "1-0": "ends with, does not end with",
    "1-1": "string",
    "1-2": "string suffix match",
    "2-0": "starts with, does not start with",
    "2-1": "string",
    "2-2": "string prefix match",
    "3-0": "matches, does not match",
    "3-1": "string",
    "3-2": "regular expression match",
    "4-0": "contains, does not contain",
    "4-1": "string",
    "4-2": "substring match",
    "5-0": "greater than (>), less than (<), greater than or equal to (>=), less than or equal to (<=)",
    "5-1": "number",
    "5-2": "numeric comparisons",
    "6-0": "before, after",
    "6-1": "date",
    "6-2": "date comparisons",
    "7-2": "user is included or excluded by the targeting rules for the named segments.  Read more about [Building user segments](./segmenting-users) .",
    "7-1": "segment names",
    "7-0": "user is in segment, user is not in segment",
    "8-1": "string",
    "8-0": "semantic version is one of (=), is not one of (!=), greater than (>), less than (<), greater than or equal to (>=), less than or equal to (<=)",
    "8-2": "[Semantic version](https://semver.org/) comparison. Valid string attributes must follow the semantic versioning specification, though we allow the PATCH version to be omitted (so that, e.g. `2.0` is considered a valid semantic version)."
  },
  "cols": 3,
  "rows": 9
}
[/block]

<Callout intent="info">
  <Callout.Title>Scheduling feature flags</Callout.Title>
   <Callout.Description>LaunchDarkly does not have a built in way to schedule a flag for a particular date, but you can achieve this with targeting rules.
For example, you may want to serve true to show your feature, but only after November 19th, 2018.</Callout.Description>
</Callout>

### Date Comparisons
<Callout intent="alert">
  <Callout.Title>Dates require UNIX formatting</Callout.Title>
   <Callout.Description>Dates specified in the `user` object should be formatted in UNIX milliseconds (UNIX epoch * 1000). 
To learn more about UNIX date formatting, or convert a date and time to UNIX milliseconds read [Current Millis](https://currentmillis.com/).</Callout.Description>
</Callout>

<Callout intent="info">
  <Callout.Title>Required SDK versions for semantic versions</Callout.Title>
   <Callout.Description>Older versions of our server SDKs do not support semantic version operators. Minimum SDK versions are:
Go: v3\nNode: 3.4.0\nPython: 4.3.0\nRuby: 2.5.0\n.NET: 3.6.1\nJava: 2.6.0\nPHP: 2.5.0
No updates are required for Android, iOS, or JavaScript.</Callout.Description>
</Callout>

### Built-in attributes

LaunchDarkly includes some useful built-in attributes for users. All of them are strings with the exception of anonymous:
[block:parameters]
{
  "data": {
    "h-0": "Attribute Key",
    "h-1": "Attribute Example Value",
    "h-2": "Note",
    "0-0": "**key**",
    "9-0": "**anonymous**",
    "8-0": "**country**",
    "7-0": "**lastName**",
    "6-0": "**firstName**",
    "5-0": "**avatar**",
    "4-0": "**name**",
    "3-0": "**email**",
    "2-0": "**ip**",
    "1-0": "**secondary**",
    "0-2": "Required for evaluation. This should be unique for each user.",
    "2-1": "\"10.10.10.10\"",
    "3-1": "\"user@example.com\"",
    "4-1": "\"Jill Jones\"",
    "6-1": "\"Jill\"",
    "7-1": "\"Jones\"",
    "8-1": "\"Uganda\"",
    "9-1": "true",
    "1-1": "\"2398127\"",
    "0-1": "\"1f2e2d3a\"",
    "5-1": "\"http://example.com/avatar.png\"",
    "9-2": "Boolean type",
    "1-2": "If provided, this attribute is used with a user's key to generate a variation in percentage rollouts."
  },
  "cols": 3,
  "rows": 10
}
[/block]

<Callout intent="info">
  <Callout.Title>We do not provide built-in attributes</Callout.Title>
   <Callout.Description>While we provide all of these fields for you to fill in, the SDK does not automatically collect any information. If you want to target your users based on any of these attributes you must supply their values.
  </Callout.Description>
</Callout>
### Anonymous users
<Callout intent="alert">
  <Callout.Title>Anonymous users</Callout.Title>
   <Callout.Description>You will still need to generate a unique key for anonymous users-- session IDs or UUIDs work best for this. 
Anonymous users work just like regular users, except that they won't appear on your Users page in LaunchDarkly. You also can't search for anonymous users on your Features page, and you can't search or autocomplete by anonymous user keys. This is actually a good thing-- it keeps anonymous users from polluting your Users page!
Note that anonymous users will still count toward your monthly active user limit.</Callout.Description>
</Callout>

<Callout intent="primary">
  <Callout.Title>Maintaining experience across anonymous and logged-in states</Callout.Title>
   <Callout.Description>To associate pre-login (anonymous) behaviors with post-login (known) behaviors to get a singular view of a user flow, you should use a custom attribute, and the advanced option for percentage rollouts that allows you to rollout based on a different attribute.
The steps to make this happen are as follows:
• store a unique identifier for the anonymous user into a cookie. A session ID or UUID works well.\n• until the user logs in, use this unique identifier as both the user’s key, and a custom attribute. The custom attribute could be named anything, but for this example it is named \"uniqueId\".\n• while the user is logged in, set the users key to their real (primary) user key, but continue to use to use the unique identifier stored in the cookie as the users \"uniqueId\" custom attribute.\n• for all flags (or at least those that may effect logged out users), use the advanced option for all percentage rollouts to do rollouts based on the \"uniqueId\" custom attribute.</Callout.Description>
</Callout>

<Callout intent="info">
  <Callout.Title>Secondary attribute</Callout.Title>
   <Callout.Description>The secondary attribute is a special attribute that the SDKs incorporate into the bucketing hash automatically when it is included in your user object. Unlike other attributes, you cannot use the secondary attribute in targeting rules.</Callout.Description>
</Callout>

## Targeting users based on custom attributes
LaunchDarkly allows you to target users based on arbitrary custom attributes-- meaning you can control who sees features based on any criteria that you send to us.
<Callout intent="alert">
  <Callout.Title>Custom attributes and built-in attributes</Callout.Title>
   <Callout.Description>Setting a custom attribute with the same key as one of the built-in attributes will cause the attribute to be ignored during feature flag evaluation. 
For mobile SDKs, the custom attributes 'os' and 'device' are automatically included with os and device data. You can override this by specifying them as custom attributes in your user object and setting your own values.</Callout.Description>
</Callout>
You can add multiple conditions to a rule. Users must meet all the conditions in a rule to match the rule. If any of the conditions are not met, the user will not match the rule.

Here, we've created a custom rule with two conditions.  This rule serves `true` to all users whose e-mail address ends with `gmail.com` and whose country is either `USA` or `CANADA`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/dac02e1-multiple-conditions.png",
        "multiple-conditions.png",
        1082,
        220,
        "#f9f9f9"
      ],
      "caption": ""
    }
  ]
}
[/block]
When you've finished setting up the conditions for your rule, you can decide whether your users will receive one variation, or a percentage rollout across several variations.


Let's turn a feature on for a group of external beta testers. First, we need to ensure that our backend sends a custom attribute called `groups` that identifies users that should be in the `beta_testers` group:
[block:code]
{
  "codes": [
    {
      "code": " LDUser user = new LDUser.Builder(\"foo@example.com\")\n   .custom(\"groups\", \"beta_testers\")   \n   .build()\n ",
      "language": "java",
      "name": "Java"
    },
    {
      "code": "user = {\"key\" : \"foo@example.com\", \"custom\": {\"groups\": \"beta_testers}}",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "user = {:key => \"foo@example.com\", :custom => {:groups => \"beta_testers\"}}",
      "language": "ruby",
      "name": "Ruby"
    },
    {
      "code": "var custom = make(map[string]interface{})\ncustom[\"groups\"] = \"beta_testers\"\nuser = User {\n Key: \"foo@example.com\",\n Custom: custom,\n}",
      "language": "go",
      "name": "Go"
    },
    {
      "code": "var user = {\"key\" : \"foo@example.com\", \"custom\" : {\"groups\": \"beta_testers\"}}",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "$user = new LDUser(\"foo@example.com\", null, null, null, [\"groups\" => \"beta_testers\"]);\n       ",
      "language": "php",
      "name": "PHP"
    }
  ]
}
[/block]
On the Targeting tab, we add a new rule, set the attribute name to `groups`, the operator to `is one of`and enter `beta_testers`, the name of our group of beta testers.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1fc4ab5-condition-beta.png",
        "condition-beta.png",
        1089,
        194,
        "#fafafa"
      ],
      "caption": ""
    }
  ]
}
[/block]
That's it! Any users in the `beta_testers` group will see the new dashboard feature. We've also kept the feature on for our internal tester Ernesto, since there's still an Include rule for him.
## Percentage rollouts
If you want to do a percentage rollout, select "percentage rollout" from the dropdown and allocate users accordingly. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/77643a8-percent-rollout.png",
        "percent-rollout.png",
        1085,
        380,
        "#f9fafb"
      ],
      "caption": ""
    }
  ]
}
[/block]
In this example, 25% of our `beta_testers` will see the new dashboard feature.

##Percentage rollout logic
When you set up a percentage rollout, the variation a user receives is determined by the user's key. When a percentage rollout is evaluated, it generates a hash from the user's key (or the user attribute selected in the advanced section), the user's secondary attribute (if provided), the flag's key, and a hidden salt attribute stored in the flag. The SDK then uses this hash to generate a percentage value for that user. That value, compared to the value set for the percentage rollout value, determines which variation a user receives. 
<Callout intent="info">
  <Callout.Title>Advanced Targeting:  Percentage rollouts bucketed by attribute</Callout.Title>
   <Callout.Description>In the Advanced area of a percentage rollout, you can bucket users by any attribute sent to LaunchDarkly.  For example, you can roll out a feature to 20% of `companies`, whereby users will be bucketed by the value of their `company` attribute.  This ensures that every user with a matching attribute-value pairing is treated consistently.
If you choose a custom attribute for this purpose, it should have either string values or integer numeric values. For any user where the value of the custom attribute is a number with a fractional component, or a value of any other type besides string and number, the bucketing result is undefined.</Callout.Description>
</Callout>

## Default rule: targeting remaining users
LaunchDarkly defines a final default rollout rule for any users that don't match any of the previous sections on the page. As with other rules, you can choose to serve a specific variation, or apply a percentage rollout to any remaining users.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/133c97e-default-percent.png",
        "default-percent.png",
        1097,
        378,
        "#f9fafa"
      ],
      "caption": ""
    }
  ]
}
[/block]
Now, 50% of all users who have not been targeted by any other rules will receive `true`.
<Callout intent="info">
  <Callout.Title>Conducting a Simple Rollout</Callout.Title>
   <Callout.Description>If you do not want to target users based on user key or any custom attributes, you can simply use the default rule to control the flag's rollout for all users.</Callout.Description>
</Callout>

## Setting the Off variation
When the kill switch is turned off, LaunchDarkly will serve the 'off' variation for your feature flag.   For boolean flags, the off variation is set to `false` by default.  For multivariate flags, you select one of your custom variations.  You can customize the 'off' variation for both boolean and multivariate flags in the Targeting tab. 

If you do not specify an 'off' variation, then LaunchDarkly will return the Fallback variation defined in your code. 
## Evaluation order
The Targeting tab evaluates rules top-down.  Imagine a highway with exits along the way.  All of your users will start at the top and then gradually exit the highway when they match a rule.

If a user matches multiple rules, the first matching rule applies.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e0b4286-docs_targeting.jpg",
        "docs_targeting.jpg",
        1280,
        720,
        "#3e75ae"
      ]
    }
  ]
}
[/block]
Here, we have two custom rules.  Rules are evaluated top down, so in this example, the first rule (`email` ends with `gmail.com` and `country` is one of `USA` or `Canada`) is evaluated before the second rule (`groups` is one of `beta_testers`).  If a user matched both rules, the first rule would take priority.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/409e02c-rule-eval-order.png",
        "rule-eval-order.png",
        1090,
        405,
        "#f9f9f9"
      ]
    }
  ]
}
[/block]

Rules can be re-ordered by clicking on the left edge of a rule and dragging it up or down.

## User Storage
The LaunchDarkly dashboard user page shows only cached user information. The user data is evicted after 30-days if a user has not been seen by LaunchDarkly for more than 30 days. The rational behind this is that the system should be regularly calling variations on users which would cause them to appear in the dashboard through normal usage.

If the variations are being called less frequently than 30 days, the best solution would be to manually identify all of the users that you wish to be kept in the dashboard every 30 days.
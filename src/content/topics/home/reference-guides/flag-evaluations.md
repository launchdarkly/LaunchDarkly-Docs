---
title: "Evaluation reasons"
excerpt: ""
---
## Overview
This topic explains how to use LaunchDarkly to determine why a user receives a given flag variation. It can be useful to have this information when you're diagnosing problems or doing analysis of the impact of different flags.

You can access this information programmatically from your SDK or from Data Export events. To learn more about Data Export, read [Data Export](./data-export).
## Accessing flag variation information programmatically
For each of the SDK methods that you call to evaluate a feature flag, there is a corresponding `detail` method. 

This method returns three pieces of information:
* The computed flag variation, which what you get when you only evaluated the flag
* The variation index, which is a zero-based integer indicating which variation was selected. For example, if the flag's possible variations are `A`, `B`, and `C`, in that order, and the current variation is `C`, the variation index would be 2. This value is useful for tabulation, although in some cases, it may be absent. To learn more, read [Error conditions](#error-conditions).
* A `reason` object, which contains information about why that variation was selected. This data structure is described below.

An example call in our Go SDK is depicted below:
[block:code]
{
  "codes": [
    {
      "code": "value, detail, err := client.BoolVariationDetail(\"flag-key\", myUser, false)\n// or StringVariationDetail for a string-valued flag, etc.
index := detail.VariationIndex   // may be nil\nreason := detail.Reason          // will always be present
",
      "language": "go"
    },
    {
      "code": "EvaluationDetail<Boolean> detail =\n  client.boolVariationDetail(\"flag-key\", myUser, false);\n  // or stringVariationDetail for a string-valued flag, etc.
boolean value = detail.getValue();\nInteger index = detail.getVariationIndex();   // may be null\nEvaluationReason reason = detail.getReason(); // will always be present
",
      "language": "java"
    },
    {
      "code": "EvaluationDetail<bool> detail =\n  client.BoolVariationDetail(\"flag-key\", myUser, false);\n  // or StringVariationDetail for a string-valued flag, etc.
bool value = detail.Value;\nint? index = detail.VariationIndex;       // may be null\nEvaluationReason reason = detail.Reason;  // will always be present
",
      "language": "csharp",
      "name": "C# (.NET)"
    },
    {
      "code": "detail = client.variation_detail(\"flag-key\", my_user, false)
value = detail.value\nindex = detail.variation_index  # may be nil\nreason = detail.reason          # will always be present
",
      "language": "ruby"
    },
    {
      "code": "detail = client.variation_detail(\"flag-key\", my_user, False)
value = detail.value\nindex = detail.variation_index  # may be None\nreason = detail.reason          # will always be present
",
      "language": "python"
    },
    {
      "code": "var detail = client.variationDetail(\"flag-key\", myUser, false);
var value = detail.value;\nvar index = detail.variationIndex;  // may be null\nvar reason = detail.reason;         // will always be present
",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "// Note that in order for this to work, your client configuration must\n// include the property \"evaluationReasons: true\"
var detail = client.variationDetail(\"flag-key\", false);
var value = detail.value;\nvar index = detail.variationIndex;  // may be null\nvar reason = detail.reason;         // will always be present
",
      "language": "javascript"
    },
    {
      "code": "\n$detail = $client->variationDetail(\"flag-key\", $myUser, false);
$value = $detail->getValue();\n$index = $detail->getVariationIndex();  // may be null\n$reason = $detail->getReason();         // will always be present\n",
      "language": "php"
    },
    {
      "code": "// Note that in order for this to work, your client configuration must\n// include the property WithEvaluationReasons(true)
EvaluationDetail<bool> detail =\n  client.BoolVariationDetail(\"flag-key\", false);\n  // or StringVariationDetail for a string-valued flag, etc.
bool value = detail.Value;\nint? index = detail.VariationIndex;       // may be null\nEvaluationReason reason = detail.Reason;  // will always be present\n",
      "language": "csharp",
      "name": "C# (Xamarin)"
    },
    {
      "code": "EvaluationDetail<Boolean> detail =\n  client.boolVariationDetail(\"flag-key\", false);\n  // or stringVariationDetail for a string-valued flag, etc.
boolean value = detail.getValue();\nInteger index = detail.getVariationIndex();   // may be null\nEvaluationReason reason = detail.getReason(); // will always be present",
      "language": "java",
      "name": "Android"
    },
    {
      "code": "let EvaluationDetail<Bool> detail =\n  client.variationDetail(\"flag-key\", false);
bool value = detail.value;\nInt? index = detail.variationIndex;   // may be null\nDictionary<String, Any>? reason = detail.reason; // may be null",
      "language": "swift",
      "name": "iOS (Swift)"
    }
  ]
}
[/block]

## Understanding the reason data
In strongly typed languages, the reason object is composed of specific classes. In other languages, it is a hash, such as a dictionary or object. 

The JSON representation is the same in every language, so we will describe the reason object here as if it were a JSON object.

The reason object's only required property is `kind`. This describes the general reason that LaunchDarkly selected this variation. The possible values for `kind` are enums in the strongly typed languages and strings in other languages. 

These values are:
[block:parameters]
{
  "data": {
    "h-0": "Value name",
    "h-1": "Description",
    "0-0": "`OFF`",
    "1-0": "`FALLTHROUGH`",
    "2-0": "`TARGET_MATCH`",
    "3-0": "`RULE_MATCH`",
    "4-0": "`PREREQUISITE_FAILED`",
    "5-0": "`ERROR`",
    "5-1": "The flag could not be evaluated, so the default value was returned. To learn more, read [Error conditions](#error-conditions).",
    "4-1": "The flag had at least one prerequisite flag that either was off or did not return the desired variation. Because of this, the flag returned its \"off\" value.
In this case, the reason object also has this property:\n* `prerequisiteKey` :  The key of the prerequisite flag that failed.",
    "3-1": "The user who encountered the flag matched one of the flag's rules.
In this case, the reason object also has these properties:
* `ruleIndex` : The positional index of the matched rule (0 for the first rule).\n* `ruleId`: The rule's unique identifier, which stays the same even if you rearrange the order of the rules.",
    "2-1": "The user key was specifically targeted for this flag in the \"Target individual users\" section.",
    "1-1": "The flag is on, but the user did not match any targets or rules, so it returned the value that appears on the dashboard under \"Default rule.\" 
The \"default rule\" is not the same thing as the default value discussed in \"Error conditions\".",
    "0-1": "The flag is off and therefore returned its configured off value. This value appears on the dashboard next to \"If targeting is off, serve:\"."
  },
  "cols": 2,
  "rows": 6
}
[/block]
Here is an example of how you could access the details of a reason object in some of LaunchDarkly's SDKs:
[block:code]
{
  "codes": [
    {
      "code": "\nfunc PrintReason(reason ldclient.EvaluationReason) {\n  switch r := reason.(type) {\n  case EvaluationReasonOff:\n    fmt.Println(\"it's off\")\n  case EvaluationReasonFallthrough:\n    fmt.Println(\"fell through\")\n  case EvaluationReasonTargetMatch:\n    fmt.Println(\"targeted\")\n  case EvaluationReasonRuleMatch:\n    fmt.Printf(\"matched rule %d/%s\\n\", r.RuleIndex, r.RuleID)\n  case EvaluationReasonPrerequisiteFailed:\n    fmt.Printf(\"prereq failed: %s\\n\", r.PrerequisiteKey)\n  case EvaluationReasonError:\n    fmt.Printf(\"error: %s\\n\", r.ErrorKind)\n  }\n  // or, if all you want is a simple descriptive string:\n  fmt.Println(reason)\n}\n",
      "language": "go"
    },
    {
      "code": "\nvoid printReason(EvaluationReason reason) {\n  switch (reason.getKind()) {\n    case OFF:\n      System.out.println(\"it's off\");\n      break;\n    case FALLTHROUGH:\n      System.out.println(\"fell through\");\n      break;\n    case TARGET_MATCH:\n      System.out.println(\"targeted\");\n      break;\n    case RULE_MATCH:\n      EvaluationReason.RuleMatch rm = (EvaluationReason.RuleMatch)reason;\n      System.out.println(\"matched rule \" + rm.getRuleIndex()\n        + \"/\" + rm.getRuleId());\n      break;\n    case PREREQUISITE_FAILED:\n      EvaluationReason.PrerequisiteFailed pf =\n        (EvaluationReason.PrerequisiteFailed)reason;\n      System.out.println(\"prereq failed: \" + pf.getPrerequisiteKey());\n      break;\n    case ERROR:\n      EvaluationReason.Error e = (EvaluationReason.Error)reason;\n      System.out.println(\"error: \" + e.getErrorKind());\n  }\n  // or, if all you want is a simple descriptive string:\n  System.out.println(reason.toString());\n}\n",
      "language": "java"
    },
    {
      "code": "\nvoid PrintReason(EvaluationReason reason)\n{\n  switch (reason.Kind)\n  {\n    case EvaluationReasonKind.OFF:\n      Console.WriteLine(\"it's off\");\n      break;\n    case EvaluationReasonKind.FALLTHROUGH:\n      Console.WriteLine(\"fell through\");\n      break;\n    case EvaluationReasonKind.TARGET_MATCH:\n      Console.WriteLine(\"targeted\");\n      break;\n    case EvaluationReasonKind.RULE_MATCH:\n      var rm = reason as EvaluationReason.RuleMatch;\n      Console.WriteLine(\"matched rule \" + rm.RuleIndex + \"/\" + rm.RuleID);\n      break;\n    case EvaluationReasonKind.PREREQUISITE_FAILED:\n\t\t\tvar pf = reason as EvaluationReason.PrerequisiteFailed;\n      Console.WriteLine(\"prereq failed: \" + pf.PrerequisiteKey);\n      break;\n    case EvaluationReasonKind.ERROR:\n      var e = reason as EvaluationReason.Error;\n      Console.WriteLine(\"error: \" + e.ErrorKind);\n      break;\n  }\n  // or, if all you want is a simple descriptive string:\n  System.out.println(reason.ToString());\n}\n",
      "language": "csharp",
      "name": "C# (.NET or Xamarin)"
    },
    {
      "code": "\ndef print_reason(reason)\n  case reason[:kind]\n  when \"OFF\"\n    puts \"it's off\"\n  when \"FALLTHROUGH\"\n    puts \"fell through\"\n  when \"TARGET_MATCH\"\n    puts \"targeted\"\n  when \"RULE_MATCH\"\n    puts \"matched rule #{reason[:ruleIndex]}/#{reason[:ruleId]}\"\n\twhen \"PREREQUISITE_FAILED\"\n\t\tputs \"prereq failed: #{reason[:prerequisiteKey]}\"\n\twhen \"ERROR\"\n\t\tputs \"error: #{reason[:errorKind]}\"\n  end\nend\n",
      "language": "ruby"
    },
    {
      "code": "\ndef print_reason(reason):\n  kind = reason[\"kind\"]\n  if kind == \"OFF\":\n    print \"it's off\"\n  elif kind == \"FALLTHROUGH\":\n    print \"fell through\"\n  elif kind == \"TARGET_MATCH\":\n    print \"targeted\"\n  elif kind == \"RULE_MATCH\":\n    print \"matched rule %d/%s\" % (reason[\"ruleIndex\"], reason[\"ruleId\"])\n  elif kind == \"PREREQUISITE_FAILED\":\n    print \"prereq failed: %s\" % reason[\"prerequisiteKey\"]\n  elif kind == \"ERROR\":\n    print \"error: %s\" % reason[\"errorKind\"]\n",
      "language": "python"
    },
    {
      "code": "\nfunction printReason(reason) {\n  switch(reason.kind) {\n    case \"OFF\":\n      console.log(\"it's off\");\n      break;\n    case \"FALLTHROUGH\":\n      console.log(\"fell through\");\n      break;\n    case \"TARGET_MATCH\":\n      console.log(\"targeted\");\n      break;\n    case \"RULE_MATCH\":\n      console.log(\"matched rule \" + reason.ruleIndex + \", \"  + reason.ruleId);\n      break;\n    case \"PREREQUISITE_FAILED\":\n      console.log(\"prereq failed: \" + reason.prerequisiteKey);\n      break;\n    case \"ERROR\":\n      console.log(\"error: \" + reason.errorKind);\n      break;\n  }\n}\n",
      "language": "javascript",
      "name": "Node.js or JS"
    },
    {
      "code": "\nfunction printReason($reason) {\n  switch ($reason->getKind()) {\n\t\tcase EvaluationReason::OFF:\n\t\t\techo(\"it's off\");\n\t\t\tbreak;\n\t\tcase EvaluationReason::FALLTHROUGH:\n\t\t\techo(\"fell through\");\n\t\t\tbreak;\n\t\tcase EvaluationReason::TARGET_MATCH:\n\t\t\techo(\"targeted\");\n\t\t\tbreak;\n\t\tcase EvaluationReason::RULE_MATCH:\n\t\t\techo(\"matched rule \" . $reason->getRuleIndex() .\n\t\t\t\t\"/\" . $reason->getRuleId());\n\t\t\tbreak;\n\t\tcase EvaluationReason::PREREQUISITE_FAILED:\n\t\t\techo(\"prereq failed: \" . $reason->getPrerequisiteKey());\n\t\t\tbreak;\n\t\tcase EvaluationReason::ERROR:\n\t\t\techo(\"error: \" . $reason->getErrorKind());\n\t\t\tbreak;\n\t}\n  // or, if all you want is a simple descriptive string:\n  echo($reason);\n}\n",
      "language": "php"
    },
    {
      "code": "\nvoid printReason(EvaluationReason reason) {\n  switch (reason.getKind()) {\n    case OFF:\n    \tTimber.d(\"it's off\");\n    \tbreak;\n    case FALLTHROUGH:\n    \tTimber.d(\"fell through\");\n    \tbreak;\n    case TARGET_MATCH:\n    \tTimber.d(\"targeted\");\n      break;\n    case RULE_MATCH:\n    \tEvaluationReason.RuleMatch rm = \n        (EvaluationReason.RuleMatch)reason;\n    \tTimber.d(\"matched rule %d/%s\", \n      \t       rm.getRuleIndex(), \n        \t     rm.getRuleId());\n    \tbreak;\n    case PREREQUISITE_FAILED:\n    \tEvaluationReason.PrerequisiteFailed pf = \n        (EvaluationReason.PrerequisiteFailed)reason;\n    \tTimber.d(\"prereq failed: %s\", pf.getPrerequisiteKey());\n    \tbreak;\n    case ERROR:\n    \tEvaluationReason.Error e = (EvaluationReason.Error)reason;\n    \tTimber.d(\"error: %s\", e.getErrorKind());\n  }\n  // or, if all you want is a simple descriptive string:\n  Timber.d(reason.toString());\n}",
      "language": "java",
      "name": "Android"
    }
  ]
}
[/block]

## <a name="error-conditions"></a>Error conditions
If the `kind` is `ERROR`, it means that the SDK was unable to select any of the flag's variations. This is an abnormal occurrence. 

In this case, the returned flag value is default value that you specified in your code, which is the last parameter of the method you called to evaluate the flag, rather than any value that you specified on your dashboard. In addition, the variation index will be `null/nil`.

When there is an error, the reason object also has an `errorKind` property which will be one of the following:
[block:parameters]
{
  "data": {
    "h-0": "Property name",
    "h-1": "Description",
    "0-0": "`CLIENT_NOT_READY`",
    "1-0": "`FLAG_NOT_FOUND`",
    "2-0": "`USER_NOT_SPECIFIED`",
    "3-0": "`MALFORMED_FLAG`",
    "4-0": "`WRONG_TYPE`",
    "5-0": "`EXCEPTION`",
    "0-1": "The client is not able to establish a connection to LaunchDarkly yet. If there is a persistent feature store, the store does not yet contain flag data.",
    "1-1": "The flag key did not match any known flag.",
    "2-1": "The user object or user key was not provided.",
    "3-1": "There was an internal inconsistency in the flag data. For example, a rule specified a nonexistent variation. 
This is an unusual condition that might require assistance from LaunchDarkly's Support team.",
    "5-1": "An unexpected error stopped flag evaluation. This could happen if you are using a persistent feature store and the database stops working. 
When this happens, the SDK always prints the specific error to the log.",
    "4-1": "The application code requested the flag value with a different data type than it actually is. For example, the code asked for a boolean when the flag type is actually a string. 
This can only happen in strongly typed languages, such as Go, Java, and C#."
  },
  "cols": 2,
  "rows": 6
}
[/block]

## Understanding how Data Export events display
Calling any of the `variation detail` methods not only make extra information available to your code, it also causes the SDK to include it in analytics events. You can see this information if you use the event debugger or Data Export. 

To learn more, read [Data Export](./data-export).

The JSON representation of the reason data will be included in the feature evaluation event as an extra property called `reason`. 

For instance, a debug event might look like this:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"debug\",\n  \"creationDate\": 1548195712000,\n  \"key\": \"my-flag-key\",\n  \"userKey\": \"test@example.com\",\n  \"version\": 1000,\n  \"variation\": 0,\n  \"value\": true,\n  \"default\": false,\n  \"reason\": {\n    \"kind\": \"TARGET_MATCH\"\n  }\n}",
      "language": "javascript",
      "name": "JSON event data"
    }
  ]
}
[/block]
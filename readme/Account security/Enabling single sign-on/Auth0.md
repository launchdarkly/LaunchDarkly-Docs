---
title: "Auth0"
excerpt: "Configuration tips for Auth0 SAML SSO"
---
[Auth0.com SAML Web App Tutorial ](https://auth0.com/docs/protocols/saml/saml2webapp-tutorial) 
[block:parameters]
{
  "data": {
    "h-0": "Auth0 field",
    "h-1": "Notes",
    "0-0": "Settings: Application Callback URL",
    "0-1": "Use LaunchDarkly's \"Assertion consumer service URL\" value",
    "1-0": "Usage: Identity Provider Certificate",
    "1-1": "Paste this certificate into the X.509 certificate field in the LaunchDarkly SAML configuration",
    "2-0": "Usage: Identity Provider URL",
    "2-1": "Paste this URL into the Sign-on URL field in the LaunchDarkly SAML configuration"
  },
  "cols": 2,
  "rows": 3
}
[/block]
The following section includes a sample configuration for the Auth0 web app Settings field. It is recommended that you follow the instructions linked above for the SAML Web App Tutorial. 

It may also be helpful to reference the Auth0 documentation on [SAML Configurations for SSO Integrations](https://auth0.com/docs/protocols/saml/saml-apps) for additional configurations for various SSO integrations.
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"mappings\": {\n    \"user_id\":     \"id\",\n    \"email\":       \"email\",\n    \"given_name\":  \"firstName\",\n    \"family_name\": \"lastName\"\n  },\n  \"createUpnClaim\":       false,\n  \"passthroughClaimsWithNoMapping\": false,\n  \"mapUnknownClaimsAsIs\": false,\n  \"mapIdentities\":        false,\n  \"nameIdentifierFormat\": \"urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress\",\n  \"nameIdentifierProbes\": [\n    \"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress\"\n  ]\n}",
      "language": "json"
    }
  ]
}
[/block]
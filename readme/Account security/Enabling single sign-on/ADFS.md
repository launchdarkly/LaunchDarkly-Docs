---
title: "ADFS"
excerpt: "Active Directory Federation Services"
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains how to configure SSO integration between a self-hosted Active Directory Federation Services (ADFS) server and LaunchDarkly.

ADFS is a service provided by Microsoft as a standard role for Windows Server. It provides a web login using existing Active Directory credentials. Also, for ADFS-based SSO, it's recommended to always check the ADFS logs in the Windows Event Viewer to locate error details.
[block:callout]
{
  "type": "info",
  "title": "Troubleshooting ADFS-based SSO",
  "body": "If you need information about ADFS errors during configuration, troubleshoot it by accessing the ADFS logs in the Windows Event Viewer."
}
[/block]

[block:api-header]
{
  "title": "Prerequisites"
}
[/block]
To give your team access to LaunchDarkly through ADFS, you need the following components:

- An Enterprise LaunchDarkly account.
- A signed SSL certificate.
- An Active Directory instance where all users have an email address attribute.
- A Microsoft Server instance with ADFS installed and configured.
[block:callout]
{
  "type": "warning",
  "body": "This topic will not tell you how to set up ADFS. \n\nFor information about setting up ADFS, see [Microsoft's documentation]( https://docs.microsoft.com/en-us/previous-versions/dynamicscrm-2016/deployment-administrators-guide/gg188612)",
  "title": "Setting up ADFS"
}
[/block]

[block:api-header]
{
  "title": "Set Up LaunchDarkly"
}
[/block]
For more information on configuring LaunchDarkly's SSO, read [Single sign-on](doc:single-sign-on).
[block:parameters]
{
  "data": {
    "h-0": "LaunchDarkly field",
    "h-1": "Notes",
    "0-0": "Sign-on URL",
    "1-0": "X.509 certificate",
    "1-1": "Copy the Token Signing certificate to a Base-64 encoded x.509 file and import it into LaunchDarkly",
    "0-1": "Default value: `https://YOUR-DOMAIN/adfs/ls/`\n\nIf the default value fails, confirm that the endpoint is enabled and the URL path is correct. \n\nFind the endpoint in **Service** > **Endpoints**. \nSearch for an endpoint with the `SAML 2.0/WS-Federation` type."
  },
  "cols": 2,
  "rows": 2
}
[/block]

[block:api-header]
{
  "title": "Set Up Relaying Party Trust"
}
[/block]
1. Log into ADFS Management tool. 
2. Click **Add Relying Party Trust...** to open the "Add Relying Party Trust Wizard".
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e63f189-rpt1.png",
        "rpt1.png",
        1193,
        855,
        "#f8f8f8"
      ],
      "caption": "The Add Relying Party Trust field is called out."
    }
  ]
}
[/block]
3. Click **Start** to begin. Keep the default value, which is **Claims aware**. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/16e4d77-rpt2.png",
        "rpt2.png",
        719,
        585,
        "#f1f0f1"
      ],
      "caption": "The Welcome screen for the setup wizard."
    }
  ]
}
[/block]
4. Choose **Enter data about the relying party manually** and click **Next**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2402bd1-rpt3.png",
        "rpt3.png",
        719,
        585,
        "#eeeaec"
      ],
      "caption": "The Select Data Source screen."
    }
  ]
}
[/block]
5. Set the display name. In the example below, we use `LaunchDarkly Trust`, but you can enter any name you want and click **Next**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b3c1f1d-rpt4.png",
        "rpt4.png",
        720,
        590,
        "#f3f4f4"
      ],
      "caption": "The Specify Display Name screen."
    }
  ]
}
[/block]
6. Click **Next**. You do not need to choose a certificate.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/610ab52-rpt5-fix.png",
        "rpt5-fix.png",
        718,
        587,
        "#f0f0f1"
      ],
      "caption": "The Configure Certificate screen."
    }
  ]
}
[/block]
7. Select **Enable support for the SAML 2.0 WebSSO protocol**. 
8. Enter the **Assertion consumer service URL** from the SSO section of LaunchDarkly into the **Relying party SAML 2.0 SSO service URL** field and click **Next**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d8d4485-rpt6.png",
        "rpt6.png",
        721,
        588,
        "#ede9eb"
      ],
      "caption": "The Configure URL screen."
    }
  ]
}
[/block]
9. In the **Relying party trust identifier** field, enter `app.launchdarkly.com` and click **Add** and click **Next**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d1ef30a-rtp7.png",
        "rtp7.png",
        719,
        585,
        "#f5f1f3"
      ],
      "caption": "The Configure Identifiers screen."
    }
  ]
}
[/block]
10. Click **Next**. You do not need to change any access control policies.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a3d4e0a-rtp8.png",
        "rtp8.png",
        719,
        587,
        "#f2f2f2"
      ],
      "caption": "The Choose Access Control Policy screen."
    }
  ]
}
[/block]
11. Review your changes and click **Next**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/74e0260-rpt9.png",
        "rpt9.png",
        721,
        587,
        "#efeff0"
      ],
      "caption": "The Ready to Add Trust screen."
    }
  ]
}
[/block]
12. If you are satisfied with the configuration, click **Close**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/57a1800-rpt10.png",
        "rpt10.png",
        720,
        585,
        "#f3f3f3"
      ],
      "caption": "The wizard's Finish screen."
    }
  ]
}
[/block]
After you have successfully completed this procedure, a new LaunchDarkly trust will appear in the ADFS Management tool. 
[block:api-header]
{
  "title": "Set Up Claim issuance Policy"
}
[/block]
1. Log into the ADFS Management tool 
2. Select the **LaunchDarkly Trust** 
3. Click **Edit Claim Issuance Policy...** in the dropdown. The **Edit Claim Issuance Policy** window opens.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8414470-ecip1.png",
        "ecip1.png",
        1191,
        857,
        "#f6f6f7"
      ],
      "caption": "The Edit Claim Issuance Policy field is called out."
    }
  ]
}
[/block]
4. Click **Add Rule**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c572d8f-ecip2.png",
        "ecip2.png",
        488,
        549,
        "#f4f2f3"
      ],
      "caption": "The Edit Claim Issuance Policy screen."
    }
  ]
}
[/block]
5. Set **Claim rule template** to **Transform an Incoming Claim** and click **Next**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/08612f8-ecip3.png",
        "ecip3.png",
        720,
        586,
        "#efebed"
      ],
      "caption": "The Select Rule Template screen."
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "In the following example, we use the user's UPN as their name ID. As a best practice, we recommend setting the user's UPN to their email address instead.",
  "title": "Configure the User's UPN Correctly"
}
[/block]
6. Set the following options:
 - Claim rule name: Enter a human-readable name. In this example, we use `UPN to NameID`.
 - Incoming claim type: **UPN**
 - Outgoing claim type: **Name ID**
 - Outgoing name ID format: **Email**
7. Select **Pass through all claim values** and click **Finish**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7563ff6-ecip4.png",
        "ecip4.png",
        722,
        590,
        "#f0f0f0"
      ],
      "caption": "The Configure Rule screen."
    }
  ]
}
[/block]
After you have successfully completed this procedure, ADFS will be configured with LaunchDarkly.
[block:api-header]
{
  "title": "Test Drive and Enable"
}
[/block]
After you successfully complete the procedures in this topic, you can log in through ADFS when test drive is enabled. For more information about test drive, read [Test drive mode](doc:single-sign-on#section-test-drive-mode).

If you are able to successfully log in with test drive enabled, you can enable SSO fully. For more information about enabling SSO, read [Enabling SSO](doc:single-sign-on#section-enabling-sso) .
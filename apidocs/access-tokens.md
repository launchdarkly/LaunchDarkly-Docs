The access tokens API allows you to list, create, modify, and delete access tokens programmatically. 

When using access tokens to manage access tokens, the following restrictions apply:
- [Personal tokens](https://docs.launchdarkly.com/home/account-security/api-access-tokens#personal-tokens) can see all service tokens and other personal tokens created by the same team member. If the personal token has the "Admin" role, it may also see other member's personal tokens.
- [Service tokens](https://docs.launchdarkly.com/home/account-security/api-access-tokens#service-tokens) can see all service tokens. If the token has the "Admin" role, it may also see all personal tokens.
- Tokens can only manage other tokens (including themselves) if they have "Admin" role or explicit permission via a [custom role](https://docs.launchdarkly.com/home/account-security/custom-roles/actions#personal-access-token-actions).

[Learn more about access tokens](https://docs.launchdarkly.com/home/account-security/api-access-tokens).
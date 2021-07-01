The access tokens API allows you to list, create, modify, and delete access tokens programmatically. 

When using access tokens to manage access tokens, the following restrictions apply:
- Personal tokens can see all service tokens and other personal tokens created by the same team member. If the personal token has the "Admin" role, it may also see other member's personal tokens. To learn more, read [Personal tokens](https://docs.launchdarkly.com/home/account-security/api-access-tokens#personal-tokens).
- Service tokens can see all service tokens. If the token has the "Admin" role, it may also see all personal tokens. To learn more, read  [Service tokens](https://docs.launchdarkly.com/home/account-security/api-access-tokens#service-tokens).
- Tokens can only manage other tokens, including themselves, if they have "Admin" role or explicit permission via a custom role. To learn more, read [Personal access token actions](https://docs.launchdarkly.com/home/team/role-actions#personal-access-token-actions).

To learn more about access tokens, read [API access tokens](https://docs.launchdarkly.com/home/account-security/api-access-tokens).

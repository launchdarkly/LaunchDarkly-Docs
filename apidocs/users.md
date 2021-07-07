LaunchDarkly creates a record for each user passed in to `variation` calls. This record powers the autocomplete functionality on the Feature Flag management page, as well as the Users page.

LaunchDarkly also offers an API that lets you tap into this data. You can use the users API to see what user data is available to LaunchDarkly, as well as determine which flag values a user will receive. You can also explicitly set which flag value a user will receive via this API.

Users are always scoped within a project and environment. In other words, each environment has its own set of user records.
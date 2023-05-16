<p align="center">
  <a href="https://docs.launchdarkly.com">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="assets/icons/gh-light-mode-only.svg" >
    <source media="(prefers-color-scheme: dark)" srcset="assets/icons/gh-dark-mode-only.svg" >
    <img alt="LaunchDarkly" src="assets/icons/gh-light-mode-only.svg" >
  </picture>
  </a>
</p>
<h1 align="center">
  LaunchDarkly's Docs
</h1>

## The LaunchDarkly docs service level agreement

All PRs to the `LaunchDarkly-Docs` repo will be addressed within five business days, often sooner. "Addressed" does not necessarily mean "merged" or "accepted." It means that a member of the LaunchDarkly docs team will acknowledge your PR within that timeframe.

In practical terms, we will likely merge your PR within five business days of submission.

### Planning your docs contribution

Some larger PRs require back-and-forth iteration before they're ready to get published. If you're a partner or other party planning a large docs contribution to coincide with a feature release, buffer your time to accommodate for some discussion or review before your docs go live.

If you have a docs concern or contribution that you need addressed urgently, email docs@launchdarkly.com.

We'll do our best to merge your PR as soon as we can, but we're a small team serving a large community. Thank you in advance for your patience.

## (Internal LaunchDarkly only) First-draft docs submission process

Follow this process:

1. File a ticket in the Documentation Shortcut project. Summarize the changes you need in the ticket body. You can assign it to your squad or the epic related to your feature, but make sure it’s in the Documentation project!

2. Schedule a kickoff meeting with @Sarah Day (or invite her to the feature kickoff meeting). You can add other writers if you need to as well.

3. **Two weeks before your feature launches**, PR your docs updates into ld-docs-private. The squad-docs alias get added automatically, but you should also add other technical or product reviewers if you need.

4. Now the docs team gets your docs ready to ship! Expect to go back and forth with them in revisions once or twice before everyone agrees the docs are ready.

Learn more [in Confluence](https://launchdarkly.atlassian.net/wiki/spaces/ENG/pages/1972306124/Writing+first-draft+docs).

## Resources for contributors

You can make your contribution to the docs more likely to be accepted early by following our style guide and using our custom components.

If you want to write a good PR, here are some resources to get you started:

- [The LaunchDarkly documentation style guide](style-guide.md)
- [The LaunchDarkly documentation contributor's guide](contributors-guide.md)
- [Information about our custom components](/src/content/topics/components.mdx)

## 🚴 Running the docs site locally

Our site runs with [Gatsby](https://www.gatsbyjs.org/), [NPM](https://www.npmjs.com/), and [Yarn](https://classic.yarnpkg.com/en/). To run the site on your local machine, you may have to install some packages and dependencies.

Here's how to start:

1. Clone the repo locally.
2. Navigate to it in your terminal.
3. Run the following command:

```shell
yarn && yarn start
```

As a shortcut:

```shell
yarn dev
```

The site will build. Monitor the progress in your terminal, and when the build completes, navigate to [localhost:8000](http://localhost:8000).

You can also run in a `fast` development mode which omits all mdx images and most mdx content except for `/home/getting-started`, `/home/flags` and `/home/contexts` :

```shell
yarn && yarn dev-fast
```

This cuts the gatsby build time to just < 7 seconds as opposed to > 1 minute.

To run tests, read [Running tests](#running-tests).

## 👥 Adding new topics and editing existing topics from within the repo

The easiest way to modify an existing topic is by opening a PR against it directly from the docs site by clicking the "Edit in GitHub" button on the topic page.

If you want to add a new topic from a local build, the `src/content/topics` folder contains all the docs markdown. You can also find an existing topic and modify it from here.

Need more help? The [contributor's guide](contributors-guide.md) goes into a lot more detail about the structure and architecture of the repo.

## 🔥 Troubleshooting the build

If you encounter what looks like a Gatsby cache issue, you can clean the Gatsby cache before your build the site.

Here's how:

```shell script
yarn clean
```

If you still encounter issues, perform a clean-all to delete all possible caches:

```shell script
yarn clean-all
```

## (Internal LaunchDarkly use only) Accessing the repo and docs tools

If you're a new LaunchDarkly technical writer or other contributor accessing the repo for the first time, you must complete the following setup steps to access and make changes to ld-docs-private.

1. Request access to the [Dev repo](https://github.com/launchdarkly/dev).
2. Follow steps 1-9 under [New computer setup](https://launchdarkly.atlassian.net/wiki/spaces/ENG/pages/15237262/New+Computer+Setup).
3. Request admin access to ld-docs-private and [LaunchDarkly-Docs](https://github.com/launchdarkly/LaunchDarkly-Docs). To learn more more about how the repos relate to each other, read [Syncing content between ld-docs-private and LaunchDarkly-Docs](https://launchdarkly.atlassian.net/wiki/spaces/ENG/pages/467009739/LaunchDarkly+Docs+How-to+Guide#Syncing-content-between-ld-docs-private-and-LaunchDarkly-Docs).

## (Internal LaunchDarkly use only) 🌗 Accessing the staging site

When you open a docs PR, it creates a unique staging directory. The URL for that PR is linked in the PR page in the repo, and follows the pattern `https://docs-stg.launchdarkly.com/nnnn/`, where `nnnn` is your PR number. If the branch you are merging into has a name ending in `-eap`, then its content is additionally deployed to the staging site at `https://docs-stg.launchdarkly.com/branch-name`, where `branch-name` is something like `your-feature-eap`.

Staging is automatically refreshed on a push to each branch. To learn more, read [Build & Deploy](#-build--deploy).

## (Internal LaunchDarkly use only) 🚀 Building and deploying the docs site

GitHub action automatically builds and deploys to staging on push to main.

If you want to manually deploy your own branch to staging, do this:

```shell
yarn deploy
```

This builds Gatsby and upload the artifacts to the staging s3 bucket.

## (Internal LaunchDarkly use only) Scheduling a PR merge to main

In your pull requests, add a line to the end of the pull request description like this:

```
/schedule 2022-12-31
```

Or if you need to specify the exact time, you can use an [ISO 8601 date string](https://www.progress.com/blogs/understanding-iso-8601-date-and-time-format):

```
/schedule 2022-12-31T15:45:00
```

Dates are in PT timezone. Any string that works with the [`new Date()` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) will work.

## (Internal LaunchDarkly use only) Flagging changes

We use flags in Catfood under the Docs project. There are three environments: Development, Test and Production
corresponding to local dev, staging and prod respectively.

### Flagging navigation items

You can use the [gatsby-plugin-launchdarkly](https://github.com/launchdarkly/gatsby-plugin-launchdarkly), to hide nav items behind a feature flag. To do this, add the `flagKey` property to the nav item you want to control with a flag in `navigationData.json`. Use the camel case version of the flag key, as shown below:

```json
...
  {
    "label": "Your flag controlled nav item",
    "path": "/home/getting-started/hiding-your-nav-behind-a-flag",
    "flagKey": "myHiddenNav"
  },
...
```

## Running tests

### Local

To check local links in MDX files run

```shell
yarn test-links
```

To validate external links locally, install `lychee`

```shell
brew install lychee
```

Then run

```shell
yarn lychee
```

To run spellcheck locally, use

```
yarn spellcheck
```

To run our integration tests locally, make sure the dev server is running via `yarn start`, and

```shell
yarn cypress
```

To run them in headless mode,

```shell
yarn cypress:ci
```

To skip external link validation,

```shell
yarn cypress --env skip_external=true
```

### CI

All of our tests are integrated into out CI/CI pipeline and most are guaranteed to run on every PR.

Local link checking and spellcheck run as part of the [Testing](https://github.com/launchdarkly/ld-docs-private/actions/workflows/main.yml) GitHub action. External link link validation runs once per day as part of the [Scheduled link check](https://github.com/launchdarkly/ld-docs-private/actions/workflows/scheduled-link-check.yml) GitHub action.

## 🔨 Navigation data

All navigation data are stored in [src/content/navigationData.json](https://github.com/launchdarkly/ld-docs-private/blob/main/src/content/navigationData.json).
This is flattened at build time to autogenerate two files `rootTopics.json` and `secondLevelTopics.json`. The
flattened data are queryable via graphql and allows us to render the side nav more efficiently.

You can also flag navigation items. To learn more, please refer the section [Flagging navigation items](#flagging-navigation-items).

## 🔍 Algolia search

Please reach out to @scribblingfox if you need to log in to Algolia. She will be able to send you an invite.

To index mdx content and send to Algolia, add the following to your `.env.development` file:

```dotenv
ALGOLIA_ADMIN_KEY=insertValue
BUILD_DEV_ALGOLIA_INDEX=true
```
You can get an admin key in the Algolia settings.
If no special environment is set, this will use the `Docs_development` index.
The convention for index names is `{GATSBY_ALGOLIA_INDEX}_{ENVIRONMENT}`. The environment variable can be set via
cli param `GATSBY_ACTIVE_ENV`. For example, for staging, you would run the following command:

```bash
"build-staging": "GATSBY_ACTIVE_ENV=staging gatsby build",
```

This will create an algolia index called `Pages_staging`.

## Upgrading Packages

This repo uses Yarn PnP (zero-installs) to reduce build times. 

When upgrading package versions, you must commit cache files such as `.yarn/cache/...` and `.pnp.cjs` into `main` along with the `yarn.lock` and `package.json` files.

To learn more about PnP, [read the documentation](https://yarnpkg.com/features/pnp).
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="assets/images/launchdarkly-logo.png" width="60" />
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

The site will build. Monitor the progress in your terminal, and when the build completes, navigate to [localhost:8000](http://localhost:8000).

You can also run in a `fast` development mode which omits all mdx images and most mdx content except for getting-started, managing-flags and managing-users:

```shell
yarn && yarn dev-fast
```

This cuts the gatsby build time to just < 7 seconds as opposed to > 1 minute.

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

If you're a new LaunchDarkly technical writer or other contributor accessing the repo for the first time, you must complete the following setup steps to access and make changes to git-gatsby.

1. Request access to the [Dev repo](https://github.com/launchdarkly/dev).
2. Follow steps 1-9 under [New computer setup](https://launchdarkly.atlassian.net/wiki/spaces/ENG/pages/15237262/New+Computer+Setup).
3. Request admin access to git-gatsby and [LaunchDarkly-Docs](https://github.com/launchdarkly/LaunchDarkly-Docs). To learn more more about how the repos relate to each other, read [Syncing content between git-gatsby and LaunchDarkly-Docs](https://launchdarkly.atlassian.net/wiki/spaces/ENG/pages/467009739/LaunchDarkly+Docs+How-to+Guide#Syncing-content-between-git-gatsby-and-LaunchDarkly-Docs).

## (Internal LaunchDarkly use only) 🌗 Accessing the staging site

The staging url is [docs-stg.launchdarkly.com](https://docs-stg.launchdarkly.com).

Staging is automatically refreshed on push to master. See [Build & Deploy](#-build--deploy).

## (Internal LaunchDarkly use only) 🚀 Building and deploying the docs site

GitHub action automatically builds and deploys to staging on push to master.

If you want to manually deploy your own branch to staging, do this:

```shell
yarn deploy
```

This builds Gatsby and upload the artifacts to the staging s3 bucket.

## (Internal LaunchDarkly use only) Flagging changes

We use flags in Catfood under the Docs project. There are three environments: Development, Test and Production
corresponding to local dev, staging and prod respectively.

### Flagging content changes

You can flag mdx changes with the `Feature` component defined at `src/components/mdx/feature.tsx`. In your mdx file, nest your React or HTML elements under the `<Feature>` component like so:

```jsx
<Feature flagKey="camelCasedFlagKey">
<Callout intent="primary">
  <CalloutTitle>Syncing segments is an Enterprise feature</CalloutTitle>
  <CalloutDescription>

Content to be flagged

  </CalloutDescription>
</Callout>
</Feature>
```

The `flagKey` prop is the camelCased version of your flag key since we are using the React SDK here which uses
camelCased keys by default.

There is also an optional `showWhenVariation` prop. This is used to control what flag value will show
your content. For example, the EAP callout below will be displayed when the `syncedSegments` flag is `false`.
This is useful to help us hide old content when rolling out new ones. The `showWhenVariation` prop defaults to `true`.

```jsx
<Feature flagKey="syncedSegments" showWhenVariation={false}>
<Callout intent="info">
  <CalloutTitle>This feature is for Early Access Program customers only</CalloutTitle>
  <CalloutDescription>

Syncing segments from Amplitude cohorts is only available to members of LaunchDarkly's Early Access Program...

  </CalloutDescription>
</Callout>
</Feature>
```

**GOTCHA**: Indentation matters! This is a known issue with mdx and nested elements. Make sure children
elements directly under `<Feature>` are left-aligned like the above example.

### Flagging navigation items

You can use the [gatsby-plugin-launchdarkly](https://github.com/launchdarkly-labs/gatsby-plugin-launchdarkly), to hide
nav items behind a feature flag. To do this, add the `flagKey` property to the nav item you want to control with a flag
in `navigationData.json`. Use the camel case version of the flag key, as shown below:

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

To run our integration tests locally, make sure the dev server is running via `yarn start`, and

```shell
yarn cypress
```

To run them in headless mode,

```shell
yarn cypress:ci
```

## 🔨 Navigation data

All navigation data are stored in [src/content/navigationData.json](https://github.com/launchdarkly/git-gatsby/blob/master/src/content/navigationData.json).
This is flattened at build time to autogenerate two files `rootTopics.json` and `secondLevelTopics.json`. The
flattened data are queryable via graphql and allows us to render the side nav more efficiently.

You can also flag navigation items. To learn more, please refer the section [Flagging navigation items](#flagging-navigation-items).

## 🔍 Algolia search

Please reach out to @scribblingfox if you need to login to the Algolia dashboard. She will be able to send you an invite.

To index mdx content and send to algolia, create a local `.env.development` file that contains the following:

```dotenv
GATSBY_ALGOLIA_APP_ID=insertValue
GATSBY_ALGOLIA_SEARCH_KEY=insertValue
ALGOLIA_ADMIN_KEY=insertValue
GATSBY_ALGOLIA_INDEX=insertValue
```

`GATSBY_ALGOLIA_INDEX` is the index name that will be used to create the algolia index for your content.
For example, if you set `GATSBY_ALGOLIA_INDEX=Pages` and you run `yarn build-dev`, this will crawl
all mdx files under src/content/topics and create an algolia index called `Pages_development`.
The convention is `{GATSBY_ALGOLIA_INDEX}_{ENVIRONMENT}`. The environment variable can be set via
cli param `GATSBY_ACTIVE_ENV`. For example, for staging, you would run the following command:

```bash
"build-staging": "GATSBY_ACTIVE_ENV=staging gatsby build",
```

This will create an algolia index called `Pages_staging`.

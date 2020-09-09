<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="assets/images/launchdarkly-logo.png" width="60" />
  </a>
</p>
<h1 align="center">
  LaunchDarkly's Docs
</h1>

## The LaunchDarkly docs service level agreement

All PRs to the `LaunchDarkly-Docs` repo will be addressed within 5 business days, often sooner. 'Addressed' does not necessarily mean 'merged' or 'accepted;' it means that a member of the LaunchDarkly docs team will acknowledge your PR within that timeframe.

In practical terms, we will likely merge your PR within 5 business days of submission.

### Planning your docs contribution

Some larger PRs require back-and-forth iteration before they're ready to get published. If you're a partner or other party planning a large docs contribution to coincide with a feature release, buffer your time to accommodate for some discussion or review before your docs go live.

If you have a docs concern or contribution that you need addressed urgently, email docs@launchdarkly.com.

We'll do our best to merge your PR as soon as we can, but we're a small team serving a large community. Thank you in advance for your patience.

## Resources for contributors

You can make your contribution to the docs more likely to be accepted early by following our style guide and using our custom components.

If you want to write a good PR, here are some resources to get you started:

- [The LaunchDarkly documentation style guide](style-guide.md)
- [The LaunchDarkly documentation contributor's guide](contributors-guide.md)
- [Information about our custom components](components.md)

## 🚴 Running the docs site locally

Our site runs with [Gatsby](https://www.gatsbyjs.org/), [NPM](https://www.npmjs.com/), and [Yarn](https://classic.yarnpkg.com/en/). To run the site on your local machine, you may have to install some packages and dependendies.

Here's how to start:

1. Clone the repo locally.
2. Navigate to it in your terminal.
3. Run the following command:

```shell
yarn && yarn start
```

The site will build. Monitor the progress in your terminal, and when the build completes, navigate to [localhost:8000](http://localhost:8000).

You can also run in a `fast` development mode which omits all mdx images and most mdx content except for getting-started, managin-flags and managing-users:

```shell
yarn && yarn dev-fast
```

This cuts the gatsby build time to just < 7 seconds as opposed to > 1minute.

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

### Hiding nav item behind a feature flag

Using the [gatsby-plugin-launchdarkly](https://github.com/launchdarkly-labs/gatsby-plugin-launchdarkly), you can hide nav items behind a feature flag. All you need to do is add the `flagKey` property to the nav item you'd like controlled by a flag in `navigationData.json`:

```json
...
  {
    "label": "Your flag controlled nav item",
    "path": "/home/getting-started/hiding-your-nav-behind-a-flag",
    "flagKey": "my-hidden-nav"
  },
...
```

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

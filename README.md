<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="assets/images/launchdarkly-logo.png" width="60" />
  </a>
</p>
<h1 align="center">
  LaunchDarkly's Docs
</h1>

## 🚴 Development

```shell
yarn && yarn start
```

Then navigate to [localhost:8000](http://localhost:8000)

## 🌗 Staging

The staging url is [docs-stg.launchdarkly.com](https://docs-stg.launchdarkly.com).

Staging is automatically refreshed on push to master. See [Build & Deploy](#-build--deploy).

## 🚀 Build & Deploy
Github action automatically builds and deploys to staging on push to master.

If you want to manually deploy your own branch to staging, do this:

```shell
yarn deploy
```

This will build gatsby and upload the artifacts to the staging s3 bucket.

## 🔨 Navigation data
All navigation data are stored in [src/content/navigationData.json](https://github.com/launchdarkly/git-gatsby/blob/master/src/content/navigationData.json).
This is flattened at build time to autogenerate two files `rootTopics.json` and `secondLevelTopics.json`. The
flattened data are queryable via graphql and allows us to render the side nav more efficiently.

### Hiding nav item behind a feature flags

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

## 👥 Markdown content

The `src/content/topics` folder contains all the docs markdown. If you would like to contribute to the
docs, this will be the place to start.

## 🔥 Issues
If you encounter what looks like a gatsby cache issue, you can clean the gatsby cache first:

```shell script
yarn clean
```

If you still encounter issues, perform a clean-all to delete all possible caches:

```shell script
yarn clean-all
```

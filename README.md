<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="assets/images/launchdarkly-logo.png" width="60" />
  </a>
</p>
<h1 align="center">
  The Git Gatsby - LaunchDarkly's Docs Site
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

## 🔍 Algolia search
Please reach out to Sarah Day if you need to login to the Algolia dashboard. She will be able to send you an invite.

To index mdx content and send to algolia, create a local `.env.development` file that contains the following:

```dotenv
ALGOLIA_APP_ID=insertValue
ALGOLIA_SEARCH_KEY=insertValue
ALGOLIA_ADMIN_KEY=insertValue
ALGOLIA_INDEX=insertValue
```

`ALGOLIA_INDEX` is the index name that will be used to create the algolia index for your content.
For example, if you set `ALGOLIA_INDEX=Pages` and you run `yarn build-dev`, this will crawl 
all mdx files under src/content/topics and create an algolia index called `Pages_development`.
The convention is `{ALGOLIA_INDEX}_{ENVIRONMENT}`. The environment variable can be set via
cli param `GATSBY_ACTIVE_ENV`. For example, for staging, you would run the following command:

```bash
"build-staging": "GATSBY_ACTIVE_ENV=staging gatsby build",
``` 

This will create an algolia index called `Pages_staging`.

## 👥 Public content

The `src/content` folder is meant to be publicly mirrored. This is so anyone can submit a PR
to update our docs.

## 🔥 Issues
If you encounter what looks like a gatsby cache issue, you can clean the gatsby cache first:

```shell script
yarn clean
```

If you still encounter issues, perform a clean-all to delete all possible caches:

```shell script
yarn clean-all
```

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
GATSBY_ALGOLIA_APP_ID=insertValue
GATSBY_ALGOLIA_SEARCH_KEY=insertValue
ALGOLIA_ADMIN_KEY=insertValue
```

Then run `yarn build-dev`. This will crawl all mdx files under src/content/topics and create algolia indices in a dev 
account. You can see the indices created if you login to the algolia dashboard.


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

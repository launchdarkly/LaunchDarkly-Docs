# LaunchDarkly documentation contributor's guide

This guide is intended for LaunchDarkly employees, partners, and contributors to add docs of their own to [the LaunchDarkly product and SDK docs site](docs.launchdarkly.com). Read this guide if you're a frequent contributor to the docs, a curious newcomer, or just love reading terrific technical writing. I know I do.

This guide explains how the `LaunchDarkly-Docs` `content` directory is structured, our naming and filepath conventions, and helps you start writing or editing topics. It does not explain how to write good docs, or how to run the site locally. To learn about writing docs, read the [style guide](style-guide.md) and to run the site, start with the [README](readme.md)

Here's everything you need to contribute to the docs successfully.

# Architecture and workflow

The `LaunchDarkly-Docs` repo has a lot of things in it, but you only need to pay attention to one or two directories within it to add docs of your own and PR them into the site.

In order to write docs that build and run in our site, you must follow the guidelines given below.

All documentation topics follow identical formats:

* They are .MDX files.
* They exist in a file structure that corresponds to their placement in the sidenav. For example, `custom-roles.mdx` is inside a directory called `managing-members` because it exists in the "Managing your account members" category on the docs site.
* They have frontmatter that assists their placement in search results, controls whether they appear on the docs site or not, and define their title and URL slug.

The content architecture in the `LaunchDarkly-Docs` repo is as follows:

* Documentation topics are in `src/content/topics`. Inside the `/topics` directory, sub-directories follow the structure of the sidenav and header navigation visible on docs.launchdarkly.com.
* Filepaths dictate both the location of the topic in the repo and the URL of the topic on the live site.

 For example:

 /header-section/sidenav-category/directory/topic
 `/home/account-security/custom-roles/configure`
 or
 /header-section/sidenav-category/topic
 `/home/members/custom-roles`
* Screenshots are in `src/content/images/`.
* The sidenav is in NavigationData.js.
* Redirects are in redirectRules.js.

## Writing frontmatter for docs topics

Frontmatter is worth a section of its own because it's extremely precise. If you do not format the frontmatter correctly, bad things happen; topics don't get indexed by Algolia, the sidenav breaks, we serve 404s, or the whole site goes down. Yikes.

Here's a template for what the frontmatter should look like:

```
---
path: /home/members/custom-roles
title: Custom roles
description: This topic explains what custom roles are and how to create them. Custom roles give access control to everything in LaunchDarkly, from feature flags to metrics, environments, and teams.
published: true
tags: ['custom role', 'permission', 'access', 'resource', 'policy']
---
```

* `path`: This gives the URL path for the topic. It must include all parent directories, back to the root docs.launchdarkly.com URL.
* `title`: This displays at the top of the page and in search results. Be sure the titles are the same in the topic, the sidenav, and index pages if applicable!
* `description`: Algolia uses the description for more effective search. Compress the Overview section of your topic into a useful description. Don't make it too long!
* `published`: Set to `true` to have your topic appear at its URL, and `false` to keep the topic private. `published` must be set to `true` for all topics that appear in the sidenav. Clicking an item in the sidenav set to `false` will return a 404, and 404s make Google's SEO engines, and by extension the Marketing team, very sad.
* `tags`: Algolia uses this array of topic tags for more effective search. If you create a new tag, update `/src/components/search/tags.md` to keep our dictionary of tags up to date.
* `site`: This indicates whether the functionality described in the topic is applicable to the commercial LaunchDarkly instance only, or also to the federal instance of LaunchDarkly.
  * If you exclude this, the "LaunchDarkly docs" and "Federal docs" versions of this topic will have the same base content. (The "Federal docs" version will have relevant URLs changed from `.com` to `.us`, but that change is based entirely on which docs site version the reader has selected. It is not controlled by this frontmatter.)
  * If you include this and set the value to `launchDarklyOnly`, then when the reader selects to view the "Federal docs" version of the docs, there will be a callout displayed at the top of this topic, indicating that the functionality is not available for the federal instance of LaunchDarkly.
* `siteAlertTitle`: This indicates the title for the callout at the top of this topic. The callout will appear if `site` is `launchDarklyOnly` and the reader selects to view the "Federal docs" version of the docs. If not specified, the default is `<title> is not FedRAMP compliant`.

## Writing docs in the LaunchDarkly style

To learn about how we write docs at LaunchDarkly, read the [documentation style guide](style-guide.md).

## Adding a new topic

To add a new topic to the docs, clone the repo locally and add a new topic following the structure outlined in [Architecture and workflow](#architecture-and-workflow).

For many types of new topics, we have templates available in the [templates](/templates) folder.

### Updating the changelog

When you add a new topic, you should also add an entry to the [changelog](https://docs.launchdarkly.com/home/changelog).

The entry should be a new table row at the top of the table. It should look like this:

```
<TableRow>
  <TableCell>Date, spelled out as MONTH D, YYY</TableCell>
  <TableCell>Summary of change</TableCell>
  <TableCell><a href="location of new topic">Page name of new topic</a></TableCell>
  <TableCell>Not applicable.</TableCell>
</TableRow>
```

The fourth cell should be a link to the PR from the [LaunchDarkly-Docs repository](https://github.com/launchdarkly/LaunchDarkly-Docs/), if a PR from that repository was the reason for the change. In practice, almost all new topics originate in the [ld-docs-private repository](https://github.com/launchdarkly/ld-docs-private/), and this cell's value is left as "Not applicable."

## Editing an existing topic in Github

This is probably the easiest way to make changes to a documentation topic, but is better for minor changes like SDK version numbers or typo corrections.

1. Navigate to the page you wish to change.
2. Click **Edit in Github** in the upper right corner of the center column.
3. Make changes to the content in Github.
4. Follow the prompts to open a PR.

The outcome of this workflow is a PR to the public docs which our docs team will review in accordance with our [SLA](readme.md#the-launchdarkly-docs-service-level-agreement).

## Previewing your changes before publication

You can preview the contents of your local branch by using `yarn start` to build the site locally and preview your changes. To learn more about this, read the [README](readme.md).

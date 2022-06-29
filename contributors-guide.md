# LaunchDarkly documentation contributor's guide

This guide is intended for LaunchDarkly employees, partners, and contributors to add docs of their own to [the LaunchDarkly product and SDK docs site](docs.launchdarkly.com). Read this guide if you're a frequent contributor to the docs, a curious newcomer, or just love reading terrific technical writing. I know I do.

This guide explains how the `LaunchDarkly-Docs` `content` directory is structured, our naming and filepath conventions, and helps you start writing or editing topics. It does not explain how to write good docs, or how to run the site locally. To learn about writing docs, read the [style guide](style-guide.md) and to run the site, start with the [README](readme.md)

Here's everything you need to contribute to the docs successfully.

# Architecture and workflow

The `LaunchDarkly-Docs` repo has a lot of things in it, but you only need to pay attention to one or two directories within it to add docs of your own and PR them into the site. 

In order to write docs that build and run in our site, you must follow the guidelines given below.

All documentation topics follow identical formats:

* They are .MDX files.
* They exist in a file structure that corresponds to their placement in the sidebar navigation (for example, 'The Users dashboard' is inside a directory called 'Managing Users' because it exists in the 'Managing Users' category on the docs site).
* They have frontmatter that assists their placement in search results, controls whether they appear on the docs site or not, and define their title and URL slug.

The content architecture in the `LaunchDarkly-Docs` repo is as follows:

* Documentation topics are in `src/content/topics`. Inside the `/topics` directory, sub-directories follow the structure of the sidebar and header navigation visible on docs.launchdarkly.com. 
* Filepaths dictate both the location of the topic in the repo and the URL of the topic on the live site.

 For example:

 /header-section/sidebar-category/directory/topic 
 `/home/account-security/custom-roles/configure`
 or
 /header-section/sidebar-category/topic
 `/home/managing-flags/dashboard`
* Screenshots are in `src/content/images/`.
* The sidebar navigation is in NavigationData.js. 
* Redirects are in redirectRules.js.

## Writing frontmatter for docs topics

Frontmatter is worth a section of its own because it's extremely precise. If you do not format the frontmatter correctly, bad things happen; topics don't get indexed by Algolia, the sidebar navigation breaks, we serve 404s, or the whole site goes down. Yikes.

Here's a template for what the frontmatter should look like:

```
---
path: /home/managing-users/users-dashboard
title: The Users dashboard
description: This topic explains what the Users dashboard is. The Users dashboard gives you a summary view of how each user experiences all of the features in your app, and lets you customize their experience from one screen.
published: true
tags: ['dashboard', 'user', 'attribute', 'mau']
---
```

* `path`: This gives the URL path for the topic. It must include all parent directories, back to the root docs.launchdarkly.com URL.
* `title`: This displays at the top of the page and in search results. Be sure the titles are the same in the topic, the sidebar nav, and index pages if applicable!
* `description`: Algolia uses the description for more effective search. Compress the Overview section of your topic into a useful description. Don't make it too long!
* `published`: Set to `true` to have your topic appear at its URL, and `false` to keep the topic private. `published` must be set to `true` for all topics that appear in the sidebar navigation. Clicking an item in the sidebar nav set to `false` will return a 404, and 404s make Google's SEO engines, and by extension the Marketing team, very sad.
* `tags`: Algolia uses this array of topic tags for more effective search. If you create a new tag, update `/src/components/search/tags.md` to keep our dictionary of tags up to date.

## Writing docs in the LaunchDarkly style

To learn about how we write docs at LaunchDarkly, read the [documentation style guide](style-guide.md).

## Adding a new topic

To add a new topic to the docs, clone the repo locally and add a new topic following the structure outlined in [Architecture and workflow](#architecture-and-workflow).

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

The fourth cell should be a link to the PR from the [LaunchDarkly-Docs repository](https://github.com/launchdarkly/LaunchDarkly-Docs/), if a PR from that repository was the reason for the change. In practice, almost all new topics originate in the [git-gatsby repository](https://github.com/launchdarkly/git-gatsby/), and this cell's value is left as "Not applicable." 

## Editing an existing topic in Github

This is probably the easiest way to make changes to a documentation topic, but is better for minor changes like SDK version numbers or typo corrections.

1. Navigate to the page you wish to change.
2. Click **Edit in Github** in the upper right corner of the center column.
3. Make changes to the content in Github.
4. Follow the prompts to open a PR.

The outcome of this workflow is a PR to the public docs which our docs team will review in accordance with our [SLA](readme.md#the-launchdarkly-docs-service-level-agreement).

## Previewing your changes before publication

You can preview the contents of your local branch by using `yarn start` to build the site locally and preview your changes. To learn more about this, read the [README](readme.md).

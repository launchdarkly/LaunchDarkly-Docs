# LaunchDarkly documentation contributor's guide

This guide is intended for LaunchDarkly employees, partners, and contributors to add docs of their own to [the LaunchDarkly product and SDK docs site](docs.launchdarkly.com). Read this guide if you're a frequent contributor to the docs, a curious newcomer, or just love reading terrific technical writing. I know I do.

This guide explains how the `LaunchDarkly-Docs` `content` directory is structured, our naming and filepath conventions, and helps you start writing or editing topics. It does not explain how to write good docs, or how to run the site locally. To learn about writing docs, read the [style guide](style-guide.md) and to run the site, start with the [README](readme.md).

Here's everything you need to contribute to the docs successfully.

Table of contents:
- [LaunchDarkly documentation contributor's guide](#launchdarkly-documentation-contributors-guide)
- [Architecture and workflow](#architecture-and-workflow)
  - [Writing frontmatter for docs topics](#writing-frontmatter-for-docs-topics)
  - [Writing docs in the LaunchDarkly style](#writing-docs-in-the-launchdarkly-style)
  - [Adding a new topic](#adding-a-new-topic)
    - [Updating the changelog](#updating-the-changelog)
  - [Editing an existing topic in GitHub](#editing-an-existing-topic-in-github)
  - [Previewing your changes before publication](#previewing-your-changes-before-publication)
  - [Special considerations for federal docs](#special-considerations-for-federal-docs)
- [Using site components](#using-site-components)
  - [Learn more](#learn-more)
  - [Details](#details)
  - [Image](#image)
  - [Callout](#callout)
    - [Formatting callouts](#formatting-callouts)
  - [Code samples](#code-samples)
  - [Tables](#tables)

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
</TableRow>
```

## Editing an existing topic in GitHub

This is probably the easiest way to make changes to a documentation topic, but is better for minor changes like SDK version numbers or typo corrections.

To edit an existing topic:

1. Navigate to the page you wish to change.
2. Click **Edit in Github** in the upper right corner of the center column.
3. Make changes to the content in Github.
4. Follow the prompts to open a PR.

The outcome of this workflow is a PR to the public docs which our docs team will review in accordance with our [SLA](readme.md#the-launchdarkly-docs-service-level-agreement).

## Previewing your changes before publication

You can preview the contents of your local branch by using `yarn start` to build the site locally and preview your changes. To learn more about this, read the [README](readme.md).

## Special considerations for federal docs

Readers of [https://docs.launchdarkly.com/](https://docs.launchdarkly.com/) can select whether to view "LaunchDarkly docs" (default) or "Federal docs."

When viewing the federal docs:

* Select LaunchDarkly URLs in links and code samples automatically change from `.com` to `.us`. The list of these subdomains is maintained in `/src/utils/siteAwareUtils.ts`. However, any links authored as `.us` do NOT automatically change to `.com`.
* Alerts specific to readers of the federal docs may appear. You can specify these using the ["site" frontmatter keyword](/contributors-guide.md#writing-frontmatter-for-docs-topics).
* Callouts specific to readers of the federal docs may appear. You can specify these using the ["site" keyword in the callout tag](#callout).
* Code samples specific to readers of the federal docs may appear. You specify these using the ["site" keyword after the language](#code-samples).

# Using site components

This section provides you with standard components, tokens, and practices for our docsite.

Our components are built with React. Translating markdown and HTML components into human-usable formatting can be scary. Follow these best practices to have a better experience:

* Add line breaks after every component

  Separate headers, components, and other formatting with a paragraph break. This ensures the text formats correctly. Don't worry about inline links, as those don't mess up any formatting.

  ```
  # EXAMPLE HEADER
  < -- this line deliberately left blank -- >
  Content content.
  ```

* Use line breaks to separate HTML-style tags in React components from other types of content. For example:

  ```
  <Callout intent="info">
  <CalloutTitle>CALLOUT-TITLE</CalloutTitle>
    <CalloutDescription>

  CALLOUT CONTENT.

    </CalloutDescription>
  </Callout>
  ```

* Left-justify text content inside callouts. Callout contents do not respect markdown unless they are left-justified.

## Learn more

Use the LearnMore component to link to related API endpoints in our API docs.

_For example, this code:_
<CodeSample>
<CSTab label="Single learn more">

```js
<LearnMore>

You can also use the REST API: [Single link](/foobar)

</LearnMore>
```

</CSTab>
</CodeSample>

_Renders this:_
<LearnMore>

You can also use the REST API: [API link](/foobar)

</LearnMore>


## Details

The docs site supports a details or "disclosure" component to expand/collapse information.

_For example, this code:_
<CodeSample>
<CSTab label="Details">

```jsx
<Details summary="Click to open more information">

Here are some expanded details.

</Details>
```

</CSTab>
</CodeSample>

_Renders this:_
<Details summary="Click to open more information">

Here are some expanded details.

</Details>
<br />
Details may also be set to be open by default.

_For example, this code:_
<CodeSample>
<CSTab label="Details">

```jsx
<Details open summary="Click to open more information">

This details component is open by default.

</Details>
```

</CSTab>
</CodeSample>

_Renders this:_
<Details open summary="Click to open more information">

This details component is open by default.
</Details>

## Image

The docs site supports PNGs and GIFs. Just use Markdown images. Put the images in `/src/content/images`. In your Markdown, the path to the image is relative to that directory.

Include a caption for all images. These function both as a caption and as alt text.

_For example, this code:_
<CodeSample>
<CSTab label="Image">

```markdown
![Some caption.](data-export.png)
```

</CSTab>
</CodeSample>

_Renders this:_<br />
![Some caption](/src/content/images/flag-status-indicator-new.png)<br />
Some caption

## Callout

Callouts are color-coded blocks of content with a title and a body. Use them to draw attention to particular paragraphs of information.

_For example, this code:_
```js
<Callout intent="primary"> <!-- OR alert, warning, info -->
  <CalloutTitle>This feature is for Early Access Program customers only</CalloutTitle>
  <CalloutDescription>

FEATURE HERE is only available to members of LaunchDarkly's Early Access Program (EAP). If you want access to this feature, [join the EAP](https://launchdarkly.com/eap).

  </CalloutDescription>
</Callout>
```

_Renders this:_<br />
![An EAP callout.](/src/content/images/callout-example.png)

There are four different types of callouts, which affect the callout color and icon:

```
<Callout intent="info"> (blue)

<Callout intent="warning"> (yellow)

<Callout intent="alert"> (red)

<Callout intent="primary"> (light blue)
```

Optionally, you can include a `site` parameter in the initial callout tag:

```js
<Callout intent="primary" site="federal">
```

The behavior is as follows:

* If there is no `site` parameter, the callout is visible in both "LaunchDarkly docs" and "Federal docs"
* If `site="launchDarkly"`, the callout is only visible for "LaunchDarkly docs"
* If `site="federal"`, the callout is only visible for "Federal docs"

### Formatting callouts

You can put code samples and markdown into callouts in one of two ways.

Use a code block:

```
<CalloutTitle><code>more_code</code></CalloutTitle>
```

Or insert blank lines above and below where you want to use the markdown:

```
<Callout intent="info">
  <CalloutTitle>

`more_code`

  </CalloutTitle>
  <CalloutDescription>

`even_more_code`

  </CalloutDescription>
</Callout>
```
Left-justify text content inside callouts. Callout contents do not respect markdown unless they are left-justified. Do not indent any lines.

Include a blank line between the opening and closing `<CalloutDescription>` tags and the content.

## Code samples

Code samples allow you display code in one or multiple tabs within a code block.

_For example, this code:_


_Renders this:_


To create a code sample:
1. Write code block as markdown as usual.
2. Add a `CodeSample` component.
3. Each CSTab will be one of the tabs.
4. If a tab has federal-specific content, include two versions of the language. Set `site=federal` after the language for the federal-specific code block. When the reader selects "LaunchDarkly docs," the CSTab displays the unannotated code block. When they select "Federal docs," the CSTab displays the `site=federal` code block.

<CodeSample>
<CSTab label="Code snippet">

```js
<CodeSample>
    <CSTab label="JavaScript">

    ```js
    function helloWorld() {
      console.log('Hello, world!');
    }
    ```
    ```js site=federal
      function helloFederal() {
        console.log('Hello, federal!');
      }
    ```

    </CSTab>
    <CSTab label="Python">

    ```python
    def hello_world():
      print 'Hello, world!'
    ```

    </CSTab>
    <CSTab label="Java">

    ```java
    class HelloWorld {
      public static void main(String args[]) {
        System.out.println("Hello, World");
      }
    }
    ```

    </CSTab>
</CodeSample>
```
</CSTab>
</CodeSample>

## Tables

Markdown tables are hard to read in text editors and easy to break. We built our own table component to use instead. It's much like an HTML table. When content in a table cell is left-justified, and bracketed by empty lines, you can use HTML tags in it.

<CodeSample>
<CSTab label="Table">

```jsx
<Table>
  <TableHeader>
    <TableHeadCell>Name of column 1</TableHeadCell>
    <TableHeadCell>Name of column 2</TableHeadCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Column 1 Cell 1</TableCell>
      <TableCell>Column 1 Cell 2</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>

Column 2 Cell 1 <a href="example.com">with a link in it</a>.

      </TableCell>
      <TableCell>Column 2 Cell 2</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

</CSTab>
</CodeSample>

# The LaunchDarkly documentation style guide

Thank you for your contributions to the LaunchDarkly-Docs repo!

This topic explains some best practices for writing docs for the LaunchDarkly documentation website.

If you want to learn how to install and run the site locally on your machine, read the [README](readme.md). For information about adding your own content to the site in compliance with our technical architecture, read the [contributor's guide](contributors-guide.md).

## Writing guidelines

These guidelines are not exhaustive or prescriptive. Our docs team reviews every PR and edits it for content, style, and tone before approval. Please don't feel like you need to have a flawless PR in order to have it accepted.

These are broad and non-exclusive guidelines for writing docs in the LaunchDarkly style. If you have questions about specific cases, look in our existing docs for reference or email docs@launchdarkly.com.

Here are some guidelines to get you started:

* Avoid unnecessary capitalizations. Proper nouns, including product and feature names, and UI elements should reflect their display text. Do not capitalize unnecessary words in headings or text. For example, LaunchDarkly's Data Export feature uses capital letters because it's a proper noun, but when we refer to exporting data to a destination, we do not capitalize either the verb or the noun.
* Bold text labels that you can click in the LaunchDarkly UI and have proper names. For example, bold left nav elements, tabs, button text, and toggle options. Put text that is read-only, like checkbox labels or dialog headers, in quotes.
* All screenshots and graphics in the docs must have alt text that describes the content of the image. For example, say "The Users dashboard, with a specific user called out." not "The Users dashboard provides a simple interface you can use to track users registered with LaunchDarkly."
* Use the Oxford comma. Every list with more than two items must have a comma before the "and" and final list item.

## Voice and tone

The LaunchDarkly documentation voice is kind, direct, and helpful.

* KIND: Don't talk down to the reader. Do not use words like "simple," "basic," or "easy" to describe the reader's experience using your feature; instead, write with the understanding that what may be easy for one reader can simultaneously be challenging for another. For more information about this, read [A note on inclusivity](#a-note-on-inclusivity).
* DIRECT: Use the active voice where possible. For example, when describing product behavior, say the SDK initializes and connects to LaunchDarkly, not the SDK is initialized and connected to LaunchDarkly.
* HELPFUL: Write assuming that your reader does not speak English as a first language. Use the most common words, sentence structure, and terminology that is still technically accurate and conveys your meaning. This means remove colloquialisms, sayings, and slang. For example, say "The SDK initializes in less than five seconds," not "The SDK initializes lightning-fast." If you have trouble with this, a browser extension or app like Hemingway or Grammarly may help you.

Read the next section for more specific guidance on how to write different sections of the docs.

### A note on inclusivity

It is a best practice to write documentation that reflects the full diversity of the real world. This means both using language that is inclusive of as many lived experiences as possible and avoiding language that dismisses, others, or objectifies marginalized groups.

If you write an example that references humans, use names and pronouns from multiple genders.

Do not use idioms, euphemisms, or ableist or hierarchical language in the docs. Some of these terms are figurative and hard to translate for users who speak English as a secondary language ("shoot the moon," "break new ground"), and many of them have discriminatory backgrounds ("whitelist/blacklist," "rule of thumb").

Do not make assumptions about the abilities or bodies of your users. Common euphemisms to explain behaviors can make assumptions about capabilities that do not apply to everyone using your docs.

For example, do not use verbs like "see" to refer to consuming and comprehending information ("reading"); docs users who use screenreaders may not be able to see the docs, but they can certainly read them, so that's a better verb to use.

Similarly, a "hands-on" exercise might not be "hands-on" for a user with a mobility issue or assistive device. Instead, you could say "interactive."


## Topic and component best practices

This section explains mandatory and optional sections for docs topics and best practices for using them in the LaunchDarkly style.

LaunchDarkly's docs respect markdown formatting. You can use hashes for headers, bracket-paren links, exclamation points to indicate images, and asterisks to emphasize text like in regular markdown.

## LaunchDarkly's custom components

LaunchDarkly's docs use a hybrid of markdown and React components. A list of the entire custom component set the docs use is available in the [components file](https://github.com/launchdarkly/LaunchDarkly-Docs/blob/main/src/content/topics/components.mdx).

An explanation of how and where we use some of the custom components is provided below.

### Callouts

LaunchDarkly uses four types of callouts in the docs. Of these four, we use "warning" and "success" callouts the least often.

Here is information about the callouts:

* Info callouts are blue and provide useful context or information in a targeted way.
* Alert callouts are yellow and provide lightweight warnings or advisories about behavior or unexpected consequences.
* Warning callouts are red and provide information about severe consequences a user could experience by misconfiguring or misunderstanding part of the app.
* Success callouts are green and provide positive messages about success indicators, improvements, or other types of positive messaging. These are our most rarely-used type of callout.

### Headings

Headings start at h2 (##). The only h1 entry in a page is the topic title, which is specified in the frontmatter. h1 entries do not appear in the sidebar navigation on the right side of the page.

Headings should nest in descending order; do not use a h3 when not preceded by an h2.

You can use up to h4, but the formatting on h4 isn't substantially different from regular body text. To maximize readability, try to use h2 ad h3 as much as possible.

When possible, gerund verbs in the heading; for example, "Configuring," "Understanding," "Installing," and "Troubleshooting" rather than "Configure," "Understand," "Install," and "Troubleshoot."

### Links

We use markdown formatting for links except where specified in the components file. The overwhelming majority of the links in the docs site are markdown links.

A markdown link looks like this:

```
[link destination title](https://example.com#anchor-text-if-applicable)
```

When linking to other items of technical documentation, including in the docs site, use this sentence structure:

```
To learn more, read [Topic title](link-to-topic).
```

### Lists

Lists are quick references that either describe steps or collections of three or more items. Use numbered steps if the reader must perform actions in a specific order to accomplish a task. Bulleted lists are for collections of items.

### Screenshots, graphics, and videos

Use screenshots sparingly. They're expensive to maintain. If you're a LaunchDarkly partner contributing documentation for your product or service, you are responsible for contributing updated screenshots for your service when needed.

You can add screenshots as .PNGs or .GIFs. For a screenshot to render in the docs correctly, you must reference the `/images/` directory in the filepath and end the screenshot name with the file type (.png or .gif).

We do not have a minimum or maximum size guideline to follow, but in general you should capture as little of the screen as possible to keep your screenshot useful. Please avoid full-screen screenshots, but if you must include them you probably also want to include a callout indicating which part of the screen the reader should focus on.

If you capture identifying information in a screenshot, like an email address or API key, obscure it with a blurring tool. Most image editing apps have a blur or pixelate function.

Alt text is required for all graphics and screenshots. To add alt text to your screenshot, type a description of the screenshot in the brackets section of the markdown image tag:

```
![The alt text goes between these brackets.](screenshot-filepath.png)
```

If you want to add a video clip to your docs, we suggest uploading it to YouTube and embedding the YouTube file in the topic. We do not have capability to host video content on the site.

Do not include personally identifiable information in your video.

You must include closed captioning (subtitles) on the video. Please only upload videos with audio in English, since we don't have the resources to verify that non-English speech matches the contents of the subtitles.

### Tables

Tables provide a gathering mechanism for collections of items with definitions or further details. We don't use tables except for lists of more than three items that need supplemental references to make sense. Tables are great for reference documentation, such as docs for custom roles or API endpoints.

Do not use markdown tables in LaunchDarkly docs. They format poorly in code editors and are hard to maintain. Use our custom table component instead. It's very similar to an HTML table.

When you create a table, give the columns headers so people know what they're reading.

For example: 'Resource Name / Description' or 'Endpoint / Actions'.

## Topic template

### Frontmatter

The frontmatter is a mandatory section of metadata and indexing information at the top of each topic file.

To learn about writing and formatting the frontmatter correctly, read the [contributor's guide](contributors-guide.md).

### Overview

Every docs topic should begin with a section titled "Overview."

The Overview section gives a high-level summary of the contents of the topic itself. This helps readers who are encountering the page for the first time determine whether or not the topic will address their questions or teach them what they need to know.

The information in the Overview is usually truncated for the `description` metadata entry, which generates the search results for your page.

### Prerequisites

Prerequisite sections are optional except in Guides.

If you're about to explain a very technical procedure or the topic you're writing is a continuation of a longer process, you might want to include a list of prerequisites.

Limit prerequisites to items that are absolutely required for the reader to complete the procedure. Without these, the procedure will fail. Do not, however, include items so fundamental to the process that the reader wouldn't use the LaunchDarkly docs without them. You do not need to specify that the reader needs an internet connection, a building with electricity, or a LaunchDarkly account.

Format prerequisites as bulleted lists. This makes them easy to skim.

Example:

You need the following things to complete this procedure:

* An Amazon Web Services (AWS) account with administrator permissions
* Write access to your local user database

### Concepts

Concepts sections are optional except in Guides.

Concepts are not often their own section in documentation, but if you're explaining something very technical, introducing a feature for the first time, or just have a lot of background to explain before you can get to the meat of the topic, put it in a concepts section.

You can summarize concepts in brief in the overview, if that works better--but keep it brief, 2-3 sentences at most.

### Procedures

Procedures tell a reader how to complete a task by defining the start state, the end state, and the process to get from one to another.

Writing useful procedures is a skill it takes time to cultivate, but here are some best practices:

Divide procedures into steps by tracking interactions. Every time a user has to click or type to accomplish something, that's a discrete step.
Steps start with verbs. "Click," "Enter," "Navigate," "Scroll."

Only describe what the user is doing and experiencing. Procedures are not for background technical information. You can, however, explain the consequences of user behavior, such as a page opening, a drawer appearing, or a setting being saved.

Example:

1. Log in to LaunchDarkly.
1. Click **Account Settings**. The Account Settings page opens.

### Conclusion

This section is optional, and not commonly used in product documentation.

In Guides, you might use a Conclusion section to explain what was covered in the Guide and what readers might know how to do now that they did not understand before.

You can also link to further reading or a related guide or topic.

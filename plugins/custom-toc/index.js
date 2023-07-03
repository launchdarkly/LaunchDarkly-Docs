/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

const GithubSlugger = require('github-slugger')

// These two utils are pinned to version 2 for cjs support in package.json.
// Versions beyond are esm only.
const visit = require('unist-util-visit')
const toString = require('mdast-util-to-string')

const slugger = new GithubSlugger()

// The tableOfContents gatsby querier doesn't pick up
// headings nested within mdx components, such as
// <Feature>
//
//  ## A nested heading
//
// </Feature>
//
// This custom remark plugin allows us to find all headings as
// long as they are spaced correctly as above (note the new lines before/after the heading).

export default function createCustomToc() {
  return async (tree, file) => {
    const customToc = []

    visit(tree, 'heading', heading => {
      if (heading.depth === 2) {
        const value = toString(heading)
        customToc.push({
          value,
          depth: heading.depth,
          hash: `#${slugger.slug(value)}`,
        })
      }
    })

    const mdxFile = file
    if (!mdxFile.data.meta) {
      mdxFile.data.meta = {}
    }

    mdxFile.data.meta.customToc = customToc
  }
}

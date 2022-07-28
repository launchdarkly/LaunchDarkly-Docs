import type { Stats } from 'fs'
import { readFile } from 'fs/promises'
import scan from 'scanfs'
import GithubSlugger from 'github-slugger'
import redirectRules from '../../redirectRules'

const localLinkRegex = /[^!]\[[^\]]*\]\(([#A-Za-z0-9/_-]+)\)/gm
const headerRegex = /^#+\s(.+)$/gm
const pagePathRegex = /^path:\s['"]?([A-Za-z0-9-_/]+)['"]?$/m

const filepathsByPage: { [page: string]: string } = {}
const headersByPage: { [page: string]: { [path: string]: boolean } } = {}
const anchorsByPage: { [page: string]: { [path: string]: boolean } } = {}

// Add links that we want to ignore here. Key is the filepath and then whatever
// would be in the "()" part of each link, e.g. [Foobar](/foobar) -> '/foobar'
const ignorables: { [filepath: string]: string[] } = {
  './src/content/topics/components.mdx': ['/foobar'],
}

const mdx = (pathname: string, stat: Stats) => {
  if (stat.isFile() && pathname.match(/\.mdx$/)) return 'mdx'
}

const fileReads: Promise<void>[] = []

const handleMdx = (_err: Error, filepath: string, _stat: Stats) => {
  fileReads.push(
    readFile(filepath, 'utf8').then(contents => {
      const slugger = new GithubSlugger()

      const pagePathMatch = contents.match(pagePathRegex)
      if (!pagePathMatch) {
        console.error(`Failed to read "path" for file ${filepath}`)
        return
      }
      const pagePath = pagePathMatch[1]
      filepathsByPage[pagePath] = filepath
      headersByPage[pagePath] = {}
      anchorsByPage[pagePath] = {}
      for (const [, path] of contents.matchAll(localLinkRegex)) {
        anchorsByPage[pagePath][path] = true
      }
      for (const [, header] of contents.matchAll(headerRegex)) {
        headersByPage[pagePath][slugger.slug(header)] = true
      }
    }),
  )
}

const trimPath = (path: string) => (path.endsWith('/') ? path.slice(0, -1) : path)

const withRedirect = (path: string): string => {
  const redirectRule = redirectRules.find(({ fromPath }) => fromPath === path)
  return redirectRule ? withRedirect(redirectRule.toPath) : path
}

const verifyLinks = () => {
  let badLinkCount = 0
  const badLinksByFile: { [filepath: string]: string[] } = {}
  Object.entries(anchorsByPage).forEach(([page, anchors]) => {
    const filepath = filepathsByPage[page]
    const badLinks = Object.keys(anchors).reduce<string[]>((acc, anchor) => {
      if (ignorables[filepath] && ignorables[filepath].includes(anchor)) {
        return acc
      }
      const [anchorPath, anchorName] = anchor.split('#')
      const headers = headersByPage[anchorPath ? withRedirect(trimPath(anchorPath)) : page]
      if (!headers || (anchorName && !headers[anchorName])) {
        badLinkCount++
        acc.push(anchor)
      }
      return acc
    }, [])
    if (badLinks.length) {
      badLinksByFile[filepath] = badLinks
    }
  })
  if (badLinkCount) {
    badLinkCount > 1 && console.error(`Bad links: ${badLinkCount}`)
    Object.entries(badLinksByFile).forEach(([file, badLinks]) => {
      console.error(`Bad link${badLinks.length > 1 ? 's' : ''} found in ${file}:\n\t${badLinks.join('\n\t')}`)
    })
    process.exit(1)
  }
}

scan([], mdx)
  .on('mdx', handleMdx)
  .on('done', (err: Error, _count: number) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    Promise.all(fileReads).then(verifyLinks)
  })
  .relatively('./src/content/topics')

const CONFIG_FLAG_KEY = 'docs-pages-config'

const DEFAULT_CONFIG = {
  disabled_paths: [],
}

const PAGE_CONTEXT = {
  kind: 'Page',
  key: 'page',
}

module.exports = { CONFIG_FLAG_KEY, DEFAULT_CONFIG, PAGE_CONTEXT }

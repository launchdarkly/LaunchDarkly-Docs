const DEFAULT_LEFT_OFFSET = 0
const OFFSET_TOP_GUTTER = 20

export const getTargetYOffset = (hash: string) => {
  const id = decodeURI(hash.replace('#', ''))
  if (id === '') {
    return null
  }

  const element = document.getElementById(id)
  if (!element) {
    return null
  }

  return element.offsetTop - OFFSET_TOP_GUTTER
}

export const scrollToYPosition = (offset: number) => {
  requestAnimationFrame(() => {
    window.scrollTo({ left: DEFAULT_LEFT_OFFSET, top: offset, behavior: 'instant' })
  })
}

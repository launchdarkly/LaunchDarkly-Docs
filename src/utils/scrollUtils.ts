const DEFAULT_OFFSET_Y = 20

export const getTargetYOffset = (hash: string) => {
  const id = decodeURI(hash.replace('#', ''))
  if (id === '') {
    return 0
  }

  const element = document.getElementById(id)
  if (!element) {
    return 0
  }

  return element.offsetTop - DEFAULT_OFFSET_Y
}

export const scrollToYPosition = (offset: number) => {
  requestAnimationFrame(() => {
    window.scrollTo(DEFAULT_OFFSET_Y, offset)
  })
}

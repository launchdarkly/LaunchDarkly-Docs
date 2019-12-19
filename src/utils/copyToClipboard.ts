type CopyToClipboardOptions = {
  preserveFormatting?: boolean
}

export function copyToClipboard(s: string, { preserveFormatting = false }: CopyToClipboardOptions = {}) {
  const span = document.createElement(preserveFormatting ? 'pre' : 'span')
  span.textContent = s
  document.body.append(span)

  const selection = window.getSelection()
  const range = window.document.createRange()

  // TODO: fallback?
  if (!selection) {
    return
  }

  selection.removeAllRanges()
  range.selectNodeContents(span)
  selection.addRange(range)

  try {
    window.document.execCommand('copy')
  } catch (e) {
    // Give up
  }

  selection.removeAllRanges()
  window.document.body.removeChild(span)
}

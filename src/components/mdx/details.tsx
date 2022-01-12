/** @jsx jsx */
import { jsx, ThemeUIStyleObject } from 'theme-ui'
import { PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { keyframes } from '@emotion/react'

export function findMatch(content: string, terms: string[]): boolean {
  for (const t of terms) {
    if (content.includes(t)) {
      return true
    }
  }

  return false
}

export function getQueryParams(location: Location, param: string): string {
  // If there's a hash in url, it doesn't
  // properly parse query params
  // this could happen for section headers in search
  const query = location.search ? location.search : ''

  const searchParams = new URLSearchParams(query)

  const q = searchParams.get(param)
  return q
}

type DetailsProps = {
  open: boolean
  summary: string
}

export default function Details({ open = false, summary, children }: PropsWithChildren<DetailsProps>) {
  const detailsRef = useRef(null)
  const [isOpen, setIsOpen] = useState(open)
  const [summaryText, setSummaryText] = useState(summary)

  const setDefaultSummaryText = () => setSummaryText(summary)
  const setCloseText = () => setSummaryText('Click to collapse')

  const openDetails = () => {
    setIsOpen(true)
    setCloseText()
  }
  const closeDetails = () => {
    setIsOpen(false)
    setDefaultSummaryText()
  }

  // use when component mounts
  useLayoutEffect(() => {
    const q = getQueryParams(window.location, 'q')
    if (!q) {
      return
    }
    const terms = q.split(' ')

    const match = findMatch(detailsRef.current.textContent, terms)

    setIsOpen(match)
  }, [detailsRef])

  useEffect(() => {
    const ref = detailsRef.current

    const toggle = () => {
      const openState = ref.open
      if (openState) {
        openDetails()
      } else {
        closeDetails()
      }
    }

    ref.addEventListener('toggle', toggle)

    return () => ref.removeEventListener('toggle', toggle, false)
  })

  // animate content fadein
  const animation = keyframes({
    from: { opacity: 0, transform: 'translatey(-15px)' },
    to: { opacity: 1, transform: 'translatey(0)' },
  })
  const detailsStyles: ThemeUIStyleObject = {
    '&[open] .content': {
      animationName: animation.toString(),
      animationDuration: '500ms',
    },
  }

  return (
    <details ref={detailsRef} open={isOpen} sx={{ ...detailsStyles, variant: 'details.details' }}>
      <summary sx={{ variant: 'details.summary' }} className={isOpen ? 'open' : ''}>
        {summaryText}
      </summary>
      <div className="content">{children}</div>
    </details>
  )
}

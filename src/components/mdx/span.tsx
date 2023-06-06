import { SpanFigure } from './spanFigure'

/* eslint-disable @typescript-eslint/no-explicit-any */

// gatsby-remark-images produces an HTML string
// which the DOM adds a span through React via dangerouslySetInnerHTML.
// This means that the 'figure' and 'figcaption' tags don't
// go through the normal rendering cycle, and as a result, are not
// mapped to the custom figure.tsx component we have.
// To handle this, we'll use a secondary figure component, SpanFigure
// which uses the proper sx classNames for the image border and captions.
export const Span = ({ children, ...restProps }: any) => {
  if (
    typeof children === 'undefined' &&
    !!restProps.dangerouslySetInnerHTML.__html &&
    restProps.dangerouslySetInnerHTML.__html.includes('<figure')
  ) {
    return <SpanFigure htmlString={restProps.dangerouslySetInnerHTML.__html} />
  }

  return <span {...restProps}>{children}</span>
}

declare module '@theme-ui/components' {
  import * as React from 'react'
  import { IntrinsicSxElements, SxProps } from 'theme-ui'
  import { ResponsiveValue } from 'styled-system'

  type SxComponent<T extends SxProps = IntrinsicSxElements['div']> = React.ComponentClass<
    T & { as?: React.ElementType; variant?: ResponsiveValue<string> }
  >
  type LinkSxComponent = SxComponent<IntrinsicSxElements['a']>

  export const Card: SxComponent
  export const Link: LinkSxComponent
}

declare module '@theme-ui/components' {
  import * as React from 'react'
  import { IntrinsicSxElements, SxProps } from 'theme-ui'

  type SxComponent<T extends SxProps = IntrinsicSxElements['div']> = React.ComponentClass<
    T & { as?: React.ElementType; variant?: string }
  >
  type LinkSxComponent = SxComponent<IntrinsicSxElements['a']>

  export const Card: SxComponent
  export const Text: SxComponent
  export const Button: SxComponent
  export const Select: SxComponent
  export const Link: LinkSxComponent
}

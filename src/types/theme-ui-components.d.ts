declare module '@theme-ui/components' {
  import * as React from 'react'
  import { IntrinsicSxElements, SxProps } from 'theme-ui'

  type SxComponent<T extends SxProps = IntrinsicSxElements['div']> = React.ComponentClass<
    T & { as?: React.ElementType }
  >

  export const Card: SxComponent
}

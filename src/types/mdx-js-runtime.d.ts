declare module '@mdx-js/runtime' {
  import React, { ComponentType, StyleHTMLAttributes } from 'react'

  type MDXProps = {
    scope?: object
    component?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [name: string]: ComponentType<any>
    }
    remarkPlugins?: string[]
    rehypePlugins?: string[]
    children: string
  }

  const MDX: React.FunctionComponent<MDXProps>

  export default MDX
}

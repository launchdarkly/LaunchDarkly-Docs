/** This will no longer be needed once we upgrade to v2 */
declare module '@mdx-js/react' {
  import React, { ComponentType } from 'react'

  type ComponentMap = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: ComponentType<any>
  }

  type MDXProps = {
    children: React.ReactNode
    components: ComponentMap
  }
  export class MDXProvider extends React.Component<MDXProps> {}
}

/** @jsx jsx */
import { FunctionComponent } from 'react'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import { jsx, ThemeProvider } from 'theme-ui'

import Callout, { CalloutDescription, CalloutTitle } from '../components/mdx/callout'
import { Code, CodeSample, CSTab } from '../components/mdx/code'
import Details from '../components/mdx/details'
import LearnMore from '../components/mdx/learnMore'
import Reset from '../components/resetStyles'

const components = {
  pre: function Pre({ children }: React.HTMLProps<HTMLPreElement>) {
    return <div>{children}</div>
  },
  code: Code,
  Callout,
  CalloutTitle,
  CalloutDescription,
  LearnMore,
  CodeSample,
  CSTab,
  Details,
}

interface LayoutProps {
  children: React.ReactNode
}

const theme = {}

const Layout: FunctionComponent<React.PropsWithChildren<LayoutProps>> = ({ children }) => {
  const componentsWithStyles = useThemedStylesWithMdx(useMDXComponents(components))

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <main sx={{ width: '40rem', margin: '0 auto', my: 6 }}>
        <MDXProvider components={componentsWithStyles}>{children}</MDXProvider>
      </main>
    </ThemeProvider>
  )
}

export default Layout

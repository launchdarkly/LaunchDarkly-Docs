/** @jsx jsx */
import { FunctionComponent } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { jsx, ThemeProvider } from 'theme-ui'

import Callout, { CalloutDescription, CalloutTitle } from './mdx/callout'
import { Code, CodeSample, CodeTabItem, CodeTabs, CSTab } from './mdx/code'
import Details from './mdx/details'
import LearnMore from './mdx/learnMore'
import Reset from './resetStyles'

const components = {
  pre: function Pre({ children }: React.HTMLProps<HTMLPreElement>) {
    return <div>{children}</div>
  },
  code: Code,
  Callout,
  CalloutTitle,
  CalloutDescription,
  LearnMore,
  CodeTabs,
  CodeSample,
  CSTab,
  CodeTabItem,
  Details,
}

interface LayoutProps {
  data: {
    mdx: {
      body: string
    }
  }
}

const theme = {}

const Layout: FunctionComponent<LayoutProps> = ({
  data: {
    mdx: { body },
  },
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <main sx={{ width: '40rem', margin: '0 auto', my: 6 }}>
        <MDXProvider components={components}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </main>
    </ThemeProvider>
  )
}

export const pageQuery = graphql`
  query InternalLayoutQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
    }
  }
`

export default Layout

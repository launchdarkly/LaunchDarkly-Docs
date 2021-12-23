/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Reset from './resetStyles'
import { Code, CodeTabItem, CodeTabs } from './mdx/code'
import LearnMore, { LearnMoreTitle, LearnMoreLink } from './mdx/learnMore'
import Callout, { CalloutTitle, CalloutDescription } from './mdx/callout'
import Details from './mdx/details'

const components = {
  pre: function Pre({ children }: React.HTMLProps<HTMLPreElement>) {
    return <div>{children}</div>
  },
  code: Code,
  Callout,
  CalloutTitle,
  CalloutDescription,
  LearnMore,
  LearnMoreTitle,
  LearnMoreLink,
  CodeTabs,
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

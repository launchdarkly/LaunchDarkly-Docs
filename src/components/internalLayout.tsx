/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Reset from './resetStyles'
import { CodeBlock, CodeSnippetProvider, CodeViewer } from './mdx/code'
import LearnMore, { LearnMoreTitle, LearnMoreLink } from './mdx/learnMore'
import Callout, { CalloutTitle, CalloutDescription } from './mdx/callout'

const components = {
  pre: function Pre({ children }: React.HTMLProps<HTMLPreElement>) {
    return <div>{children}</div>
  },
  code: CodeBlock,
  CodeViewer,
  Callout,
  CalloutTitle,
  CalloutDescription,
  LearnMore,
  LearnMoreTitle,
  LearnMoreLink,
}

interface LayoutProps {
  data: {
    mdx: {
      body: string
    }
  }
}

const Layout: FunctionComponent<LayoutProps> = ({
  data: {
    mdx: { body },
  },
}) => {
  return (
    <Fragment>
      <Reset />
      <main sx={{ width: '40rem', margin: '0 auto', my: 6 }}>
        <CodeSnippetProvider>
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </CodeSnippetProvider>
      </main>
    </Fragment>
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

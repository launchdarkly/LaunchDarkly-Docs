import React, { ReactNode } from 'react'

import { PageContext } from '../types/pageContext'

import InternalLayout from './internalLayout'
import Layout from './layout'

type LayoutContainerProps = {
  children: ReactNode
  pageContext: PageContext
}

const LayoutContainer = ({ children, pageContext }: LayoutContainerProps) => {
  const { isInternal } = pageContext.frontmatter
  if (isInternal) {
    return <InternalLayout>{children}</InternalLayout>
  }

  return <Layout pageContext={pageContext}>{children}</Layout>
}

export default LayoutContainer

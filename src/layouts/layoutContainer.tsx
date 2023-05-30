import React, { Fragment, ReactNode } from 'react'

import { PageContext } from '../types/pageContext'

import InternalLayout from './internalLayout'
import Layout from './layout'

type LayoutContainerProps = {
  children: ReactNode
  pageContext?: PageContext
}

const LayoutContainer = ({ children, pageContext }: LayoutContainerProps) => {
  // pages not created programmatically will not have a pageContext, such as 404.tsx
  if (!pageContext || Object.keys(pageContext).length === 0) {
    return <Fragment>{children}</Fragment>
  }

  const isInternal = pageContext?.frontmatter?.isInternal
  if (isInternal) {
    return <InternalLayout>{children}</InternalLayout>
  }

  return <Layout pageContext={pageContext}>{children}</Layout>
}

export default LayoutContainer

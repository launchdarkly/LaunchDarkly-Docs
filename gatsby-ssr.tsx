// /** @jsx jsx */
import type { GatsbySSR } from 'gatsby'
import { jsx } from 'theme-ui'

import LayoutContainer from './src/layouts/layoutContainer'
import { PageContext } from './src/types/pageContext'

export const wrapPageElement: GatsbySSR<unknown, PageContext>['wrapPageElement'] = ({ element, props }) => {
  return <LayoutContainer pageContext={props.pageContext}>{element}</LayoutContainer>
}

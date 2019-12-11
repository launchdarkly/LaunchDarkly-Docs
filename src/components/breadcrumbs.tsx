/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { FunctionComponent } from 'react'
import { Link } from 'gatsby'

export interface BreadcrumbItem {
  label: string
  path: string
}

interface BreadcrumbsProps {
  items: Array<BreadcrumbItem>
}
const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({ items }) => {
  return (
    <Styled.h4 sx={{ pb: '2' }}>
      {items.map(({ label, path }, index) => {
        const lastItem = index === items.length - 1
        return (
          <Link key={label} to={path}>
            {lastItem ? label : `${label} / `}
          </Link>
        )
      })}
    </Styled.h4>
  )
}

export default Breadcrumbs

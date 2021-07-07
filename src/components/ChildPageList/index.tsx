/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FC } from 'react'
import { Link } from 'gatsby'
import useNavItemChildren, { NavItem } from './useNavItemChildren'
import useGitGatsbyTheme from '../../hooks/useGitGatsbyTheme'

interface Props {
  path: string
  omit?: string
  append?: NavItem[]
  unsorted: boolean
}

const caseInsensitiveAlphabeticalComparison = (a: NavItem, b: NavItem): number =>
  a.label.toLowerCase() > b.label.toLowerCase() ? 1 : b.label.toLowerCase() > a.label.toLowerCase() ? -1 : 0

const identityComparison = (_a: NavItem, _b: NavItem): number => 0

const ChildPageList: FC<Props> = ({ path, omit = '', append = [], unsorted = false }) => {
  const { theme } = useGitGatsbyTheme()
  const items = useNavItemChildren(path)
  const pathsToOmit = omit.split(',')

  return (
    <ul sx={theme.styles.ul}>
      {items
        .filter(({ path }) => !pathsToOmit.includes(path))
        .concat(...append)
        .sort(unsorted ? identityComparison : caseInsensitiveAlphabeticalComparison)
        .map(({ path, label }) => (
          <li sx={theme.styles.li} key={path}>
            <Link sx={theme.styles.a} to={path}>
              {label}
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default ChildPageList

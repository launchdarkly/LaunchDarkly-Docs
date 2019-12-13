/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { FunctionComponent } from 'react'
import { Link } from 'gatsby'
import { SideNavItem } from './types'

interface TreeNodeProps {
  nodes: Array<SideNavItem>
  level?: number
}

const leafNodeStyles = {
  color: 'graySafe',
  fontSize: [null, 2, 3],
  textDecoration: 'none',
}

const defaultNodeStyles = {
  color: 'grayBlack',
  fontSize: [null, 3, 4],
  textDecoration: 'none',
}

const TreeNode: FunctionComponent<TreeNodeProps> = ({ nodes, level = 0 }) => {
  const { theme } = useThemeUI()
  const setActiveStyles = ({ isCurrent, isPartiallyCurrent }: { isCurrent: boolean; isPartiallyCurrent: boolean }) => {
    if (isCurrent) {
      return { style: { color: theme.colors.primarySafe } }
    } else if (isPartiallyCurrent) {
      return { style: { fontWeight: theme.fontWeights.bold } }
    }
    // use defaultNodeStyles specified at the Link level below
    return null
  }

  return (
    <ul sx={{ fontWeight: 'body' }}>
      {nodes.map(({ label, path, items }, index) => {
        const nodeChildrenCount = items?.length ?? 0
        const isLeafNode = nodeChildrenCount === 0
        const isRootNode = level === 0
        let labelStyles = defaultNodeStyles
        if (isRootNode) {
          labelStyles = defaultNodeStyles
        } else if (isLeafNode) {
          labelStyles = leafNodeStyles
        }

        return (
          <li key={`${label}-${index}`} sx={{ m: [5, 3, 5], my: [4, 4, 6], mr: [4, 1] }}>
            {path ? (
              <Link getProps={setActiveStyles} sx={labelStyles} to={path}>
                {label}
              </Link>
            ) : (
              <span sx={labelStyles}>{label}</span>
            )}

            {isLeafNode ? null : <TreeNode nodes={items} level={level + 1} />}
          </li>
        )
      })}
    </ul>
  )
}

export default TreeNode

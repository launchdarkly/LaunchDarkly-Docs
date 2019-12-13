/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { FunctionComponent } from 'react'
import { Link } from 'gatsby'
import { SideMenuItem } from './sideMenu'

interface TreeNodeProps {
  nodes: Array<SideMenuItem>
  level?: number
}

const rootNodeStyles = {
  color: 'grayBlack',
  fontWeight: 'bold',
}

const leafNodeStyles = {
  color: 'graySafe',
  fontSize: 3,
}

const defaultNodeStyles = {
  color: 'grayBlack',
  fontSize: 4,
  fontWeight: 'body',
}

const TreeNode: FunctionComponent<TreeNodeProps> = ({ nodes, level = 0 }) => {
  const { theme } = useThemeUI()

  return (
    <ul sx={defaultNodeStyles}>
      {nodes.map((node, index) => {
        let labelStyles = {}
        const nodeChildrenCount = node.items?.length ?? 0
        const isLeafNode = nodeChildrenCount === 0

        if (level === 0) {
          labelStyles = rootNodeStyles
        } else if (isLeafNode) {
          labelStyles = leafNodeStyles
        }

        return (
          <li key={`${node.label}-${index}`} sx={{ m: 5 }}>
            {node.path ? (
              <Link
                activeStyle={{ color: theme.colors.primarySafe }}
                sx={{ ...labelStyles, textDecoration: 'none' }}
                to={node.path}
              >
                {node.label}
              </Link>
            ) : (
              <span sx={labelStyles}>{node.label}</span>
            )}

            {isLeafNode ? null : <TreeNode nodes={node.items} level={level + 1} />}
          </li>
        )
      })}
    </ul>
  )
}

export default TreeNode

/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { FunctionComponent, useState } from 'react'
import { Link } from 'gatsby'
import { globalHistory } from '@reach/router'
import { SideNavItem } from './types'
import isExternalLink from '../../utils/isExternalLink'
import Icon from '../icon'

interface TreeNodeProps {
  nodes: Array<SideNavItem>
  level?: number
}

const defaultLabelStyles = {
  color: 'grayBlack',
  fontSize: [null, 4, 4],
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  ':hover': {
    color: 'primarySafe',
  },
  ':active': {
    color: 'grayBlack',
  },
  lineHeight: 1.5,
}

const leafLabelStyles = {
  ...defaultLabelStyles,
  fontSize: [null, 3, 3],
  ':hover': {
    color: 'primarySafe',
  },
  ':active': {
    color: 'grayBlack',
  },
  lineHeight: 1.5,
}

const defaultListItemStyles = { ml: [5, 5, 5], mr: 3, mt: [4, 4, 4] }
const rootListItemStyles = {
  mt: [6, 6, 6],
  ml: [6, 6, 6],
  mr: 2,
}

const TreeNode: FunctionComponent<TreeNodeProps> = ({ nodes, level = 0 }) => {
  const isRootNode = level === 0

  // use local state to manage expand/collapse states on menu item clicks
  const initialState = nodes.map(() => null)
  const [state, setState] = useState(initialState)

  const { theme } = useThemeUI()
  const setActiveStyles = ({ isCurrent, isPartiallyCurrent }: { isCurrent: boolean; isPartiallyCurrent: boolean }) => {
    if (isCurrent) {
      return { style: { color: theme.colors.primarySafe, fontWeight: theme.fontWeights.bold } }
    } else if (isPartiallyCurrent) {
      return { style: { fontWeight: theme.fontWeights.bold } }
    }
    // use defaultLabelStyles specified at the Link level below
    return null
  }

  return (
    <ul sx={{ fontWeight: 'body' }}>
      {nodes.map((node, index) => {
        const { label, path, items } = node
        const nodeChildrenCount = items?.length ?? 0
        const isLeafNode = nodeChildrenCount === 0
        let labelStyles = defaultLabelStyles
        let listItemStyles = defaultListItemStyles

        // apply root styles to root nodes and single level root nodes
        if (isRootNode || (isLeafNode && isRootNode)) {
          listItemStyles = rootListItemStyles
        } else if (isLeafNode) {
          labelStyles = leafLabelStyles
        }

        const partiallyActive = globalHistory.location.pathname.startsWith(node.path)

        const onExpandCollapse = () => {
          // leaf nodes don't need to be expanded/collapsed
          if (isLeafNode) {
            return
          }

          setState(prevState => {
            const clone = [...prevState]
            if (clone[index]) {
              clone[index] = clone[index] === 'collapsed' ? 'expanded' : 'collapsed'
            } else {
              clone[index] = partiallyActive ? 'collapsed' : 'expanded'
            }
            return clone
          })
        }

        const expandedCollapsed = state[index] === null && !partiallyActive ? 'collapsed' : state[index]

        return (
          <li key={`${label}-${index}`} sx={listItemStyles}>
            {isExternalLink(path) ? (
              <a href={path} sx={labelStyles} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ) : (
              <Link getProps={setActiveStyles} sx={labelStyles} to={path} onClick={onExpandCollapse}>
                <span sx={{ lineHeight: 'body' }}>{label}</span>
                {!isLeafNode && (
                  <Icon
                    name={expandedCollapsed === 'collapsed' ? 'arrow-down' : 'arrow-up'}
                    variant="sideNav"
                    fill="grayBase"
                    sx={{ marginLeft: 2 }}
                  />
                )}
              </Link>
            )}

            {isLeafNode || expandedCollapsed === 'collapsed' ? null : <TreeNode nodes={items} level={level + 1} />}
          </li>
        )
      })}
    </ul>
  )
}

export default TreeNode

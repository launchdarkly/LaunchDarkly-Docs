/** @jsx jsx */
import { jsx, useThemeUI, Flex } from 'theme-ui'
import { FunctionComponent, useState } from 'react'
import { Link } from 'gatsby'
import { globalHistory } from '@reach/router'
import { SideNavItem } from './types'
import isExternalLink from '../../utils/isExternalLink'
import Icon from '../icon'

type TreeNodeProps = {
  nodes: Array<SideNavItem>
  maxDepth?: number
  depth?: number
}

enum ExpandCollapseEnum {
  Collapsed,
  Expanded,
}

const defaultLabelStyles = {
  color: 'grayBlack',
  fontSize: 4,
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  ':hover': {
    color: 'primarySafe',
  },
  ':active': {
    color: 'grayBlack',
  },
  lineHeight: 'regular',
}
const maxDepthLabelStyles = {
  ...defaultLabelStyles,
  fontSize: 3,
}

const defaultListItemStyles = { mt: 2, ml: 5 }
const rootListItemStyles = { mt: 5, mr: 2, ml: 6 }

// Hamburger maxDepth is 3 since root topics are displayed.
// Desktop sideNav maxDepth is 2 since root topics are displayed in the top nav.
const TreeNode: FunctionComponent<TreeNodeProps> = ({ nodes, maxDepth = 2, depth = 0 }) => {
  const isRootNode = depth === 0
  const isMaxDepth = depth === maxDepth

  // Detect if this tree node has ever been expanded/collapsed
  const [isPristine, setIsPristine] = useState(true)

  // use local state to manage expand/collapse states on menu item clicks
  const initialState: ExpandCollapseEnum[] = nodes.map(() => ExpandCollapseEnum.Collapsed)
  const [expandCollapseStates, setState] = useState(initialState)

  const { theme } = useThemeUI()
  const setActiveStyles = ({ isCurrent, isPartiallyCurrent }: { isCurrent: boolean; isPartiallyCurrent: boolean }) => {
    if (isCurrent) {
      return { style: { color: theme.colors.primarySafe, fontWeight: theme.fontWeights.bold } }
    } else if (isPartiallyCurrent) {
      return { style: { fontWeight: theme.fontWeights.bold } }
    }
    // use defaultLabelStyles specified at the Link depth below
    return null
  }

  const onExpandCollapse = (isLeafNode: boolean, index: number) => {
    if (!isLeafNode) {
      setState(prevState => {
        const clone = [...prevState]
        clone[index] =
          clone[index] === ExpandCollapseEnum.Collapsed ? ExpandCollapseEnum.Expanded : ExpandCollapseEnum.Collapsed
        return clone
      })
    }
  }

  return (
    <ul sx={{ fontWeight: 'body' }}>
      {nodes.map((node, index) => {
        const { label, path, items } = node
        const nodeChildrenCount = items?.length ?? 0
        const isLeafNode = nodeChildrenCount === 0
        const partiallyActive = globalHistory.location.pathname.includes(node.path)
        const listItemStyles = isRootNode ? rootListItemStyles : defaultListItemStyles
        const labelStyles = isMaxDepth ? maxDepthLabelStyles : defaultLabelStyles

        if (isPristine && partiallyActive && expandCollapseStates[index] === ExpandCollapseEnum.Collapsed) {
          setIsPristine(false)
          setState(prevState => {
            const clone = [...prevState]
            clone[index] = ExpandCollapseEnum.Expanded
            return clone
          })
        }
        const expandedCollapsed = expandCollapseStates[index]
        return (
          <li key={`${label}-${index}`} sx={listItemStyles}>
            {isExternalLink(path) ? (
              <a href={path} sx={labelStyles} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ) : (
              <Flex>
                <Link
                  getProps={setActiveStyles}
                  sx={labelStyles}
                  to={path}
                  onClick={() => onExpandCollapse(isLeafNode, index)}
                >
                  {label}
                </Link>
                {!isLeafNode && (
                  <Icon
                    name={expandedCollapsed === ExpandCollapseEnum.Collapsed ? 'arrow-down' : 'arrow-up'}
                    onClick={() => onExpandCollapse(isLeafNode, index)}
                    variant="sideNav"
                    fill="grayBase"
                    sx={{ marginLeft: 2 }}
                  />
                )}
              </Flex>
            )}
            {isLeafNode || expandedCollapsed === ExpandCollapseEnum.Collapsed ? null : (
              <TreeNode nodes={items} depth={depth + 1} maxDepth={maxDepth} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default TreeNode

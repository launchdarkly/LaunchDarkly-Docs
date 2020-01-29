/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Flex } from '@theme-ui/components'
import { FunctionComponent, useState } from 'react'
import { Link } from 'gatsby'
import { globalHistory } from '@reach/router'
import { SideNavItem } from './types'
import isExternalLink from '../../utils/isExternalLink'
import Icon from '../icon'

type TreeNodeProps = {
  nodes: Array<SideNavItem>
  level?: number
}

enum ExpandCollapseEnum {
  Collapsed,
  Expanded,
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
  lineHeight: 'body',
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
}

const defaultListItemStyles = { ml: 5, mr: 3, mt: 2 }
const rootListItemStyles = {
  mt: 5,
  ml: 6,
  mr: 2,
}

const TreeNode: FunctionComponent<TreeNodeProps> = ({ nodes, level = 0 }) => {
  const isRootNode = level === 0

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
    // use defaultLabelStyles specified at the Link level below
    return null
  }

  return (
    <ul sx={{ fontWeight: 'body' }}>
      {nodes.map((node, index) => {
        const { label, path, items } = node
        const nodeChildrenCount = items?.length ?? 0
        const isLeafNode = nodeChildrenCount === 0
        const partiallyActive = globalHistory.location.pathname.includes(node.path)

        let labelStyles = defaultLabelStyles
        let listItemStyles = defaultListItemStyles

        // apply root styles to root nodes and single level root nodes
        if (isRootNode || (isLeafNode && isRootNode)) {
          listItemStyles = rootListItemStyles
        } else if (isLeafNode) {
          labelStyles = leafLabelStyles
        }

        if (isPristine && partiallyActive && expandCollapseStates[index] === ExpandCollapseEnum.Collapsed) {
          setIsPristine(false)
          setState(prevState => {
            const clone = [...prevState]
            clone[index] = ExpandCollapseEnum.Expanded
            return clone
          })
        }

        const onExpandCollapse = () => {
          if (!isLeafNode) {
            setState(prevState => {
              const clone = [...prevState]
              clone[index] =
                clone[index] === ExpandCollapseEnum.Collapsed
                  ? ExpandCollapseEnum.Expanded
                  : ExpandCollapseEnum.Collapsed
              return clone
            })
          }
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
                <Link getProps={setActiveStyles} sx={labelStyles} to={path} onClick={onExpandCollapse}>
                  {label}
                </Link>
                {!isLeafNode && (
                  <Icon
                    name={expandedCollapsed === ExpandCollapseEnum.Collapsed ? 'arrow-down' : 'arrow-up'}
                    onClick={onExpandCollapse}
                    variant="sideNav"
                    fill="grayBase"
                    sx={{ marginLeft: 2 }}
                  />
                )}
              </Flex>
            )}

            {isLeafNode || expandedCollapsed === ExpandCollapseEnum.Collapsed ? null : (
              <TreeNode nodes={items} level={level + 1} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default TreeNode

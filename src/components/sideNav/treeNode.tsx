/** @jsx jsx */
import { ComponentProps, FunctionComponent, useEffect, useState } from 'react'
import { LinkGetProps } from '@reach/router'
import { useFlags } from 'gatsby-plugin-launchdarkly'
import { LDFlagSet } from 'launchdarkly-js-client-sdk'
import { Flex, jsx, Link as ThemeUILink, ThemeUIStyleObject } from 'theme-ui'

import useGitGatsbyTheme from '../../hooks/useGitGatsbyTheme'
import isExternalLink from '../../utils/isExternalLink'
import { stripTrailingSlash } from '../../utils/navigationDataUtils'
import Icon, { IconName } from '../icon'
import Link from '../link'

import { SideNavItem } from './types'

const defaultLabelStyles = {
  color: 'text',
  fontSize: 4,
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  ':hover': {
    color: 'primarySafe',
    '& svg': {
      fill: 'primarySafe',
    },
  },
  ':active, :visited': {
    color: 'text',
  },
  lineHeight: 'regular',
}
const maxDepthLabelStyles = {
  ...defaultLabelStyles,
  fontSize: 3,
  lineHeight: 'small',
}

const groupStyles: ThemeUIStyleObject = {
  mt: 7,
  '&:first-of-type': {
    mt: 6,
  },
}

const groupHeaderStyles: ThemeUIStyleObject = {
  mb: 4,
  mr: 2,
  ml: 6,
  fontSize: 2,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: 'graySafe',
}

const defaultListItemStyles: ThemeUIStyleObject = { mt: 4, ml: 5 }

const rootListItemStyles: ThemeUIStyleObject = { mb: 4, mr: 2, ml: 6 }

type TreeNodeProps = {
  nodes: Array<SideNavItem>
  maxDepth?: number
  depth?: number
  currentPath: string
}

enum ExpandCollapseEnum {
  Collapsed,
  Expanded,
}

function isLeafNode(node: SideNavItem) {
  return (node.items?.length ?? 0) === 0
}

// Determine whether a node is active or not based given a URL path
function isActiveNodeOrAncestor(pathname: string, node: SideNavItem): boolean {
  // This is the active node itself
  // support trailing slash
  if (node.path === stripTrailingSlash(pathname)) {
    return true
  }

  const items = node.items

  // If this is not the active node and it has not children
  if (!items || items.length === 0) {
    return false
  }

  // Active descendant
  return items.some(descendant => isActiveNodeOrAncestor(pathname, descendant))
}

const groupLabels: Readonly<Record<string, string>> = {
  accelerate: 'accelerate',
  'feature-flags': 'feature flags',
  'platform-config': 'platform configuration',
  experimentation: 'experimentation',
  'additional-features': 'additional features',
}

function GroupHeader(props: ComponentProps<'div'>) {
  return <div {...props} sx={groupHeaderStyles} />
}

function Node({
  node,
  itemStyles,
  labelStyles,
  flags,
  depth,
  maxDepth,
  currentPath,
  isLeaf,
  isPristine,
  isCollapsed,
  setIsPristine,
  setActiveLinkStyles,
  onExpandCollapse,
  onFirstExpand,
}: {
  node: SideNavItem
  itemStyles: ThemeUIStyleObject
  labelStyles: ThemeUIStyleObject
  flags: LDFlagSet
  depth: number
  maxDepth: number
  currentPath: string
  isLeaf: boolean
  isPristine: boolean
  isCollapsed: boolean
  setIsPristine(isPristine: boolean): void
  setActiveLinkStyles(props: LinkGetProps): Record<string, unknown>
  onExpandCollapse(node: SideNavItem): void
  onFirstExpand(node: SideNavItem): void
}) {
  const { label, path, svg, flagKey, items } = node
  const showItem = flagKey ? flags[flagKey] : true
  const isActive = isActiveNodeOrAncestor(currentPath, node)

  useEffect(() => {
    if (isPristine && isActive && isCollapsed) {
      setIsPristine(false)
      onFirstExpand(node)
    }
  }, [node, isPristine, isActive, isCollapsed, onFirstExpand, setIsPristine])

  const handleExpandCollapse = () => {
    onExpandCollapse(node)
  }

  return showItem ? (
    <li sx={itemStyles}>
      {isExternalLink(path) ? (
        <ThemeUILink href={path} sx={labelStyles} target="_blank" rel="noopener noreferrer">
          {label}
          {svg && <Icon name={svg as IconName} height="0.8rem" fill="text" ml={1} />}
        </ThemeUILink>
      ) : (
        <Flex>
          <Link getProps={setActiveLinkStyles} sx={labelStyles} to={path} onClick={handleExpandCollapse}>
            <Flex sx={{ alignItems: 'center' }}>
              {svg && <Icon name={svg as IconName} height="1rem" fill="text" mr={2} />}
              {label}
            </Flex>
          </Link>
          {!isLeaf && (
            <Icon
              name={isCollapsed ? 'arrow-right' : 'arrow-down'}
              onClick={handleExpandCollapse}
              variant="sideNav"
              fill="grayBase"
              ml={2}
            />
          )}
        </Flex>
      )}
      {isLeaf || isCollapsed ? null : (
        <TreeNode currentPath={currentPath} nodes={items} depth={depth + 1} maxDepth={maxDepth} />
      )}
    </li>
  ) : null
}

// Hamburger maxDepth is 3 since root topics are displayed.
// Desktop sideNav maxDepth is 2 since root topics are displayed in the top nav.
const TreeNode: FunctionComponent<React.PropsWithChildren<TreeNodeProps>> = ({
  nodes,
  currentPath,
  maxDepth = 2,
  depth = 0,
}) => {
  const flags = useFlags()
  const { theme } = useGitGatsbyTheme()

  const isRootNode = depth === 0
  const isMaxDepth = depth === maxDepth

  // Detect if this tree node has ever been expanded/collapsed
  const [isPristine, setIsPristine] = useState(true)

  // use local state to manage expand/collapse states on menu item clicks
  const initialState: Record<string, ExpandCollapseEnum> = nodes.reduce(
    (state, node) => ({ ...state, [node.path]: ExpandCollapseEnum.Collapsed }),
    {},
  )

  const [expandCollapseStates, setState] = useState(initialState)

  const setActiveLinkStyles = ({ isCurrent, isPartiallyCurrent, href, location: { pathname } }: LinkGetProps) => {
    const hrefWithoutParams = href.split('?')[0]
    // support matching paths with ending slash
    // this happens when there are query params
    if (isCurrent || hrefWithoutParams === stripTrailingSlash(pathname)) {
      return { style: { color: theme.colors.primarySafe, fontWeight: theme.fontWeights.bold } }
    } else if (isPartiallyCurrent || pathname.startsWith(hrefWithoutParams)) {
      return { style: { fontWeight: theme.fontWeights.bold } }
    }
    // use defaultLabelStyles specified at the Link depth below
    return null
  }

  const onExpandCollapse = (node: SideNavItem) => {
    if (!isLeafNode(node)) {
      setState(prevState => ({
        ...prevState,
        [node.path]:
          prevState[node.path] === ExpandCollapseEnum.Collapsed
            ? ExpandCollapseEnum.Expanded
            : ExpandCollapseEnum.Collapsed,
      }))
    }
  }

  const onFirstExpand = (node: SideNavItem) => {
    setState(prevState => ({ ...prevState, [node.path]: ExpandCollapseEnum.Expanded }))
  }

  const groupedNodes = Object.entries(
    nodes.reduce(
      (map, node) => ({ ...map, [node.group || 'ungrouped']: [...(map[node.group || 'ungrouped'] || []), node] }),
      {} as { [key: string]: SideNavItem[] },
    ),
  )

  const hasGroupedNodes = groupedNodes.some(group => group[0] !== 'ungrouped')

  return (
    <ul sx={{ fontWeight: 'body' }}>
      {hasGroupedNodes
        ? groupedNodes.map(([groupId, items]) => (
            <div key={groupId} sx={groupStyles}>
              {groupId !== 'ungrouped' && <GroupHeader>{groupLabels[groupId]}</GroupHeader>}
              <div>
                {items.map(node => (
                  <Node
                    key={node.path}
                    node={node}
                    flags={flags}
                    depth={depth}
                    maxDepth={maxDepth}
                    currentPath={currentPath}
                    itemStyles={isRootNode ? rootListItemStyles : defaultListItemStyles}
                    labelStyles={isMaxDepth ? maxDepthLabelStyles : defaultLabelStyles}
                    isLeaf={isLeafNode(node)}
                    isPristine={isPristine}
                    isCollapsed={expandCollapseStates[node.path] === ExpandCollapseEnum.Collapsed}
                    setIsPristine={setIsPristine}
                    setActiveLinkStyles={setActiveLinkStyles}
                    onExpandCollapse={onExpandCollapse}
                    onFirstExpand={onFirstExpand}
                  />
                ))}
              </div>
            </div>
          ))
        : nodes.map(node => (
            <Node
              key={node.path}
              node={node}
              flags={flags}
              depth={depth}
              maxDepth={maxDepth}
              currentPath={currentPath}
              itemStyles={isRootNode ? rootListItemStyles : defaultListItemStyles}
              labelStyles={isMaxDepth ? maxDepthLabelStyles : defaultLabelStyles}
              isLeaf={isLeafNode(node)}
              isPristine={isPristine}
              isCollapsed={expandCollapseStates[node.path] === ExpandCollapseEnum.Collapsed}
              setIsPristine={setIsPristine}
              setActiveLinkStyles={setActiveLinkStyles}
              onExpandCollapse={onExpandCollapse}
              onFirstExpand={onFirstExpand}
            />
          ))}
    </ul>
  )
}

export default TreeNode

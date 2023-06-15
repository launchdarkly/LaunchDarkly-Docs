import { ComponentProps, FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'
import { LinkGetProps, useLocation } from '@reach/router'
import { useFlags } from 'gatsby-plugin-launchdarkly'
import { LDFlagSet } from 'launchdarkly-js-client-sdk'
import { Flex, Link as ThemeUILink, ThemeUIStyleObject } from 'theme-ui'

import { useFlaggedPagesConfig } from '../../hooks/useFlaggedPagesConfig'
import useGitGatsbyTheme from '../../hooks/useGitGatsbyTheme'
import { usePrevious } from '../../hooks/usePrevious'
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
  pathPrefix: string
}

enum ExpandCollapseEnum {
  Collapsed,
  Expanded,
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

type NodeProps = {
  node: SideNavItem
  currentPath: string
  isCollapsed: boolean
  isLeaf: boolean
  isActive: boolean
  depth: number
  maxDepth: number
  itemStyles: ThemeUIStyleObject
  labelStyles: ThemeUIStyleObject
  pathPrefix: string
  onExpandCollapse: (node: SideNavItem) => void
  onFirstExpand: (node: SideNavItem) => void
  setActiveLinkStyles: (props: LinkGetProps) => Record<string, unknown>
  flags: LDFlagSet
}

const Node = ({
  node,
  isCollapsed,
  isLeaf,
  isActive,
  depth,
  maxDepth,
  itemStyles,
  labelStyles,
  pathPrefix,
  onExpandCollapse,
  onFirstExpand,
  setActiveLinkStyles,
  flags,
}: NodeProps) => {
  const { label, path, svg, flagKey, items } = node
  const showItem = flagKey ? flags[flagKey] : true

  useEffect(() => {
    if (isActive && isCollapsed) {
      onFirstExpand(node)
    }
  }, [node, isActive, isCollapsed, onFirstExpand])

  const handleExpandCollapse = () => {
    onExpandCollapse(node)
  }

  const externalLink = (
    <ThemeUILink href={path} sx={labelStyles} target="_blank" rel="noopener noreferrer">
      {label}
      {svg && <Icon name={svg as IconName} height="0.8rem" fill="text" ml={1} />}
    </ThemeUILink>
  )

  // sx={labelStyles}
  const internalLink = (
    <Flex>
      <Link to={path} sx={labelStyles} onClick={handleExpandCollapse} getProps={setActiveLinkStyles}>
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
  )

  const renderLink = () => {
    if (isExternalLink(path)) {
      return externalLink
    }
    return internalLink
  }

  const renderChildren = () => {
    if (isLeaf || isCollapsed) {
      return null
    }

    return <TreeNode nodes={items} depth={depth + 1} maxDepth={maxDepth} pathPrefix={pathPrefix} />
  }

  if (!showItem) {
    return null
  }

  return (
    <li sx={itemStyles}>
      {renderLink()}
      {renderChildren()}
    </li>
  )
}

type treeNodeExpandCollapseState = Record<string, ExpandCollapseEnum>

// Hamburger maxDepth is 3 since root topics are displayed.
// Desktop sideNav maxDepth is 2 since root topics are displayed in the top nav.
const TreeNode: FunctionComponent<React.PropsWithChildren<TreeNodeProps>> = ({
  nodes,
  maxDepth = 2,
  depth = 0,
  pathPrefix,
}) => {
  // Keep track of previous nodes to use a default collapsed state when changing pages
  // to avoid a flicker while the collapse state is being set up.
  const previousNodes = usePrevious(nodes)

  // EXPAND COLLAPSE STATE EXAMPLE
  /*
   * /sdk/concepts: 0
   * /sdk/features: 0
   * /sdk/client-side: 0
   * /sdk/server-side: 0
   * /sdk/edge: 0
   */
  const getExpandCollapseState = useCallback(() => {
    return nodes.reduce((state, node) => ({ ...state, [node.path]: ExpandCollapseEnum.Collapsed }), {})
  }, [nodes])

  const [expandCollapseStates, setExpandCollapseStates] = useState<treeNodeExpandCollapseState>(
    getExpandCollapseState(),
  )

  const flags = useFlags()
  const { isPathDisabled } = useFlaggedPagesConfig()
  const { theme } = useGitGatsbyTheme()
  const { pathname } = useLocation()

  const isRootNode = depth === 0
  const isMaxDepth = depth === maxDepth

  const currentPath = (() => {
    if (pathPrefix !== '') {
      return pathname.replace(pathPrefix, '')
    }
    return pathname
  })()

  // NODE EXAMPLE
  /*
   * label: SDK Concepts
   * path: /sdk/concepts
   * svg: puzzle-variation
   * flagKey: null
   * group: null
   * items: [
   *  {
   *    path: /sdk/concepts/getting-started
   *    label: Getting started with SDKs
   *    flagKey: null
   *    items: null
   *  }
   * ]
   */

  // reset when nodes change (changing pages)
  useEffect(() => {
    setExpandCollapseStates(getExpandCollapseState())
  }, [getExpandCollapseState])

  const groupedNodes = useMemo(() => {
    return Object.entries(
      nodes.reduce(
        (map, node) => ({ ...map, [node.group || 'ungrouped']: [...(map[node.group || 'ungrouped'] || []), node] }),
        {} as { [key: string]: SideNavItem[] },
      ),
    )
  }, [nodes])

  const hasGroupedNodes = groupedNodes.some(group => group[0] !== 'ungrouped')

  const isNodeCollapsed = (node: SideNavItem) => expandCollapseStates[node.path] === ExpandCollapseEnum.Collapsed

  // a node without any further children (items)
  const isLeafNode = (node: SideNavItem) => (node.items?.length ?? 0) === 0

  const isActiveNodeOrAncestor = (_currentPath: string, node: SideNavItem): boolean => {
    // This is the active node itself
    // support trailing slash
    if (node.path === stripTrailingSlash(_currentPath)) {
      return true
    }

    const items = node.items

    // If this is not the active node and it has no children
    if (!items || items.length === 0) {
      return false
    }

    // Active descendant
    return items.some(descendant => isActiveNodeOrAncestor(_currentPath, descendant))
  }

  const onFirstExpand = (node: SideNavItem) => {
    setExpandCollapseStates(prevState => ({ ...prevState, [node.path]: ExpandCollapseEnum.Expanded }))
  }

  const onExpandCollapse = (node: SideNavItem) => {
    if (isLeafNode(node)) {
      return
    }

    setExpandCollapseStates(prevState => ({
      ...prevState,
      [node.path]: isNodeCollapsed(node) ? ExpandCollapseEnum.Expanded : ExpandCollapseEnum.Collapsed,
    }))
  }

  const setActiveLinkStyles = ({
    isCurrent,
    isPartiallyCurrent,
    href,
    location: { pathname: activePathname },
  }: LinkGetProps) => {
    const hrefWithoutParams = href.split('?')[0]
    // support matching paths with ending slash
    // this happens when there are query params
    if (isCurrent || hrefWithoutParams === stripTrailingSlash(activePathname)) {
      return { style: { color: theme.colors.primarySafe, fontWeight: theme.fontWeights.bold } }
    } else if (isPartiallyCurrent || activePathname.startsWith(hrefWithoutParams)) {
      return { style: { fontWeight: theme.fontWeights.bold } }
    }
    // use defaultLabelStyles specified at the Link depth below
    return null
  }

  const renderNode = (node: SideNavItem) => {
    const isDisabledViaFlag = isPathDisabled(node.path)
    if (isDisabledViaFlag) {
      return null
    }

    return (
      <Node
        key={node.path}
        node={node}
        currentPath={currentPath}
        isCollapsed={isNodeCollapsed(node) || previousNodes !== nodes}
        isLeaf={isLeafNode(node)}
        isActive={isActiveNodeOrAncestor(currentPath, node)}
        depth={depth}
        maxDepth={maxDepth}
        itemStyles={isRootNode ? rootListItemStyles : defaultListItemStyles}
        labelStyles={isMaxDepth ? maxDepthLabelStyles : defaultLabelStyles}
        pathPrefix={pathPrefix}
        onExpandCollapse={onExpandCollapse}
        onFirstExpand={onFirstExpand}
        setActiveLinkStyles={setActiveLinkStyles}
        flags={flags}
      />
    )
  }

  const renderNodes = () => {
    if (hasGroupedNodes) {
      return groupedNodes.map(([groupId, items]) => (
        <div key={groupId} sx={groupStyles}>
          {groupId !== 'ungrouped' && <GroupHeader>{groupLabels[groupId]}</GroupHeader>}
          <div>{items.map(node => renderNode(node))}</div>
        </div>
      ))
    }

    return nodes.map(node => renderNode(node))
  }

  return <ul sx={{ fontWeight: 'body' }}>{renderNodes()}</ul>
}

export default TreeNode

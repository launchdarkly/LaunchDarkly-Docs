/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { useState } from 'react'
import TreeNode from './treeNode'
import SvgMenu from '../icons/menu'
import SvgEarth from '../icons/earth'
import SvgWindowClose from '../icons/windowClose'

export interface SideMenuItem {
  label: string
  href: string
  items: Array<SideMenuItem>
}

const SideMenu = () => {
  const {
    allNavigationDataJson: { nodes: navigationData },
  } = useStaticQuery(graphql`
    query {
      allNavigationDataJson {
        nodes {
          items {
            label
            href
            items {
              href
              label
            }
          }
          label
          href
        }
      }
    }
  `)
  const [show, setShow] = useState(false)
  const onClickMenu = () => {
    setShow(prev => {
      const newValue = !prev
      document.body.style.overflowY = newValue ? 'hidden' : 'unset'
      return newValue
    })
  }
  return (
    <div>
      <SvgMenu sx={{ width: 2, fill: 'white', cursor: 'pointer' }} onClick={onClickMenu} />
      <div
        sx={{
          display: show ? 'block' : 'none',
          position: 'fixed',
          width: '100%',
          height: '100%',
          overflowY: 'scroll',
          left: 0,
          top: 0,
          zIndex: 2,
          backgroundColor: 'grayWash',
          color: 'graySafe',
        }}
      >
        <div
          key="header"
          sx={{
            position: 'sticky',
            top: 0,
            height: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bg: 'grayWash',
            mx: 5,
            fontSize: 3,
          }}
        >
          <div sx={{ cursor: 'pointer' }}>EXPAND ALL</div>
          <div onClick={onClickMenu} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            CLOSE <SvgWindowClose sx={{ ml: 2, width: 2, fill: 'grayBase' }} />
          </div>
        </div>
        <div sx={{ mb: 4 }}>
          <TreeNode nodes={navigationData} />
        </div>
        <div
          key="footer"
          sx={{
            ml: 5,
            bg: 'grayWash',
            position: 'sticky',
            bottom: 0,
            height: 3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <a href="https://launchdarkly.com">
            <SvgEarth sx={{ width: 2, fill: 'grayBase' }} />
          </a>
          <a href="https://launchdarkly.com" sx={{ color: 'graySafe', ml: 2 }}>
            launchdarkly.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default SideMenu

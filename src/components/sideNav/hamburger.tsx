/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { useState, useEffect, useRef, Fragment } from 'react'
import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import TreeNode from './treeNode'
import Icon from '../icon'

const Hamburger = () => {
  const {
    allNavigationDataJson: { nodes: navigationData },
  } = useStaticQuery(graphql`
    query {
      allNavigationDataJson {
        nodes {
          items {
            label
            path
            items {
              path
              label
            }
          }
          label
          path
        }
      }
    }
  `)
  const [show, setShow] = useState(false)
  const rootDiv = useRef<HTMLDivElement>()
  useEffect(() => {
    if (show) {
      disableBodyScroll(rootDiv.current)
    } else {
      enableBodyScroll(rootDiv.current)
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [show])
  const onClickMenu = () => {
    setShow(prev => !prev)
  }
  return (
    <Fragment>
      <Icon name="menu" variant="sideMenu" onClick={onClickMenu} />
      <div
        ref={rootDiv}
        sx={{
          display: show ? 'block' : 'none',
          position: 'fixed',
          width: '100%',
          height: '100%',
          overflowY: 'scroll',
          left: 0,
          top: 0,
          zIndex: 2,
          bg: 'grayWash',
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
            mt: 4,
            fontSize: 3,
          }}
        >
          <div sx={{ cursor: 'pointer' }}>EXPAND ALL</div>
          <div onClick={onClickMenu} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            CLOSE <Icon name="window-close" variant="close" />
          </div>
        </div>
        <div sx={{ mb: 8 }}>
          <TreeNode nodes={navigationData} />
        </div>
        <div
          key="footer"
          sx={{
            pl: 5,
            pr: 10,
            bg: 'grayWash',
            position: 'fixed',
            bottom: 0,
            height: 5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <a href="https://launchdarkly.com">
            <Icon name="earth" variant="heading" />
          </a>
          <a href="https://launchdarkly.com" sx={{ color: 'graySafe', ml: 2, pr: 10 }}>
            launchdarkly.com
          </a>
        </div>
      </div>
    </Fragment>
  )
}

export default Hamburger

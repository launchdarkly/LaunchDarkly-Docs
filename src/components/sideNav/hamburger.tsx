/** @jsx jsx */
import { Fragment, useEffect, useRef, useState } from 'react'
import { globalHistory } from '@reach/router'
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { graphql, useStaticQuery } from 'gatsby'
import { jsx, ThemeUICSSObject } from 'theme-ui'

import Icon from '../icon'

import TreeNode from './treeNode'

const stripButtonStyles: ThemeUICSSObject = {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  margin: 0,
  border: 0,
  padding: 0,
  outline: 'inherit',
  background: 'none',
  color: 'inherit',
  overflow: 'visible',
  cursor: 'pointer',
}

const Hamburger = () => {
  const {
    site: { pathPrefix },
    allNavigationDataJson: { nodes: navigationData },
  } = useStaticQuery(graphql`
    query {
      site {
        pathPrefix
      }

      allNavigationDataJson {
        nodes {
          label
          path
          svg
          flagKey
          items {
            label
            path
            flagKey
            items {
              path
              label
              flagKey
              items {
                label
                path
                flagKey
              }
            }
          }
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
  const stripConfig: ThemeUICSSObject = { display: 'flex', alignItems: 'center' }

  return (
    <Fragment>
      <Icon name="menu" variant="sideNav" onClick={onClickMenu} />
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
          <div sx={{ visibility: 'hidden', cursor: 'pointer' }}>EXPAND ALL</div>
          <button onClick={onClickMenu} sx={{ ...stripConfig, ...stripButtonStyles }}>
            <span>CLOSE</span>
            <Icon name="window-close" variant="close" />
          </button>
        </div>
        <div sx={{ mb: 9 }}>
          <TreeNode
            currentPath={
              pathPrefix !== ''
                ? globalHistory.location.pathname.replace(pathPrefix, '')
                : globalHistory.location.pathname
            }
            nodes={navigationData}
            maxDepth={3}
          />
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

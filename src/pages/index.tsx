/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { FunctionComponent } from 'react'
import { Styled } from 'theme-ui'
import Layout from '../components/layout'

const Home: FunctionComponent = () => {
  return (
    <Layout>
      <div>
        <Styled.h4>
          <a href="/">Documentation</a> / Quickstart
        </Styled.h4>
        <Styled.h1>Getting started with LaunchDarkly</Styled.h1>
        <div
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: 'grayMed',
            pb: 2,
            mb: 4,
          }}
        >
          <Styled.h5>Est Read Time: 6 Minutes</Styled.h5>
          <Styled.h5>Last edited: Sep 28, 2019</Styled.h5>
        </div>
        <Styled.p>
          Welcome to LaunchDarkly! We're excited to partner with you as you use feature flags to make high-impact
          changes with minimal risk and maximum control. It only takes a few minutes to get started with LaunchDarkly
          and control your first feature flag.
        </Styled.p>
        <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            See also: <a href="/">Creating a card</a>
          </div>
          <img sx={{ m: 1, variant: 'icon' }} alt="bookmark" src="https://75oio.csb.app/bookmark-outline.svg" />
        </div>
      </div>
    </Layout>
  )
}

export default Home

/** @jsx jsx */
import React from 'react'
import { jsx, Styled, Layout } from 'theme-ui'
import {
  Box,
  Flex,
  Grid,
  Heading,
  Container,
  Text,
  Button,
  Link,
  Image,
  Card,
  Label,
  Input,
  Switch,
  Header,
} from '@theme-ui/components'

const App = () => {
  return (
    <Layout sx={{ height: '100vh' }}>
      <Flex
        bg="graydark"
        color="white"
        sx={{
          paddingY: 4,
        }}
      >
        <Flex sx={{ width: ['100%', '16rem', '22rem'] }}>
          <Image sx={{ paddingLeft: 5 }} src="https://75oio.csb.app/logo.svg" />
          <Text sx={{ paddingLeft: 2 }}>DOCS</Text>
        </Flex>
        <Flex sx={{ display: ['none', 'flex'] }}>
          <Text sx={{ paddingLeft: 6, paddingRight: 4 }} variant="labelCaps">
            Documentation
          </Text>
          <Text sx={{ paddingRight: 4 }} variant="labelCaps">
            Integrations
          </Text>
          <Text sx={{ paddingRight: 4 }} variant="labelCaps">
            SDK
          </Text>
          <Text sx={{ paddingRight: 4 }} variant="labelCaps">
            Advanced
          </Text>
          <Text variant="label">API</Text>
        </Flex>
      </Flex>
      <Flex sx={{}}>
        <Flex
          sx={{
            width: ['100%', '16rem', '22rem'],
            bg: 'graywash',
            borderRight: '1px solid',
            borderColor: 'graymed',
            display: ['none', 'block'],
            paddingLeft: 5,
            paddingTop: 6,
          }}
        >
          <Grid gap={4} column="1">
            <Box>
              <Flex>
                <Image variant="icon" sx={{ marginRight: 2 }} src="https://75oio.csb.app/sign-direction.svg" />
                <Text variant="label">Quickstart</Text>
              </Flex>
              <Grid paddingLeft={6} paddingTop={2} gap={2}>
                <Text variant="label">Getting started</Text>
                <Text variant="label">Your team and LaunchDarkly</Text>
                <Text variant="label">Creating a feature flag</Text>
              </Grid>
            </Box>
            <Box>
              <Flex>
                <Image variant="icon" sx={{ marginRight: 2 }} src="https://75oio.csb.app/toggles-multiple-solid.svg" />
                <Text variant="label">Managing Flags</Text>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Image variant="icon" sx={{ marginRight: 2 }} src="https://75oio.csb.app/people.svg" />
                <Text variant="label">Managing Users</Text>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Image variant="icon" sx={{ marginRight: 2 }} src="https://75oio.csb.app/security.svg" />
                <Text variant="label">Account Security</Text>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Image variant="icon" sx={{ marginRight: 2 }} src="https://75oio.csb.app/bullseye-arrow.svg" />
                <Text variant="label">Metrics and Insights</Text>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Image variant="icon" sx={{ marginRight: 2 }} src="https://75oio.csb.app/chart-areaspline.svg" />
                <Text variant="label">Experimentation</Text>
              </Flex>
            </Box>
          </Grid>
        </Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <Box
            paddingTop="6"
            sx={{
              paddingX: [4, 6, 7],
              width: ['100%', '28rem', '48rem'],
            }}
          >
            <Box>
              <Styled.h4>
                <Link>Documentation</Link> / Quickstart
              </Styled.h4>
              <Styled.h1>Getting started with LaunchDarkly</Styled.h1>
              <Flex
                paddingBottom={2}
                marginBottom={4}
                sx={{
                  justifyContent: 'space-between',
                  borderBottom: '1px solid',
                  borderColor: 'graymed',
                }}
              >
                <Styled.h5>Est Read Time: 6 Minutes</Styled.h5>
                <Styled.h5>Last edited: Sep 28, 2019</Styled.h5>
              </Flex>
              <Styled.p>
                Welcome to LaunchDarkly! We're excited to partner with you as you use feature flags to make high-impact
                changes with minimal risk and maximum control. It only takes a few minutes to get started with
                LaunchDarkly and control your first feature flag.
              </Styled.p>
              <Card>
                <Flex sx={{ justifyContent: 'space-between' }}>
                  <Text>
                    See also: <Link>Creating a card</Link>
                  </Text>
                  <Image variant="icon" margin={1} src="https://75oio.csb.app/bookmark-outline.svg" />
                </Flex>
              </Card>
              <Styled.h2>Integrating with LaunchDarkly</Styled.h2>
              <Styled.p>
                The steps to integrate your application with LaunchDarkly are common across all SDKs. We provide a
                variety of client, server, and mobile SDKs for you to use. To learn more about our SDK offerings, read{' '}
                <Link href="#!">Choosing an SDK</Link>.
              </Styled.p>
              <Styled.p>
                To setup LaunchDarkly:
                <Styled.ol>
                  <Styled.li>
                    Install the LaunchDarkly SDK in your application using your project's dependency manager. This lets
                    your application access the LaunchDarkly SDK.
                  </Styled.li>
                  <Styled.li>
                    Import the LaunchDarkly client in your application code. This client is the primary way your
                    application uses the SDK and communicates with LaunchDarkly.
                  </Styled.li>
                  <Styled.li>
                    Configure the LaunchDarkly client with the appropriate key for your environment and create the
                    client. Your SDK key, Client-side ID, and Mobile key uniquely identify your project and environment,
                    and they authorize your application to connect to LaunchDarkly.
                  </Styled.li>
                </Styled.ol>
              </Styled.p>
              <Card variant="information">
                <Flex sx={{ justifyContent: 'space-between' }}>
                  <Text>Adding users to LaunchDarkly</Text>
                  <Image variant="icon" margin={1} src="https://75oio.csb.app/information.svg" />
                </Flex>
                <Text marginTop="4" variant="label">
                  You don't have to send users to LaunchDarkly in advance. You can target them with feature flags have
                  LaunchDarkly accounts of their own. Users appear in the dashboard automatically after they encounter
                  feature flags.
                </Text>
              </Card>
              <Styled.h3>Flag evaluations are always available.</Styled.h3>
              <Styled.p>
                If the SDK you're using loses the connection with LaunchDarkly, your feature flags will still work. The
                SDK relies on its stored state to evaluate flags.
              </Styled.p>
            </Box>
          </Box>
        </Flex>
        <Flex paddingTop="6" sx={{ display: ['none', 'none', 'none'] }}>
          <Text variant="labelCaps">On this page</Text>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default App

/** @jsx jsx */
import { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { CSSObject, keyframes } from '@emotion/react'
import { graphql, useStaticQuery } from 'gatsby'
import { jsx, Theme, Themed, ThemeUICSSObject } from 'theme-ui'

import Link from '../components/link'
import Reset from '../components/resetStyles'

const floatingToggle = keyframes`
0% {
  transform: translateY(-10px);
}
50% {
  transform: translateY(10px);
}
100% {
  transform: translateY(-10px);
}
`
const jetpackSmallScreen = keyframes`
0% {
  opacity: 1;
  height: 84px;
  transform: translateX(0);
}
50% {
  opacity: 0.9;
  height: 60px;
  transform: translateX(-3px);
}
100% {
  opacity: 1;
  height: 84px;
  transform: translateX(0);
}
`

const jetpack = keyframes`
0% {
  opacity: 1;
  height: 126.5px;
  transform: translateX(0);
}
50% {
  opacity: 0.9;
  height: 100px;
  transform: translateX(-3px);
}
100% {
  opacity: 1;
  height: 126.5px;
  transform: translateX(0);
}
`

const linkButtonStyles: ThemeUICSSObject = {
  cursor: 'pointer',
  padding: '1.1rem 2.2rem',
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'background-color 0.2s ease-in-out',
  whiteSpace: 'nowrap',
  backgroundColor: 'brandBlue',
  border: 'none',
  borderRadius: '0',
  color: 'grayscaleWhite',

  '&:hover': {
    backgroundColor: '#364dd9',
    color: 'grayscaleWhite',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px #282828, 0 0 0 4px #364dd9',
  },
  '&:focus:not(:focus-visible)': {
    outline: 'initial',
    boxShadow: 'none',
  },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: '0 0 0 2px #282828, 0 0 0 4px #364dd9',
  },
}
// We are using a different breakpoint to due to the animation
// clashing with our current breakpoints
const desktopBreakPoint = '@media screen and (min-width: 900px)'

const jetpackBaseStyles: CSSObject = {
  animationDuration: '0.6s',
  animationTimingFunction: 'cubic-bezier(0, 0.3, 1, 0.7)',
  animationIterationCount: 'infinite',
  objectFit: 'cover',
  position: 'absolute',
  height: 'auto',
  zIndex: '1',
}

const NotFoundPage = () => {
  const { allFile } = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          name: {
            in: [
              "planet@2x"
              "dark-toggle-star"
              "dark-toggle-star-long"
              "jet"
              "toggle-floating"
              "noise"
              "stars_new"
            ]
          }
        }
      ) {
        edges {
          node {
            publicURL
            name
          }
        }
      }
    }
  `)

  let images: Record<string, string> = {}
  allFile.edges.forEach(edge => {
    images = { ...{ [edge.node.name]: edge.node.publicURL }, ...images }
  })

  return (
    <Fragment>
      <Reset />
      <Helmet>
        <title>404 | Page not found</title>
        <meta name="description" content={'Page not found'} />
      </Helmet>
      <main
        sx={{
          backgroundImage: `url('${images['noise']}')`,
          backgroundRepeat: 'repeat',
          minHeight: '100vh',
          backgroundColor: 'rgba(33, 33, 33, 0.97)',
        }}
      >
        <div
          // container
          sx={{
            position: 'relative',
            display: 'grid',
            padding: ['0 1.25rem'],
            gridAutoColumns: '1fr',
            gap: 0,
            margin: '0 auto',
            maxWidth: ['100%', null, '1140px'],
          }}
          css={{
            gridTemplateColumns: '1fr',
            [desktopBreakPoint]: {
              gridTemplateColumns: '25rem 1fr',
            },
          }}
        >
          <div
            // content
            sx={{
              alignSelf: 'center',
              position: 'relative',
              zIndex: '10',
            }}
            css={{
              textAlign: 'center',
              padding: '6.4rem 0 6.4rem',
              [desktopBreakPoint]: {
                textAlign: 'left',
                padding: '0',
              },
            }}
          >
            <Themed.h1
              sx={{
                display: 'inline-block',
                backgroundColor: '#9EADF1',
                backgroundSize: '100%',
                backgroundImage: 'linear-gradient(90deg, #EDF4C9 0%, #9EADF1 100%)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mozTextFillColor: 'transparent',
                fontFamily: (theme: Theme) => `"Audimat 3000", ${(theme.fonts as Record<string, string>).body}`,
                fontSize: ['2.375rem', '3.75rem'],
                lineHeight: ['2.5rem', '3.75rem'],
              }}
            >
              Lost in space
            </Themed.h1>
            <Themed.h2
              sx={{
                fontSize: '1.5rem',
                color: '#BCBEC0',
              }}
              css={{
                marginTop: 0,
                lineHeight: '1.8875rem',
              }}
            >
              {"404 error. Sorry, but the page you're looking for doesn't exist."}
            </Themed.h2>
            <Link to="/" sx={{ ...linkButtonStyles }}>
              LaunchDarkly docs homepage
            </Link>{' '}
          </div>
          <div
            sx={{
              display: [null, 'block'],
            }}
            css={{
              position: 'relative',
              [desktopBreakPoint]: {
                right: '-2rem',
                minHeight: '50.5rem',
              },
            }}
          >
            <img
              css={{
                verticalAlign: 'top',
                top: '1rem',
                right: '0',
                height: 'auto',
                width: '9.375rem',
                transform: 'rotate(60deg)',
                position: 'absolute',
                [desktopBreakPoint]: {
                  width: '18.75rem' /* 300px */,
                },
              }}
              src={images['planet@2x']}
              alt="Planet in the distance"
            />
            <div
              sx={{
                width: '100%',
                margin: 'auto',
                animation: `${floatingToggle} 5s cubic-bezier(0.4, 0.01, 0.6, 1) infinite`,
              }}
              css={{
                position: 'relative',
                maxWidth: '18.75rem',
                display: 'grid',
                [desktopBreakPoint]: {
                  display: 'block',
                  zIndex: '1',
                  position: 'absolute',
                  maxWidth: '25rem',
                  right: '7.5rem',
                  bottom: '15.025rem',
                },
              }}
            >
              {
                // Toggle Body
              }
              <img
                src={images['toggle-floating']}
                sx={{
                  position: 'relative',
                  zIndex: '2',
                }}
                alt="Astronaut in sneakers giving thumbs up sign"
              />
              {
                // Jet packs
              }
              <img
                css={{
                  ...jetpackBaseStyles,
                  animationName: `${jetpackSmallScreen}`,
                  top: '238px',
                  left: '96px',
                  width: '40px',
                  [desktopBreakPoint]: {
                    animationName: `${jetpack}`,
                    width: '60px',
                    top: '318px',
                    left: '126px',
                  },
                }}
                src={images['jet']}
                alt="Jetpack flame one"
              />
              <img
                css={{
                  ...jetpackBaseStyles,
                  animationName: `${jetpackSmallScreen}`,
                  width: '40px',
                  top: '233px',
                  left: '123px',
                  animationDelay: '0.2s !important',
                  [desktopBreakPoint]: {
                    animationName: `${jetpack}`,
                    width: '60px',
                    top: '309px',
                    left: '160px',
                  },
                }}
                src={images['jet']}
                alt="Jetpack flame two"
              />
            </div>
          </div>
          <img
            css={{
              display: 'none',
              [desktopBreakPoint]: {
                position: 'absolute',
                height: 'auto',
                display: 'inline-block',
                bottom: '2.5rem',
                width: '100%',
                maxWidth: '9.375rem',
                left: '1rem',
                transform: 'rotate(45deg)',
              },
            }}
            src={images['planet@2x']}
            alt="Planet in the distance"
          />
          <img
            src={images['dark-toggle-star']}
            css={{
              display: 'none',
              [desktopBreakPoint]: {
                position: 'absolute',
                zIndex: 1,
                display: 'block',
                width: '5.3125rem',
                bottom: '12.5rem',
                left: '40%',
              },
            }}
            alt="Astronaut in sneakers giving thumbs up sign"
          />
          <img
            src={images['dark-toggle-star']}
            css={{
              display: 'none',
              [desktopBreakPoint]: {
                position: 'absolute',
                zIndex: 1,
                display: 'block',
                width: '4.25rem',
                opacity: 0.7,
                top: '2.5rem',
                left: '50%',
              },
            }}
            alt="Astronaut in sneakers giving thumbs up sign"
          />
          <img
            css={{
              display: 'none',
              [desktopBreakPoint]: {
                position: 'absolute',
                zIndex: 1,
                display: 'block',
                width: '8.125rem',
                top: '12.5rem',
                left: '-1.25rem',
              },
            }}
            src={images['dark-toggle-star-long']}
            alt="Astronaut in sneakers giving thumbs up sign"
          />
        </div>
        <img
          sx={{
            position: 'absolute',
            display: 'block',
            maxWidth: '87.5rem',
            width: '100%',
            top: 0,
            left: 0,
            right: 0,
            margin: '0 auto',
          }}
          src={images['stars_new']}
          alt="stars"
        />
      </main>
    </Fragment>
  )
}

export default NotFoundPage

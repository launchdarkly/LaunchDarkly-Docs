/** @jsx jsx */
import { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { CSSObject, keyframes } from '@emotion/react'
import { graphql, useStaticQuery } from 'gatsby'
import { jsx, Theme, Themed, ThemeUICSSObject } from 'theme-ui'

import Link from '../components/link'
import Reset from '../components/resetStyles'

type edgeNode = {
  node: {
    name: 'planet@2x' | 'dark-toggle-star' | 'dark-toggle-star-long' | 'jet' | 'toggle-floating' | 'noise' | 'stars_new'
    publicURL: string
  }
}

const floatingToggleAnimation = keyframes`
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

const jetpackSmallScreenAnimation = keyframes`
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

const jetpackAnimation = keyframes`
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
  backgroundColor: 'brandBlue',
  border: 'none',
  borderRadius: '0',
  color: 'grayscaleWhite',
  cursor: 'pointer',
  display: 'inline-block',
  padding: '1.1rem 2.2rem',
  transition: 'background-color 0.2s ease-in-out',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  '&:visited': {
    color: 'grayscaleWhite',
  },
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

const jetpackBaseStyles: CSSObject = {
  animationDuration: '0.6s',
  animationTimingFunction: 'cubic-bezier(0, 0.3, 1, 0.7)',
  animationIterationCount: 'infinite',
  objectFit: 'cover',
  position: 'absolute',
  height: 'auto',
  zIndex: '1',
}

// We are using a different breakpoint to due to the animation
// clashing with our current breakpoints
const desktopBreakPoint = '@media screen and (min-width: 900px)'

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
  allFile.edges.forEach((edge: edgeNode) => {
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
          backgroundColor: 'rgba(33, 33, 33, 0.97)',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <div
          // container
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridAutoColumns: '1fr',
            gap: 0,
            margin: '0 auto',
            maxWidth: ['100%', null, '1140px'],
            padding: ['0 1.25rem'],
            position: 'relative',
            [desktopBreakPoint]: {
              gridTemplateColumns: '25rem 1fr',
            },
          }}
        >
          <div
            // content
            sx={{
              alignSelf: 'center',
              padding: '6.4rem 0 6.4rem',
              position: 'relative',
              textAlign: 'center',
              zIndex: '10',
              [desktopBreakPoint]: {
                padding: '0',
                textAlign: 'left',
              },
            }}
          >
            <Themed.h1
              sx={{
                backgroundColor: '#9EADF1',
                backgroundSize: '100%',
                backgroundImage: 'linear-gradient(90deg, #EDF4C9 0%, #9EADF1 100%)',
                backgroundClip: 'text',
                display: 'inline-block',
                lineHeight: ['2.5rem', '3.75rem'],
                fontFamily: (theme: Theme) => `"Audimat 3000", ${(theme.fonts as Record<string, string>).body}`,
                fontSize: ['2.375rem', '3.75rem'],
                mozTextFillColor: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Lost in space
            </Themed.h1>
            <h2
              sx={{
                color: '#BCBEC0',
                lineHeight: '1.8875rem',
                fontSize: '1.5rem',
                marginTop: [0, null, null, 0],
                marginBottom: '1.875rem',
              }}
            >
              {"404 error. Sorry, but the page you're looking for doesn't exist."}
            </h2>
            <Link to="/" sx={{ ...linkButtonStyles }}>
              LaunchDarkly docs homepage
            </Link>{' '}
          </div>
          <div
            sx={{
              position: 'relative',
              display: [null, 'block'],
              [desktopBreakPoint]: {
                right: '-2rem',
                minHeight: '50.5rem',
              },
            }}
          >
            <img
              sx={{
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
                animation: `${floatingToggleAnimation} 5s cubic-bezier(0.4, 0.01, 0.6, 1) infinite`,
                display: 'grid',
                margin: 'auto',
                maxWidth: '18.75rem',
                position: 'relative',
                width: '100%',
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
              <img
                src={images['toggle-floating']}
                sx={{
                  position: 'relative',
                  zIndex: '2',
                }}
                alt="Astronaut in sneakers giving thumbs up sign"
              />
              <img
                css={{
                  ...jetpackBaseStyles,
                  animationName: `${jetpackSmallScreenAnimation}`,
                  top: '238px',
                  left: '96px',
                  width: '40px',
                  [desktopBreakPoint]: {
                    animationName: `${jetpackAnimation}`,
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
                  animationName: `${jetpackSmallScreenAnimation}`,
                  width: '40px',
                  top: '233px',
                  left: '123px',
                  animationDelay: '0.2s !important',
                  [desktopBreakPoint]: {
                    animationName: `${jetpackAnimation}`,
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
            sx={{
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
            sx={{
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
            sx={{
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
            sx={{
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

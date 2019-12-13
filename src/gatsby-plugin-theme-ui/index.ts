// This sucks, but it's not clear if it is possible and how to be able to
// use the type of the theme object from functions that require the theme
// itself, like boxShadow.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  // breakpoints are intentionally set using em after some research and discussion based on this
  // https://zellwk.com/blog/media-query-units/
  breakpoints: ['36rem', '76rem', '88rem', '102rem'],
  sizes: ['.75rem', '1rem', '1.25rem', '1.5rem', '2rem', '4rem', '8rem', '16rem'],
  fontSizes: [8, 10, '0.75rem', '0.875rem', '1rem', '1.5rem', '1.75rem', '2rem'],
  colors: {
    primaryDark: '#087F5B',
    primarySafe: '#0CA678',
    primaryBase: '#20C99F',
    primaryWash: '#EAFCF8',
    secondaryDark: '#0E1932',
    infoDark: '#1864AB',
    infoSafe: '#1C7ED6',
    infoBase: '#339AF0',
    infoWash: '#E7F5FF',
    alertDark: '#D44512',
    alertSafe: '#F76707',
    alertBase: '#FF922B',
    alertWash: '#FFF4E6',
    warnDark: '#C92A2A',
    warnSafe: '#F03E3E',
    warnBase: '#FF6B6B',
    warnWash: '#FFF5F5',
    grayBlack: '#212529',
    grayDark: '#434A51',
    graySafe: '#646f7A',
    grayBase: '#8A929C',
    grayMed: '#CED4DA',
    grayLight: '#F1F3F5',
    grayWash: '#F8F9FA',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64, 128, 256],
  borderWidths: [0, '.0625rem', '.125rem', '.25rem', '.5rem', '1rem', '2rem'],
  radii: [0, 2, 4, 6],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    light: 300,
    body: 400,
    heading: 700,
    bold: 500,
  },
  lineHeights: {
    fixed: '1',
    small: '1.25rem',
    body: '1.75rem',
    heading: '3rem',
  },
  text: {
    label: {
      fontSize: 3,
      lineHeight: 'small',
      color: 'grayDark',
      textDecoration: 'none',
      display: 'block',
      paddingBottom: 4,
      fontWeight: 'bold',
    },
    labelBold: {
      fontSize: 3,
      lineHeight: 'small',
      fontWeight: 'bold',
    },
    labelCaps: {
      fontSize: 3,
      lineHeight: 'small',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
  },
  cards: {
    learnMore: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `0 2px 4px ${theme.colors.grayMed}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      bg: 'grayWash',
    },
    info: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `inset 4px 0 0 ${theme.colors.infoBase}, 0 2px 4px ${theme.colors.grayMed}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      bg: 'infoWash',
    },
    warning: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `inset 4px 0 0 ${theme.colors.warnBase}, 0 2px 4px ${theme.colors.grayMed}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      bg: 'warnWash',
    },
    alert: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `inset 4px 0 0 ${theme.colors.alertBase}, 0 2px 4px ${theme.colors.grayMed}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      bg: 'alertWash',
    },
    primary: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `inset 4px 0 0 ${theme.colors.primaryBase}, 0 2px 4px ${theme.colors.grayMed}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      bg: 'primaryWash',
    },
  },
  images: {
    icon: {
      width: '1.25rem',
      height: '1.25rem',
      fill: 'primarySafe',
    },
  },
  icons: {
    learnMore: {
      width: 2,
      height: 2,
      fill: 'grayBase',
    },
    callout: {
      info: {
        width: 2,
        height: 2,
        fill: 'infoSafe',
      },
      warning: {
        width: 2,
        height: 2,
        fill: 'warnSafe',
      },
      alert: {
        width: 2,
        height: 2,
        fill: 'alertSafe',
      },
      primary: {
        width: 2,
        height: 2,
        fill: 'primarySafe',
      },
    },
    header: {
      height: 3,
      width: 'auto',
      fill: 'white',
    },
    sideMenu: { width: 2, height: 2, fill: 'white', cursor: 'pointer' },
    heading: {
      width: 3,
      height: 3,
      fill: 'graySafe',
    },
    close: {
      width: 3,
      height: 3,
      p: 1,
      fill: 'grayDark',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      fontSize: [5, 6, 7],
      lineHeight: 'fixed',
      marginBottom: '3',
      fontWeight: 'light',
    },
    h2: {
      fontSize: [4, 6],
      lineHeight: 'fixed',
      marginTop: 6,
      marginBottom: 4,
    },
    h3: {
      fontSize: [4, 5],
      lineHeight: 'body',
      marginTop: 6,
      marginBottom: 4,
    },
    h4: {
      fontSize: 3,
    },
    h5: {
      fontSize: 2,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: 'graySafe',
    },
    h6: {
      fontSize: 1,
    },
    a: {
      color: 'primarySafe',
      textDecoration: 'none',
      ':hover': {
        color: 'grayBase',
        textDecoration: 'underline',
      },
      ':visited': {
        color: 'primarySafe',
      },
      ':active': {
        color: 'primarySafe',
        textDecoration: 'underline',
      },
    },
    p: {
      fontSize: [3, 4],
      lineHeight: 'body',
      paddingBottom: 4,
    },
    li: {
      listStylePosition: 'inside',
      paddingBottom: 4,
      lineHeight: 'body',
      '::before': {
        fontWeight: 'bold',
        fontSize: 6,
      },
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
  },
}

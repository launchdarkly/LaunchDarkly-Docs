export default {
  // breakpoints are intentionally set using em after some research and discussion based on this
  // https://zellwk.com/blog/media-query-units/
  breakpoints: ['36em', '52em', '62em', '75em'],
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
    'learn-more': {
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: '0 2px 4px #CED4DA',
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      bg: 'grayWash',
      mb: 4,
      display: 'flex',
      justifyContent: 'space-between',
    },
    info: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: 'inset 4px 0 0 #339AF0, 0 2px 4px #CED4DA',
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      bg: 'grayWash',
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
    info: {
      width: 2,
      height: 2,
      fill: 'infoSafe',
    },
    header: {
      width: 2,
      height: 2,
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
      fill: 'secondaryDark',
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
      ':hover': {
        color: 'grayBase',
      },
      ':visited': {
        color: 'primarySafe',
      },
      ':active': {
        color: 'primarySafe',
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

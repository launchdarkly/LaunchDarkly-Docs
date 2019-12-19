// This sucks, but it's not clear if it is possible and how to be able to
// use the type of the theme object from functions that require the theme
// itself, like boxShadow.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  // breakpoints are intentionally set using em after some research and discussion based on this
  // https://zellwk.com/blog/media-query-units/
  breakpoints: ['44rem', '76rem', '88rem', '102rem'],
  sizes: ['.75rem', '1rem', '1.25rem', '1.5rem', '2rem', '4rem', '8rem', '16rem'],
  fontSizes: ['0.5rem', '0.625rem', '0.75rem', '0.875rem', '1rem', '1.5rem', '1.75rem', '2.25rem'],
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
    white: '#FFFFFF',
  },
  space: [0, '0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '2rem', '3rem', '3.5rem', '4rem', '8rem'],
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
    bold: 600,
  },
  lineHeights: {
    fixed: '1',
    spaced: '1.5',
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
  buttons: {
    code: {
      language: {
        padding: 1,
        paddingLeft: 3,
        paddingRight: 3,
        marginLeft: 1,
        marginRight: 1,
        fontSize: 3,
        lineHeight: 'small',
        borderRadius: 0,
        color: 'grayBase',
        cursor: 'pointer',
        bg: 'transparent',
        '&:hover': {
          color: 'grayDark',
          boxShadow: (theme: any) => `inset 0px -2px 0px ${theme.colors.primaryBase}`,
        },
      },
      languageActive: (theme: any) => ({
        ...theme.buttons.code.language,
        ...theme.buttons.code.language['&:hover'],
      }),
      copy: {
        padding: 1,
        paddingLeft: 3,
        paddingRight: 3,
        textTransform: 'uppercase',
        fontSize: 2,
        fontWeight: 'bold',
        lineHeight: 'small',
        borderRadius: 1,
        color: 'grayDark',
        cursor: 'pointer',
        bg: 'transparent',
        '&:hover': {
          bg: 'grayMed',
        },
      },
    },
  },
  cards: {
    code: {
      padding: 2,
      marginBottom: 4,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `0 2px 4px ${theme.colors.grayMed}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'small',
      bg: 'grayWash',
    },
    learnMore: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `0 2px 4px ${theme.colors.grayLight}, inset 0 0 12px ${theme.colors.grayLight}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      my: [5, 6],
    },
    info: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) =>
        `inset 4px 0 0 ${theme.colors.infoBase}, inset 0 0 12px ${theme.colors.infoWash},  0 2px 4px ${theme.colors.grayLight}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      my: [5, 6],
    },
    warning: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) =>
        `inset 4px 0 0 ${theme.colors.warnBase}, inset 0 0 12px ${theme.colors.warnWash}, 0 2px 4px ${theme.colors.grayLight}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      my: [5, 6],
    },
    alert: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) =>
        `inset 4px 0 0 ${theme.colors.alertBase}, inset 0 0 12px ${theme.colors.alertWash}, 0 2px 4px ${theme.colors.grayLight}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      my: [5, 6],
    },
    primary: {
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) =>
        `inset 4px 0 0 ${theme.colors.primaryBase}, inset 0 0 12px ${theme.colors.primaryWash}, 0 2px 4px ${theme.colors.grayLight}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      my: [5, 6],
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
    search: {
      width: 2,
      height: 2,
      fill: 'white',
      m: 2,
    },
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
      fontSize: [6, 6, 7],
      lineHeight: ['spaced', 'spaced', 'fixed'],
      marginBottom: [1, 2, 4],
      fontWeight: 'light',
    },
    h2: {
      fontSize: [5, 6],
      lineHeight: ['spaced', 'spaced', 'fixed'],
      marginTop: [4, 6, 8],
      marginBottom: [2, 4, 5],
    },
    h3: {
      fontSize: [4, 5],
      lineHeight: ['spaced', 'spaced', 'fixed'],
      marginTop: [4, 6, 8],
      marginBottom: [2, 4, 5],
      fontWeight: ['bold', 'body'],
    },
    h4: {
      fontSize: 3,
      fontWeight: 'bold',
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
        color: 'graySafe',
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
      fontSize: 4,
      lineHeight: 'body',
      marginBottom: [5, 5, 6],
    },
    li: {
      listStylePosition: 'inside',
      marginBottom: [5, 5, 6],
      lineHeight: 'body',
      '::before': {
        fontWeight: 'bold',
        fontSize: 6,
      },
    },
    pre: {
      whiteSpace: 'pre-wrap',

      color: '#393A34',
      backgroundColor: '#f6f8fa',
      '.comment,.prolog,.doctype,.cdata': {
        color: '#999988',
        fontStyle: 'italic',
      },
      '.namespace': {
        opacity: 0.7,
      },
      '.string,.attr-value': {
        color: '#e3116c',
      },
      '.punctuation,.operator': {
        color: '#393A34',
      },
      '.entity,.url,.symbol,.number,.boolean,.variable,.constant,.property,.regex,.inserted': {
        color: '#36acaa',
      },
      '.atrule,.keyword,.attr-name,.selector': {
        color: '#00a4db',
      },
      '.function,.deleted,.tag': {
        color: '#d73a49',
      },
      '.function-variable': {
        color: '#6f42c1',
      },
      '.tag,.selector,.keyword': {
        color: '#00009f',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 3,
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

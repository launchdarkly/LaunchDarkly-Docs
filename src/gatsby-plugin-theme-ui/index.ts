// This sucks, but it's not clear if it is possible and how to be able to
// use the type of the theme object from functions that require the theme
// itself, like boxShadow.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  // Adds styles defined in theme.styles.root to the <body> element along with color and background-color
  // https://theme-ui.com/theming/#configuration-flags
  useBodyStyles: false,

  // breakpoints are intentionally set using em after some research and discussion based on this
  // https://zellwk.com/blog/media-query-units/
  breakpoints: ['48rem', '76rem', '88rem', '102rem'],
  sizes: ['.75rem', '1rem', '1.25rem', '1.5rem', '2rem', '4rem', '8rem', '16rem'],
  fontSizes: ['0.5rem', '0.625rem', '0.75rem', '0.875rem', '1rem', '1.25rem', '1.5rem', '1.75rem', '2.25rem'],
  colors: {
    primaryDark: '#087F5B',
    primarySafe: '#0CA678',
    primaryBase: '#20C99F',
    primaryWash: '#F3FDFB',
    secondaryDark: '#0E1932',
    infoDark: '#1864AB',
    infoSafe: '#1C7ED6',
    infoBase: '#339AF0',
    infoWash: '#F1F9FF',
    alertDark: '#D44512',
    alertSafe: '#F76707',
    alertBase: '#FF922B',
    alertWash: '#FFF9F2',
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
    medium: 500,
    heading: 500,
    bold: 500,
  },
  lineHeights: {
    fixed: '1',
    spaced: '1.5',
    xsmall: '1rem',
    small: '1.25rem',
    regular: '1.5rem',
    medium: '2rem',
    large: '3rem',
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
      bg: 'grayWash',
      marginBottom: 4,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `0 2px 4px ${theme.colors.grayMed}`,
      paddingLeft: 5,
      paddingRight: 4,
      paddingY: 4,
      lineHeight: 'small',
      my: [4, 5],
      overflowX: 'auto',
    },
    table: {
      padding: 2,
      bg: 'grayWash',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `0 2px 4px ${theme.colors.grayMed}`,
      paddingX: [3, 5],
      paddingY: [2, 4],
      lineHeight: 'regular',
      fontSize: 3,
      width: '100%',
      my: [4, 5],
      overflowX: 'auto',
    },
    image: {
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `0 2px 4px ${theme.colors.grayMed}`,
      maxWidth: '100%',
      my: [4, 5],
    },
    learnMore: {
      padding: 2,
      bg: 'grayWash',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `0 2px 4px ${theme.colors.grayMed}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'regular',
      my: [4, 5],
    },
    info: {
      padding: 2,
      bg: 'grayWash',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `inset 6px 0 0 ${theme.colors.infoBase}, 0 2px 4px ${theme.colors.grayMed}`,
      paddingLeft: 5,
      paddingRight: 4,
      paddingY: 4,
      lineHeight: 'regular',
      my: [4, 5],
    },
    warning: {
      padding: 2,
      bg: 'grayWash',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `inset 6px 0 0 ${theme.colors.warnBase}, 0 2px 4px ${theme.colors.grayMed}`,
      paddingLeft: 5,
      paddingRight: 4,
      paddingY: 4,
      lineHeight: 'regular',
      my: [4, 5],
    },
    alert: {
      padding: 2,
      bg: 'grayWash',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `inset 6px 0 0 ${theme.colors.alertBase}, 0 2px 4px ${theme.colors.grayMed}`,
      paddingLeft: 5,
      paddingRight: 4,
      paddingY: 4,
      lineHeight: 'regular',
      my: [4, 5],
    },
    primary: {
      padding: 2,
      bg: 'grayWash',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: (theme: any) => `inset 6px 0 0 ${theme.colors.primaryBase}, 0 2px 4px ${theme.colors.grayMed}`,
      paddingLeft: 5,
      paddingRight: 4,
      paddingY: 4,
      lineHeight: 'regular',
      my: [4, 5],
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
    sideNav: { width: 3, height: 3, fill: 'white', cursor: 'pointer' },
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
  links: {
    topNav: {
      color: 'grayMed',
      textDecoration: 'none',
      ':visited': {
        color: 'grayMed',
      },
      ':active': {
        color: 'primaryBase',
      },
      ':hover': {
        color: 'primaryBase',

        '& svg': {
          fill: 'primaryBase',
        },
      },
    },
    githubEdit: {
      fontSize: 2,
      color: 'graySafe',
      textDecoration: 'none',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'regular',
      fontWeight: 'body',
    },
    h1: {
      fontSize: 7,
      lineHeight: ['medium', 'medium', 'fixed'],
      marginBottom: [3, 3, 4],
      fontWeight: 'body',
    },
    h2: {
      fontSize: 6,
      lineHeight: ['medium', 'medium', 'fixed'],
      marginTop: [5, 6, 7],
      marginBottom: [3, 3, 4],
    },
    h3: {
      fontSize: 5,
      lineHeight: ['small', 'medium', 'fixed'],
      marginTop: [5, 5, 6],
      marginBottom: [2, 2, 3],
      fontWeight: 'heading',
      color: ['grayBlack', 'grayBlack'],
    },
    h4: {
      fontSize: 3,
      fontWeight: 'body',
    },
    h5: {
      fontSize: 2,
      textTransform: 'uppercase',
      fontWeight: 'body',
      color: 'graySafe',
    },
    h6: {
      fontSize: 1,
    },
    strong: {
      fontWeight: 'bold',
    },
    a: {
      color: 'infoSafe',
      textDecoration: 'underline',
      ':hover': {
        color: 'grayBlack',
      },
      ':visited': {
        color: 'infoSafe',
      },
      ':active': {
        color: 'grayBlack',
      },
    },
    figcaption: {
      fontSize: 3,
      fontStyle: 'italic',
      pt: 2,
      color: 'graySafe',
      textAlign: 'center',
    },
    p: {
      fontSize: 4,
      lineHeight: 'regular',
      marginBottom: 5,
      '& figcaption': (theme: any) => ({
        ...theme.styles.figcaption,
      }),
    },
    ol: {
      marginBottom: [5, 5, 5],
      marginLeft: 5,
      listStylePosition: 'outside',
    },
    ul: {
      marginBottom: [5, 5, 6],
      marginLeft: 7,
      listStylePosition: 'outside',
      listStyleType: 'disc',
    },
    'p + ol': {
      // target sibling components
    },
    li: {
      marginBottom: [3, 3, 3],
      lineHeight: 'regular',
    },
    pre: {
      overflow: 'auto',

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

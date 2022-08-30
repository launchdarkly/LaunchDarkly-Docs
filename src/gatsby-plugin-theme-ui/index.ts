import { get, Theme } from 'theme-ui'

// These names should correspond to those you'll find referenced in figma designs
// e.g. "Brand/Blue" or "Grayscale/Gray 700"
// Doesn't include all 72 extended colors, but feel free to add them as you need them
const ldColors = {
  brandYellow: '#EBFF38',
  brandBlue: '#405BFF',
  brandPink: '#FF386B',
  brandCyan: '#3DD6F5',
  brandPurple: '#A34FDE',
  brandBlueMuted: '#E2E6FF',
  systemGreen: '#00DA7B',
  systemRed: '#E83B3B',
  systemYellow: '#EEC340',
  grayscaleWhite: '#FFFFFF',
  grayscaleWhite100: '#F8F8F8',
  grayscaleGray100: '#E6E6E6',
  grayscaleGray200: '#D1D3D4',
  grayscaleGray300: '#BCBEC0',
  grayscaleGray400: '#A7A9AC',
  grayscaleGray500: '#939598',
  grayscaleGray600: '#6D6E71',
  grayscaleGray700: '#58595B',
  grayscaleGray800: '#414042',
  grayscaleBlack100: '#282828',
  grayscaleBlack200: '#212121',
  grayscaleBlack300: '#191919',
  grayscaleBlack: '#000000',
}

const makeTheme = <T extends Theme>(t: T) => t

const theme = makeTheme({
  // Adds styles defined in theme.styles.root to the <body> element along with color and background-color
  // https://theme-ui.com/theming/#configuration-flags
  useBodyStyles: false,

  // breakpoints are intentionally set using em after some research and discussion based on this
  // https://zellwk.com/blog/media-query-units/
  breakpoints: ['48rem', '76rem', '88rem', '102rem'],
  sizes: ['.75rem', '1rem', '1.25rem', '1.5rem', '2rem', '4rem', '8rem', '16rem'],
  fontSizes: ['0.5rem', '0.625rem', '0.75rem', '0.875rem', '1rem', '1.125rem', '1.375rem', '1.75rem', '2.25rem'],
  colors: {
    ...ldColors,
    // Colors by function - use these when it's obvious what the purpose of the color is
    text: ldColors.grayscaleGray700, // most text/icons
    background: ldColors.grayscaleWhite, // page background
    primary: ldColors.brandBlue, // primary buttons/links
    secondary: ldColors.brandCyan, // secondary buttons/links
    accent: ldColors.grayscaleBlack100, // header text, emphasised text/icons, contrasted backgrounds/borders
    muted: ldColors.grayscaleWhite100, // faint backgrounds/borders to complement the background not contrast it
    primaryMuted: ldColors.brandBlueMuted,
    // Legacy colors - try not to use these directly anymore, some have been remapped for
    // expediency, but we should remove them all eventually
    primarySafe: ldColors.brandBlue,
    grayBlack: ldColors.grayscaleBlack200,
    graySafe: ldColors.grayscaleGray600,
    grayBase: ldColors.grayscaleGray300,
    grayMed: ldColors.grayscaleGray200,
    grayLight: ldColors.grayscaleWhite100,
    grayWash: ldColors.grayscaleWhite100,
    white: ldColors.grayscaleWhite,
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
    bold: 600,
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
  shadows: {
    small:
      '0 0 .25rem rgba(40, 40, 40, 0.12), 0 .063rem .125rem rgba(40, 40, 40, 0.1), 0 .25rem .25rem rgba(40, 40, 40, 0.08)',
  },
  text: {
    label: {
      fontSize: 3,
      lineHeight: 'small',
      color: 'text',
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
          color: 'text',
          boxShadow: (theme: Theme) => `inset 0px -2px 0px ${theme.colors.primary}`,
        },
      },
      languageActive: (theme: Theme) => ({
        ...get(theme, 'buttons.code.language'),
        ...get(theme, 'buttons.code.language.&:hover'),
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
        color: 'text',
        cursor: 'pointer',
        bg: 'transparent',
        '&:hover': {
          bg: 'muted',
        },
      },
    },
    siteSelector: {
      height: [4, 'inherit'],
      border: 1,
      borderRadius: 3,
      borderStyle: 'solid',
      color: ['grayscaleBlack300', 'grayscaleWhite'],
      borderColor: 'grayscaleGray500',
      pl: 3,
      pr: 2,
      py: 2,
      justifyContent: 'space-between',
      textAlign: 'justify',
      display: 'flex',
      fontSize: 3,
    },
  },
  cards: {
    code: {
      padding: 2,
      bg: 'muted',
      marginBottom: 4,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'muted',
      boxShadow: (theme: Theme) => `0 2px 4px ${theme.colors.muted}`,
      paddingLeft: 5,
      paddingRight: 4,
      paddingY: 4,
      lineHeight: 'small',
      my: [4, 5],
      overflowX: 'auto',
    },
    table: {
      padding: 2,
      bg: 'muted',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'muted',
      boxShadow: (theme: Theme) => `0 2px 4px ${theme.colors.muted}`,
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
      borderColor: 'muted',
      boxShadow: (theme: Theme) => `0 2px 4px ${theme.colors.muted}`,
      maxWidth: '100%',
      my: [4, 5],
    },
    learnMore: {
      padding: 2,
      bg: 'muted',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'muted',
      boxShadow: (theme: Theme) => `0 2px 4px ${theme.colors.muted}`,
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'regular',
      my: [4, 5],
      p: {
        mb: 0,
      },
      ol: {
        margin: 0,
        listStylePosition: 'outside',
      },
      ul: {
        margin: 0,
        listStyleType: 'none',
        listStylePosition: 'outside',
      },
      li: {
        mb: 0,
      },
      a: {
        color: 'secondary',
        textDecoration: 'none',
        fontWeight: 'bold',
        '&:visited': { color: 'secondary' },
        '&:hover': { color: 'grayBlack', textDecoration: 'underline' },
      },
    },
    info: {
      padding: 2,
      bg: 'muted',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'muted',
      boxShadow: (theme: Theme) => `inset 6px 0 0 ${theme.colors.secondary}, 0 2px 4px ${theme.colors.muted}`,
      paddingLeft: 5,
      paddingRight: 4,
      paddingY: 4,
      lineHeight: 'regular',
      my: [4, 5],
    },
    warning: {
      padding: 2,
      bg: 'muted',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'muted',
      boxShadow: (theme: Theme) => `inset 6px 0 0 ${theme.colors.systemYellow}, 0 2px 4px ${theme.colors.muted}`,
      paddingLeft: 5,
      paddingRight: 4,
      paddingY: 4,
      lineHeight: 'regular',
      my: [4, 5],
    },
    alert: {
      padding: 2,
      bg: 'muted',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'muted',
      boxShadow: (theme: Theme) => `inset 6px 0 0 ${theme.colors.systemRed}, 0 2px 4px ${theme.colors.muted}`,
      paddingLeft: 5,
      paddingRight: 4,
      paddingY: 4,
      lineHeight: 'regular',
      my: [4, 5],
    },
    primary: {
      padding: 2,
      bg: 'muted',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'muted',
      boxShadow: (theme: Theme) => `inset 6px 0 0 ${theme.colors.primary}, 0 2px 4px ${theme.colors.muted}`,
      paddingLeft: 5,
      paddingRight: 4,
      paddingY: 4,
      lineHeight: 'regular',
      my: [4, 5],
    },
  },
  details: {
    details: {
      lineHeight: 'spaced',
      px: 4,
      '&[open]': {
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'muted',
        borderTop: 0,
      },
    },
    summary: {
      bg: 'primaryMuted',
      transition: 'background-color 0.5s ease',
      borderRadius: 2,
      cursor: 'pointer',
      mx: -4,
      marginBottom: 4,
      padding: 4,
      '&.open': {
        bg: 'muted',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  },
  figures: {
    figure: {
      mt: 4,
      mb: 5,
    },
    figcaption: {
      fontSize: 3,
      fontStyle: 'italic',
      pt: 2,
      color: 'graySafe',
      textAlign: 'center',
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
      fill: 'grayscaleWhite',
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
        fill: 'secondary',
      },
      warning: {
        width: 2,
        height: 2,
        fill: 'systemYellow',
      },
      alert: {
        width: 2,
        height: 2,
        fill: 'systemRed',
      },
      primary: {
        width: 2,
        height: 2,
        fill: 'primary',
      },
    },
    header: {
      height: '2.8rem',
      width: 'auto',
      fill: 'grayscaleWhite',
      '& rect': {
        fill: 'brandYellow',
        '+ path': {
          fill: 'grayscaleBlack',
        },
      },
    },
    sideNav: { width: 3, height: 3, fill: 'grayscaleWhite', cursor: 'pointer' },
    heading: {
      width: 3,
      height: 3,
      fill: 'graySafe',
    },
    close: {
      width: 3,
      height: 3,
      p: 1,
      fill: 'grayscaleGray700',
    },
  },
  links: {
    topNav: {
      color: 'grayscaleWhite',
      borderColor: 'primary',
      borderWidth: '0 0 3px 0',
      opacity: 0.6,
      height: '100%',
      padding: '1.75rem 16px 0 16px',
      textDecoration: 'none',
      ':visited': {
        color: 'grayscaleWhite',
      },
      ':active': {
        color: 'grayscaleWhite',
        opacity: 1,
        borderStyle: 'solid',
      },
      ':hover': {
        color: 'grayscaleWhite',
        opacity: 1,

        '& svg': {
          fill: 'grayscaleWhite',
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
      code: {
        ml: 1,
        fontSize: 7,
      },
    },
    h2: {
      fontSize: 6,
      lineHeight: ['medium', 'medium', 'fixed'],
      marginTop: [5, 6, 7],
      marginBottom: [3, 3, 4],
      code: {
        ml: 1,
        fontSize: 6,
      },
    },
    h3: {
      fontSize: 5,
      lineHeight: ['small', 'medium', 'fixed'],
      marginTop: [5, 5, 6],
      marginBottom: [2, 2, 3],
      fontWeight: 'heading',
      color: ['grayBlack', 'grayBlack'],
      code: {
        ml: 1,
        fontSize: 5,
      },
    },
    h4: {
      fontSize: 3,
      fontWeight: 'body',
      code: {
        ml: 1,
        fontSize: 3,
      },
    },
    h5: {
      fontSize: 2,
      textTransform: 'uppercase',
      fontWeight: 'body',
      color: 'graySafe',
      code: {
        ml: 1,
        fontSize: 2,
      },
    },
    h6: {
      fontSize: 1,
      code: {
        ml: 1,
        fontSize: 1,
      },
    },
    strong: {
      fontWeight: 'bold',
    },
    a: {
      color: 'primary',
      textDecoration: 'underline',
      ':hover': {
        color: 'accent',
      },
      ':visited': {
        color: 'primary',
      },
      ':active': {
        color: 'accent',
      },
    },
    p: {
      fontSize: 4,
      lineHeight: 'regular',
      marginBottom: 5,
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
    inlineCode: {
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
})

export default theme

export type GitGatsbyTheme = typeof theme

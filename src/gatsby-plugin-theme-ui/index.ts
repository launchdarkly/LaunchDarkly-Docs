export default {
  breakpoints: ['36em', '48em', '62em', '75em'],
  fontSizes: [8, 10, '0.75rem', '0.875rem', '1rem', '1.5rem', '1.75rem', '2rem'],
  colors: {
    primary: '#20C99F',
    grayDark: '#343A40',
    grayBase: '#868E96',
    grayMed: '#CED4DA',
    grayWash: '#F8F9FA',
    grayLight: '#F1F3F5',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64, 128, 256],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
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
    primary: {
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
    },
    information: {
      padding: 2,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'graymed',
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
      fill: 'primary',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    a: {
      color: 'primary',
      ':hover': {
        color: 'graybase',
      },
    },
    p: {
      fontSize: [3, 4],
      lineHeight: 'body',
      paddingBottom: 4,
    },
    h1: {
      fontSize: [5, 6, 7],
      lineHeight: 'fixed',
      paddingBottom: '6',
    },
    h2: {
      fontSize: [4, 6],
      lineHeight: 'fixed',
      paddingTop: 6,
      paddingBottom: 4,
    },
    h3: {
      fontSize: [4, 5],
      lineHeight: 'body',
      paddingTop: 6,
      paddingBottom: 4,
    },
    h4: {
      fontSize: 3,
    },
    h5: {
      fontSize: 2,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: 'graysafe',
    },
    h6: {
      fontSize: 1,
    },
    li: {
      listStylePosition: 'inside',
      paddingBottom: 4,
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

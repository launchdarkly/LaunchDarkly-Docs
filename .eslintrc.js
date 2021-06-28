module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'react', 'import', 'react-hooks', 'jsx-a11y'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  overrides: [
    {
      files: ['./gatsby-*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  rules: {
    'no-duplicate-imports': 'error',

    // Forbid unnecessary backticks
    // https://github.com/prettier/eslint-config-prettier/blob/master/README.md#forbid-unnecessary-backticks
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

    // Disable prop-types as we use TypeScript for type checking
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/no-self-import': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['internal', 'parent', 'sibling'], 'index'],
      },
    ],
    'import/no-webpack-loader-syntax': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-unused-modules': 'error',
    'import/no-duplicates': 'error',

    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['cypress/plugins', 'cypress/support', 'cypress/fixtures'],
  globals: {
    describe: true,
    it: true,
    expect: true,
    jest: true,
    beforeEach: true,
    afterEach: true,
    beforeAll: true,
    afterAll: true,
    test: true,
    jsdom: true,
    cy: true,
    chai: true,
    before: true,
    after: true,
    Cypress: true,
    context: true,
    assert: true,
  },
}

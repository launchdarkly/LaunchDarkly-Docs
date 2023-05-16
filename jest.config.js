module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  snapshotSerializers: ['@emotion/jest/enzyme-serializer'],
  setupFiles: ['../jest.setup.js'],
  setupFilesAfterEnv: ['../jest.setupFilesAfterEnv.js'],
  testURL: 'http://localhost',
  globals: {
    __PATH_PREFIX__: '',
  },
  moduleNameMapper: {
    '^gatsby-page-utils/(.*)$': 'gatsby-page-utils/dist/$1', // Workaround for https://github.com/facebook/jest/issues/9771
    '@/(.*)': '<rootDir>/$1',
  },
}

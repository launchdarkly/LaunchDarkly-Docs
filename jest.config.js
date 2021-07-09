module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  snapshotSerializers: ['@emotion/jest/enzyme-serializer'],
  setupFiles: ['../jest.setup.js'],
  testURL: 'http://localhost',
  globals: {
    __PATH_PREFIX__: '',
  },
}

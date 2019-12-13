module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  snapshotSerializers: ['jest-emotion'],
  setupFiles: ['../jest.setup.js'],
  testURL: 'http://localhost',
  globals: {
    __PATH_PREFIX__: '',
  },
}

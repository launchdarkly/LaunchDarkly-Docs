module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  snapshotSerializers: ['jest-emotion'],
  setupFiles: ['../jest.setup.js'],
}

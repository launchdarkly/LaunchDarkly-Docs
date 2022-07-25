/* eslint-disable @typescript-eslint/no-var-requires */
const { cleanup } = require('@testing-library/react')

require('@testing-library/jest-dom')

afterEach(cleanup)

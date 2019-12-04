/* eslint-disable @typescript-eslint/no-var-requires */
const { format } = require('util')

// fail tests on errors and warnings
const { error } = global.console
const customErrorLogFunction = function(...args) {
  error(...args)
  throw new Error(format(...args))
}
global.console.warn = global.console.error = customErrorLogFunction

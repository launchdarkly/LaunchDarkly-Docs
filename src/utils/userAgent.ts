import UAParser, { IResult } from 'ua-parser-js'

let userAgentInstance: UAParser
let userAgentResults: IResult

const getUserAgentResults = () => {
  return userAgentResults
}

export const initUAParser = () => {
  userAgentInstance = new UAParser()
  userAgentResults = userAgentInstance.getResult()
  return userAgentInstance
}

export default getUserAgentResults

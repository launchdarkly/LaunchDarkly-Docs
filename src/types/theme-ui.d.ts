// eslint can't seem to find csstype even though it is implicitly installed
// eslint-disable-next-line import/no-unresolved
import * as CSS from 'csstype'

declare module 'theme-ui' {
  export interface Theme {
    fontWeights?: { [key: string]: CSS.FontWeightProperty }
  }
}

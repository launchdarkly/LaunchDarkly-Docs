import { Fragment, FunctionComponent, ReactNode } from 'react'
import { useFlags } from 'gatsby-plugin-launchdarkly'
import { LDFlagSet } from 'launchdarkly-js-client-sdk'

type FeatureProps = {
  flag: <T>(flags: LDFlagSet) => T
  children: ReactNode
  showWhenVariation: boolean | string
}

/**
 * This component uses the react sdk via gatsby-plugin-launchdarkly to control content changes.
 * Flags are defined in catfood under the Docs project.
 *
 * Note that we can't really target user contexts or account members because docs readers are public and there's no logins.
 *
 * @param {Function} flag - The flag as defined in flags/index.ts
 * @param {Boolean|String|Number} showWhenVariation - This is the flag value to show content.
 * @param children - This is the content to be flagged. This needs to be a react element or html
 * element and not a markdown shorthand element.
 *
 */
const Feature: FunctionComponent<React.PropsWithChildren<FeatureProps>> = ({ flag, children, showWhenVariation }) => {
  const flags = useFlags()
  const flagValue = flag(flags)

  if (typeof flagValue !== 'undefined' && showWhenVariation === flagValue) {
    return <Fragment>{children}</Fragment>
  }

  return null
}

export default Feature

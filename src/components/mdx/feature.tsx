/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, FunctionComponent } from 'react'
import { useFlags } from 'gatsby-plugin-launchdarkly'

interface FeatureProps {
  flagKey: string
  showWhenVariation: boolean
}

/**
 * This component uses the react sdk via gatsby-plugin-launchdarkly to control content changes.
 * Flags are defined in catfood under the Docs project.
 *
 * Note that we can't really target users because docs users are public and there's no logins.
 *
 * @param {String} flagKey - This is the camelCased flag key in catfood
 * @param {Boolean} showWhenVariation - This is the flag value to show content. Defaults to true.
 * @param children - This is the content to be flagged. This needs to be a react element or html
 * element and not a markdown shorthand element. There are issues with mdx parsing that prevents
 * nesting of markdown elements under react elements.
 *
 */
const Feature: FunctionComponent<FeatureProps> = ({ flagKey, showWhenVariation = true, children }) => {
  const flags = useFlags()
  const flagValue = flags[flagKey]

  if (typeof flagValue !== 'undefined' && showWhenVariation === flagValue) {
    return <Fragment>{children}</Fragment>
  }

  return null
}

export default Feature
